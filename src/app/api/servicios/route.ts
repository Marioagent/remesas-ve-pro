import { NextResponse } from 'next/server'
import { obtenerServiciosRemesas, calcularRemesa } from '@/lib/api-clients/servicios-remesas'

// GET /api/servicios - Obtener servicios de remesas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ordenar = searchParams.get('ordenar') || 'mejor-tasa'
    const monto = parseFloat(searchParams.get('monto') || '0')

    const servicios = await obtenerServiciosRemesas()

    // Filtrar por disponibilidad
    const disponibles = servicios.filter(s => s.disponibilidad)

    // Ordenar según criterio
    let serviciosOrdenados = [...disponibles]

    if (monto > 0) {
      // Calcular y ordenar por mejor recepción
      const calculos = serviciosOrdenados.map(servicio => ({
        servicio,
        calculo: calcularRemesa(monto, servicio)
      }))

      if (ordenar === 'mejor-tasa') {
        calculos.sort((a, b) => b.calculo.montoRecibir - a.calculo.montoRecibir)
      } else if (ordenar === 'mas-rapido') {
        calculos.sort((a, b) => {
          const tiempoA = parsearTiempoEntrega(a.servicio.tiempoEntrega)
          const tiempoB = parsearTiempoEntrega(b.servicio.tiempoEntrega)
          return tiempoA - tiempoB
        })
      } else if (ordenar === 'menor-comision') {
        calculos.sort((a, b) => a.calculo.comision - b.calculo.comision)
      }

      serviciosOrdenados = calculos.map(c => c.servicio)
    }

    return NextResponse.json({
      servicios: serviciosOrdenados,
      count: serviciosOrdenados.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error en API servicios:', error)
    return NextResponse.json(
      { error: 'Error obteniendo servicios' },
      { status: 500 }
    )
  }
}

// Función auxiliar para parsear tiempo de entrega
function parsearTiempoEntrega(tiempo: string): number {
  const match = tiempo.match(/(\d+)/)
  return match ? parseInt(match[1]) : 999
}
