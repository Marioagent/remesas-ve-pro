// Base de datos completa de instituciones financieras

import { Bank, ExchangeHouse, FinancialDistrict } from '@/types/financial-system'

// ==================== BRASIL ====================

export const BRAZIL_BANKS: Bank[] = [
  // Tier 1 - Internacionales
  {
    id: 'hsbc-br',
    name: 'HSBC Brasil',
    tier: 'tier1',
    country: 'BR',
    type: 'internacional',
    swift: 'BSCHBRSP',
    website: 'https://hsbc.com.br',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 850,
    locations: [
      {
        city: 'São Paulo',
        district: 'Av. Paulista',
        address: 'Av. Paulista, 1842',
        type: 'headquarters',
        services: ['forex', 'private_banking', 'corporate']
      }
    ],
    fees: {
      exchangeCommission: { min: 0.5, max: 2 },
      transferFee: { domestic: 15, international: 45 },
      minimumExchange: 1000
    },
    hours: 'L-V 10:00-16:00'
  },
  {
    id: 'citi-br',
    name: 'Citibank Brasil',
    tier: 'tier1',
    country: 'BR',
    type: 'internacional',
    swift: 'CITIBRSP',
    website: 'https://citibank.com.br',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 45,
    locations: [
      {
        city: 'São Paulo',
        district: 'Faria Lima',
        address: 'Av. Brigadeiro Faria Lima, 3400',
        type: 'headquarters',
        services: ['forex', 'private_banking', 'investment']
      }
    ],
    fees: {
      exchangeCommission: { min: 0.4, max: 1.8 },
      transferFee: { domestic: 20, international: 50 },
      minimumExchange: 5000
    },
    hours: 'L-V 09:00-17:00'
  },

  // Tier 2 - Nacionales Grandes
  {
    id: 'bb-br',
    name: 'Banco do Brasil',
    tier: 'tier2',
    country: 'BR',
    type: 'nacional',
    swift: 'BRASBRRJ',
    website: 'https://bb.com.br',
    phone: '+55 11 4004-0001',
    foreignExchange: true,
    privateBanking: false,
    corporateBanking: true,
    branches: 5400,
    locations: [
      {
        city: 'Brasília',
        district: 'Setor Bancário Sul',
        address: 'SBS Quadra 1, Bloco A',
        type: 'headquarters',
        services: ['forex', 'corporate', 'retail']
      },
      {
        city: 'São Paulo',
        district: 'Centro',
        address: 'Rua Álvares Penteado, 112',
        type: 'branch',
        services: ['forex', 'retail']
      }
    ],
    fees: {
      exchangeCommission: { min: 1, max: 2.5 },
      transferFee: { domestic: 10, international: 35 }
    },
    hours: 'L-V 10:00-16:00'
  },
  {
    id: 'itau-br',
    name: 'Itaú Unibanco',
    tier: 'tier2',
    country: 'BR',
    type: 'nacional',
    swift: 'ITAUBRSP',
    website: 'https://itau.com.br',
    phone: '+55 11 4004-4828',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 3200,
    locations: [
      {
        city: 'São Paulo',
        district: 'Av. Paulista',
        address: 'Av. Paulista, 1450',
        type: 'headquarters',
        services: ['forex', 'private_banking', 'corporate', 'investment']
      }
    ],
    fees: {
      exchangeCommission: { min: 0.8, max: 2.2 },
      transferFee: { domestic: 12, international: 40 },
      minimumExchange: 500
    },
    hours: 'L-V 10:00-16:00'
  },
  {
    id: 'bradesco-br',
    name: 'Bradesco',
    tier: 'tier2',
    country: 'BR',
    type: 'nacional',
    swift: 'BBDEBRSP',
    website: 'https://bradesco.com.br',
    phone: '+55 11 4004-5588',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 3000,
    locations: [
      {
        city: 'Osasco',
        district: 'Cidade de Deus',
        address: 'Cidade de Deus, s/n',
        type: 'headquarters',
        services: ['forex', 'corporate']
      }
    ],
    fees: {
      exchangeCommission: { min: 0.9, max: 2.3 },
      transferFee: { domestic: 11, international: 38 }
    },
    hours: 'L-V 10:00-16:00'
  },

  // Tier 4 - Fintechs
  {
    id: 'nubank-br',
    name: 'Nubank',
    tier: 'tier4',
    country: 'BR',
    type: 'digital',
    website: 'https://nubank.com.br',
    foreignExchange: true,
    privateBanking: false,
    corporateBanking: false,
    branches: 0,
    locations: [
      {
        city: 'São Paulo',
        district: 'Vila Olímpia',
        address: 'Digital only',
        type: 'headquarters',
        services: ['forex_digital', 'retail']
      }
    ],
    fees: {
      exchangeCommission: { min: 4, max: 5.5 }, // IOF + spread
      transferFee: { domestic: 0, international: 0 }
    },
    hours: '24/7 Digital'
  }
]

