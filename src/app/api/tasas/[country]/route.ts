import { NextRequest, NextResponse } from 'next/server'
import { CountryCode, ExchangeRate } from '@/types/countries'

// APIs por país (13 países: Sudamérica + USA)
const EXCHANGE_RATE_APIS = {
  // Ya implementados
  VE: ['https://pydolarve.org/api/v1/dollar', 'https://s3.amazonaws.com/dolartoday/data.json'],
  CO: ['https://www.datos.gov.co/resource/32sa-8pi3.json', 'https://trm-colombia.makeitreal.camp/api/v1/trm'],
  CL: ['https://mindicador.cl/api'],
  AR: ['https://dolarapi.com/v1/dolares', 'https://api.bluelytics.com.ar/v2/latest'],
  UY: ['https://cotizaciones.bcu.gub.uy/wscotizaciones/servlet/awsbcucotizaciones'],
  BO: [],
  PA: [],
  // Nuevos países
  BR: ['https://economia.awesomeapi.com.br/json/last/USD-BRL'],
  EC: [], // Usa USD
  PE: ['https://api.apis.net.pe/v1/tipo-cambio-sunat'],
  PY: [],
  GY: [],
  SR: [],
  US: [] // Moneda base
}

// Tasas fijas y dolarizadas
const FIXED_RATES = {
  BO: 6.90,  // Bolivia: tasa fija desde 2011
  PA: 1.00,  // Panamá: usa USD directamente
  EC: 1.00,  // Ecuador: dolarizado desde 2000
  US: 1.00   // USA: moneda base
}

async function fetchVenezuelaRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://pydolarve.org/api/v1/dollar', {
      next: { revalidate: 300 } // Cache 5 minutos
    })

    if (!response.ok) throw new Error('API Venezuela no disponible')

    const data = await response.json()

    const rates: ExchangeRate[] = []

    if (data.monitors?.bcv) {
      rates.push({
        from: 'USD',
        to: 'VES',
        rate: data.monitors.bcv.price,
        source: 'BCV',
        timestamp: new Date(data.monitors.bcv.last_update),
        type: 'oficial'
      })
    }

    if (data.monitors?.enparalelovzla) {
      rates.push({
        from: 'USD',
        to: 'VES',
        rate: data.monitors.enparalelovzla.price,
        source: 'EnParaleloVzla',
        timestamp: new Date(data.monitors.enparalelovzla.last_update),
        type: 'paralelo'
      })
    }

    return rates
  } catch (error) {
    console.error('Error fetching Venezuela rates:', error)
    return []
  }
}

async function fetchColombiaRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://trm-colombia.makeitreal.camp/api/v1/trm', {
      next: { revalidate: 3600 } // Cache 1 hora
    })

    if (!response.ok) throw new Error('API Colombia no disponible')

    const data = await response.json()

    return [{
      from: 'USD',
      to: 'COP',
      rate: data.data.value,
      source: 'TRM Oficial',
      timestamp: new Date(data.data.validity_from),
      type: 'oficial'
    }]
  } catch (error) {
    console.error('Error fetching Colombia rates:', error)
    return []
  }
}

async function fetchChileRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://mindicador.cl/api', {
      next: { revalidate: 3600 }
    })

    if (!response.ok) throw new Error('API Chile no disponible')

    const data = await response.json()

    return [{
      from: 'USD',
      to: 'CLP',
      rate: data.dolar.valor,
      source: 'Banco Central de Chile',
      timestamp: new Date(data.dolar.fecha),
      type: 'oficial'
    }]
  } catch (error) {
    console.error('Error fetching Chile rates:', error)
    return []
  }
}

async function fetchArgentinaRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares', {
      next: { revalidate: 300 } // Cache 5 minutos (Argentina cambia rápido)
    })

    if (!response.ok) throw new Error('API Argentina no disponible')

    const data = await response.json()

    const rates: ExchangeRate[] = []

    // Dólar Oficial
    const oficial = data.find((d: any) => d.casa === 'oficial')
    if (oficial) {
      rates.push({
        from: 'USD',
        to: 'ARS',
        rate: oficial.venta,
        source: 'Banco Nación',
        timestamp: new Date(oficial.fechaActualizacion),
        type: 'oficial'
      })
    }

    // Dólar Blue
    const blue = data.find((d: any) => d.casa === 'blue')
    if (blue) {
      rates.push({
        from: 'USD',
        to: 'ARS',
        rate: blue.venta,
        source: 'Dólar Blue',
        timestamp: new Date(blue.fechaActualizacion),
        type: 'blue'
      })
    }

    // Dólar MEP
    const mep = data.find((d: any) => d.casa === 'bolsa')
    if (mep) {
      rates.push({
        from: 'USD',
        to: 'ARS',
        rate: mep.venta,
        source: 'Dólar MEP',
        timestamp: new Date(mep.fechaActualizacion),
        type: 'mep'
      })
    }

    // Dólar CCL
    const ccl = data.find((d: any) => d.casa === 'contadoconliqui')
    if (ccl) {
      rates.push({
        from: 'USD',
        to: 'ARS',
        rate: ccl.venta,
        source: 'Dólar CCL',
        timestamp: new Date(ccl.fechaActualizacion),
        type: 'ccl'
      })
    }

    return rates
  } catch (error) {
    console.error('Error fetching Argentina rates:', error)
    return []
  }
}

async function fetchUruguayRates(): Promise<ExchangeRate[]> {
  try {
    // Uruguay tiene API SOAP compleja, usar fallback
    // Por ahora retornamos tasa estimada
    return [{
      from: 'USD',
      to: 'UYU',
      rate: 40.5,
      source: 'BCU (Estimado)',
      timestamp: new Date(),
      type: 'oficial'
    }]
  } catch (error) {
    console.error('Error fetching Uruguay rates:', error)
    return []
  }
}

