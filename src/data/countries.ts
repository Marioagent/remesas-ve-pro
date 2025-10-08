// 🌎 REME LAT-USA - Configuración de 14 Países
// Datos REALES de cada país para obtener tasas de cambio en tiempo real

export interface Country {
  code: string
  name: string
  currency: string
  currencySymbol: string
  flag: string
  apiEndpoint: string
  apiType: 'dolarapi' | 'exchangerate' | 'bcra' | 'fixed' | 'usd'
  hasMultipleRates: boolean
  controlCambiario: boolean
  timezone: string
}

export const COUNTRIES: Record<string, Country> = {
  // SUDAMÉRICA
  AR: {
    code: 'AR',
    name: 'Argentina',
    currency: 'ARS',
    currencySymbol: '$',
    flag: '🇦🇷',
    apiEndpoint: 'https://dolarapi.com/v1/dolares',
    apiType: 'dolarapi',
    hasMultipleRates: true, // Oficial, Blue, MEP, CCL
    controlCambiario: true,
    timezone: 'America/Argentina/Buenos_Aires'
  },
  BO: {
    code: 'BO',
    name: 'Bolivia',
    currency: 'BOB',
    currencySymbol: 'Bs',
    flag: '🇧🇴',
    apiEndpoint: 'fixed', // Tasa fija 6.90 desde 2011
    apiType: 'fixed',
    hasMultipleRates: false,
    controlCambiario: true,
    timezone: 'America/La_Paz'
  },
  BR: {
    code: 'BR',
    name: 'Brasil',
    currency: 'BRL',
    currencySymbol: 'R$',
    flag: '🇧🇷',
    apiEndpoint: 'https://dolarapi.com/v1/cotacoes/BRL',
    apiType: 'dolarapi',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Sao_Paulo'
  },
  CL: {
    code: 'CL',
    name: 'Chile',
    currency: 'CLP',
    currencySymbol: '$',
    flag: '🇨🇱',
    apiEndpoint: 'https://mindicador.cl/api/dolar',
    apiType: 'exchangerate',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Santiago'
  },
  CO: {
    code: 'CO',
    name: 'Colombia',
    currency: 'COP',
    currencySymbol: '$',
    flag: '🇨🇴',
    apiEndpoint: 'https://dolarapi.com/v1/cotacoes/COP',
    apiType: 'dolarapi',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Bogota'
  },
  EC: {
    code: 'EC',
    name: 'Ecuador',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇪🇨',
    apiEndpoint: 'usd',
    apiType: 'usd',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Guayaquil'
  },
  GY: {
    code: 'GY',
    name: 'Guyana',
    currency: 'GYD',
    currencySymbol: 'G$',
    flag: '🇬🇾',
    apiEndpoint: 'https://api.exchangerate-api.com/v4/latest/USD',
    apiType: 'exchangerate',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Guyana'
  },
  PA: {
    code: 'PA',
    name: 'Panamá',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇵🇦',
    apiEndpoint: 'usd',
    apiType: 'usd',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Panama'
  },
  PY: {
    code: 'PY',
    name: 'Paraguay',
    currency: 'PYG',
    currencySymbol: '₲',
    flag: '🇵🇾',
    apiEndpoint: 'https://api.exchangerate-api.com/v4/latest/USD',
    apiType: 'exchangerate',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Asuncion'
  },
  PE: {
    code: 'PE',
    name: 'Perú',
    currency: 'PEN',
    currencySymbol: 'S/',
    flag: '🇵🇪',
    apiEndpoint: 'https://dolarapi.com/v1/cotacoes/PEN',
    apiType: 'dolarapi',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Lima'
  },
  SR: {
    code: 'SR',
    name: 'Surinam',
    currency: 'SRD',
    currencySymbol: '$',
    flag: '🇸🇷',
    apiEndpoint: 'https://api.exchangerate-api.com/v4/latest/USD',
    apiType: 'exchangerate',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Paramaribo'
  },
  UY: {
    code: 'UY',
    name: 'Uruguay',
    currency: 'UYU',
    currencySymbol: '$U',
    flag: '🇺🇾',
    apiEndpoint: 'https://dolarapi.com/v1/cotacoes/UYU',
    apiType: 'dolarapi',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/Montevideo'
  },
  VE: {
    code: 'VE',
    name: 'Venezuela',
    currency: 'VES',
    currencySymbol: 'Bs',
    flag: '🇻🇪',
    apiEndpoint: 'https://pydolarve.org/api/v1/dollar',
    apiType: 'dolarapi',
    hasMultipleRates: true, // BCV, Paralelo, Binance
    controlCambiario: true,
    timezone: 'America/Caracas'
  },

  // NORTEAMÉRICA
  US: {
    code: 'US',
    name: 'Estados Unidos',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    apiEndpoint: 'usd',
    apiType: 'usd',
    hasMultipleRates: false,
    controlCambiario: false,
    timezone: 'America/New_York'
  }
}

// Lista de países ordenados alfabéticamente
export const COUNTRY_LIST = Object.values(COUNTRIES).sort((a, b) =>
  a.name.localeCompare(b.name)
)

// Obtener país por código
export function getCountry(code: string): Country | undefined {
  return COUNTRIES[code.toUpperCase()]
}

// Países con múltiples tasas (requieren atención especial)
export const MULTI_RATE_COUNTRIES = Object.values(COUNTRIES)
  .filter(c => c.hasMultipleRates)
  .map(c => c.code)

// Países con control cambiario
export const CONTROLLED_COUNTRIES = Object.values(COUNTRIES)
  .filter(c => c.controlCambiario)
  .map(c => c.code)

// Países que usan USD directamente
export const USD_COUNTRIES = Object.values(COUNTRIES)
  .filter(c => c.currency === 'USD')
  .map(c => c.code)
