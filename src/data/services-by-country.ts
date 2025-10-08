// Base de datos completa de servicios de remesas por país
import { RemittanceService, CasaDeCambio, Bank, Fintech } from '@/types/countries'

// ============= COLOMBIA =============

export const COLOMBIA_REMITTANCE_SERVICES: RemittanceService[] = [
  {
    id: 'efecty-co',
    name: 'Efecty',
    logo: '/logos/efecty.svg',
    countries: ['CO'],
    coverage: [
      {
        country: 'CO',
        points: 4000,
        cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga']
      }
    ],
    fees: { min: 3, max: 5, currency: 'USD' },
    deliveryTime: { min: 10, max: 30, unit: 'minutos' },
    paymentMethods: ['tarjeta_debito', 'tarjeta_credito', 'cuenta_bancaria'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.5,
    reviews: 12500,
    website: 'https://efecty.com.co'
  },
  {
    id: 'giro-directo-co',
    name: 'Giro Directo',
    countries: ['CO'],
    coverage: [{ country: 'CO', points: 2500, cities: ['Bogotá', 'Medellín', 'Cali'] }],
    fees: { min: 2, max: 4, currency: 'USD' },
    deliveryTime: { min: 15, max: 45, unit: 'minutos' },
    paymentMethods: ['cuenta_bancaria', 'tarjeta_debito'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.3,
    reviews: 8900,
    website: 'https://girodirecto.com'
  },
  {
    id: 'supergiros-co',
    name: 'SuperGiros',
    countries: ['CO'],
    coverage: [{ country: 'CO', points: 5000, cities: ['Todas las principales'] }],
    fees: { min: 3, max: 6, currency: 'USD' },
    deliveryTime: { min: 10, max: 20, unit: 'minutos' },
    paymentMethods: ['cuenta_bancaria', 'efectivo'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.6,
    reviews: 15000,
    website: 'https://supergiros.com.co'
  }
]

export const COLOMBIA_CASAS_CAMBIO: CasaDeCambio[] = [
  {
    id: 'cambios-mundial-co',
    name: 'Cambios Mundial',
    country: 'CO',
    type: 'hibrida',
    locations: [
      { city: 'Bogotá', address: 'Carrera 7 #32-41', hours: 'L-V 8am-6pm, S 9am-2pm' },
      { city: 'Medellín', address: 'Calle 53 #45-28' },
      { city: 'Cali', address: 'Av. 6 #23-45' }
    ],
    commission: { min: 1.5, max: 2.5, type: '%' },
    website: 'https://cambiosmundial.com',
    verified: true
  },
  {
    id: 'coinka-co',
    name: 'Coinka',
    country: 'CO',
    type: 'digital',
    locations: [{ city: 'Bogotá', address: 'Plataforma online' }],
    commission: { min: 0.5, max: 1, type: '%' },
    website: 'https://coinka.com',
    rating: 4.7,
    verified: true
  }
]

export const COLOMBIA_BANKS: Bank[] = [
  {
    id: 'bancolombia',
    name: 'Bancolombia',
    country: 'CO',
    type: 'comercial',
    swift: 'COLOCOBM',
    website: 'https://bancolombia.com',
    internationalTransfers: true,
    fees: { incoming: 15, outgoing: 25, currency: 'USD' },
    processingTime: { min: 1, max: 2, unit: 'días' }
  },
  {
    id: 'banco-bogota',
    name: 'Banco de Bogotá',
    country: 'CO',
    type: 'comercial',
    swift: 'BBOGCOBB',
    website: 'https://bancodebogota.com',
    internationalTransfers: true,
    fees: { incoming: 20, outgoing: 30, currency: 'USD' },
    processingTime: { min: 1, max: 3, unit: 'días' }
  }
]

export const COLOMBIA_FINTECHS: Fintech[] = [
  {
    id: 'nequi-co',
    name: 'Nequi',
    country: 'CO',
    type: 'wallet',
    services: ['remesas', 'pagos'],
    fees: { min: 0, max: 0, type: '%' },
    website: 'https://nequi.com.co',
    app: {
      ios: 'https://apps.apple.com/app/nequi',
      android: 'https://play.google.com/store/apps/details?id=com.nequi'
    },
    rating: 4.6,
    users: 15000000
  },
  {
    id: 'daviplata-co',
    name: 'Daviplata',
    country: 'CO',
    type: 'wallet',
    services: ['remesas', 'pagos'],
    fees: { min: 2, max: 3, type: '%' },
    website: 'https://daviplata.com',
    app: {
      android: 'https://play.google.com/store/apps/details?id=com.daviplata'
    },
    rating: 4.4,
    users: 12000000
  }
]

// ============= CHILE =============

export const CHILE_REMITTANCE_SERVICES: RemittanceService[] = [
  {
    id: 'sigue-cl',
    name: 'Sigue',
    countries: ['CL'],
    coverage: [{ country: 'CL', points: 500, cities: ['Santiago', 'Valparaíso', 'Concepción'] }],
    fees: { min: 5, max: 10, currency: 'USD' },
    deliveryTime: { min: 10, max: 30, unit: 'minutos' },
    paymentMethods: ['tarjeta_debito', 'cuenta_bancaria'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.4,
    reviews: 5600,
    website: 'https://sigue.cl'
  },
  {
    id: 'ria-cl',
    name: 'Ria Chile',
    countries: ['CL'],
    coverage: [{ country: 'CL', points: 300, cities: ['Santiago', 'Valparaíso'] }],
    fees: { min: 3, max: 8, currency: 'USD' },
    deliveryTime: { min: 15, max: 60, unit: 'minutos' },
    paymentMethods: ['tarjeta_debito', 'cuenta_bancaria'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.2,
    reviews: 4200,
    website: 'https://ria.com/cl'
  }
]

export const CHILE_CASAS_CAMBIO: CasaDeCambio[] = [
  {
    id: 'afex-cl',
    name: 'Afex',
    country: 'CL',
    type: 'hibrida',
    locations: [
      { city: 'Santiago', address: 'Av. Apoquindo 4501' },
      { city: 'Viña del Mar', address: 'Av. Libertad 1348' }
    ],
    commission: { min: 1, max: 2, type: '%' },
    website: 'https://afex.cl',
    verified: true
  },
  {
    id: 'melt-cl',
    name: 'Melt',
    country: 'CL',
    type: 'digital',
    locations: [{ city: 'Santiago', address: 'Plataforma 100% online' }],
    commission: { min: 0.5, max: 1.5, type: '%' },
    website: 'https://melt.cl',
    rating: 4.8,
    verified: true
  }
]

export const CHILE_FINTECHS: Fintech[] = [
  {
    id: 'tenpo-cl',
    name: 'Tenpo',
    country: 'CL',
    type: 'wallet',
    services: ['remesas', 'pagos'],
    fees: { min: 0, max: 2, type: '%' },
    website: 'https://tenpo.cl',
    app: {
      ios: 'https://apps.apple.com/app/tenpo',
      android: 'https://play.google.com/store/apps/details?id=cl.tenpo'
    },
    rating: 4.5,
    users: 2000000
  },
  {
    id: 'mach-cl',
    name: 'MACH',
    country: 'CL',
    type: 'neobank',
    services: ['remesas', 'pagos', 'inversiones'],
    fees: { min: 5, max: 15, type: '%' },
    website: 'https://somosmach.com',
    rating: 4.6,
    users: 3000000
  }
]

// ============= ARGENTINA =============

export const ARGENTINA_REMITTANCE_SERVICES: RemittanceService[] = [
  {
    id: 'western-union-ar',
    name: 'Western Union Argentina',
    countries: ['AR'],
    coverage: [{ country: 'AR', points: 1200, cities: ['Buenos Aires', 'Córdoba', 'Rosario'] }],
    fees: { min: 5, max: 15, currency: 'USD' },
    deliveryTime: { min: 10, max: 60, unit: 'minutos' },
    paymentMethods: ['tarjeta_debito', 'cuenta_bancaria'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.0,
    reviews: 8900,
    website: 'https://westernunion.com.ar'
  },
  {
    id: 'remitly-ar',
    name: 'Remitly Argentina',
    countries: ['AR'],
    coverage: [{ country: 'AR', points: 0, cities: ['Todo el país (digital)'] }],
    fees: { min: 0, max: 5, currency: 'USD' },
    deliveryTime: { min: 1, max: 3, unit: 'días' },
    paymentMethods: ['tarjeta_debito', 'cuenta_bancaria'],
    deliveryMethods: ['cuenta_bancaria'],
    rating: 4.3,
    reviews: 3200,
    website: 'https://remitly.com/es-ar'
  }
]

export const ARGENTINA_CRYPTO_SERVICES: Fintech[] = [
  {
    id: 'binance-p2p-ar',
    name: 'Binance P2P',
    country: 'AR',
    type: 'crypto',
    services: ['cambio', 'crypto'],
    fees: { min: 0, max: 0.5, type: '%' },
    website: 'https://binance.com/es-LA/p2p',
    rating: 4.7,
    users: 5000000
  },
  {
    id: 'ripio-ar',
    name: 'Ripio',
    country: 'AR',
    type: 'crypto',
    services: ['cambio', 'crypto', 'inversiones'],
    fees: { min: 1, max: 2, type: '%' },
    website: 'https://ripio.com',
    app: {
      ios: 'https://apps.apple.com/app/ripio',
      android: 'https://play.google.com/store/apps/details?id=com.ripio'
    },
    rating: 4.4,
    users: 1500000
  },
  {
    id: 'lemoncash-ar',
    name: 'Lemon Cash',
    country: 'AR',
    type: 'crypto',
    services: ['cambio', 'crypto', 'pagos'],
    fees: { min: 1.5, max: 2.5, type: '%' },
    website: 'https://lemon.me',
    rating: 4.5,
    users: 2000000
  },
  {
    id: 'buenbit-ar',
    name: 'Buenbit',
    country: 'AR',
    type: 'crypto',
    services: ['cambio', 'crypto'],
    fees: { min: 1, max: 2, type: '%' },
    website: 'https://buenbit.com',
    rating: 4.3,
    users: 800000
  }
]

// ============= URUGUAY =============

export const URUGUAY_REMITTANCE_SERVICES: RemittanceService[] = [
  {
    id: 'western-union-uy',
    name: 'Western Union Uruguay',
    countries: ['UY'],
    coverage: [{ country: 'UY', points: 150, cities: ['Montevideo', 'Punta del Este', 'Colonia'] }],
    fees: { min: 5, max: 12, currency: 'USD' },
    deliveryTime: { min: 10, max: 30, unit: 'minutos' },
    paymentMethods: ['tarjeta_debito', 'cuenta_bancaria'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.3,
    reviews: 2100,
    website: 'https://westernunion.com.uy'
  },
  {
    id: 'ria-uy',
    name: 'Ria Uruguay',
    countries: ['UY'],
    coverage: [{ country: 'UY', points: 80, cities: ['Montevideo', 'Canelones'] }],
    fees: { min: 3, max: 8, currency: 'USD' },
    deliveryTime: { min: 15, max: 60, unit: 'minutos' },
    paymentMethods: ['cuenta_bancaria'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.1,
    reviews: 1500,
    website: 'https://ria.com/uy'
  }
]

export const URUGUAY_CASAS_CAMBIO: CasaDeCambio[] = [
  {
    id: 'gales-uy',
    name: 'Gales Casa de Cambio',
    country: 'UY',
    type: 'fisica',
    locations: [
      { city: 'Montevideo', address: '18 de Julio 950' },
      { city: 'Punta del Este', address: 'Gorlero esq. 25' }
    ],
    commission: { min: 0.5, max: 1.5, type: '%' },
    website: 'https://gales.com.uy',
    verified: true
  },
  {
    id: 'cambio-nelson-uy',
    name: 'Cambio Nelson',
    country: 'UY',
    type: 'fisica',
    locations: [{ city: 'Montevideo', address: 'Plaza Independencia' }],
    commission: { min: 1, max: 2, type: '%' },
    website: 'https://cambionelson.com',
    verified: true
  }
]

export const URUGUAY_FINTECHS: Fintech[] = [
  {
    id: 'prex-uy',
    name: 'Prex',
    country: 'UY',
    type: 'wallet',
    services: ['cambio', 'pagos', 'remesas'],
    fees: { min: 2, max: 3, type: '%' },
    website: 'https://prex.com.uy',
    app: {
      ios: 'https://apps.apple.com/app/prex',
      android: 'https://play.google.com/store/apps/details?id=uy.prex'
    },
    rating: 4.6,
    users: 1200000
  }
]

// ============= BOLIVIA =============

export const BOLIVIA_REMITTANCE_SERVICES: RemittanceService[] = [
  {
    id: 'vigo-bo',
    name: 'Vigo (Western Union)',
    countries: ['BO'],
    coverage: [{ country: 'BO', points: 200, cities: ['La Paz', 'Santa Cruz', 'Cochabamba'] }],
    fees: { min: 5, max: 15, currency: 'USD' },
    deliveryTime: { min: 10, max: 30, unit: 'minutos' },
    paymentMethods: ['cuenta_bancaria', 'tarjeta_debito'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.2,
    reviews: 1800,
    website: 'https://vigo.com'
  },
  {
    id: 'bcp-remesas-bo',
    name: 'BCP Remesas',
    countries: ['BO'],
    coverage: [{ country: 'BO', points: 150, cities: ['La Paz', 'Santa Cruz', 'Cochabamba'] }],
    fees: { min: 10, max: 20, currency: 'USD' },
    deliveryTime: { min: 1, max: 2, unit: 'días' },
    paymentMethods: ['cuenta_bancaria'],
    deliveryMethods: ['cuenta_bancaria', 'efectivo'],
    rating: 4.0,
    reviews: 950,
    website: 'https://bcp.com.bo'
  }
]

export const BOLIVIA_FINTECHS: Fintech[] = [
  {
    id: 'tigo-money-bo',
    name: 'Tigo Money',
    country: 'BO',
    type: 'wallet',
    services: ['remesas', 'pagos'],
    fees: { min: 2, max: 5, type: '%' },
    website: 'https://tigomoney.bo',
    rating: 4.1,
    users: 2000000
  }
]

// ============= PANAMÁ =============

export const PANAMA_REMITTANCE_SERVICES: RemittanceService[] = [
  {
    id: 'nacion-servicios-pa',
    name: 'Nación Servicios',
    countries: ['PA'],
    coverage: [{ country: 'PA', points: 250, cities: ['Ciudad de Panamá', 'Colón', 'David'] }],
    fees: { min: 3, max: 8, currency: 'USD' },
    deliveryTime: { min: 10, max: 30, unit: 'minutos' },
    paymentMethods: ['cuenta_bancaria', 'efectivo'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.5,
    reviews: 3400,
    website: 'https://nacionservicios.com'
  },
  {
    id: 'western-union-pa',
    name: 'Western Union Panamá',
    countries: ['PA'],
    coverage: [{ country: 'PA', points: 300, cities: ['Todo Panamá'] }],
    fees: { min: 5, max: 15, currency: 'USD' },
    deliveryTime: { min: 10, max: 20, unit: 'minutos' },
    paymentMethods: ['tarjeta_debito', 'cuenta_bancaria', 'efectivo'],
    deliveryMethods: ['efectivo', 'cuenta_bancaria'],
    rating: 4.3,
    reviews: 5600,
    website: 'https://westernunion.com.pa'
  }
]

export const PANAMA_FINTECHS: Fintech[] = [
  {
    id: 'yappy-pa',
    name: 'Yappy',
    country: 'PA',
    type: 'wallet',
    services: ['pagos', 'remesas'],
    fees: { min: 0, max: 0, type: '%' },
    website: 'https://yappy.com.pa',
    app: {
      ios: 'https://apps.apple.com/app/yappy',
      android: 'https://play.google.com/store/apps/details?id=com.bgeneral.yappy'
    },
    rating: 4.8,
    users: 1500000
  },
  {
    id: 'nequi-panama',
    name: 'Nequi Panamá',
    country: 'PA',
    type: 'wallet',
    services: ['pagos', 'remesas'],
    fees: { min: 0, max: 1, type: '%' },
    website: 'https://nequi.com.pa',
    rating: 4.6,
    users: 500000
  },
  {
    id: 'zinli-pa',
    name: 'Zinli',
    country: 'PA',
    type: 'wallet',
    services: ['cambio', 'remesas', 'pagos'],
    fees: { min: 1.5, max: 3, type: '%' },
    website: 'https://zinli.com',
    rating: 4.4,
    users: 800000
  }
]

// ============= AGGREGATED DATA =============

export const ALL_REMITTANCE_SERVICES = [
  ...COLOMBIA_REMITTANCE_SERVICES,
  ...CHILE_REMITTANCE_SERVICES,
  ...ARGENTINA_REMITTANCE_SERVICES,
  ...URUGUAY_REMITTANCE_SERVICES,
  ...BOLIVIA_REMITTANCE_SERVICES,
  ...PANAMA_REMITTANCE_SERVICES
]

export const ALL_CASAS_CAMBIO = [
  ...COLOMBIA_CASAS_CAMBIO,
  ...CHILE_CASAS_CAMBIO,
  ...URUGUAY_CASAS_CAMBIO
]

export const ALL_FINTECHS = [
  ...COLOMBIA_FINTECHS,
  ...CHILE_FINTECHS,
  ...ARGENTINA_CRYPTO_SERVICES,
  ...URUGUAY_FINTECHS,
  ...BOLIVIA_FINTECHS,
  ...PANAMA_FINTECHS
]

export const ALL_BANKS = [
  ...COLOMBIA_BANKS
]

// Helper functions
export function getServicesByCountry(countryCode: string) {
  return ALL_REMITTANCE_SERVICES.filter(s => s.countries.includes(countryCode as any))
}

export function getFintechsByCountry(countryCode: string) {
  return ALL_FINTECHS.filter(f => f.country === countryCode)
}

export function getCasasCambioByCountry(countryCode: string) {
  return ALL_CASAS_CAMBIO.filter(c => c.country === countryCode)
}
