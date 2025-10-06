import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatear números como moneda
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Formatear números grandes con separadores
export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

// Calcular porcentaje de ahorro
export function calcularAhorro(precioOriginal: number, precioFinal: number): number {
  return ((precioOriginal - precioFinal) / precioOriginal) * 100
}

// Validar email
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Validar teléfono venezolano
export function validarTelefonoVE(telefono: string): boolean {
  const regex = /^(0414|0424|0412|0416|0426)\d{7}$/
  return regex.test(telefono.replace(/\s|-/g, ''))
}

// Formatear fecha relativa
export function formatearFechaRelativa(fecha: Date): string {
  const ahora = new Date()
  const diffMs = ahora.getTime() - fecha.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHoras = Math.floor(diffMins / 60)
  const diffDias = Math.floor(diffHoras / 24)

  if (diffMins < 1) return 'Ahora'
  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHoras < 24) return `Hace ${diffHoras}h`
  if (diffDias < 7) return `Hace ${diffDias}d`

  return fecha.toLocaleDateString('es-VE', {
    day: 'numeric',
    month: 'short'
  })
}

// Generar color según porcentaje
export function getColorPorcentaje(porcentaje: number): string {
  if (porcentaje >= 80) return 'text-green-600'
  if (porcentaje >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

// Truncar texto
export function truncarTexto(texto: string, maxLength: number): string {
  if (texto.length <= maxLength) return texto
  return texto.substring(0, maxLength) + '...'
}

// Delay helper para rate limiting
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
