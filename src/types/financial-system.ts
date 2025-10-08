// Sistema Financiero Profesional - Types

export type CountryCode = 'BR' | 'VE' | 'CO' | 'CL' | 'AR' | 'UY' | 'BO' | 'PA'

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'CHF' | 'BRL' | 'VES' | 'COP' | 'CLP' | 'ARS' | 'UYU' | 'BOB' | 'PAB'

export type BankTier = 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'tier5'

export interface Currency {
  code: CurrencyCode
  name: string
  symbol: string
  decimals: number
  isReserve: boolean // USD, EUR, GBP, etc.
}

export interface ExchangeRate {
  from: CurrencyCode
  to: CurrencyCode
  rate: number
  bid?: number // Compra
  ask?: number // Venta
  spread: number // % spread
  source: string
  timestamp: Date
  type: 'oficial' | 'paralelo' | 'blue' | 'interbancario'
}

export interface Bank {
  id: string
  name: string
  tier: BankTier
  country: CountryCode
  type: 'internacional' | 'nacional' | 'regional' | 'digital'

  // Información básica
  swift?: string
  website: string
  phone?: string

  // Servicios
  foreignExchange: boolean
  privateBanking: boolean
  corporateBanking: boolean

  // Presencia
  branches: number
  locations: Location[]

  // Comisiones
  fees: {
    exchangeCommission: { min: number; max: number } // %
    transferFee: { domestic: number; international: number } // USD
    minimumExchange?: number // USD
  }

  // Horarios
  hours: string
}

export interface Location {
  city: string
  district: string // Distrito financiero
  address: string
  coordinates?: { lat: number; lng: number }
  type: 'headquarters' | 'branch' | 'atm' | 'forex_desk'
  hours?: string
  services: string[]
}

export interface ExchangeHouse {
  id: string
  name: string
  country: CountryCode

  // Info básica
  established?: number // Año
  website?: string
  phone: string

  // Locations
  locations: Location[]

  // Servicios
  currencies: CurrencyCode[]
  cashAvailable: boolean
  delivery: boolean
  corporate: boolean

  // Comisiones
  commission: { min: number; max: number } // %
  spread: { min: number; max: number } // %
  minimumAmount: number // USD

  // Horarios
  hours: string

  // Rating
  rating?: number
  reviews?: number
}

export interface FinancialDistrict {
  country: CountryCode
  city: string
  name: string // "Av. Paulista", "Microcentro", etc
  description: string
  coordinates: { lat: number; lng: number }

  // Instituciones
  banks: number
  exchangeHouses: number
  corporateOffices: number

  // Características
  tier: 1 | 2 | 3 // 1 = Principal, 2 = Secundario, 3 = Terciario
  businessHours: string
  accessibility: string // Metro, parking, etc
}

export interface Country {
  code: CountryCode
  name: string
  flag: string
  currency: Currency

  // Sistema financiero
  centralBank: {
    name: string
    abbreviation: string
    website: string
  }

  regulator?: {
    name: string
    abbreviation: string
    website: string
  }

  // Datos económicos
  gdp?: number // En billones USD
  population?: number
  economicRank?: number // Ranking mundial

  // Control de cambios
  exchangeControl: boolean
  exchangeControlDetails?: string

  // Regulaciones
  declarationLimit: number // En USD
  taxOnExchange?: {
    name: string
    rate: number
    appliesTo: string
  }[]

  // Distritos financieros
  financialDistricts: FinancialDistrict[]
}

export interface CrossRate {
  from: CurrencyCode
  to: CurrencyCode
  rate: number
  lastUpdate: Date
}

export interface ConversionResult {
  from: {
    currency: CurrencyCode
    amount: number
  }
  to: {
    currency: CurrencyCode
    amount: number
  }
  rate: number
  commission: number // %
  spread: number // %
  totalCost: number // %
  provider: string
  providerType: 'bank' | 'exchange_house' | 'fintech' | 'crypto'
}

// Constantes
export const RESERVE_CURRENCIES: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY', 'CHF']

export const LATIN_CURRENCIES: CurrencyCode[] = ['BRL', 'VES', 'COP', 'CLP', 'ARS', 'UYU', 'BOB', 'PAB']

export const BANK_TIERS: Record<BankTier, string> = {
  tier1: 'Bancos Internacionales',
  tier2: 'Bancos Nacionales Grandes',
  tier3: 'Bancos Regionales/Locales',
  tier4: 'Fintechs/Bancos Digitales',
  tier5: 'Casas de Cambio Especializadas'
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  // Reserva internacional
  USD: { code: 'USD', name: 'Dólar Estadounidense', symbol: '$', decimals: 2, isReserve: true },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2, isReserve: true },
  GBP: { code: 'GBP', name: 'Libra Esterlina', symbol: '£', decimals: 2, isReserve: true },
  CAD: { code: 'CAD', name: 'Dólar Canadiense', symbol: 'C$', decimals: 2, isReserve: false },
  CHF: { code: 'CHF', name: 'Franco Suizo', symbol: 'CHF', decimals: 2, isReserve: true },

  // Latinoamérica
  BRL: { code: 'BRL', name: 'Real Brasileño', symbol: 'R$', decimals: 2, isReserve: false },
  VES: { code: 'VES', name: 'Bolívar', symbol: 'Bs.', decimals: 2, isReserve: false },
  COP: { code: 'COP', name: 'Peso Colombiano', symbol: '$', decimals: 0, isReserve: false },
  CLP: { code: 'CLP', name: 'Peso Chileno', symbol: '$', decimals: 0, isReserve: false },
  ARS: { code: 'ARS', name: 'Peso Argentino', symbol: '$', decimals: 2, isReserve: false },
  UYU: { code: 'UYU', name: 'Peso Uruguayo', symbol: '$', decimals: 2, isReserve: false },
  BOB: { code: 'BOB', name: 'Boliviano', symbol: 'Bs', decimals: 2, isReserve: false },
  PAB: { code: 'PAB', name: 'Balboa', symbol: 'B/.', decimals: 2, isReserve: false }
}
