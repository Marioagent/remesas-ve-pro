// Samsung DeX y optimizaciones móviles

export interface DeviceInfo {
  isSamsungDevice: boolean
  isDexMode: boolean
  hasSPen: boolean
  screenSize: 'mobile' | 'tablet' | 'desktop'
  orientation: 'portrait' | 'landscape'
}

export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isSamsungDevice: false,
      isDexMode: false,
      hasSPen: false,
      screenSize: 'desktop',
      orientation: 'landscape'
    }
  }

  const ua = window.navigator.userAgent.toLowerCase()
  const isSamsung = ua.includes('samsung') || ua.includes('sm-')

  // Detectar Samsung DeX
  const isDex = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches && isSamsung

  // Detectar S Pen
  const hasSPen = 'PointerEvent' in window && isSamsung

  // Detectar tamaño de pantalla
  const width = window.innerWidth
  let screenSize: 'mobile' | 'tablet' | 'desktop'
  if (width < 768) {
    screenSize = 'mobile'
  } else if (width < 1024) {
    screenSize = 'tablet'
  } else {
    screenSize = 'desktop'
  }

  // Detectar orientación
  const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'

  return {
    isSamsungDevice: isSamsung,
    isDexMode: isDex,
    hasSPen,
    screenSize,
    orientation
  }
}

// Hook para detectar cambios en el dispositivo
export function useDeviceDetection() {
  const [deviceInfo, setDeviceInfo] = React.useState(detectDevice())

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setDeviceInfo(detectDevice())
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return deviceInfo
}

// Optimizaciones CSS para Samsung DeX
export const dexStyles = {
  container: 'dex:max-w-7xl dex:mx-auto dex:px-8',
  grid: 'grid grid-cols-1 md:grid-cols-2 dex:grid-cols-3',
  card: 'rounded-lg shadow-md hover:shadow-lg dex:hover:scale-105 transition-all',
  button: 'px-4 py-2 rounded-lg dex:px-6 dex:py-3 dex:text-lg',
  text: 'text-base dex:text-lg',
  heading: 'text-2xl md:text-3xl dex:text-4xl font-bold'
}

// Configuración para S Pen
export function enableSPenFeatures() {
  if (typeof window === 'undefined') return

  const device = detectDevice()
  if (!device.hasSPen) return

  // Habilitar funciones especiales para S Pen
  document.documentElement.classList.add('s-pen-enabled')

  // Detectar eventos de S Pen
  window.addEventListener('pointerdown', (e: PointerEvent) => {
    if (e.pointerType === 'pen') {
      // Manejar escritura con S Pen
      document.documentElement.classList.add('s-pen-active')
    }
  })

  window.addEventListener('pointerup', (e: PointerEvent) => {
    if (e.pointerType === 'pen') {
      document.documentElement.classList.remove('s-pen-active')
    }
  })
}

// Verificar si está corriendo en modo PWA
export function isPWA(): boolean {
  if (typeof window === 'undefined') return false

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  )
}

// Función para optimizar para Samsung Internet Browser
export function optimizeSamsungBrowser() {
  if (typeof window === 'undefined') return

  const ua = window.navigator.userAgent.toLowerCase()
  if (!ua.includes('samsungbrowser')) return

  // Habilitar optimizaciones específicas
  document.documentElement.classList.add('samsung-browser')

  // Configurar viewport para mejor experiencia
  const viewport = document.querySelector('meta[name="viewport"]')
  if (viewport) {
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover'
    )
  }
}

import React from 'react'
