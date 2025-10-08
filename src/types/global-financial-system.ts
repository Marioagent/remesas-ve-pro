// Sistema Financiero Global - REDUCIDO A 13 PAÍSES (Sudamérica + USA)
// NOTA: Este archivo mantiene la estructura global pero solo con datos de 13 países
// Para expandir en el futuro, simplemente agregar más códigos de país

export type ContinentCode = 'NA' | 'SA'

export type CountryCode =
  // Norte América (solo USA)
  | 'US'
  // Sur América (12 países)
  | 'BR' | 'AR' | 'CL' | 'CO' | 'PE' | 'VE' | 'EC' | 'BO' | 'PY' | 'UY' | 'GY' | 'SR'
  // Centro América (solo Panamá)
  | 'PA'

export type CurrencyCode =
  // Solo monedas de los 13 países
  | 'USD'   // USA, Ecuador, Panamá
  | 'BRL'   // Brasil
  | 'ARS'   // Argentina
  | 'CLP'   // Chile
  | 'COP'   // Colombia
  | 'PEN'   // Perú
  | 'VES'   // Venezuela
  | 'UYU'   // Uruguay
  | 'BOB'   // Bolivia
  | 'PYG'   // Paraguay
  | 'GYD'   // Guyana
  | 'SRD'   // Surinam
  | 'PAB'   // Panamá (Balboa)

export interface GlobalCurrency {
  code: CurrencyCode
  name: string
  nameLocal: string
  symbol: string
  decimals: number
  isReserve: boolean
  countries: CountryCode[] // Países que la usan
}

export interface Continent {
  code: ContinentCode
  name: string
  nameEn: string
  countries: number
  population: number
  gdp: number // Trillones USD
}

export interface GlobalCountry {
  code: CountryCode
  name: string
  nameLocal: string
  nameEn: string
  continent: ContinentCode
  flag: string

  // Moneda
  currency: CurrencyCode
  currencySymbol: string

  // Sistema financiero
  centralBank: {
    name: string
    nameLocal: string
    abbreviation: string
    website: string
    established?: number
  }

  regulator?: {
    name: string
    abbreviation: string
    website: string
  }

  // Economía
  gdp?: number // Billones USD
  gdpPerCapita?: number
  population?: number
  economicRank?: number

  // Capital financiero
  financialCapital: string
  timezone: string

  // Control de cambios
  exchangeControl: boolean
  capitalControls: boolean

  // Grupos económicos
  economicBlocs: string[] // EU, NAFTA, MERCOSUR, ASEAN, etc

  // Instituciones principales
  majorBanks?: string[]
  stockExchange?: string

  // Regulaciones
  bankingLaws: string[]
  amlCompliance: 'high' | 'medium' | 'low'
}

export interface ExchangeRateMatrix {
  base: CurrencyCode
  rates: Record<CurrencyCode, number>
  timestamp: Date
}

export const CONTINENTS: Record<ContinentCode, Continent> = {
  NA: {
    code: 'NA',
    name: 'América del Norte',
    nameEn: 'North America',
    countries: 3,
    population: 580000000,
    gdp: 26.9
  },
  SA: {
    code: 'SA',
    name: 'América del Sur',
    nameEn: 'South America',
    countries: 13,
    population: 430000000,
    gdp: 3.6
  },
  EU: {
    code: 'EU',
    name: 'Europa',
    nameEn: 'Europe',
    countries: 44,
    population: 750000000,
    gdp: 23.2
  },
  AS: {
    code: 'AS',
    name: 'Asia',
    nameEn: 'Asia',
    countries: 48,
    population: 4600000000,
    gdp: 36.4
  },
  AF: {
    code: 'AF',
    name: 'África',
    nameEn: 'Africa',
    countries: 54,
    population: 1400000000,
    gdp: 2.8
  },
  OC: {
    code: 'OC',
    name: 'Oceanía',
    nameEn: 'Oceania',
    countries: 14,
    population: 45000000,
    gdp: 1.9
  },
  ME: {
    code: 'ME',
    name: 'Medio Oriente',
    nameEn: 'Middle East',
    countries: 14,
    population: 410000000,
    gdp: 3.5
  }
}

