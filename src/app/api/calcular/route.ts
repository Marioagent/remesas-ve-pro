import { NextResponse } from 'next/server'
import { obtenerServiciosRemesas, calcularRemesa } from '@/lib/api-clients/servicios-remesas'

// POST /api/calcular - Calcular remesa
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { monto, servicioId } = body

    if (!monto || monto <= 0) {
      return NextResponse.json(
        { error: 'Monto inválido' },
        { status: 400 }
      )
    }

    const servicios = await obtenerServiciosRemesas()

    // Si se especifica un servicio
    if (servicioId) {
      const servicio = servicios.find(s => s.id === servicioId)
      if (!servicio) {
        return NextResponse.json(
          { error: 'Servicio no encontrado' },
          { status: 404 }
        )
      }

      const calculo = calcularRemesa(monto, servicio)
      return NextResponse.json(calculo)
    }

    // Calcular para todos los servicios disponibles
    const disponibles = servicios.filter(s => s.disponibilidad)
    const calculos = disponibles.map(servicio => ({
      servicio: servicio.nombre,
      servicioId: servicio.id,
      ...calcularRemesa(monto, servicio)
    }))

    // Ordenar por mejor recepción
    calculos.sort((a, b) => b.montoRecibir - a.montoRecibir)

    // Calcular ahorro vs peor opción
    const mejor = calculos[0]
    const peor = calculos[calculos.length - 1]
    const ahorroMaximo = mejor.montoRecibir - peor.montoRecibir

    return NextResponse.json({
      calculos,
      resumen: {
        mejorServicio: mejor.servicio,
        mejorRecepcion: mejor.montoRecibir,
        peorRecepcion: peor.montoRecibir,
        ahorroMaximo,
        porcentajeAhorro: ((ahorroMaximo / peor.montoRecibir) * 100).toFixed(2)
      }
    })
  } catch (error) {
    console.error('Error en API calcular:', error)
    return NextResponse.json(
      { error: 'Error calculando remesa' },
      { status: 500 }
    )
  }
}
