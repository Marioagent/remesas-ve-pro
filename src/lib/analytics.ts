// Google Analytics 4 Configuration

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions (clicks en servicios)
export const trackServiceClick = (serviceName: string, amount: number) => {
  event({
    action: 'service_click',
    category: 'conversion',
    label: serviceName,
    value: amount
  })
}

// Track calculator usage
export const trackCalculatorUse = (amount: number, tasa: string) => {
  event({
    action: 'calculator_use',
    category: 'engagement',
    label: tasa,
    value: amount
  })
}

// Track page engagement
export const trackEngagement = (action: string, label?: string) => {
  event({
    action,
    category: 'engagement',
    label
  })
}
