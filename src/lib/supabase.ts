import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para la base de datos
export interface Usuario {
  id: string
  email: string
  nombre?: string
  telefono?: string
  created_at: string
  premium: boolean
}

export interface Alerta {
  id: string
  usuario_id: string
  tipo: 'whatsapp' | 'telegram'
  tasa_objetivo: number
  servicio?: string
  activa: boolean
  created_at: string
}

export interface Envio {
  id: string
  usuario_id: string
  servicio: string
  monto_usd: number
  monto_bs: number
  tasa_usada: number
  beneficiario: string
  estado: 'pendiente' | 'procesando' | 'completado' | 'cancelado'
  tracking_id?: string
  created_at: string
  updated_at: string
}

export interface TasaHistorica {
  id: string
  fuente: string
  tasa: number
  timestamp: string
}
