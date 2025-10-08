// API Route: /api/rates/[country]
// Obtiene tasas REALES en tiempo real para cualquier país

import { NextRequest, NextResponse } from 'next/server'
import { getRatesByCountry } from '@/lib/api-clients/real-rates-api'

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  try {
    const countryCode = params.country.toUpperCase()

    // Obtener tasas reales del país
    const rates = await getRatesByCountry(countryCode)

    return NextResponse.json({
      success: true,
      data: rates,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error fetching rates:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch rates',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// CORS headers
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
