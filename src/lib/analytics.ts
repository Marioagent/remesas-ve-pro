// Google Analytics 4 Configuration - Enhanced for Reme Global

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// Calculator Events
export const trackCalculatorUse = (amount: number, tasa: string) => {
  event({
    action: 'calculator_use',
    category: 'engagement',
    label: tasa,
    value: amount
  })
}

export const trackCalculation = (amount: number, service: string) => {
  event({
    action: 'calculate_remittance',
    category: 'Calculator',
    label: service,
    value: amount,
  })

  // Track conversion value
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      value: amount,
      currency: 'USD',
      transaction_id: `calc_${Date.now()}`,
    })
  }
}

export const trackComparison = (services: string[], amount: number) => {
  event({
    action: 'compare_services',
    category: 'Calculator',
    label: `${services.length} services`,
    value: amount,
  })
}

// Service Events
export const trackServiceClick = (serviceName: string, amount: number) => {
  event({
    action: 'service_click',
    category: 'conversion',
    label: serviceName,
    value: amount
  })
}

export const trackAffiliateClick = (service: string, amount: number) => {
  event({
    action: 'click_affiliate',
    category: 'Affiliates',
    label: service,
    value: amount,
  })

  // Track as conversion
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: service,
      value: amount,
    })
  }
}

// Alert Events
export const trackAlertCreation = (type: string, channels: string[]) => {
  event({
    action: 'create_alert',
    category: 'Alerts',
    label: `${type}_${channels.join('+')}`,
  })
}

export const trackAlertTriggered = (type: string, value: number) => {
  event({
    action: 'alert_triggered',
    category: 'Alerts',
    label: type,
    value: value,
  })
}

// User Events
export const trackSignUp = (method: string) => {
  event({
    action: 'sign_up',
    category: 'User',
    label: method,
  })

  if (window.gtag) {
    window.gtag('event', 'sign_up', {
      method: method,
    })
  }
}

export const trackLogin = (method: string) => {
  event({
    action: 'login',
    category: 'User',
    label: method,
  })

  if (window.gtag) {
    window.gtag('event', 'login', {
      method: method,
    })
  }
}

// PWA Events
export const trackPWAInstall = () => {
  event({
    action: 'pwa_install',
    category: 'PWA',
    label: 'installed',
  })
}

export const trackPWALaunch = () => {
  event({
    action: 'pwa_launch',
    category: 'PWA',
    label: 'launched',
  })
}

// Engagement Events
export const trackEngagement = (action: string, label?: string) => {
  event({
    action,
    category: 'engagement',
    label
  })
}

export const trackShare = (method: string, content: string) => {
  event({
    action: 'share',
    category: 'Engagement',
    label: `${method}_${content}`,
  })

  if (window.gtag) {
    window.gtag('event', 'share', {
      method: method,
      content_type: content,
    })
  }
}

export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'Engagement',
    label: searchTerm,
  })

  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    })
  }
}

// Chatbot Events
export const trackChatbotInteraction = (action: string, topic?: string) => {
  event({
    action: 'chatbot_interaction',
    category: 'Chatbot',
    label: `${action}_${topic || 'general'}`,
  })
}

// Error Tracking
export const trackError = (errorType: string, errorMessage: string) => {
  event({
    action: 'error',
    category: 'Errors',
    label: `${errorType}: ${errorMessage}`,
  })
}

// Performance Tracking
export const trackPerformance = (metric: string, value: number) => {
  event({
    action: 'performance_metric',
    category: 'Performance',
    label: metric,
    value: Math.round(value),
  })
}
