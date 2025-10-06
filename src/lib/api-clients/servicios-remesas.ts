import { ServicioRemesa } from '@/types'

// Base de datos de servicios de remesas disponibles en Venezuela
export const SERVICIOS_REMESAS: ServicioRemesa[] = [
  {
    id: 'zoom',
    nombre: 'Zoom',
    logo: '/logos/zoom.png',
    tasaCambio: 0, // Se actualiza dinámicamente
    comision: 0,
    comisionPorcentaje: 0,
    tiempoEntrega: '15-30 minutos',
    montoMinimo: 1,
    montoMaximo: 5000,
    metodosEnvio: ['Tarjeta débito/crédito', 'Transferencia bancaria', 'Zelle'],
    metodosRecepcion: ['Efectivo', 'Pago móvil', 'Transferencia'],
    disponibilidad: true,
    calificacion: 4.8,
    url: 'https://zoom.red',
    urlAfiliado: 'https://zoom.red?ref=remesasve'
  },
  {
    id: 'reserve',
    nombre: 'Reserve',
    logo: '/logos/reserve.png',
    tasaCambio: 0,
    comision: 0,
    comisionPorcentaje: 1.5,
    tiempoEntrega: '5-15 minutos',
    montoMinimo: 5,
    montoMaximo: 3000,
    metodosEnvio: ['Criptomonedas', 'Transferencia'],
    metodosRecepcion: ['Transferencia bancaria', 'Pago móvil'],
    disponibilidad: true,
    calificacion: 4.7,
    url: 'https://reserve.org',
    urlAfiliado: 'https://reserve.org?ref=remesasve'
  },
  {
    id: 'airtm',
    nombre: 'AirTM',
    logo: '/logos/airtm.png',
    tasaCambio: 0,
    comision: 0,
    comisionPorcentaje: 2.99,
    tiempoEntrega: '30-60 minutos',
    montoMinimo: 1,
    montoMaximo: 10000,
    metodosEnvio: ['Tarjeta', 'PayPal', 'Zelle', 'Wise'],
    metodosRecepcion: ['Transferencia', 'Pago móvil', 'Efectivo'],
    disponibilidad: true,
    calificacion: 4.5,
    url: 'https://airtm.com',
    urlAfiliado: 'https://airtm.com?referred_by=remesasve'
  },
  {
    id: 'binance-p2p',
    nombre: 'Binance P2P',
    logo: '/logos/binance.png',
    tasaCambio: 0,
    comision: 0,
    comisionPorcentaje: 0,
    tiempoEntrega: '15-45 minutos',
    montoMinimo: 10,
    montoMaximo: 20000,
    metodosEnvio: ['Criptomonedas (USDT)'],
    metodosRecepcion: ['Transferencia bancaria', 'Pago móvil'],
    disponibilidad: true,
    calificacion: 4.6,
    url: 'https://p2p.binance.com',
    urlAfiliado: 'https://p2p.binance.com?ref=remesasve'
  },
  {
    id: 'western-union',
    nombre: 'Western Union',
    logo: '/logos/western-union.png',
    tasaCambio: 0,
    comision: 8,
    comisionPorcentaje: 3.5,
    tiempoEntrega: '1-3 días',
    montoMinimo: 10,
    montoMaximo: 7500,
    metodosEnvio: ['Tarjeta', 'Transferencia bancaria'],
    metodosRecepcion: ['Efectivo en agencia', 'Transferencia'],
    disponibilidad: true,
    calificacion: 4.3,
    url: 'https://westernunion.com',
    urlAfiliado: 'https://westernunion.com?affiliate=remesasve'
  },
  {
    id: 'moneygram',
    nombre: 'MoneyGram',
    logo: '/logos/moneygram.png',
    tasaCambio: 0,
    comision: 7.5,
    comisionPorcentaje: 3.0,
    tiempoEntrega: '1-3 días',
    montoMinimo: 15,
    montoMaximo: 10000,
    metodosEnvio: ['Tarjeta', 'Transferencia', 'Efectivo'],
    metodosRecepcion: ['Efectivo en agencia', 'Transferencia'],
    disponibilidad: true,
    calificacion: 4.2,
    url: 'https://moneygram.com',
    urlAfiliado: 'https://moneygram.com?ref=remesasve'
  },
  {
    id: 'remesa-feliz',
    nombre: 'Remesa Feliz',
    logo: '/logos/remesa-feliz.png',
    tasaCambio: 0,
    comision: 2,
    comisionPorcentaje: 1.0,
    tiempoEntrega: '1-2 horas',
    montoMinimo: 20,
    montoMaximo: 5000,
    metodosEnvio: ['Zelle', 'Transferencia'],
    metodosRecepcion: ['Pago móvil', 'Transferencia'],
    disponibilidad: true,
    calificacion: 4.6,
    url: 'https://remesafeliz.com',
    urlAfiliado: 'https://remesafeliz.com?referido=remesasve'
  },
  {
    id: 'valiu',
    nombre: 'Valiu',
    logo: '/logos/valiu.png',
    tasaCambio: 0,
    comision: 0,
    comisionPorcentaje: 0.5,
    tiempoEntrega: '10-20 minutos',
    montoMinimo: 1,
    montoMaximo: 3000,
    metodosEnvio: ['Criptomonedas'],
    metodosRecepcion: ['Pago móvil', 'Transferencia'],
    disponibilidad: true,
    calificacion: 4.4,
    url: 'https://valiu.com',
    urlAfiliado: 'https://valiu.com?ref=remesasve'
  }
]

