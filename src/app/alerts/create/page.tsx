'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Bell,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { COUNTRIES } from '@/types/countries'
import type { CountryCode } from '@/types/countries'

export default function CreateAlertPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const [alertCount, setAlertCount] = useState(0)

  // Form state
  const [countryCode, setCountryCode] = useState<CountryCode>('VE')
  const [targetRate, setTargetRate] = useState('')
  const [condition, setCondition] = useState<'below' | 'above' | 'equals'>('below')
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyTelegram, setNotifyTelegram] = useState(false)
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(false)
  const [expiresInDays, setExpiresInDays] = useState('30')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { user: userData, profile } = await getCurrentUser()

      if (!userData) {
        router.push('/login')
        return
      }

      setUser({ ...userData, profile })
      setIsPremium(profile?.is_premium || false)

      // Count existing alerts
      const { count } = await supabase
        .from('rate_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userData.id)

      setAlertCount(count || 0)

      // Check if can create more alerts
      if (!profile?.is_premium && (count || 0) >= 3) {
        setError('Has alcanzado el límite de 3 alertas del plan gratuito')
      }

    } catch (error: any) {
      console.error('Error loading data:', error)
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validations
    if (!targetRate || parseFloat(targetRate) <= 0) {
      setError('Ingresa una tasa válida')
      return
    }

    if (!notifyEmail && !notifyTelegram && !notifyWhatsapp) {
      setError('Selecciona al menos un canal de notificación')
      return
    }

    // Check free tier limit
    if (!isPremium && alertCount >= 3) {
      setError('Has alcanzado el límite de 3 alertas del plan gratuito')
      return
    }

    setSubmitting(true)

    try {
      const expiresAt = expiresInDays
        ? new Date(Date.now() + parseInt(expiresInDays) * 24 * 60 * 60 * 1000).toISOString()
        : null

      const { data, error: insertError } = await supabase
        .from('rate_alerts')
        .insert({
          user_id: user.id,
          country_code: countryCode,
          target_rate: parseFloat(targetRate),
          condition,
          notify_email: notifyEmail,
          notify_telegram: notifyTelegram,
          notify_whatsapp: notifyWhatsapp,
          is_active: true,
          expires_at: expiresAt
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Success - redirect to alerts list
      router.push('/alerts?created=true')

    } catch (error: any) {
      console.error('Error creating alert:', error)
      setError(error.message || 'Error al crear la alerta')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  const canCreate = isPremium || alertCount < 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/logo-reme-lat-usa.svg" alt="REME LAT-USA" className="w-10 h-10 drop-shadow-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                REME LAT-USA
              </span>
            </div>
            <button
              onClick={() => router.push('/alerts')}
              className="text-gray-700 hover:text-blue-600 transition font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Alertas
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Crear Nueva Alerta
          </h1>
          <p className="text-gray-600">
            Recibe notificaciones cuando la tasa alcance tu objetivo
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Limit Warning */}
        {!isPremium && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="flex items-center gap-2 text-orange-800 font-semibold mb-2">
              <AlertCircle className="w-5 h-5" />
              Plan Gratuito: {alertCount}/3 alertas creadas
            </div>
            <p className="text-sm text-orange-700">
              Actualiza a Premium para crear alertas ilimitadas
            </p>
          </div>
        )}

        {/* Form */}
        {canCreate ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País
              </label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value as CountryCode)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              >
                {Object.entries(COUNTRIES).map(([code, country]) => (
                  <option key={code} value={code}>
                    {country.flag} {country.name} ({country.currency.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Condición
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setCondition('below')}
                  className={`p-4 rounded-xl border-2 transition ${
                    condition === 'below'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <TrendingDown className={`w-6 h-6 mx-auto mb-2 ${
                    condition === 'below' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <div className="text-sm font-semibold">Menor a</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCondition('equals')}
                  className={`p-4 rounded-xl border-2 transition ${
                    condition === 'equals'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Minus className={`w-6 h-6 mx-auto mb-2 ${
                    condition === 'equals' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div className="text-sm font-semibold">Igual a</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCondition('above')}
                  className={`p-4 rounded-xl border-2 transition ${
                    condition === 'above'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${
                    condition === 'above' ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <div className="text-sm font-semibold">Mayor a</div>
                </button>
              </div>
            </div>

            {/* Target Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tasa Objetivo ({COUNTRIES[countryCode].currency.code}/USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={targetRate}
                onChange={(e) => setTargetRate(e.target.value)}
                required
                placeholder="Ej: 45.50"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg font-semibold"
              />
              <p className="mt-2 text-sm text-gray-500">
                Te notificaremos cuando la tasa sea {condition === 'below' ? 'menor' : condition === 'above' ? 'mayor' : 'igual'} a este valor
              </p>
            </div>

            {/* Notification Channels */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Canales de Notificación
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition">
                  <input
                    type="checkbox"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">📧 Email</div>
                    <div className="text-sm text-gray-600">
                      {user?.email}
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition">
                  <input
                    type="checkbox"
                    checked={notifyTelegram}
                    onChange={(e) => setNotifyTelegram(e.target.checked)}
                    className="w-5 h-5 text-green-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">📱 Telegram</div>
                    <div className="text-sm text-gray-600">
                      {user?.profile?.telegram_chat_id ? 'Conectado' : 'No configurado'}
                    </div>
                  </div>
                  {!user?.profile?.telegram_chat_id && (
                    <span className="text-xs text-gray-500">Premium</span>
                  )}
                </label>

                <label className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition">
                  <input
                    type="checkbox"
                    checked={notifyWhatsapp}
                    onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">💬 WhatsApp</div>
                    <div className="text-sm text-gray-600">
                      {user?.profile?.whatsapp_number ? 'Conectado' : 'No configurado'}
                    </div>
                  </div>
                  {!user?.profile?.whatsapp_number && (
                    <span className="text-xs text-gray-500">Premium</span>
                  )}
                </label>
              </div>
            </div>

            {/* Expiration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiración
              </label>
              <select
                value={expiresInDays}
                onChange={(e) => setExpiresInDays(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              >
                <option value="7">7 días</option>
                <option value="14">14 días</option>
                <option value="30">30 días</option>
                <option value="60">60 días</option>
                <option value="90">90 días</option>
                <option value="">Sin expiración {!isPremium && '(Premium)'}</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando alerta...
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5" />
                  Crear Alerta
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Límite de Alertas Alcanzado
            </h3>
            <p className="text-gray-600 mb-6">
              Has creado {alertCount} alertas. El plan gratuito permite máximo 3 alertas activas.
            </p>
            <button
              onClick={() => router.push('/premium')}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-lg inline-block"
            >
              Actualizar a Premium
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">💡 Consejos para crear alertas</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Las alertas se verifican cada hora automáticamente</li>
            <li>• Configura múltiples canales de notificación para no perder ninguna oportunidad</li>
            <li>• Las alertas se desactivan automáticamente después de activarse</li>
            <li>• Puedes editar o pausar tus alertas en cualquier momento</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
