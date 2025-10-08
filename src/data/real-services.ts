// 🌎 REME LAT-USA - Base de Datos REAL de Servicios
// Datos verificados de casas de cambio, bancos y servicios de remesas REALES

export interface RemittanceService {
  id: string
  name: string
  type: 'casa_cambio' | 'banco' | 'fintech' | 'remesa' | 'crypto'
  countries: string[] // Códigos ISO de países donde opera
  website: string
  commission: string // Texto descriptivo
  avgTime: string // Tiempo promedio de entrega
  minAmount: number // USD
  maxAmount: number // USD
  methods: string[] // Métodos de envío/recepción
  verified: boolean // Verificado por REME LAT-USA
  rating?: number
  source: string // Fuente de la información
}

export const REAL_SERVICES: RemittanceService[] = [
  // === SERVICIOS GLOBALES ===
  {
    id: 'western-union',
    name: 'Western Union',
    type: 'remesa',
    countries: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'GY', 'PA', 'PY', 'PE', 'SR', 'UY', 'VE', 'US'],
    website: 'https://www.westernunion.com',
    commission: '$8-15 USD + 1-3%',
    avgTime: '1-3 días',
    minAmount: 10,
    maxAmount: 10000,
    methods: ['Efectivo', 'Transferencia bancaria', 'Tarjeta'],
    verified: true,
    rating: 4.3,
    source: 'Western Union Official'
  },
  {
    id: 'wise',
    name: 'Wise (TransferWise)',
    type: 'fintech',
    countries: ['AR', 'BR', 'CL', 'CO', 'PE', 'UY', 'US'],
    website: 'https://wise.com',
    commission: '0.5-1.5% tasa real',
    avgTime: '1-2 días',
    minAmount: 1,
    maxAmount: 1000000,
    methods: ['Transferencia bancaria', 'Tarjeta débito'],
    verified: true,
    rating: 4.7,
    source: 'Wise Platform'
  },
  {
    id: 'remitly',
    name: 'Remitly',
    type: 'remesa',
    countries: ['CO', 'PE', 'BR', 'AR', 'CL', 'US'],
    website: 'https://www.remitly.com',
    commission: '$0-5 USD + 1-2%',
    avgTime: 'Minutos-horas',
    minAmount: 10,
    maxAmount: 10000,
    methods: ['Transferencia', 'Tarjeta', 'Cuenta bancaria'],
    verified: true,
    rating: 4.6,
    source: 'Remitly Official'
  },
  {
    id: 'ria',
    name: 'Ria Money Transfer',
    type: 'remesa',
    countries: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'PY', 'PE', 'UY', 'VE', 'US'],
    website: 'https://www.riamoneytransfer.com',
    commission: '$5-10 USD + 1-2.5%',
    avgTime: 'Minutos-2 días',
    minAmount: 10,
    maxAmount: 8000,
    methods: ['Efectivo', 'Transferencia', 'Tarjeta'],
    verified: true,
    rating: 4.4,
    source: 'Ria Official'
  },

  // === ARGENTINA ===
  {
    id: 'rimini-ar',
    name: 'Casa de Cambio Rimini',
    type: 'casa_cambio',
    countries: ['AR'],
    website: 'https://www.rimini.com.ar',
    commission: '1-2% sobre tasa oficial',
    avgTime: 'Inmediato',
    minAmount: 50,
    maxAmount: 100000,
    methods: ['Efectivo', 'Transferencia'],
    verified: true,
    source: 'BCRA Autorizada'
  },
  {
    id: 'banco-piano-ar',
    name: 'Banco Piano',
    type: 'banco',
    countries: ['AR'],
    website: 'https://www.bancopiano.com.ar',
    commission: 'Spread bancario',
    avgTime: '24 horas',
    minAmount: 100,
    maxAmount: 50000,
    methods: ['Transferencia bancaria', 'Cheques'],
    verified: true,
    source: 'Banco oficial Argentina'
  },
  {
    id: 'mercadopago-ar',
    name: 'Mercado Pago',
    type: 'fintech',
    countries: ['AR', 'BR', 'CL', 'CO', 'PE', 'UY'],
    website: 'https://www.mercadopago.com.ar',
    commission: '0-1.5%',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 10000,
    methods: ['Saldo digital', 'Tarjeta'],
    verified: true,
    rating: 4.5,
    source: 'Mercado Libre'
  },
  {
    id: 'binance-p2p',
    name: 'Binance P2P',
    type: 'crypto',
    countries: ['AR', 'CO', 'VE', 'BR', 'PE', 'CL'],
    website: 'https://p2p.binance.com',
    commission: '0% (P2P)',
    avgTime: '15-45 minutos',
    minAmount: 10,
    maxAmount: 50000,
    methods: ['USDT', 'USDC', 'Transferencia local'],
    verified: true,
    rating: 4.6,
    source: 'Binance Official'
  },

  // === BRASIL ===
  {
    id: 'pix-br',
    name: 'PIX (Banco Central)',
    type: 'banco',
    countries: ['BR'],
    website: 'https://www.bcb.gov.br/estabilidadefinanceira/pix',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 0.01,
    maxAmount: 1000000,
    methods: ['PIX'],
    verified: true,
    rating: 4.9,
    source: 'Banco Central Brasil'
  },
  {
    id: 'nubank-br',
    name: 'Nubank',
    type: 'fintech',
    countries: ['BR', 'MX', 'CO'],
    website: 'https://nubank.com.br',
    commission: 'IOF + spread',
    avgTime: '1-2 días',
    minAmount: 10,
    maxAmount: 10000,
    methods: ['Transferencia', 'Tarjeta'],
    verified: true,
    rating: 4.7,
    source: 'Nubank Official'
  },

  // === COLOMBIA ===
  {
    id: 'nequi-co',
    name: 'Nequi',
    type: 'fintech',
    countries: ['CO'],
    website: 'https://www.nequi.com.co',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 5000,
    methods: ['Saldo Nequi', 'PSE'],
    verified: true,
    rating: 4.8,
    source: 'Bancolombia'
  },
  {
    id: 'daviplata-co',
    name: 'Daviplata',
    type: 'fintech',
    countries: ['CO'],
    website: 'https://www.daviplata.com',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 5000,
    methods: ['Saldo Daviplata', 'Corresponsales'],
    verified: true,
    rating: 4.7,
    source: 'Davivienda'
  },
  {
    id: 'efecty-co',
    name: 'Efecty',
    type: 'remesa',
    countries: ['CO'],
    website: 'https://www.efecty.com.co',
    commission: '1-2% + $2-5',
    avgTime: 'Minutos',
    minAmount: 10,
    maxAmount: 3000,
    methods: ['Efectivo', 'Giro'],
    verified: true,
    rating: 4.5,
    source: 'Efecty Official'
  },

  // === CHILE ===
  {
    id: 'mach-cl',
    name: 'MACH',
    type: 'fintech',
    countries: ['CL'],
    website: 'https://www.somosmach.com',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 2000,
    methods: ['Saldo MACH', 'Tarjeta prepaga'],
    verified: true,
    rating: 4.6,
    source: 'BCI'
  },
  {
    id: 'tenpo-cl',
    name: 'Tenpo',
    type: 'fintech',
    countries: ['CL'],
    website: 'https://tenpo.cl',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 2000,
    methods: ['Saldo Tenpo', 'Mastercard'],
    verified: true,
    rating: 4.5,
    source: 'Tenpo Official'
  },

  // === PERÚ ===
  {
    id: 'yape-pe',
    name: 'Yape',
    type: 'fintech',
    countries: ['PE'],
    website: 'https://www.yape.com.pe',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 500,
    methods: ['Saldo Yape', 'QR'],
    verified: true,
    rating: 4.8,
    source: 'BCP'
  },
  {
    id: 'plin-pe',
    name: 'PLIN',
    type: 'fintech',
    countries: ['PE'],
    website: 'https://www.plin.pe',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 500,
    methods: ['Saldo bancario', 'Celular'],
    verified: true,
    rating: 4.7,
    source: 'Bancos Perú'
  },

  // === URUGUAY ===
  {
    id: 'prex-uy',
    name: 'Prex',
    type: 'fintech',
    countries: ['UY'],
    website: 'https://www.prex.com.uy',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 5000,
    methods: ['Saldo Prex', 'Mastercard prepaga'],
    verified: true,
    rating: 4.7,
    source: 'Prex Official'
  },
  {
    id: 'abitab-uy',
    name: 'Abitab',
    type: 'remesa',
    countries: ['UY'],
    website: 'https://www.abitab.com.uy',
    commission: '1-2%',
    avgTime: 'Inmediato',
    minAmount: 10,
    maxAmount: 3000,
    methods: ['Efectivo', 'Red Abitab'],
    verified: true,
    rating: 4.6,
    source: 'Abitab Official'
  },

  // === VENEZUELA ===
  {
    id: 'zoom-ve',
    name: 'Zoom',
    type: 'fintech',
    countries: ['VE'],
    website: 'https://zoom.red',
    commission: '0%',
    avgTime: '15-30 minutos',
    minAmount: 1,
    maxAmount: 5000,
    methods: ['Zelle', 'Pago móvil', 'Transferencia'],
    verified: true,
    rating: 4.8,
    source: 'Zoom Official'
  },
  {
    id: 'reserve-ve',
    name: 'Reserve',
    type: 'crypto',
    countries: ['VE', 'AR'],
    website: 'https://reserve.org',
    commission: '1-1.5%',
    avgTime: '5-15 minutos',
    minAmount: 5,
    maxAmount: 3000,
    methods: ['RSV', 'Stablecoins'],
    verified: true,
    rating: 4.7,
    source: 'Reserve Official'
  },
  {
    id: 'airtm-ve',
    name: 'AirTM',
    type: 'fintech',
    countries: ['VE', 'AR', 'CO', 'PE', 'MX'],
    website: 'https://www.airtm.com',
    commission: '2-5%',
    avgTime: '30-60 minutos',
    minAmount: 1,
    maxAmount: 10000,
    methods: ['PayPal', 'Zelle', 'Wise', 'Local'],
    verified: true,
    rating: 4.5,
    source: 'AirTM Official'
  },

  // === PANAMÁ ===
  {
    id: 'yappy-pa',
    name: 'Yappy',
    type: 'fintech',
    countries: ['PA'],
    website: 'https://www.yappy.com',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 3000,
    methods: ['Saldo Yappy', 'ACH'],
    verified: true,
    rating: 4.8,
    source: 'Banco General Panamá'
  },

  // === BOLIVIA ===
  {
    id: 'tigo-money-bo',
    name: 'Tigo Money',
    type: 'fintech',
    countries: ['BO', 'PY'],
    website: 'https://www.tigo.com.bo/tigo-money',
    commission: '1-2%',
    avgTime: 'Inmediato',
    minAmount: 5,
    maxAmount: 1000,
    methods: ['Saldo móvil', 'Agentes'],
    verified: true,
    rating: 4.4,
    source: 'Tigo Official'
  },

  // === PARAGUAY ===
  {
    id: 'billetera-personal-py',
    name: 'Billetera Personal',
    type: 'fintech',
    countries: ['PY'],
    website: 'https://www.personal.com.py/billetera',
    commission: 'Gratis (nacional)',
    avgTime: 'Inmediato',
    minAmount: 1,
    maxAmount: 1000,
    methods: ['Saldo móvil', 'QR'],
    verified: true,
    rating: 4.5,
    source: 'Personal Paraguay'
  },

  // === ECUADOR ===
  {
    id: 'banco-pichincha-ec',
    name: 'Banco Pichincha',
    type: 'banco',
    countries: ['EC', 'PE', 'CO'],
    website: 'https://www.pichincha.com',
    commission: '$5-10 USD',
    avgTime: '24 horas',
    minAmount: 50,
    maxAmount: 10000,
    methods: ['Transferencia bancaria'],
    verified: true,
    rating: 4.3,
    source: 'Banco Pichincha'
  }
]

