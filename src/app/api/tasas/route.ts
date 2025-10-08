// API Route: /api/tasas
// Obtiene todas las tasas (redirect a /api/rates/all)

import { NextResponse } from 'next/server'
import { getAllRates } from '@/lib/api-clients/real-rates-api'

export async function GET() {
  try {
    const allRates = await getAllRates()

    return NextResponse.json({
      success: true,
      data: allRates,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch rates'
      },
      { status: 500 }
    )
  }
}
