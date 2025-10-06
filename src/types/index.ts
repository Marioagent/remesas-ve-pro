// Tipos principales de la aplicación

export interface TasaCambio {
  fuente: string
  nombre: string
  compra: number
  venta: number
  promedio: number
  timestamp: Date
  icono?: string
}

export interface ServicioRemesa {
  id: string
  nombre: string
  logo: string
  tasaCambio: number
  comision: number
  comisionPorcentaje?: number
  tiempoEntrega: string
  montoMinimo: number
  montoMaximo: number
  metodosEnvio: string[]
  metodosRecepcion: string[]
  disponibilidad: boolean
  calificacion: number
  url: string
  urlAfiliado?: string
}

export interface CalculoRemesa {
  montoEnvio: number
  moneda: 'USD' | 'EUR' | 'BS'
  servicio: ServicioRemesa
  tasaCambio: number
  comision: number
  montoRecibir: number
  montoTotal: number
  ahorro?: number
}

export interface Alerta {
  id: string
  usuarioId: string
  tipo: 'tasa' | 'servicio'
  condicion: 'mayor' | 'menor' | 'igual'
  valorObjetivo: number
  servicio?: string
  activa: boolean
  notificaciones: ('email' | 'whatsapp' | 'telegram')[]
  createdAt: Date
}

export interface Notificacion {
  id: string
  tipo: 'alerta' | 'promocion' | 'sistema'
  titulo: string
  mensaje: string
  leida: boolean
  createdAt: Date
}

export interface Usuario {
  id: string
  email: string
  nombre?: string
  telefono?: string
  telegramId?: string
  premium: boolean
  alertasActivas: number
  beneficiariosGuardados: Beneficiario[]
  createdAt: Date
}

export interface Beneficiario {
  id: string
  nombre: string
  cedula?: string
  telefono?: string
  banco?: string
  numeroCuenta?: string
  tipoCuenta?: 'corriente' | 'ahorro' | 'pago movil'
}

export interface EstadisticaPersonal {
  totalEnviado: number
  numeroEnvios: number
  ahorroTotal: number
  servicioMasUsado: string
  promedioEnvio: number
  periodo: 'mes' | 'trimestre' | 'año'
}
