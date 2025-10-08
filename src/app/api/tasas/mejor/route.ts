import { NextResponse } from 'next/server'
import TasasAPI from '@/lib/api-clients/tasas-api'

// GET /api/tasas/mejor - Obtener mejores tasas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo') || 'compra'

    let mejorTasa
    if (tipo === 'venta') {
      mejorTasa = await TasasAPI.obtenerMejorTasaVenta()
    } else {
      mejorTasa = await TasasAPI.obtenerMejorTasaCompra()
    }

    if (!mejorTasa) {
      return NextResponse.json(
        { error: 'No hay tasas disponibles' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      tipo,
      tasa: mejorTasa,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error en API mejor tasa:', error)
    return NextResponse.json(
      { error: 'Error obteniendo mejor tasa' },
      { status: 500 }
    )
  }
}
