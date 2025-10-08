// API Route: /api/rates/all
// Obtiene tasas REALES de todos los 14 países

import { NextRequest, NextResponse } from 'next/server'
import { getAllRates } from '@/lib/api-clients/real-rates-api'

export async function GET(request: NextRequest) {
  try {
    // Obtener todas las tasas de todos los países
    const allRates = await getAllRates()

    return NextResponse.json({
      success: true,
      data: allRates,
      count: allRates.length,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error fetching all rates:', error)

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

export const revalidate = 300 // Revalidate every 5 minutes