export const GLOBAL_CURRENCIES: Record<CurrencyCode, GlobalCurrency> = {
  // Top 10 Monedas de Reserva
  USD: {
    code: 'USD',
    name: 'Dólar Estadounidense',
    nameLocal: 'United States Dollar',
    symbol: '$',
    decimals: 2,
    isReserve: true,
    countries: ['US', 'PA', 'EC', 'SV', 'ZW']
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    nameLocal: 'Euro',
    symbol: '€',
    decimals: 2,
    isReserve: true,
    countries: ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'GR', 'SK', 'SI', 'CY', 'MT', 'LU']
  },
  GBP: {
    code: 'GBP',
    name: 'Libra Esterlina',
    nameLocal: 'Pound Sterling',
    symbol: '£',
    decimals: 2,
    isReserve: true,
    countries: ['GB']
  },
  JPY: {
    code: 'JPY',
    name: 'Yen Japonés',
    nameLocal: '日本円',
    symbol: '¥',
    decimals: 0,
    isReserve: true,
    countries: ['JP']
  },
  CHF: {
    code: 'CHF',
    name: 'Franco Suizo',
    nameLocal: 'Schweizer Franken',
    symbol: 'CHF',
    decimals: 2,
    isReserve: true,
    countries: ['CH']
  },
  CAD: {
    code: 'CAD',
    name: 'Dólar Canadiense',
    nameLocal: 'Canadian Dollar',
    symbol: 'C$',
    decimals: 2,
    isReserve: true,
    countries: ['CA']
  },
  AUD: {
    code: 'AUD',
    name: 'Dólar Australiano',
    nameLocal: 'Australian Dollar',
    symbol: 'A$',
    decimals: 2,
    isReserve: true,
    countries: ['AU']
  },
  CNY: {
    code: 'CNY',
    name: 'Yuan Chino',
    nameLocal: '人民币',
    symbol: '¥',
    decimals: 2,
    isReserve: true,
    countries: ['CN']
  },
  NZD: {
    code: 'NZD',
    name: 'Dólar Neozelandés',
    nameLocal: 'New Zealand Dollar',
    symbol: 'NZ$',
    decimals: 2,
    isReserve: false,
    countries: ['NZ']
  },
  SGD: {
    code: 'SGD',
    name: 'Dólar de Singapur',
    nameLocal: 'Singapore Dollar',
    symbol: 'S$',
    decimals: 2,
    isReserve: false,
    countries: ['SG']
  },

  // América
  MXN: {
    code: 'MXN',
    name: 'Peso Mexicano',
    nameLocal: 'Peso Mexicano',
    symbol: '$',
    decimals: 2,
    isReserve: false,
    countries: ['MX']
  },
  BRL: {
    code: 'BRL',
    name: 'Real Brasileño',
    nameLocal: 'Real Brasileiro',
    symbol: 'R$',
    decimals: 2,
    isReserve: false,
    countries: ['BR']
  },
  ARS: {
    code: 'ARS',
    name: 'Peso Argentino',
    nameLocal: 'Peso Argentino',
    symbol: '$',
    decimals: 2,
    isReserve: false,
    countries: ['AR']
  },
  CLP: {
    code: 'CLP',
    name: 'Peso Chileno',
    nameLocal: 'Peso Chileno',
    symbol: '$',
    decimals: 0,
    isReserve: false,
    countries: ['CL']
  },
  COP: {
    code: 'COP',
    name: 'Peso Colombiano',
    nameLocal: 'Peso Colombiano',
    symbol: '$',
    decimals: 0,
    isReserve: false,
    countries: ['CO']
  },
  PEN: {
    code: 'PEN',
    name: 'Sol Peruano',
    nameLocal: 'Sol',
    symbol: 'S/',
    decimals: 2,
    isReserve: false,
    countries: ['PE']
  },

  // Europa
  NOK: {
    code: 'NOK',
    name: 'Corona Noruega',
    nameLocal: 'Norske Kroner',
    symbol: 'kr',
    decimals: 2,
    isReserve: false,
    countries: ['NO']
  },
  SEK: {
    code: 'SEK',
    name: 'Corona Sueca',
    nameLocal: 'Svenska Kronor',
    symbol: 'kr',
    decimals: 2,
    isReserve: false,
    countries: ['SE']
  },
  DKK: {
    code: 'DKK',
    name: 'Corona Danesa',
    nameLocal: 'Danske Kroner',
    symbol: 'kr',
    decimals: 2,
    isReserve: false,
    countries: ['DK']
  },
  PLN: {
    code: 'PLN',
    name: 'Zloty Polaco',
    nameLocal: 'Złoty',
    symbol: 'zł',
    decimals: 2,
    isReserve: false,
    countries: ['PL']
  },
  CZK: {
    code: 'CZK',
    name: 'Corona Checa',
    nameLocal: 'Koruna',
    symbol: 'Kč',
    decimals: 2,
    isReserve: false,
    countries: ['CZ']
  },
  RUB: {
    code: 'RUB',
    name: 'Rublo Ruso',
    nameLocal: 'Рубль',
    symbol: '₽',
    decimals: 2,
    isReserve: false,
    countries: ['RU']
  },
  TRY: {
    code: 'TRY',
    name: 'Lira Turca',
    nameLocal: 'Türk Lirası',
    symbol: '₺',
    decimals: 2,
    isReserve: false,
    countries: ['TR']
  },

  // Asia
  INR: {
    code: 'INR',
    name: 'Rupia India',
    nameLocal: 'भारतीय रुपया',
    symbol: '₹',
    decimals: 2,
    isReserve: false,
    countries: ['IN']
  },
  KRW: {
    code: 'KRW',
    name: 'Won Surcoreano',
    nameLocal: '원',
    symbol: '₩',
    decimals: 0,
    isReserve: false,
    countries: ['KR']
  },
  HKD: {
    code: 'HKD',
    name: 'Dólar de Hong Kong',
    nameLocal: 'Hong Kong Dollar',
    symbol: 'HK$',
    decimals: 2,
    isReserve: false,
    countries: ['HK']
  },
  TWD: {
    code: 'TWD',
    name: 'Dólar de Taiwán',
    nameLocal: '新台幣',
    symbol: 'NT$',
    decimals: 2,
    isReserve: false,
    countries: ['TW']
  },
  THB: {
    code: 'THB',
    name: 'Baht Tailandés',
    nameLocal: 'บาท',
    symbol: '฿',
    decimals: 2,
    isReserve: false,
    countries: ['TH']
  },
  IDR: {
    code: 'IDR',
    name: 'Rupia Indonesia',
    nameLocal: 'Rupiah',
    symbol: 'Rp',
    decimals: 0,
    isReserve: false,
    countries: ['ID']
  },
  MYR: {
    code: 'MYR',
    name: 'Ringgit Malayo',
    nameLocal: 'Ringgit Malaysia',
    symbol: 'RM',
    decimals: 2,
    isReserve: false,
    countries: ['MY']
  },
  PHP: {
    code: 'PHP',
    name: 'Peso Filipino',
    nameLocal: 'Piso',
    symbol: '₱',
    decimals: 2,
    isReserve: false,
    countries: ['PH']
  },
  VND: {
    code: 'VND',
    name: 'Dong Vietnamita',
    nameLocal: 'Đồng',
    symbol: '₫',
    decimals: 0,
    isReserve: false,
    countries: ['VN']
  },
  PKR: {
    code: 'PKR',
    name: 'Rupia Pakistaní',
    nameLocal: 'روپیہ',
    symbol: '₨',
    decimals: 2,
    isReserve: false,
    countries: ['PK']
  },
  BDT: {
    code: 'BDT',
    name: 'Taka',
    nameLocal: 'টাকা',
    symbol: '৳',
    decimals: 2,
    isReserve: false,
    countries: ['BD']
  },

  // Medio Oriente
  AED: {
    code: 'AED',
    name: 'Dirham de EAU',
    nameLocal: 'درهم',
    symbol: 'د.إ',
    decimals: 2,
    isReserve: false,
    countries: ['AE']
  },
  SAR: {
    code: 'SAR',
    name: 'Riyal Saudí',
    nameLocal: 'ريال',
    symbol: '﷼',
    decimals: 2,
    isReserve: false,
    countries: ['SA']
  },
  QAR: {
    code: 'QAR',
    name: 'Riyal Qatarí',
    nameLocal: 'ريال',
    symbol: '﷼',
    decimals: 2,
    isReserve: false,
    countries: ['QA']
  },
  KWD: {
    code: 'KWD',
    name: 'Dinar Kuwaití',
    nameLocal: 'دينار',
    symbol: 'د.ك',
    decimals: 3,
    isReserve: false,
    countries: ['KW']
  },
  ILS: {
    code: 'ILS',
    name: 'Nuevo Séquel',
    nameLocal: 'שקל',
    symbol: '₪',
    decimals: 2,
    isReserve: false,
    countries: ['IL']
  },

  // África
  ZAR: {
    code: 'ZAR',
    name: 'Rand Sudafricano',
    nameLocal: 'Rand',
    symbol: 'R',
    decimals: 2,
    isReserve: false,
    countries: ['ZA']
  },
  EGP: {
    code: 'EGP',
    name: 'Libra Egipcia',
    nameLocal: 'جنيه',
    symbol: '£',
    decimals: 2,
    isReserve: false,
    countries: ['EG']
  },
  NGN: {
    code: 'NGN',
    name: 'Naira',
    nameLocal: 'Naira',
    symbol: '₦',
    decimals: 2,
    isReserve: false,
    countries: ['NG']
  },
  KES: {
    code: 'KES',
    name: 'Chelín Keniano',
    nameLocal: 'Shilling',
    symbol: 'KSh',
    decimals: 2,
    isReserve: false,
    countries: ['KE']
  },

  // Placeholders para otros
  VES: { code: 'VES', name: 'Bolívar', nameLocal: 'Bolívar', symbol: 'Bs.', decimals: 2, isReserve: false, countries: ['VE'] },
  UYU: { code: 'UYU', name: 'Peso Uruguayo', nameLocal: 'Peso', symbol: '$', decimals: 2, isReserve: false, countries: ['UY'] },
  BOB: { code: 'BOB', name: 'Boliviano', nameLocal: 'Boliviano', symbol: 'Bs', decimals: 2, isReserve: false, countries: ['BO'] },
  PYG: { code: 'PYG', name: 'Guaraní', nameLocal: 'Guaraní', symbol: '₲', decimals: 0, isReserve: false, countries: ['PY'] },
  PAB: { code: 'PAB', name: 'Balboa', nameLocal: 'Balboa', symbol: 'B/.', decimals: 2, isReserve: false, countries: ['PA'] },
  HUF: { code: 'HUF', name: 'Florín', nameLocal: 'Forint', symbol: 'Ft', decimals: 0, isReserve: false, countries: ['HU'] },
  RON: { code: 'RON', name: 'Leu', nameLocal: 'Leu', symbol: 'lei', decimals: 2, isReserve: false, countries: ['RO'] },
  BGN: { code: 'BGN', name: 'Lev', nameLocal: 'Лев', symbol: 'лв', decimals: 2, isReserve: false, countries: ['BG'] },
  HRK: { code: 'HRK', name: 'Kuna', nameLocal: 'Kuna', symbol: 'kn', decimals: 2, isReserve: false, countries: ['HR'] },
  ISK: { code: 'ISK', name: 'Corona Islandesa', nameLocal: 'Króna', symbol: 'kr', decimals: 0, isReserve: false, countries: ['IS'] },
  UAH: { code: 'UAH', name: 'Grivna', nameLocal: 'Гривня', symbol: '₴', decimals: 2, isReserve: false, countries: ['UA'] },
  LKR: { code: 'LKR', name: 'Rupia de Sri Lanka', nameLocal: 'රුපියල', symbol: 'Rs', decimals: 2, isReserve: false, countries: ['LK'] },
  MMK: { code: 'MMK', name: 'Kyat', nameLocal: 'ကျပ်', symbol: 'K', decimals: 2, isReserve: false, countries: ['MM'] },
  BHD: { code: 'BHD', name: 'Dinar', nameLocal: 'دينار', symbol: 'د.ب', decimals: 3, isReserve: false, countries: ['BH'] },
  OMR: { code: 'OMR', name: 'Rial Omaní', nameLocal: 'ريال', symbol: '﷼', decimals: 3, isReserve: false, countries: ['OM'] },
  JOD: { code: 'JOD', name: 'Dinar Jordano', nameLocal: 'دينار', symbol: 'د.ا', decimals: 3, isReserve: false, countries: ['JO'] },
  LBP: { code: 'LBP', name: 'Libra Libanesa', nameLocal: 'ليرة', symbol: 'ل.ل', decimals: 0, isReserve: false, countries: ['LB'] },
  IRR: { code: 'IRR', name: 'Rial Iraní', nameLocal: 'ریال', symbol: '﷼', decimals: 0, isReserve: false, countries: ['IR'] },
  GHS: { code: 'GHS', name: 'Cedi', nameLocal: 'Cedi', symbol: 'GH₵', decimals: 2, isReserve: false, countries: ['GH'] },
  TZS: { code: 'TZS', name: 'Chelín Tanzano', nameLocal: 'Shilling', symbol: 'TSh', decimals: 0, isReserve: false, countries: ['TZ'] },
  UGX: { code: 'UGX', name: 'Chelín Ugandés', nameLocal: 'Shilling', symbol: 'USh', decimals: 0, isReserve: false, countries: ['UG'] },
  MAD: { code: 'MAD', name: 'Dirham Marroquí', nameLocal: 'درهم', symbol: 'د.م.', decimals: 2, isReserve: false, countries: ['MA'] },
  DZD: { code: 'DZD', name: 'Dinar Argelino', nameLocal: 'دينار', symbol: 'د.ج', decimals: 2, isReserve: false, countries: ['DZ'] },
  AOA: { code: 'AOA', name: 'Kwanza', nameLocal: 'Kwanza', symbol: 'Kz', decimals: 2, isReserve: false, countries: ['AO'] },
  ETB: { code: 'ETB', name: 'Birr', nameLocal: 'ብር', symbol: 'Br', decimals: 2, isReserve: false, countries: ['ET'] },
  XOF: { code: 'XOF', name: 'Franco CFA Occidental', nameLocal: 'Franc CFA', symbol: 'CFA', decimals: 0, isReserve: false, countries: ['SN', 'CI', 'BF', 'ML', 'NE', 'TG', 'BJ'] },
  XAF: { code: 'XAF', name: 'Franco CFA Central', nameLocal: 'Franc CFA', symbol: 'FCFA', decimals: 0, isReserve: false, countries: ['CM', 'CF', 'TD', 'CG', 'GQ', 'GA'] }
}
