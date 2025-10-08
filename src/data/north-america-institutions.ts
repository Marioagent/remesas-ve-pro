/**
 * NORTH AMERICA FINANCIAL INSTITUTIONS DATABASE
 * Estados Unidos, Canadá, México
 * Sistema Financiero Completo
 */

import { Bank, ExchangeHouse, FinancialDistrict } from '@/types/financial-system'

// ==========================================
// 🇺🇸 UNITED STATES OF AMERICA
// ==========================================

export const USA_BANKS: Bank[] = [
  {
    id: 'jpm-us',
    name: 'JPMorgan Chase',
    tier: 'tier1',
    country: 'US',
    type: 'internacional',
    swift: 'CHASUS33',
    website: 'https://www.jpmorganchase.com',
    phone: '+1 212-270-6000',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 4700,
    locations: [
      {
        city: 'New York',
        district: 'Wall Street',
        address: '383 Madison Avenue, NY 10179',
        coordinates: { lat: 40.7580, lng: -73.9855 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment', 'private_banking'],
        hours: 'L-V 09:00-17:00'
      },
      {
        city: 'San Francisco',
        district: 'Financial District',
        address: '560 Mission Street, CA 94105',
        type: 'branch',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:00-17:00'
      },
      {
        city: 'Chicago',
        district: 'The Loop',
        address: '10 S Dearborn Street, IL 60603',
        type: 'branch',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:00-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 0.5, max: 2 },
      transferFee: { domestic: 25, international: 45 }
    },
    hours: 'L-V 09:00-17:00'
  },
  {
    id: 'bofa-us',
    name: 'Bank of America',
    tier: 'tier1',
    country: 'US',
    type: 'internacional',
    swift: 'BOFAUS3N',
    website: 'https://www.bankofamerica.com',
    phone: '+1 704-386-5681',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 3900,
    locations: [
      {
        city: 'Charlotte',
        district: 'Uptown',
        address: '100 N Tryon Street, NC 28255',
        coordinates: { lat: 35.2271, lng: -80.8431 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment', 'retail'],
        hours: 'L-V 09:00-17:00'
      },
      {
        city: 'New York',
        district: 'Manhattan',
        address: 'One Bryant Park, NY 10036',
        type: 'branch',
        services: ['forex', 'corporate', 'investment'],
        hours: 'L-V 09:00-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 0.75, max: 2.5 },
      transferFee: { domestic: 30, international: 45 }
    },
    hours: 'L-V 09:00-18:00, S 09:00-13:00'
  },
  {
    id: 'wells-us',
    name: 'Wells Fargo',
    tier: 'tier1',
    country: 'US',
    type: 'nacional',
    swift: 'WFBIUS6S',
    website: 'https://www.wellsfargo.com',
    phone: '+1 866-249-3302',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 4600,
    locations: [
      {
        city: 'San Francisco',
        district: 'Financial District',
        address: '420 Montgomery Street, CA 94104',
        coordinates: { lat: 37.7937, lng: -122.4027 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:00-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1, max: 3 },
      transferFee: { domestic: 25, international: 40 }
    },
    hours: 'L-V 09:00-18:00, S 09:00-14:00'
  },
  {
    id: 'citi-us',
    name: 'Citibank',
    tier: 'tier1',
    country: 'US',
    type: 'internacional',
    swift: 'CITIUS33',
    website: 'https://www.citigroup.com',
    phone: '+1 212-559-1000',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 2300,
    locations: [
      {
        city: 'New York',
        district: 'Tribeca',
        address: '388 Greenwich Street, NY 10013',
        coordinates: { lat: 40.7195, lng: -74.0089 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment', 'private_banking'],
        hours: 'L-V 09:00-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 0.5, max: 2 },
      transferFee: { domestic: 25, international: 45 }
    },
    hours: 'L-V 09:00-17:00'
  },
  {
    id: 'gs-us',
    name: 'Goldman Sachs',
    tier: 'tier1',
    country: 'US',
    type: 'internacional',
    swift: 'GSCMUS33',
    website: 'https://www.goldmansachs.com',
    phone: '+1 212-902-1000',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 47,
    locations: [
      {
        city: 'New York',
        district: 'Lower Manhattan',
        address: '200 West Street, NY 10282',
        coordinates: { lat: 40.7149, lng: -74.0153 },
        type: 'headquarters',
        services: ['investment', 'corporate', 'private_banking'],
        hours: 'L-V 09:00-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 0.3, max: 1.5 },
      transferFee: { domestic: 50, international: 75 }
    },
    hours: 'L-V 09:00-17:00'
  }
]

export const USA_EXCHANGE_HOUSES: ExchangeHouse[] = [
  {
    id: 'travelex-us',
    name: 'Travelex',
    country: 'US',
    established: 1976,
    phone: '+1 877-414-6359',
    website: 'https://www.travelex.com',
    locations: [
      {
        city: 'New York',
        district: 'Times Square',
        address: '1568 Broadway, NY 10036',
        coordinates: { lat: 40.7580, lng: -73.9855 },
        type: 'branch',
        services: ['cash_exchange', 'wire_transfer', 'delivery'],
        hours: 'L-D 09:00-21:00'
      },
      {
        city: 'Los Angeles',
        district: 'Downtown',
        address: '800 W 6th Street, CA 90017',
        type: 'branch',
        services: ['cash_exchange', 'delivery'],
        hours: 'L-V 09:00-18:00, S 10:00-16:00'
      }
    ],
    currencies: ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'MXN', 'BRL'],
    commission: { min: 1, max: 3 },
    spread: { min: 2, max: 5 },
    hours: 'Varía por ubicación',
    rating: 4.2
  },
  {
    id: 'currencyfair-us',
    name: 'CurrencyFair',
    country: 'US',
    established: 2009,
    phone: '+1 646-844-8933',
    website: 'https://www.currencyfair.com',
    locations: [
      {
        city: 'New York',
        district: 'Financial District',
        address: 'Online Platform',
        type: 'headquarters',
        services: ['wire_transfer', 'online_exchange'],
        hours: '24/7 Online'
      }
    ],
    currencies: ['EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'CHF', 'ZAR', 'HKD', 'SGD'],
    commission: { min: 0.3, max: 0.6 },
    spread: { min: 0.2, max: 0.8 },
    hours: '24/7 Online',
    rating: 4.6
  },
  {
    id: 'xe-us',
    name: 'XE Money Transfer',
    country: 'US',
    established: 1993,
    phone: '+1 888-998-9648',
    website: 'https://www.xe.com',
    locations: [
      {
        city: 'Nationwide',
        district: 'Online',
        address: 'Online Platform',
        type: 'headquarters',
        services: ['wire_transfer', 'online_exchange'],
        hours: '24/7 Online'
      }
    ],
    currencies: ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN'],
    commission: { min: 0, max: 0 },
    spread: { min: 0.5, max: 2 },
    hours: '24/7 Online',
    rating: 4.8
  }
]

export const USA_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'US',
    city: 'New York',
    name: 'Wall Street',
    description: 'Epicentro financiero mundial',
    coordinates: { lat: 40.7074, lng: -74.0113 },
    banks: 120,
    exchangeHouses: 35,
    corporateOffices: 850,
    tier: 1,
    businessHours: 'L-V 09:00-17:00',
    accessibility: 'Metro: Wall St (4,5), Rector St (1), Broad St (J,Z)',
    majorInstitutions: ['NYSE', 'Federal Reserve NY', 'JPMorgan', 'Goldman Sachs']
  },
  {
    country: 'US',
    city: 'San Francisco',
    name: 'Financial District',
    description: 'Centro financiero Costa Oeste',
    coordinates: { lat: 37.7946, lng: -122.3999 },
    banks: 65,
    exchangeHouses: 18,
    corporateOffices: 420,
    tier: 1,
    businessHours: 'L-V 09:00-17:00',
    accessibility: 'BART: Montgomery St, Embarcadero',
    majorInstitutions: ['Wells Fargo', 'Charles Schwab', 'Federal Reserve SF']
  },
  {
    country: 'US',
    city: 'Chicago',
    name: 'The Loop',
    description: 'Centro financiero del Midwest',
    coordinates: { lat: 41.8819, lng: -87.6278 },
    banks: 48,
    exchangeHouses: 12,
    corporateOffices: 320,
    tier: 2,
    businessHours: 'L-V 09:00-17:00',
    accessibility: 'CTA: LaSalle, Monroe, Adams',
    majorInstitutions: ['CME Group', 'Federal Reserve Chicago', 'Northern Trust']
  },
  {
    country: 'US',
    city: 'Charlotte',
    name: 'Uptown Financial District',
    description: 'Segundo centro bancario de USA',
    coordinates: { lat: 35.2271, lng: -80.8431 },
    banks: 42,
    exchangeHouses: 8,
    corporateOffices: 180,
    tier: 2,
    businessHours: 'L-V 09:00-17:00',
    accessibility: 'LYNX Light Rail: CTC/Arena',
    majorInstitutions: ['Bank of America', 'Truist Financial']
  }
]

// ==========================================
// 🇨🇦 CANADA
// ==========================================

export const CANADA_BANKS: Bank[] = [
  {
    id: 'rbc-ca',
    name: 'Royal Bank of Canada (RBC)',
    tier: 'tier1',
    country: 'CA',
    type: 'nacional',
    swift: 'ROYCCAT2',
    website: 'https://www.rbc.com',
    phone: '+1 416-974-5151',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 1209,
    locations: [
      {
        city: 'Toronto',
        district: 'Financial District',
        address: '200 Bay Street, ON M5J 2J5',
        coordinates: { lat: 43.6481, lng: -79.3802 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment', 'private_banking'],
        hours: 'L-V 09:30-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1, max: 2.5 },
      transferFee: { domestic: 15, international: 30 }
    },
    hours: 'L-V 09:30-17:00, S 10:00-15:00'
  },
  {
    id: 'td-ca',
    name: 'Toronto-Dominion Bank (TD)',
    tier: 'tier1',
    country: 'CA',
    type: 'internacional',
    swift: 'TDOMCATTTOR',
    website: 'https://www.td.com',
    phone: '+1 416-308-6963',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 1162,
    locations: [
      {
        city: 'Toronto',
        district: 'Financial District',
        address: '66 Wellington Street W, ON M5K 1A2',
        coordinates: { lat: 43.6479, lng: -79.3815 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:00-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1.5, max: 3 },
      transferFee: { domestic: 15, international: 30 }
    },
    hours: 'L-V 09:00-18:00, S 09:00-16:00'
  },
  {
    id: 'scotiabank-ca',
    name: 'Scotiabank',
    tier: 'tier1',
    country: 'CA',
    type: 'internacional',
    swift: 'NOSCCATT',
    website: 'https://www.scotiabank.com',
    phone: '+1 416-866-6161',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 954,
    locations: [
      {
        city: 'Toronto',
        district: 'Financial District',
        address: '44 King Street W, ON M5H 1H1',
        coordinates: { lat: 43.6489, lng: -79.3817 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment'],
        hours: 'L-V 09:30-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1, max: 2.5 },
      transferFee: { domestic: 15, international: 35 }
    },
    hours: 'L-V 09:30-17:00'
  },
  {
    id: 'bmo-ca',
    name: 'Bank of Montreal (BMO)',
    tier: 'tier2',
    country: 'CA',
    type: 'nacional',
    swift: 'BOFMCAM2',
    website: 'https://www.bmo.com',
    phone: '+1 416-867-6785',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 877,
    locations: [
      {
        city: 'Toronto',
        district: 'Financial District',
        address: '100 King Street W, ON M5X 1A1',
        coordinates: { lat: 43.6488, lng: -79.3824 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:30-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1.5, max: 3 },
      transferFee: { domestic: 20, international: 35 }
    },
    hours: 'L-V 09:30-18:00, S 10:00-16:00'
  },
  {
    id: 'cibc-ca',
    name: 'CIBC (Canadian Imperial Bank of Commerce)',
    tier: 'tier2',
    country: 'CA',
    type: 'nacional',
    swift: 'CIBCCATT',
    website: 'https://www.cibc.com',
    phone: '+1 416-980-2211',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 1027,
    locations: [
      {
        city: 'Toronto',
        district: 'Financial District',
        address: 'Commerce Court, 199 Bay Street, ON M5L 1A2',
        coordinates: { lat: 43.6475, lng: -79.3799 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:30-17:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1.5, max: 3.5 },
      transferFee: { domestic: 18, international: 32 }
    },
    hours: 'L-V 09:30-17:00'
  }
]

export const CANADA_EXCHANGE_HOUSES: ExchangeHouse[] = [
  {
    id: 'calforex-ca',
    name: 'Calforex Currency Exchange',
    country: 'CA',
    established: 1983,
    phone: '+1 604-685-0007',
    website: 'https://www.calforex.com',
    locations: [
      {
        city: 'Vancouver',
        district: 'Downtown',
        address: '815 Hornby Street, BC V6Z 2E6',
        coordinates: { lat: 49.2827, lng: -123.1207 },
        type: 'branch',
        services: ['cash_exchange', 'wire_transfer', 'delivery'],
        hours: 'L-V 09:00-17:30, S 10:00-17:00'
      },
      {
        city: 'Toronto',
        district: 'Financial District',
        address: '110 Yonge Street, ON M5C 1T4',
        type: 'branch',
        services: ['cash_exchange', 'wire_transfer'],
        hours: 'L-V 09:00-18:00, S 10:00-16:00'
      }
    ],
    currencies: ['USD', 'EUR', 'GBP', 'AUD', 'JPY', 'CHF', 'MXN', 'CNY'],
    commission: { min: 0.5, max: 2 },
    spread: { min: 1, max: 3 },
    hours: 'Varía por ubicación',
    rating: 4.5
  },
  {
    id: 'knightsbridge-ca',
    name: 'Knightsbridge Foreign Exchange',
    country: 'CA',
    established: 1999,
    phone: '+1 888-972-7799',
    website: 'https://www.knightsbridge fx.com',
    locations: [
      {
        city: 'Toronto',
        district: 'Online',
        address: 'Online Platform',
        type: 'headquarters',
        services: ['wire_transfer', 'online_exchange'],
        hours: '24/7 Online'
      }
    ],
    currencies: ['USD', 'EUR', 'GBP', 'AUD', 'NZD', 'CHF', 'JPY', 'MXN'],
    commission: { min: 0, max: 0 },
    spread: { min: 0.5, max: 1.5 },
    hours: '24/7 Online',
    rating: 4.8
  }
]

export const CANADA_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'CA',
    city: 'Toronto',
    name: 'Financial District',
    description: 'Centro financiero de Canadá',
    coordinates: { lat: 43.6481, lng: -79.3802 },
    banks: 78,
    exchangeHouses: 22,
    corporateOffices: 420,
    tier: 1,
    businessHours: 'L-V 09:30-17:00',
    accessibility: 'TTC: King, Queen, Union Station',
    majorInstitutions: ['TSX', 'RBC', 'TD', 'Scotiabank', 'BMO', 'CIBC']
  },
  {
    country: 'CA',
    city: 'Vancouver',
    name: 'Downtown Financial Core',
    description: 'Centro financiero Costa Oeste',
    coordinates: { lat: 49.2827, lng: -123.1207 },
    banks: 32,
    exchangeHouses: 14,
    corporateOffices: 180,
    tier: 2,
    businessHours: 'L-V 09:00-17:00',
    accessibility: 'SkyTrain: Waterfront, Burrard, Granville',
    majorInstitutions: ['HSBC Canada HQ', 'Central 1 Credit Union']
  }
]

// ==========================================
// 🇲🇽 MEXICO
// ==========================================

export const MEXICO_BANKS: Bank[] = [
  {
    id: 'bbva-mx',
    name: 'BBVA México',
    tier: 'tier2',
    country: 'MX',
    type: 'internacional',
    swift: 'BCMRMXMM',
    website: 'https://www.bbva.mx',
    phone: '+52 55-5226-2663',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 1832,
    locations: [
      {
        city: 'Ciudad de México',
        district: 'Polanco',
        address: 'Paseo de la Reforma 510, CDMX 06600',
        coordinates: { lat: 19.4326, lng: -99.1332 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment', 'retail'],
        hours: 'L-V 09:00-16:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1, max: 3 },
      transferFee: { domestic: 25, international: 50 }
    },
    hours: 'L-V 09:00-16:00, S 09:00-14:00'
  },
  {
    id: 'santander-mx',
    name: 'Santander México',
    tier: 'tier2',
    country: 'MX',
    type: 'internacional',
    swift: 'BMSXMXMM',
    website: 'https://www.santander.com.mx',
    phone: '+52 55-5169-3300',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 1400,
    locations: [
      {
        city: 'Ciudad de México',
        district: 'Santa Fe',
        address: 'Prolongación Paseo de la Reforma 500, CDMX 01219',
        coordinates: { lat: 19.3597, lng: -99.2625 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:00-16:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1.5, max: 3.5 },
      transferFee: { domestic: 30, international: 55 }
    },
    hours: 'L-V 09:00-16:00'
  },
  {
    id: 'banamex-mx',
    name: 'Citibanamex',
    tier: 'tier2',
    country: 'MX',
    type: 'internacional',
    swift: 'BNMXMXMM',
    website: 'https://www.banamex.com',
    phone: '+52 55-1226-2000',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 1340,
    locations: [
      {
        city: 'Ciudad de México',
        district: 'Centro Histórico',
        address: 'Av. Universidad 1200, CDMX 03339',
        coordinates: { lat: 19.4326, lng: -99.1332 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment', 'retail'],
        hours: 'L-V 09:00-16:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1, max: 3 },
      transferFee: { domestic: 25, international: 50 }
    },
    hours: 'L-V 09:00-16:00'
  },
  {
    id: 'banorte-mx',
    name: 'Banorte',
    tier: 'tier3',
    country: 'MX',
    type: 'nacional',
    swift: 'MENOMXMT',
    website: 'https://www.banorte.com',
    phone: '+52 55-4433-8080',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 1287,
    locations: [
      {
        city: 'Ciudad de México',
        district: 'Polanco',
        address: 'Prolongación Paseo de la Reforma 1230, CDMX 05100',
        coordinates: { lat: 19.4326, lng: -99.1900 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'retail'],
        hours: 'L-V 09:00-16:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 1.5, max: 4 },
      transferFee: { domestic: 30, international: 60 }
    },
    hours: 'L-V 09:00-16:00'
  },
  {
    id: 'hsbc-mx',
    name: 'HSBC México',
    tier: 'tier2',
    country: 'MX',
    type: 'internacional',
    swift: 'BIMEMXMM',
    website: 'https://www.hsbc.com.mx',
    phone: '+52 55-5721-2222',
    foreignExchange: true,
    privateBanking: true,
    corporateBanking: true,
    branches: 851,
    locations: [
      {
        city: 'Ciudad de México',
        district: 'Santa Fe',
        address: 'Paseo de la Reforma 347, CDMX 06500',
        coordinates: { lat: 19.4268, lng: -99.1679 },
        type: 'headquarters',
        services: ['forex', 'corporate', 'investment', 'private_banking'],
        hours: 'L-V 09:00-16:00'
      }
    ],
    fees: {
      exchangeCommission: { min: 0.8, max: 2.5 },
      transferFee: { domestic: 20, international: 45 }
    },
    hours: 'L-V 09:00-16:00'
  }
]

export const MEXICO_EXCHANGE_HOUSES: ExchangeHouse[] = [
  {
    id: 'intercam-mx',
    name: 'Intercam Casa de Cambio',
    country: 'MX',
    established: 1982,
    phone: '+52 55-5482-9200',
    website: 'https://www.intercam.com.mx',
    locations: [
      {
        city: 'Ciudad de México',
        district: 'Polanco',
        address: 'Paseo de la Reforma 383, CDMX 06500',
        coordinates: { lat: 19.4326, lng: -99.1745 },
        type: 'branch',
        services: ['cash_exchange', 'wire_transfer', 'delivery'],
        hours: 'L-V 09:00-18:00, S 09:00-14:00'
      }
    ],
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'CHF', 'JPY', 'BRL', 'ARS'],
    commission: { min: 0.5, max: 2 },
    spread: { min: 1, max: 3 },
    hours: 'L-V 09:00-18:00, S 09:00-14:00',
    rating: 4.4
  },
  {
    id: 'casa-libertad-mx',
    name: 'Casa de Cambio Libertad',
    country: 'MX',
    established: 1995,
    phone: '+52 55-5207-4040',
    website: 'https://www.casalibertad.com',
    locations: [
      {
        city: 'Ciudad de México',
        district: 'Centro',
        address: 'Paseo de la Reforma 105, CDMX 06030',
        type: 'branch',
        services: ['cash_exchange', 'delivery'],
        hours: 'L-V 09:00-17:00, S 10:00-14:00'
      }
    ],
    currencies: ['USD', 'EUR', 'CAD', 'GBP'],
    commission: { min: 1, max: 2.5 },
    spread: { min: 1.5, max: 4 },
    hours: 'L-V 09:00-17:00, S 10:00-14:00',
    rating: 4.1
  }
]

export const MEXICO_FINANCIAL_DISTRICTS: FinancialDistrict[] = [
  {
    country: 'MX',
    city: 'Ciudad de México',
    name: 'Polanco',
    description: 'Zona financiera premium de México',
    coordinates: { lat: 19.4326, lng: -99.1900 },
    banks: 52,
    exchangeHouses: 18,
    corporateOffices: 320,
    tier: 1,
    businessHours: 'L-V 09:00-16:00',
    accessibility: 'Metro: Polanco, Auditorio (Línea 7)',
    majorInstitutions: ['BBVA México', 'Banorte', 'BMV (Bolsa Mexicana)']
  },
  {
    country: 'MX',
    city: 'Ciudad de México',
    name: 'Santa Fe',
    description: 'Moderno distrito corporativo y financiero',
    coordinates: { lat: 19.3597, lng: -99.2625 },
    banks: 38,
    exchangeHouses: 12,
    corporateOffices: 420,
    tier: 1,
    businessHours: 'L-V 09:00-18:00',
    accessibility: 'Metrobús: Santa Fe, Vasco de Quiroga',
    majorInstitutions: ['Santander México', 'HSBC México', 'Google México']
  },
  {
    country: 'MX',
    city: 'Ciudad de México',
    name: 'Paseo de la Reforma',
    description: 'Histórico corredor financiero',
    coordinates: { lat: 19.4268, lng: -99.1679 },
    banks: 45,
    exchangeHouses: 15,
    corporateOffices: 280,
    tier: 1,
    businessHours: 'L-V 09:00-16:00',
    accessibility: 'Metro: Insurgentes, Sevilla, Chapultepec',
    majorInstitutions: ['Citibanamex', 'Torre Mayor']
  },
  {
    country: 'MX',
    city: 'Monterrey',
    name: 'San Pedro Garza García',
    description: 'Centro financiero del Norte',
    coordinates: { lat: 25.6506, lng: -100.3608 },
    banks: 28,
    exchangeHouses: 8,
    corporateOffices: 180,
    tier: 2,
    businessHours: 'L-V 09:00-16:00',
    accessibility: 'Metrorrey: Hospital, Del Golfo',
    majorInstitutions: ['Banorte', 'Alfa', 'FEMSA']
  }
]

// ==========================================
// EXPORTAR TODO AMÉRICA DEL NORTE
// ==========================================

export const NORTH_AMERICA_BANKS = [
  ...USA_BANKS,
  ...CANADA_BANKS,
  ...MEXICO_BANKS
]

export const NORTH_AMERICA_EXCHANGE_HOUSES = [
  ...USA_EXCHANGE_HOUSES,
  ...CANADA_EXCHANGE_HOUSES,
  ...MEXICO_EXCHANGE_HOUSES
]

export const NORTH_AMERICA_FINANCIAL_DISTRICTS = [
  ...USA_FINANCIAL_DISTRICTS,
  ...CANADA_FINANCIAL_DISTRICTS,
  ...MEXICO_FINANCIAL_DISTRICTS
]
