import { NextRequest, NextResponse } from 'next/server'
import { CountryCode } from '@/types/countries'
import {
  getServicesByCountry,
  getFintechsByCountry,
  getCasasCambioByCountry
} from '@/data/services-by-country'

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  try {
    const country = params.country.toUpperCase() as CountryCode

    // Validar país
    const validCountries: CountryCode[] = ['VE', 'CO', 'CL', 'AR', 'UY', 'BO', 'PA']
    if (!validCountries.includes(country)) {
      return NextResponse.json(
        { error: 'País no soportado', validCountries },
        { status: 400 }
      )
    }

    // Obtener tipo de servicio solicitado
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'

    const result: any = {
      country,
      timestamp: new Date().toISOString()
    }

    // Obtener servicios según el tipo
    if (type === 'all' || type === 'remesas') {
      result.remittanceServices = getServicesByCountry(country)
    }

    if (type === 'all' || type === 'fintechs') {
      result.fintechs = getFintechsByCountry(country)
    }

    if (type === 'all' || type === 'casas-cambio') {
      result.casasCambio = getCasasCambioByCountry(country)
    }

    // Estadísticas
    result.stats = {
      totalRemittanceServices: result.remittanceServices?.length || 0,
      totalFintechs: result.fintechs?.length || 0,
      totalCasasCambio: result.casasCambio?.length || 0,
      total: (result.remittanceServices?.length || 0) +
             (result.fintechs?.length || 0) +
             (result.casasCambio?.length || 0)
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error in services API:', error)
    return NextResponse.json(
      { error: 'Error obteniendo servicios' },
      { status: 500 }
    )
  }
}
