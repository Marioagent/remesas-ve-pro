// API Route: /api/servicios
// Obtiene todos los servicios REALES

import { NextRequest, NextResponse } from 'next/server'
import { REAL_SERVICES, getServicesByCountry } from '@/data/real-services'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country')

  if (country) {
    const services = getServicesByCountry(country)
    return NextResponse.json({
      success: true,
      data: services,
      count: services.length
    })
  }

  return NextResponse.json({
    success: true,
    data: REAL_SERVICES,
    count: REAL_SERVICES.length
  })
}
