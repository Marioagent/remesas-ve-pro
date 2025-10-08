'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { COUNTRIES, CountryCode } from '@/types/countries'

interface CountrySelectorProps {
  selectedCountry: CountryCode
  onCountryChange: (country: CountryCode) => void
  className?: string
}

export default function CountrySelector({
  selectedCountry,
  onCountryChange,
  className = ''
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedCountryData = COUNTRIES[selectedCountry]
  const availableCountries = Object.values(COUNTRIES)

  return (
    <div className={`relative ${className}`}>
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-indigo-500 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{selectedCountryData.flag}</span>
          <div className="text-left">
            <div className="font-semibold text-gray-900">{selectedCountryData.name}</div>
            <div className="text-sm text-gray-500">
              {selectedCountryData.currency.code} - {selectedCountryData.currency.symbol}
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Options */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="max-h-96 overflow-y-auto">
                {availableCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onCountryChange(country.code)
                      setIsOpen(false)
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-indigo-50 transition-colors ${
                      country.code === selectedCountry ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{country.name}</div>
                        <div className="text-sm text-gray-500">
                          {country.currency.code} - {country.currency.symbol}
                          {country.exchangeControl && (
                            <span className="ml-2 text-xs text-amber-600">Control cambiario</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {country.code === selectedCountry && (
                      <Check className="w-5 h-5 text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>

              {/* Info Footer */}
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <p className="text-xs text-gray-600">
                  💡 Selecciona tu país de destino para ver tasas y servicios específicos
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
