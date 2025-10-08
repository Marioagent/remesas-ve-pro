// 🌐 REME LAT-USA - Sistema de APIs REALES
// NO simulaciones, NO mocks - Solo datos en tiempo real

import { COUNTRIES } from '@/data/countries'

export interface ExchangeRate {
  country: string
  countryCode: string
  currency: string
  rate: number
  rateType: string // 'oficial' | 'blue' | 'paralelo' | 'bcv' | 'binance'
  source: string
  timestamp: Date
  buy?: number
  sell?: number
}

export interface MultiRate {
  country: string
  countryCode: string
  currency: string
  rates: ExchangeRate[]
  timestamp: Date
}

// Cache con TTL de 5 minutos
const CACHE_TTL = 5 * 60 * 1000
const cache = new Map<string, { data: any; timestamp: number }>()

function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T
  }
  return null
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

// ARGENTINA - Múltiples tasas (Oficial, Blue, MEP, CCL)
async function getArgentinaRates(): Promise<MultiRate> {
  const cacheKey = 'AR_rates'
  const cached = getCached<MultiRate>(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch('https://dolarapi.com/v1/dolares')
    if (!response.ok) throw new Error('API Error')

    const data = await response.json()

    const rates: ExchangeRate[] = data.map((item: any) => ({
      country: 'Argentina',
      countryCode: 'AR',
      currency: 'ARS',
      rate: item.venta || item.promedio,
      rateType: item.casa.toLowerCase(),
      source: 'DolarAPI.com',
      timestamp: new Date(item.fechaActualizacion),
      buy: item.compra,
      sell: item.venta
    }))

    const result: MultiRate = {
      country: 'Argentina',
      countryCode: 'AR',
      currency: 'ARS',
      rates,
      timestamp: new Date()
    }

    setCache(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error fetching Argentina rates:', error)
    throw error
  }
}

// BOLIVIA - Tasa fija 6.90 BOB/USD
async function getBoliviaRates(): Promise<ExchangeRate> {
  return {
    country: 'Bolivia',
    countryCode: 'BO',
    currency: 'BOB',
    rate: 6.90,
    rateType: 'oficial',
    source: 'Banco Central de Bolivia',
    timestamp: new Date(),
    buy: 6.90,
    sell: 6.90
  }
}

// BRASIL
async function getBrasilRates(): Promise<ExchangeRate> {
  const cacheKey = 'BR_rates'
  const cached = getCached<ExchangeRate>(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch('https://dolarapi.com/v1/cotacoes/BRL')
    if (!response.ok) throw new Error('API Error')

    const data = await response.json()

    const rate: ExchangeRate = {
      country: 'Brasil',
      countryCode: 'BR',
      currency: 'BRL',
      rate: data.venta || data.valor,
      rateType: 'oficial',
      source: 'DolarAPI.com',
      timestamp: new Date(data.fechaActualizacion || Date.now()),
      buy: data.compra,
      sell: data.venta
    }

    setCache(cacheKey, rate)
    return rate
  } catch (error) {
    console.error('Error fetching Brasil rates:', error)
    throw error
  }
}

// CHILE
async function getChileRates(): Promise<ExchangeRate> {
  const cacheKey = 'CL_rates'
  const cached = getCached<ExchangeRate>(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch('https://mindicador.cl/api/dolar')
    if (!response.ok) throw new Error('API Error')

    const data = await response.json()
    const latest = data.serie[0]

    const rate: ExchangeRate = {
      country: 'Chile',
      countryCode: 'CL',
      currency: 'CLP',
      rate: latest.valor,
      rateType: 'oficial',
      source: 'Banco Central de Chile',
      timestamp: new Date(latest.fecha),
      buy: latest.valor,
      sell: latest.valor
    }

    setCache(cacheKey, rate)
    return rate
  } catch (error) {
    console.error('Error fetching Chile rates:', error)
    throw error
  }
}

// COLOMBIA
async function getColombiaRates(): Promise<ExchangeRate> {
  const cacheKey = 'CO_rates'
  const cached = getCached<ExchangeRate>(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch('https://dolarapi.com/v1/cotacoes/COP')
    if (!response.ok) throw new Error('API Error')

    const data = await response.json()

    const rate: ExchangeRate = {
      country: 'Colombia',
      countryCode: 'CO',
      currency: 'COP',
      rate: data.venta || data.valor,
      rateType: 'oficial',
      source: 'DolarAPI.com',
      timestamp: new Date(data.fechaActualizacion || Date.now()),
      buy: data.compra,
      sell: data.venta
    }

    setCache(cacheKey, rate)
    return rate
  } catch (error) {
    console.error('Error fetching Colombia rates:', error)
    throw error
  }
}

// VENEZUELA - Múltiples tasas (BCV, Paralelo, Binance)
async function getVenezuelaRates(): Promise<MultiRate> {
  const cacheKey = 'VE_rates'
  const cached = getCached<MultiRate>(cacheKey)
  if (cached) return cached

  try {
    const [bcv, paralelo, binance] = await Promise.allSettled([
      fetch('https://pydolarve.org/api/v1/dollar?page=bcv').then(r => r.json()),
      fetch('https://pydolarve.org/api/v1/dollar?page=enparalelovzla').then(r => r.json()),
      fetch('https://pydolarve.org/api/v1/dollar?page=binance').then(r => r.json())
    ])

    const rates: ExchangeRate[] = []

    if (bcv.status === 'fulfilled') {
      rates.push({
        country: 'Venezuela',
        countryCode: 'VE',
        currency: 'VES',
        rate: parseFloat(bcv.value.monitors.usd.price),
        rateType: 'bcv',
        source: 'BCV Oficial',
        timestamp: new Date(bcv.value.monitors.usd.last_update),
        buy: parseFloat(bcv.value.monitors.usd.price),
        sell: parseFloat(bcv.value.monitors.usd.price)
      })
    }

    if (paralelo.status === 'fulfilled') {
      const price = parseFloat(paralelo.value.monitors.usd.price)
      rates.push({
        country: 'Venezuela',
        countryCode: 'VE',
        currency: 'VES',
        rate: price,
        rateType: 'paralelo',
        source: 'Mercado Paralelo',
        timestamp: new Date(paralelo.value.monitors.usd.last_update),
        buy: price,
        sell: price
      })
    }

    if (binance.status === 'fulfilled') {
      const price = parseFloat(binance.value.monitors.usd.price)
      rates.push({
        country: 'Venezuela',
        countryCode: 'VE',
        currency: 'VES',
        rate: price,
        rateType: 'binance',
        source: 'Binance P2P',
        timestamp: new Date(binance.value.monitors.usd.last_update),
        buy: price,
        sell: price
      })
    }

    const result: MultiRate = {
      country: 'Venezuela',
      countryCode: 'VE',
      currency: 'VES',
      rates,
      timestamp: new Date()
    }

    setCache(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error fetching Venezuela rates:', error)
    throw error
  }
}

// Generic ExchangeRate API para otros países
async function getGenericRates(countryCode: string): Promise<ExchangeRate> {
  const country = COUNTRIES[countryCode]
  if (!country) throw new Error(`Country ${countryCode} not found`)

  const cacheKey = `${countryCode}_rates`
  const cached = getCached<ExchangeRate>(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    if (!response.ok) throw new Error('API Error')

    const data = await response.json()
    const rate = data.rates[country.currency]

    if (!rate) throw new Error(`Rate for ${country.currency} not found`)

    const result: ExchangeRate = {
      country: country.name,
      countryCode: country.code,
      currency: country.currency,
      rate,
      rateType: 'oficial',
      source: 'ExchangeRate-API',
      timestamp: new Date(),
      buy: rate,
      sell: rate
    }

    setCache(cacheKey, result)
    return result
  } catch (error) {
    console.error(`Error fetching ${countryCode} rates:`, error)
    throw error
  }
}

// USD Countries (Ecuador, Panamá, USA)
async function getUSDRate(countryCode: string): Promise<ExchangeRate> {
  const country = COUNTRIES[countryCode]
  return {
    country: country.name,
    countryCode: country.code,
    currency: 'USD',
    rate: 1.0,
    rateType: 'oficial',
    source: 'N/A',
    timestamp: new Date(),
    buy: 1.0,
    sell: 1.0
  }
}

// Función principal para obtener tasas de cualquier país
export async function getRatesByCountry(countryCode: string): Promise<ExchangeRate | MultiRate> {
  const country = COUNTRIES[countryCode]
  if (!country) throw new Error(`Country ${countryCode} not supported`)

  // Países con múltiples tasas
  if (countryCode === 'AR') return getArgentinaRates()
  if (countryCode === 'VE') return getVenezuelaRates()

  // Países con tasa fija
  if (countryCode === 'BO') return getBoliviaRates()

  // Países que usan USD
  if (country.currency === 'USD') return getUSDRate(countryCode)

  // Países con APIs específicas
  if (countryCode === 'BR') return getBrasilRates()
  if (countryCode === 'CL') return getChileRates()
  if (countryCode === 'CO') return getColombiaRates()

  // Otros países usan API genérica
  return getGenericRates(countryCode)
}

// Obtener todas las tasas de todos los países
export async function getAllRates(): Promise<(ExchangeRate | MultiRate)[]> {
  const countryCodes = Object.keys(COUNTRIES)
  const promises = countryCodes.map(code =>
    getRatesByCountry(code).catch(err => {
      console.error(`Failed to fetch rates for ${code}:`, err)
      return null
    })
  )

  const results = await Promise.all(promises)
  return results.filter(r => r !== null) as (ExchangeRate | MultiRate)[]
}

// Limpiar cache manualmente
export function clearCache(): void {
  cache.clear()
}

export default {
  getRatesByCountry,
  getAllRates,
  clearCache
}
