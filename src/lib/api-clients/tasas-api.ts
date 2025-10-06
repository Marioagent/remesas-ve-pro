import { TasaCambio } from '@/types'

// API Client para obtener tasas de cambio de múltiples fuentes

export class TasasAPI {
  private static cache: Map<string, { data: TasaCambio[], timestamp: number }> = new Map()
  private static CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

  // Obtener todas las tasas disponibles
  static async obtenerTodasLasTasas(): Promise<TasaCambio[]> {
    const cacheKey = 'todas-tasas'
    const cached = this.cache.get(cacheKey)

    // Usar cache si es válido
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      const [bcv, paralelo, binance] = await Promise.allSettled([
        this.obtenerTasaBCV(),
        this.obtenerTasaParalelo(),
        this.obtenerTasaBinance(),
      ])

      const tasas: TasaCambio[] = []

      if (bcv.status === 'fulfilled') tasas.push(bcv.value)
      if (paralelo.status === 'fulfilled') tasas.push(paralelo.value)
      if (binance.status === 'fulfilled') tasas.push(binance.value)

      // Guardar en cache
      this.cache.set(cacheKey, { data: tasas, timestamp: Date.now() })

      return tasas
    } catch (error) {
      console.error('Error obteniendo tasas:', error)
      return []
    }
  }

  // BCV (Banco Central de Venezuela)
  static async obtenerTasaBCV(): Promise<TasaCambio> {
    try {
      const response = await fetch('https://pydolarve.org/api/v1/dollar?page=bcv')
      const data = await response.json()

      const tasa = parseFloat(data.monitors.usd.price)

      return {
        fuente: 'BCV',
        nombre: 'Banco Central de Venezuela',
        compra: tasa,
        venta: tasa,
        promedio: tasa,
        timestamp: new Date(),
        icono: '🏛️'
      }
    } catch (error) {
      console.error('Error BCV:', error)
      throw error
    }
  }

  // Tasa Paralelo (DolarToday, Monitor Dólar)
  static async obtenerTasaParalelo(): Promise<TasaCambio> {
    try {
      const response = await fetch('https://pydolarve.org/api/v1/dollar?page=enparalelovzla')
      const data = await response.json()

      const tasa = parseFloat(data.monitors.usd.price)

      return {
        fuente: 'Paralelo',
        nombre: 'Mercado Paralelo',
        compra: tasa * 0.98, // Simulación de spread
        venta: tasa * 1.02,
        promedio: tasa,
        timestamp: new Date(),
        icono: '💵'
      }
    } catch (error) {
      console.error('Error Paralelo:', error)
      throw error
    }
  }

  // Binance P2P
  static async obtenerTasaBinance(): Promise<TasaCambio> {
    try {
      // Nota: Binance requiere API key para datos precisos
      // Esta es una simulación usando datos públicos
      const response = await fetch('https://pydolarve.org/api/v1/dollar?page=binance')
      const data = await response.json()

      const tasa = parseFloat(data.monitors.usd.price)

      return {
        fuente: 'Binance',
        nombre: 'Binance P2P',
        compra: tasa * 0.97,
        venta: tasa * 1.03,
        promedio: tasa,
        timestamp: new Date(),
        icono: '₿'
      }
    } catch (error) {
      console.error('Error Binance:', error)
      throw error
    }
  }

  // Obtener tasa específica
  static async obtenerTasa(fuente: string): Promise<TasaCambio | null> {
    const tasas = await this.obtenerTodasLasTasas()
    return tasas.find(t => t.fuente === fuente) || null
  }

  // Obtener mejor tasa de compra
  static async obtenerMejorTasaCompra(): Promise<TasaCambio | null> {
    const tasas = await this.obtenerTodasLasTasas()
    if (tasas.length === 0) return null

    return tasas.reduce((mejor, actual) =>
      actual.compra > mejor.compra ? actual : mejor
    )
  }

  // Obtener mejor tasa de venta
  static async obtenerMejorTasaVenta(): Promise<TasaCambio | null> {
    const tasas = await this.obtenerTodasLasTasas()
    if (tasas.length === 0) return null

    return tasas.reduce((mejor, actual) =>
      actual.venta < mejor.venta ? actual : mejor
    )
  }

  // Limpiar cache manualmente
  static limpiarCache(): void {
    this.cache.clear()
  }
}

// Export por defecto
export default TasasAPI