export const BRAZIL_EXCHANGE_HOUSES: ExchangeHouse[] = [
  {
    id: 'confidence-cambio',
    name: 'Confidence Câmbio',
    country: 'BR',
    established: 1994,
    website: 'https://confidencecambio.com.br',
    phone: '+55 11 3145-7788',
    locations: [
      {
        city: 'São Paulo',
        district: 'Av. Paulista',
        address: 'Av. Paulista, 1374 - Loja 1',
        type: 'branch',
        services: ['cash_exchange', 'wire_transfer', 'delivery'],
        hours: 'L-V 09:00-18:00, S 09:00-13:00'
      },
      {
        city: 'São Paulo',
        district: 'Iguatemi',
        address: 'Shopping Iguatemi - Piso 2',
        type: 'branch',
        services: ['cash_exchange'],
        hours: 'L-S 10:00-22:00, D 14:00-20:00'
      }
    ],
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'CHF', 'ARS', 'UYU', 'CLP'],
    cashAvailable: true,
    delivery: true,
    corporate: true,
    commission: { min: 0.8, max: 1.5 },
    spread: { min: 0.5, max: 1.2 },
    minimumAmount: 100,
    hours: 'L-V 09:00-18:00',
    rating: 4.7,
    reviews: 3420
  },
  {
    id: 'gold-cambio',
    name: 'Gold Câmbio',
    country: 'BR',
    website: 'https://goldcambio.com.br',
    phone: '+55 11 3062-2811',
    locations: [
      {
        city: 'São Paulo',
        district: 'Centro',
        address: 'Rua Barão de Itapetininga, 255',
        type: 'branch',
        services: ['cash_exchange', 'delivery'],
        hours: 'L-V 09:00-18:00'
      }
    ],
    currencies: ['USD', 'EUR', 'GBP', 'ARS'],
    cashAvailable: true,
    delivery: true,
    corporate: false,
    commission: { min: 1, max: 2 },
    spread: { min: 0.8, max: 1.5 },
    minimumAmount: 50,
    hours: 'L-V 09:00-18:00',
    rating: 4.5
  },
  {
    id: 'ourominas-cambio',
    name: 'Ourominas Câmbio',
    country: 'BR',
    phone: '+55 21 2547-1223',
    locations: [
      {
        city: 'Rio de Janeiro',
        district: 'Copacabana',
        address: 'Av. Nossa Senhora de Copacabana, 680',
        type: 'branch',
        services: ['cash_exchange'],
        hours: 'L-V 09:00-18:00, S 09:00-13:00'
      }
    ],
    currencies: ['USD', 'EUR', 'GBP', 'ARS', 'UYU'],
    cashAvailable: true,
    delivery: false,
    corporate: false,
    commission: { min: 1, max: 2 },
    spread: { min: 0.9, max: 1.8 },
    minimumAmount: 100,
    hours: 'L-V 09:00-18:00',
    rating: 4.4
  }
]

export const BRAZIL_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'BR',
    city: 'São Paulo',
    name: 'Avenida Paulista',
    description: 'Epicentro financiero de Brasil, concentra los principales bancos e instituciones',
    coordinates: { lat: -23.5619, lng: -46.6558 },
    banks: 45,
    exchangeHouses: 12,
    corporateOffices: 230,
    tier: 1,
    businessHours: 'L-V 09:00-18:00',
    accessibility: 'Metro Trianon-MASP, Consolação, Brigadeiro'
  },
  {
    country: 'BR',
    city: 'São Paulo',
    name: 'Faria Lima',
    description: 'Distrito de investment banking y private equity',
    coordinates: { lat: -23.5781, lng: -46.6869 },
    banks: 28,
    exchangeHouses: 6,
    corporateOffices: 180,
    tier: 1,
    businessHours: 'L-V 09:00-18:00',
    accessibility: 'Metro Faria Lima, Pinheiros'
  },
  {
    country: 'BR',
    city: 'São Paulo',
    name: 'Berrini',
    description: 'Torres corporativas, banca corporativa',
    coordinates: { lat: -23.6184, lng: -46.7002 },
    banks: 15,
    exchangeHouses: 3,
    corporateOffices: 95,
    tier: 2,
    businessHours: 'L-V 09:00-18:00',
    accessibility: 'Metro Berrini, Morumbi'
  },
  {
    country: 'BR',
    city: 'Rio de Janeiro',
    name: 'Centro',
    description: 'Centro histórico financiero',
    coordinates: { lat: -22.9035, lng: -43.1796 },
    banks: 32,
    exchangeHouses: 8,
    corporateOffices: 120,
    tier: 1,
    businessHours: 'L-V 09:00-18:00',
    accessibility: 'Metro Carioca, Uruguaiana'
  },
  {
    country: 'BR',
    city: 'Brasília',
    name: 'Setor Bancário Sul/Norte',
    description: 'Distrito bancario oficial de la capital',
    coordinates: { lat: -15.7975, lng: -47.8919 },
    banks: 24,
    exchangeHouses: 4,
    corporateOffices: 85,
    tier: 1,
    businessHours: 'L-V 10:00-16:00',
    accessibility: 'Bus 101, 102, parking disponible'
  }
]

// ==================== COLOMBIA ====================