async function fetchBoliviaRates(): Promise<ExchangeRate[]> {
  // Bolivia tiene tasa fija
  return [{
    from: 'USD',
    to: 'BOB',
    rate: FIXED_RATES.BO,
    source: 'BCB (Tasa Fija)',
    timestamp: new Date(),
    type: 'oficial'
  }]
}

async function fetchPanamaRates(): Promise<ExchangeRate[]> {
  // Panamá usa USD directamente
  return [{
    from: 'USD',
    to: 'USD',
    rate: 1.00,
    source: 'Panamá usa USD',
    timestamp: new Date(),
    type: 'oficial'
  }]
}

async function fetchBrazilRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL', {
      next: { revalidate: 3600 } // Cache 1 hora
    })

    if (!response.ok) throw new Error('API Brasil no disponible')

    const data = await response.json()

    return [{
      from: 'USD',
      to: 'BRL',
      rate: parseFloat(data.USDBRL.bid),
      source: 'AwesomeAPI Brasil',
      timestamp: new Date(parseInt(data.USDBRL.timestamp) * 1000),
      type: 'oficial'
    }]
  } catch (error) {
    console.error('Error fetching Brazil rates:', error)
    return []
  }
}

async function fetchEcuadorRates(): Promise<ExchangeRate[]> {
  // Ecuador usa USD desde 2000
  return [{
    from: 'USD',
    to: 'USD',
    rate: 1.00,
    source: 'Ecuador usa USD (dolarizado)',
    timestamp: new Date(),
    type: 'oficial'
  }]
}

async function fetchPeruRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://api.apis.net.pe/v1/tipo-cambio-sunat', {
      next: { revalidate: 3600 }
    })

    if (!response.ok) throw new Error('API Perú no disponible')

    const data = await response.json()

    return [{
      from: 'USD',
      to: 'PEN',
      rate: data.venta,
      source: 'SUNAT Perú',
      timestamp: new Date(data.fecha),
      type: 'oficial'
    }]
  } catch (error) {
    console.error('Error fetching Peru rates:', error)
    // Fallback con tasa estimada
    return [{
      from: 'USD',
      to: 'PEN',
      rate: 3.75,
      source: 'SUNAT (Estimado)',
      timestamp: new Date(),
      type: 'oficial'
    }]
  }
}

async function fetchParaguayRates(): Promise<ExchangeRate[]> {
  // Paraguay - API del BCP requiere scraping, usar estimado
  return [{
    from: 'USD',
    to: 'PYG',
    rate: 7200,
    source: 'BCP Paraguay (Estimado)',
    timestamp: new Date(),
    type: 'oficial'
  }]
}

async function fetchGuyanaRates(): Promise<ExchangeRate[]> {
  // Guyana - API no disponible públicamente
  return [{
    from: 'USD',
    to: 'GYD',
    rate: 210,
    source: 'Bank of Guyana (Estimado)',
    timestamp: new Date(),
    type: 'oficial'
  }]
}

async function fetchSurinamRates(): Promise<ExchangeRate[]> {
  // Surinam - API no disponible públicamente
  return [{
    from: 'USD',
    to: 'SRD',
    rate: 30,
    source: 'CBvS Suriname (Estimado)',
    timestamp: new Date(),
    type: 'oficial'
  }]
}

async function fetchUSARates(): Promise<ExchangeRate[]> {
  // USA es la moneda base
  return [{
    from: 'USD',
    to: 'USD',
    rate: 1.00,
    source: 'USD (Moneda Base)',
    timestamp: new Date(),
    type: 'oficial'
  }]
}

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  try {
    const country = params.country.toUpperCase() as CountryCode

    // Validar país (13 países: Sudamérica + USA)
    const validCountries: CountryCode[] = [
      'VE', 'CO', 'CL', 'AR', 'UY', 'BO', 'PA', // Ya implementados
      'BR', 'EC', 'PE', 'PY', 'GY', 'SR', 'US'  // Nuevos
    ]
    if (!validCountries.includes(country)) {
      return NextResponse.json(
        { error: 'País no soportado', validCountries },
        { status: 400 }
      )
    }

    let rates: ExchangeRate[] = []

    // Obtener tasas según el país
    switch (country) {
      case 'VE':
        rates = await fetchVenezuelaRates()
        break
      case 'CO':
        rates = await fetchColombiaRates()
        break
      case 'CL':
        rates = await fetchChileRates()
        break
      case 'AR':
        rates = await fetchArgentinaRates()
        break
      case 'UY':
        rates = await fetchUruguayRates()
        break
      case 'BO':
        rates = await fetchBoliviaRates()
        break
      case 'PA':
        rates = await fetchPanamaRates()
        break
      case 'BR':
        rates = await fetchBrazilRates()
        break
      case 'EC':
        rates = await fetchEcuadorRates()
        break
      case 'PE':
        rates = await fetchPeruRates()
        break
      case 'PY':
        rates = await fetchParaguayRates()
        break
      case 'GY':
        rates = await fetchGuyanaRates()
        break
      case 'SR':
        rates = await fetchSurinamRates()
        break
      case 'US':
        rates = await fetchUSARates()
        break
    }

    return NextResponse.json({
      country,
      rates,
      timestamp: new Date().toISOString(),
      count: rates.length
    })

  } catch (error) {
    console.error('Error in exchange rates API:', error)
    return NextResponse.json(
      { error: 'Error obteniendo tasas de cambio' },
      { status: 500 }
    )
  }
}
