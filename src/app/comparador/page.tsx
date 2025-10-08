'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ExternalLink,
  AlertCircle,
  Info
} from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'
import { CountryCode, COUNTRIES } from '@/types/countries'
import { RemittanceService, Fintech, ExchangeRate } from '@/types/countries'

export default function ComparadorPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('VE')
  const [amount, setAmount] = useState<number>(100)
  const [services, setServices] = useState<RemittanceService[]>([])
  const [fintechs, setFintechs] = useState<Fintech[]>([])
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(false)

  const countryData = COUNTRIES[selectedCountry]

  useEffect(() => {
    loadCountryData()
  }, [selectedCountry])

  const loadCountryData = async () => {
    setLoading(true)
    try {
      // Cargar servicios
      const servicesRes = await fetch(`/api/servicios/${selectedCountry}`)
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setServices(servicesData.remittanceServices || [])
        setFintechs(servicesData.fintechs || [])
      }

      // Cargar tasas
      const ratesRes = await fetch(`/api/tasas/${selectedCountry}`)
      if (ratesRes.ok) {
        const ratesData = await ratesRes.json()
        setExchangeRates(ratesData.rates || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateReceiveAmount = (service: RemittanceService, rate?: number) => {
    const fee = (service.fees.min + service.fees.max) / 2
    const sendAmount = amount - fee
    const exchangeRate = rate || exchangeRates[0]?.rate || 1
    return sendAmount * exchangeRate
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/logo-reme-global.svg" alt="Reme Global" className="w-12 h-12" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Reme Global
              </span>
            </div>
            <a
              href="/"
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              ← Volver al inicio
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comparador Multi-País
          </h1>
          <p className="text-xl text-gray-600">
            Encuentra el mejor servicio de remesas para tu país destino
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Selector y Calculadora */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Configura tu envío
              </h2>

              {/* Country Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País destino
                </label>
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountryChange={setSelectedCountry}
                />
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto a enviar (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    min="1"
                  />
                </div>
              </div>

              {/* Exchange Rates Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Tasas de Cambio
                </h3>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-12 bg-gray-200 rounded animate-pulse" />
                  </div>
                ) : exchangeRates.length > 0 ? (
                  <div className="space-y-2">
                    {exchangeRates.map((rate, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-3 flex justify-between items-center"
                      >
                        <div>
                          <div className="text-xs text-gray-500">{rate.source}</div>
                          <div className="text-sm font-semibold text-gray-900">
                            {rate.type && (
                              <span className="text-xs text-indigo-600 mr-1">
                                {rate.type}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {rate.rate.toLocaleString('es', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rate.to}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 text-center py-4">
                    No hay tasas disponibles
                  </div>
                )}
              </div>

              {/* Country Info */}
              {countryData.exchangeControl && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-amber-900 text-sm">
                        Control Cambiario
                      </div>
                      <div className="text-xs text-amber-700 mt-1">
                        {countryData.exchangeControlDetails}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main - Services List */}
          <div className="lg:col-span-2">
            {/* Servicios de Remesas */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-indigo-600" />
                Servicios de Remesas
              </h2>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : services.length > 0 ? (
                <div className="space-y-4">
                  {services.map((service) => {
                    const bestRate = exchangeRates[0]?.rate || 1
                    const receiveAmount = calculateReceiveAmount(service, bestRate)

                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {service.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              {service.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{service.rating}</span>
                                  <span className="text-xs text-gray-500">
                                    ({service.reviews?.toLocaleString()})
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <a
                            href={service.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                          >
                            Ir al sitio
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          {/* Costo */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Comisión</div>
                            <div className="text-lg font-bold text-gray-900">
                              ${service.fees.min} - ${service.fees.max}
                            </div>
                          </div>

                          {/* Tiempo */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Tiempo de entrega
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {service.deliveryTime.min}-{service.deliveryTime.max} {service.deliveryTime.unit}
                            </div>
                          </div>

                          {/* Cobertura */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Puntos
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {service.coverage[0]?.points?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                        </div>

                        {/* Cálculo */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm text-gray-600">Envías</div>
                              <div className="text-xl font-bold text-gray-900">
                                ${amount.toFixed(2)} USD
                              </div>
                            </div>
                            <div className="text-2xl text-gray-400">→</div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Reciben</div>
                              <div className="text-xl font-bold text-green-600">
                                {receiveAmount.toLocaleString('es', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })} {countryData.currency.code}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 text-center">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    No hay servicios de remesas disponibles para {countryData.name}
                  </p>
                </div>
              )}
            </div>

            {/* Fintechs */}
            {fintechs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                  Fintechs & Alternativas Digitales
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {fintechs.map((fintech) => (
                    <motion.div
                      key={fintech.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{fintech.name}</h3>
                          <div className="text-sm text-gray-500 capitalize">{fintech.type}</div>
                        </div>
                        {fintech.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{fintech.rating}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {fintech.services.map((service) => (
                          <span
                            key={service}
                            className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        Comisión: {fintech.fees.min}% - {fintech.fees.max}%
                      </div>

                      <a
                        href={fintech.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                      >
                        Visitar sitio
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
