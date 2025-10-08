// API Route: /api/calcular
// Calcula comparación de servicios con tasas REALES

import { NextRequest, NextResponse } from 'next/server'
import { getRatesByCountry } from '@/lib/api-clients/real-rates-api'
import { getServicesByCountry } from '@/data/real-services'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { monto, country = 'VE', rateType = 'paralelo' } = body

    if (!monto || isNaN(monto) || monto <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Obtener tasas del país
    const rates = await getRatesByCountry(country.toUpperCase())

    let selectedRate
    if ('rates' in rates) {
      selectedRate = rates.rates.find(r => r.rateType === rateType) || rates.rates[0]
    } else {
      selectedRate = rates
    }

    // Obtener servicios del país
    const services = getServicesByCountry(country.toUpperCase())

    // Calcular comparaciones
    const comparisons = services
      .filter(s => monto >= s.minAmount && monto <= s.maxAmount)
      .map(servicio => {
        const montoRecibir = monto * selectedRate.rate

        return {
          servicio: {
            id: servicio.id,
            name: servicio.name,
            type: servicio.type,
            commission: servicio.commission,
            avgTime: servicio.avgTime
          },
          montoRecibir,
          tasa: selectedRate.rate,
          montoEnvio: monto
        }
      })
      .sort((a, b) => b.montoRecibir - a.montoRecibir)

    return NextResponse.json({
      success: true,
      data: {
        comparisons,
        rate: selectedRate,
        country
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Calculation failed'
      },
      { status: 500 }
    )
  }
}