// Clase para gestionar servicios de remesas
export class ServiciosRemesasAPI {

  // Obtener todos los servicios
  static obtenerTodos(): ServicioRemesa[] {
    return SERVICIOS_REMESAS.filter(s => s.disponibilidad)
  }

  // Obtener servicio por ID
  static obtenerPorId(id: string): ServicioRemesa | undefined {
    return SERVICIOS_REMESAS.find(s => s.id === id)
  }

  // Calcular costo total de envío
  static calcularCostoTotal(servicio: ServicioRemesa, montoUSD: number): number {
    const comisionFija = servicio.comision || 0
    const comisionPorcentaje = servicio.comisionPorcentaje || 0
    const comisionCalculada = montoUSD * (comisionPorcentaje / 100)

    return comisionFija + comisionCalculada
  }

  // Calcular monto a recibir en BS
  static calcularMontoRecibir(
    servicio: ServicioRemesa,
    montoUSD: number,
    tasaCambio: number
  ): number {
    const costoTotal = this.calcularCostoTotal(servicio, montoUSD)
    const montoNeto = montoUSD - costoTotal
    return montoNeto * tasaCambio
  }

  // Comparar todos los servicios para un monto
  static compararServicios(montoUSD: number, tasaCambio: number) {
    return this.obtenerTodos()
      .filter(s => montoUSD >= s.montoMinimo && montoUSD <= s.montoMaximo)
      .map(servicio => {
        const costoEnvio = this.calcularCostoTotal(servicio, montoUSD)
        const montoRecibir = this.calcularMontoRecibir(servicio, montoUSD, tasaCambio)
        const montoTotal = montoUSD + costoEnvio

        return {
          servicio,
          costoEnvio,
          montoRecibir,
          montoTotal,
          tasaEfectiva: montoRecibir / montoUSD
        }
      })
      .sort((a, b) => b.montoRecibir - a.montoRecibir) // Ordenar por mejor tasa
  }

  // Obtener mejor servicio
  static obtenerMejorServicio(montoUSD: number, tasaCambio: number): ServicioRemesa | null {
    const comparacion = this.compararServicios(montoUSD, tasaCambio)
    return comparacion.length > 0 ? comparacion[0].servicio : null
  }

  // Filtrar por características
  static filtrarServicios(filtros: {
    montoMinimo?: number
    montoMaximo?: number
    tiempoMaximo?: string
    metodoEnvio?: string
    metodoRecepcion?: string
  }): ServicioRemesa[] {
    let servicios = this.obtenerTodos()

    if (filtros.montoMinimo) {
      servicios = servicios.filter(s => s.montoMaximo >= filtros.montoMinimo!)
    }

    if (filtros.montoMaximo) {
      servicios = servicios.filter(s => s.montoMinimo <= filtros.montoMaximo!)
    }

    if (filtros.metodoEnvio) {
      servicios = servicios.filter(s =>
        s.metodosEnvio.some(m =>
          m.toLowerCase().includes(filtros.metodoEnvio!.toLowerCase())
        )
      )
    }

    if (filtros.metodoRecepcion) {
      servicios = servicios.filter(s =>
        s.metodosRecepcion.some(m =>
          m.toLowerCase().includes(filtros.metodoRecepcion!.toLowerCase())
        )
      )
    }

    return servicios
  }
}

export default ServiciosRemesasAPI
