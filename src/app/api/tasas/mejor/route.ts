// API Route: /api/tasas/mejor
// Obtiene la mejor tasa para un país

import { NextRequest, NextResponse } from 'next/server'
import { getRatesByCountry } from '@/lib/api-clients/real-rates-api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country') || 'VE'

  try {
    const rates = await getRatesByCountry(country.toUpperCase())

    let bestRate
    if ('rates' in rates) {
      // País con múltiples tasas, retornar la más alta
      bestRate = rates.rates.reduce((best, current) =>
        current.rate > best.rate ? current : best
      )
    } else {
      bestRate = rates
    }

    return NextResponse.json({
      success: true,
      data: bestRate,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch best rate'
      },
      { status: 500 }
    )
  }
}
