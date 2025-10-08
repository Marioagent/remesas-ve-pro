// Types para sistema multi-país de Reme Global
// ALCANCE: Sudamérica + USA (13 países)

export type CountryCode =
  // Sudamérica
  | 'VE' | 'CO' | 'CL' | 'AR' | 'UY' | 'BO' | 'BR' | 'EC' | 'GY' | 'PY' | 'PE' | 'SR'
  // Centro/Norte América
  | 'PA' | 'US'

export type CurrencyCode =
  // Sudamérica
  | 'VES' | 'COP' | 'CLP' | 'ARS' | 'UYU' | 'BOB' | 'BRL' | 'USD' | 'GYD' | 'PYG' | 'PEN' | 'SRD'
  // Centro/Norte América
  | 'PAB'

export interface Currency {
  code: CurrencyCode
  name: string
  symbol: string
  decimals: number
}

export interface ExchangeRate {
  from: CurrencyCode
  to: CurrencyCode
  rate: number
  source: string
  timestamp: Date
  type?: 'oficial' | 'blue' | 'paralelo' | 'mep' | 'ccl' | 'crypto'
}

export interface CasaDeCambio {
  id: string
  name: string
  country: CountryCode
  type: 'fisica' | 'digital' | 'hibrida'
  locations: Location[]
  commission: {
    min: number
    max: number
    type: '%' | 'fixed'
  }
  hours?: string
  website?: string
  phone?: string
  rating?: number
  verified: boolean
}

export interface Location {
  city: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  hours?: string
}

export interface RemittanceService {
  id: string
  name: string
  logo?: string
  countries: CountryCode[]
  coverage: {
    country: CountryCode
    points: number
    cities: string[]
  }[]
  fees: {
    min: number
    max: number
    currency: 'USD'
  }
  deliveryTime: {
    min: number
    max: number
    unit: 'minutos' | 'horas' | 'días'
  }
  paymentMethods: PaymentMethod[]
  deliveryMethods: DeliveryMethod[]
  rating: number
  reviews: number
  website: string
}

export type PaymentMethod =
  | 'tarjeta_debito'
  | 'tarjeta_credito'
  | 'cuenta_bancaria'
  | 'efectivo'
  | 'crypto'
  | 'wallet_digital'

export type DeliveryMethod =
  | 'cuenta_bancaria'
  | 'efectivo'
  | 'wallet_digital'
  | 'domicilio'

export interface Bank {
  id: string
  name: string
  country: CountryCode
  type: 'comercial' | 'estatal' | 'digital' | 'internacional'
  swift?: string
  website: string
  internationalTransfers: boolean
  fees?: {
    incoming: number
    outgoing: number
    currency: 'USD'
  }
  processingTime: {
    min: number
    max: number
    unit: 'días'
  }
}

export interface Fintech {
  id: string
  name: string
  country: CountryCode
  type: 'wallet' | 'exchange' | 'neobank' | 'crypto'
  services: ('remesas' | 'cambio' | 'pagos' | 'inversiones' | 'crypto')[]
  fees: {
    min: number
    max: number
    type: '%'
  }
  website: string
  app: {
    ios?: string
    android?: string
  }
  rating: number
  users?: number
}

export interface Country {
  code: CountryCode
  name: string
  flag: string
  currency: Currency
  alternativeCurrencies?: Currency[] // Para países dolarizados o con múltiples monedas
  centralBank: {
    name: string
    website: string
    abbreviation: string
  }
  regulator?: {
    name: string
    website: string
    abbreviation: string
  }
  exchangeControl: boolean
  exchangeControlDetails?: string
  popularServices: string[] // IDs de servicios más usados

  // Información financiera
  financialInfo: {
    averageExchangeRate?: number // USD to local currency
    inflationRate?: number
    remittanceVolumeUSD?: number // Annual
    mainRemittanceOrigins?: string[] // Countries
  }

  // Regulaciones
  regulations: {
    maxCashWithoutDeclaration: number // in USD
    antiMoneyLaunderingAgency: string
    taxes?: {
      name: string
      rate: number
      appliesTo: string
    }[]
  }