export const COLOMBIA_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'CO',
    city: 'Bogotá',
    name: 'Zona Rosa / Chapinero',
    description: 'Centro financiero y comercial principal',
    coordinates: { lat: 4.6686, lng: -74.0537 },
    banks: 38,
    exchangeHouses: 15,
    corporateOffices: 165,
    tier: 1,
    businessHours: 'L-V 08:00-18:00',
    accessibility: 'TransMilenio Calle 85, Calle 100'
  },
  {
    country: 'CO',
    city: 'Medellín',
    name: 'El Poblado',
    description: 'Distrito financiero y empresarial',
    coordinates: { lat: 6.2088, lng: -75.5683 },
    banks: 25,
    exchangeHouses: 8,
    corporateOffices: 95,
    tier: 1,
    businessHours: 'L-V 08:00-18:00',
    accessibility: 'Metro El Poblado, Aguacatala'
  }
]

// ==================== ARGENTINA ====================

export const ARGENTINA_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'AR',
    city: 'Buenos Aires',
    name: 'Microcentro',
    description: 'Centro financiero histórico, calle Florida',
    coordinates: { lat: -34.6037, lng: -58.3816 },
    banks: 42,
    exchangeHouses: 35, // Muchas "cuevas" y arbolitos
    corporateOffices: 180,
    tier: 1,
    businessHours: 'L-V 10:00-15:00',
    accessibility: 'Subte Línea B, C, D'
  },
  {
    country: 'AR',
    city: 'Buenos Aires',
    name: 'Puerto Madero',
    description: 'Distrito moderno, corporativo',
    coordinates: { lat: -34.6118, lng: -58.3636 },
    banks: 18,
    exchangeHouses: 5,
    corporateOffices: 120,
    tier: 2,
    businessHours: 'L-V 09:00-18:00',
    accessibility: 'Subte Línea B (L.N. Alem), bus 152'
  }
]

// ==================== CHILE ====================

export const CHILE_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'CL',
    city: 'Santiago',
    name: 'Sanhattan (El Golf)',
    description: 'Distrito financiero principal, rascacielos',
    coordinates: { lat: -33.4172, lng: -70.5947 },
    banks: 32,
    exchangeHouses: 12,
    corporateOffices: 145,
    tier: 1,
    businessHours: 'L-V 09:00-18:00',
    accessibility: 'Metro El Golf, Tobalaba'
  }
]

// ==================== URUGUAY ====================

export const URUGUAY_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'UY',
    city: 'Montevideo',
    name: 'Ciudad Vieja',
    description: 'Centro bancario histórico',
    coordinates: { lat: -34.9065, lng: -56.2043 },
    banks: 28,
    exchangeHouses: 18,
    corporateOffices: 85,
    tier: 1,
    businessHours: 'L-V 13:00-17:00',
    accessibility: 'Bus 60, 64, 174'
  }
]

// ==================== PANAMÁ ====================

export const PANAMA_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'PA',
    city: 'Ciudad de Panamá',
    name: 'Área Bancaria',
    description: 'Centro financiero internacional, más de 150 bancos',
    coordinates: { lat: 8.9936, lng: -79.5197 },
    banks: 155,
    exchangeHouses: 8,
    corporateOffices: 320,
    tier: 1,
    businessHours: 'L-V 08:00-15:00',
    accessibility: 'Metro 5 de Mayo, Via España'
  },
  {
    country: 'PA',
    city: 'Ciudad de Panamá',
    name: 'Punta Pacífica',
    description: 'Torres corporativas modernas',
    coordinates: { lat: 8.9714, lng: -79.5284 },
    banks: 45,
    exchangeHouses: 3,
    corporateOffices: 180,
    tier: 1,
    businessHours: 'L-V 08:00-17:00',
    accessibility: 'Metro Punta Pacífica'
  }
]

// Aggregated data
export const ALL_FINANCIAL_DISTRICTS = [
  ...BRAZIL_FINANCIAL_DISTRICTS,
  ...COLOMBIA_FINANCIAL_DISTRICTS,
  ...ARGENTINA_FINANCIAL_DISTRICTS,
  ...CHILE_FINANCIAL_DISTRICTS,
  ...URUGUAY_FINANCIAL_DISTRICTS,
  ...PANAMA_FINANCIAL_DISTRICTS
]

export const ALL_BANKS = [
  ...BRAZIL_BANKS
]

export const ALL_EXCHANGE_HOUSES = [
  ...BRAZIL_EXCHANGE_HOUSES
]

// Helper functions
export function getBanksByCountry(countryCode: string) {
  return ALL_BANKS.filter(b => b.country === countryCode)
}

export function getExchangeHousesByCountry(countryCode: string) {
  return ALL_EXCHANGE_HOUSES.filter(e => e.country === countryCode)
}

export function getFinancialDistrictsByCountry(countryCode: string) {
  return ALL_FINANCIAL_DISTRICTS.filter(d => d.country === countryCode)
}

export function getBanksByTier(tier: string) {
  return ALL_BANKS.filter(b => b.tier === tier)
}
