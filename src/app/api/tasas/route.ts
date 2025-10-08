import { NextResponse } from 'next/server'
import TasasAPI from '@/lib/api-clients/tasas-api'

// GET /api/tasas - Obtener todas las tasas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fuente = searchParams.get('fuente')
    const force = searchParams.get('force') === 'true'

    // Limpiar cache si se solicita
    if (force) {
      TasasAPI.limpiarCache()
    }

    // Si se solicita una fuente específica
    if (fuente) {
      const tasa = await TasasAPI.obtenerTasa(fuente)
      if (!tasa) {
        return NextResponse.json(
          { error: 'Fuente no encontrada' },
          { status: 404 }
        )
      }
      return NextResponse.json(tasa)
    }

    // Obtener todas las tasas
    const tasas = await TasasAPI.obtenerTodasLasTasas()

    return NextResponse.json({
      tasas,
      timestamp: new Date().toISOString(),
      count: tasas.length
    })
  } catch (error) {
    console.error('Error en API tasas:', error)
    return NextResponse.json(
      { error: 'Error obteniendo tasas' },
      { status: 500 }
    )
  }
}