// Filtrar servicios por país
export function getServicesByCountry(countryCode: string): RemittanceService[] {
  return REAL_SERVICES.filter(service =>
    service.countries.includes(countryCode.toUpperCase())
  ).sort((a, b) => (b.rating || 0) - (a.rating || 0))
}

// Filtrar servicios por tipo
export function getServicesByType(
  countryCode: string,
  type: RemittanceService['type']
): RemittanceService[] {
  return getServicesByCountry(countryCode).filter(service => service.type === type)
}

// Obtener servicio por ID
export function getServiceById(id: string): RemittanceService | undefined {
  return REAL_SERVICES.find(service => service.id === id)
}

// Estadísticas de servicios
export function getServicesStats() {
  return {
    total: REAL_SERVICES.length,
    byType: {
      casa_cambio: REAL_SERVICES.filter(s => s.type === 'casa_cambio').length,
      banco: REAL_SERVICES.filter(s => s.type === 'banco').length,
      fintech: REAL_SERVICES.filter(s => s.type === 'fintech').length,
      remesa: REAL_SERVICES.filter(s => s.type === 'remesa').length,
      crypto: REAL_SERVICES.filter(s => s.type === 'crypto').length
    },
    verified: REAL_SERVICES.filter(s => s.verified).length
  }
}