  // APIs disponibles
  apis?: {
    exchangeRates?: string[]
    officialData?: string[]
  }
}

export interface ComparisonResult {
  service: RemittanceService
  amount: {
    send: number
    receive: number
    currency: CurrencyCode
  }
  exchangeRate: number
  fees: number
  totalCost: number
  deliveryTime: string
  savings: number // vs average
  bestFor?: ('velocidad' | 'costo' | 'confiabilidad')[]
}

// Datos de países
export const COUNTRIES: Record<CountryCode, Country> = {
  VE: {
    code: 'VE',
    name: 'Venezuela',
    flag: '🇻🇪',
    currency: {
      code: 'VES',
      name: 'Bolívar',
      symbol: 'Bs.',
      decimals: 2
    },
    alternativeCurrencies: [
      {
        code: 'USD',
        name: 'Dólar estadounidense',
        symbol: '$',
        decimals: 2
      }
    ],
    centralBank: {
      name: 'Banco Central de Venezuela',
      website: 'https://bcv.org.ve',
      abbreviation: 'BCV'
    },
    exchangeControl: false,
    popularServices: ['zoom', 'reserve', 'airtm', 'binance-p2p'],
    financialInfo: {
      averageExchangeRate: 36.5,
      remittanceVolumeUSD: 4000000000,
      mainRemittanceOrigins: ['USA', 'España', 'Colombia', 'Chile']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'SUDEBAN'
    },
    apis: {
      exchangeRates: [
        'https://pydolarve.org/api/v1/dollar',
        'https://s3.amazonaws.com/dolartoday/data.json'
      ]
    }
  },

  CO: {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    currency: {
      code: 'COP',
      name: 'Peso Colombiano',
      symbol: '$',
      decimals: 0
    },
    centralBank: {
      name: 'Banco de la República de Colombia',
      website: 'https://banrep.gov.co',
      abbreviation: 'BRC'
    },
    regulator: {
      name: 'Superintendencia Financiera de Colombia',
      website: 'https://superfinanciera.gov.co',
      abbreviation: 'SFC'
    },
    exchangeControl: false,
    popularServices: ['efecty', 'giro-directo', 'supergiros', 'western-union'],
    financialInfo: {
      averageExchangeRate: 4200,
      inflationRate: 5.8,
      remittanceVolumeUSD: 10000000000,
      mainRemittanceOrigins: ['USA', 'España', 'Chile', 'Ecuador']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'UIAF',
      taxes: [
        {
          name: '4x1000',
          rate: 0.4,
          appliesTo: 'Transacciones bancarias'
        }
      ]
    },
    apis: {
      exchangeRates: [
        'https://www.datos.gov.co/resource/32sa-8pi3.json',
        'https://trm-colombia.makeitreal.camp/api/v1/trm'
      ]
    }
  },

  CL: {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    currency: {
      code: 'CLP',
      name: 'Peso Chileno',
      symbol: '$',
      decimals: 0
    },
    centralBank: {
      name: 'Banco Central de Chile',
      website: 'https://bcentral.cl',
      abbreviation: 'BCCh'
    },
    regulator: {
      name: 'Comisión para el Mercado Financiero',
      website: 'https://cmfchile.cl',
      abbreviation: 'CMF'
    },
    exchangeControl: false,
    popularServices: ['sigue', 'ria', 'afex', 'melt'],
    financialInfo: {
      averageExchangeRate: 920,
      inflationRate: 4.5,
      remittanceVolumeUSD: 1500000000,
      mainRemittanceOrigins: ['USA', 'España', 'Argentina', 'Perú']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'UAF'
    },
    apis: {
      exchangeRates: [
        'https://mindicador.cl/api',
        'https://api.sbif.cl/api-sbifv3/recursos_api/dolar'
      ]
    }
  },

  AR: {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    currency: {
      code: 'ARS',
      name: 'Peso Argentino',
      symbol: '$',
      decimals: 2
    },
    centralBank: {
      name: 'Banco Central de la República Argentina',
      website: 'https://bcra.gob.ar',
      abbreviation: 'BCRA'
    },
    exchangeControl: true,
    exchangeControlDetails: 'Cepo cambiario: límite USD 200/mes. Impuesto PAIS 30% + Percepción 45%.',
    popularServices: ['binance-p2p', 'western-union', 'ripio', 'lemoncash'],
    financialInfo: {
      averageExchangeRate: 900, // Blue
      inflationRate: 140,
      remittanceVolumeUSD: 800000000,
      mainRemittanceOrigins: ['España', 'Italia', 'USA', 'Chile']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'UIF',
      taxes: [
        {
          name: 'Impuesto PAIS',
          rate: 30,
          appliesTo: 'Compra de dólares y consumos en moneda extranjera'
        },
        {
          name: 'Percepción RG 4815',
          rate: 45,
          appliesTo: 'Compra de dólares (reintegrable vía AFIP)'
        }
      ]
    },
    apis: {
      exchangeRates: [
        'https://dolarapi.com/v1/dolares',
        'https://api.bluelytics.com.ar/v2/latest'
      ]
    }
  },

  UY: {
    code: 'UY',
    name: 'Uruguay',
    flag: '🇺🇾',
    currency: {
      code: 'UYU',
      name: 'Peso Uruguayo',
      symbol: '$',
      decimals: 2
    },
    alternativeCurrencies: [
      {
        code: 'USD',
        name: 'Dólar estadounidense',
        symbol: 'U$S',
        decimals: 2
      }
    ],
    centralBank: {
      name: 'Banco Central del Uruguay',
      website: 'https://bcu.gub.uy',
      abbreviation: 'BCU'
    },
    exchangeControl: false,
    exchangeControlDetails: 'Sistema dolarizado. USD aceptado ampliamente.',
    popularServices: ['western-union', 'prex', 'abitab', 'redpagos'],
    financialInfo: {
      averageExchangeRate: 40,
      inflationRate: 5.2,
      remittanceVolumeUSD: 150000000,
      mainRemittanceOrigins: ['España', 'Argentina', 'USA', 'Italia']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'SENACLAFT',
      taxes: [
        {
          name: 'IVA',
          rate: 22,
          appliesTo: 'Bienes y servicios (no aplica a cambio de divisas)'
        }
      ]
    },
    apis: {
      exchangeRates: [
        'https://cotizaciones.bcu.gub.uy/wscotizaciones/servlet/awsbcucotizaciones'
      ]
    }
  },

  BO: {
    code: 'BO',
    name: 'Bolivia',
    flag: '🇧🇴',
    currency: {
      code: 'BOB',
      name: 'Boliviano',
      symbol: 'Bs',
      decimals: 2
    },
    centralBank: {
      name: 'Banco Central de Bolivia',
      website: 'https://bcb.gob.bo',
      abbreviation: 'BCB'
    },
    exchangeControl: true,
    exchangeControlDetails: 'Tipo de cambio fijo: 6.90 BOB/USD desde 2011. Control estricto del BCB.',
    popularServices: ['vigo', 'bcp-remesas', 'prodem'],
    financialInfo: {
      averageExchangeRate: 6.90,
      inflationRate: 2.5,
      remittanceVolumeUSD: 1300000000,
      mainRemittanceOrigins: ['España', 'Argentina', 'USA', 'Chile']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'UIF-BOL'
    },
    apis: {
      exchangeRates: [],
      officialData: ['https://bcb.gob.bo']
    }
  },

  PA: {
    code: 'PA',
    name: 'Panamá',
    flag: '🇵🇦',
    currency: {
      code: 'USD',
      name: 'Dólar estadounidense',
      symbol: '$',
      decimals: 2
    },
    alternativeCurrencies: [
      {
        code: 'PAB',
        name: 'Balboa',
        symbol: 'B/.',
        decimals: 2
      }
    ],
    centralBank: {
      name: 'No tiene Banco Central (usa USD)',
      website: '',
      abbreviation: 'N/A'
    },
    regulator: {
      name: 'Superintendencia de Bancos de Panamá',
      website: 'https://superbancos.gob.pa',
      abbreviation: 'SBP'
    },
    exchangeControl: false,
    exchangeControlDetails: 'Centro financiero internacional. Total libertad cambiaria (usa USD).',
    popularServices: ['yappy', 'nacion-servicios', 'western-union', 'nequi-panama'],
    financialInfo: {
      remittanceVolumeUSD: 500000000,
      mainRemittanceOrigins: ['USA', 'Venezuela', 'Colombia', 'España']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'UAF'
    },
    apis: {
      exchangeRates: [],
      officialData: ['https://superbancos.gob.pa']
    }
  },

  BR: {
    code: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    currency: {
      code: 'BRL',
      name: 'Real brasileño',
      symbol: 'R$',
      decimals: 2
    },
    centralBank: {
      name: 'Banco Central do Brasil',
      website: 'https://bcb.gov.br',
      abbreviation: 'BCB'
    },
    regulator: {
      name: 'Banco Central do Brasil',
      website: 'https://bcb.gov.br',
      abbreviation: 'BCB'
    },
    exchangeControl: false,
    popularServices: ['western-union', 'remitly', 'wise', 'xoom'],
    financialInfo: {
      averageExchangeRate: 5.0,
      inflationRate: 4.5,
      remittanceVolumeUSD: 3500000000,
      mainRemittanceOrigins: ['USA', 'Portugal', 'Japón', 'España']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'COAF'
    },
    apis: {
      exchangeRates: ['https://economia.awesomeapi.com.br/json/last/USD-BRL']
    }
  },

  EC: {
    code: 'EC',
    name: 'Ecuador',
    flag: '🇪🇨',
    currency: {
      code: 'USD',
      name: 'Dólar estadounidense',
      symbol: '$',
      decimals: 2
    },
    centralBank: {
      name: 'Banco Central del Ecuador',
      website: 'https://bce.fin.ec',
      abbreviation: 'BCE'
    },
    exchangeControl: false,
    exchangeControlDetails: 'Economía dolarizada desde 2000.',
    popularServices: ['western-union', 'moneygram', 'vigo', 'delgado-travel'],
    financialInfo: {
      remittanceVolumeUSD: 3400000000,
      mainRemittanceOrigins: ['USA', 'España', 'Italia', 'Chile']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'UAFE'
    },
    apis: {
      exchangeRates: [],
      officialData: ['https://bce.fin.ec']
    }
  },

  PE: {
    code: 'PE',
    name: 'Perú',
    flag: '🇵🇪',
    currency: {
      code: 'PEN',
      name: 'Sol peruano',
      symbol: 'S/',
      decimals: 2
    },
    centralBank: {
      name: 'Banco Central de Reserva del Perú',
      website: 'https://bcrp.gob.pe',
      abbreviation: 'BCRP'
    },
    regulator: {
      name: 'Superintendencia de Banca, Seguros y AFP',
      website: 'https://sbs.gob.pe',
      abbreviation: 'SBS'
    },
    exchangeControl: false,
    popularServices: ['western-union', 'moneygram', 'ria', 'remesur'],
    financialInfo: {
      averageExchangeRate: 3.75,
      inflationRate: 3.5,
      remittanceVolumeUSD: 3600000000,
      mainRemittanceOrigins: ['USA', 'España', 'Chile', 'Argentina']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'UIF-PERÚ'
    },
    apis: {
      exchangeRates: ['https://api.apis.net.pe/v1/tipo-cambio-sunat']
    }
  },

  PY: {
    code: 'PY',
    name: 'Paraguay',
    flag: '🇵🇾',
    currency: {
      code: 'PYG',
      name: 'Guaraní',
      symbol: '₲',
      decimals: 0
    },
    centralBank: {
      name: 'Banco Central del Paraguay',
      website: 'https://bcp.gov.py',
      abbreviation: 'BCP'
    },
    exchangeControl: false,
    popularServices: ['western-union', 'moneygram', 'ria'],
    financialInfo: {
      averageExchangeRate: 7200,
      inflationRate: 4.8,
      remittanceVolumeUSD: 700000000,
      mainRemittanceOrigins: ['España', 'Argentina', 'USA', 'Brasil']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'SEPRELAD'
    },
    apis: {
      exchangeRates: ['https://bcp.gov.py']
    }
  },

  GY: {
    code: 'GY',
    name: 'Guyana',
    flag: '🇬🇾',
    currency: {
      code: 'GYD',
      name: 'Dólar guyanés',
      symbol: 'GY$',
      decimals: 2
    },
    centralBank: {
      name: 'Bank of Guyana',
      website: 'https://bankofguyana.org.gy',
      abbreviation: 'BoG'
    },
    exchangeControl: false,
    popularServices: ['western-union', 'moneygram', 'ria'],
    financialInfo: {
      averageExchangeRate: 210,
      remittanceVolumeUSD: 350000000,
      mainRemittanceOrigins: ['USA', 'Canada', 'UK', 'Trinidad']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'FIU Guyana'
    },
    apis: {
      exchangeRates: ['https://bankofguyana.org.gy']
    }
  },

  SR: {
    code: 'SR',
    name: 'Surinam',
    flag: '🇸🇷',
    currency: {
      code: 'SRD',
      name: 'Dólar surinamés',
      symbol: 'SR$',
      decimals: 2
    },
    centralBank: {
      name: 'Centrale Bank van Suriname',
      website: 'https://cbvs.sr',
      abbreviation: 'CBvS'
    },
    exchangeControl: false,
    popularServices: ['western-union', 'moneygram'],
    financialInfo: {
      averageExchangeRate: 30,
      remittanceVolumeUSD: 150000000,
      mainRemittanceOrigins: ['Netherlands', 'USA', 'French Guiana']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'MOT Suriname'
    },
    apis: {
      exchangeRates: ['https://cbvs.sr']
    }
  },

  US: {
    code: 'US',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    currency: {
      code: 'USD',
      name: 'Dólar estadounidense',
      symbol: '$',
      decimals: 2
    },
    centralBank: {
      name: 'Federal Reserve System',
      website: 'https://federalreserve.gov',
      abbreviation: 'Fed'
    },
    regulator: {
      name: 'Federal Reserve & OCC',
      website: 'https://occ.gov',
      abbreviation: 'OCC'
    },
    exchangeControl: false,
    popularServices: ['wise', 'remitly', 'xoom', 'western-union', 'moneygram'],
    financialInfo: {
      remittanceVolumeUSD: 68000000000,
      mainRemittanceOrigins: ['México', 'China', 'India', 'Philippines']
    },
    regulations: {
      maxCashWithoutDeclaration: 10000,
      antiMoneyLaunderingAgency: 'FinCEN'
    },
    apis: {
      exchangeRates: [],
      officialData: ['https://federalreserve.gov']
    }
  }
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  // Sudamérica
  VES: { code: 'VES', name: 'Bolívar', symbol: 'Bs.', decimals: 2 },
  COP: { code: 'COP', name: 'Peso Colombiano', symbol: '$', decimals: 0 },
  CLP: { code: 'CLP', name: 'Peso Chileno', symbol: '$', decimals: 0 },
  ARS: { code: 'ARS', name: 'Peso Argentino', symbol: '$', decimals: 2 },
  UYU: { code: 'UYU', name: 'Peso Uruguayo', symbol: '$', decimals: 2 },
  BOB: { code: 'BOB', name: 'Boliviano', symbol: 'Bs', decimals: 2 },
  BRL: { code: 'BRL', name: 'Real brasileño', symbol: 'R$', decimals: 2 },
  PEN: { code: 'PEN', name: 'Sol peruano', symbol: 'S/', decimals: 2 },
  PYG: { code: 'PYG', name: 'Guaraní', symbol: '₲', decimals: 0 },
  GYD: { code: 'GYD', name: 'Dólar guyanés', symbol: 'GY$', decimals: 2 },
  SRD: { code: 'SRD', name: 'Dólar surinamés', symbol: 'SR$', decimals: 2 },
  // Centro/Norte América
  USD: { code: 'USD', name: 'Dólar estadounidense', symbol: '$', decimals: 2 },
  PAB: { code: 'PAB', name: 'Balboa', symbol: 'B/.', decimals: 2 }
}
