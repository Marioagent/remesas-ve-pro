'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Bell,
  Plus,
  Trash2,
  Edit,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

interface Alert {
  id: string
  user_id: string
  country_code: string
  service_id?: string
  target_rate: number
  condition: 'below' | 'above' | 'equals'
  notify_email: boolean
  notify_telegram: boolean
  notify_whatsapp: boolean
  is_active: boolean
  created_at: string
  expires_at?: string
  triggered_at?: string
}

export default function AlertsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

      // Load alerts
      const { data: alertsData, error: alertsError } = await supabase
        .from('rate_alerts')
        .select('*')
        .eq('user_id', userData.id)
        .order('created_at', { ascending: false })

      if (alertsError) throw alertsError
      setAlerts(alertsData || [])

    } catch (error: any) {
      console.error('Error loading data:', error)
      setError('Error al cargar las alertas')
    } finally {
      setLoading(false)
    }
  }

  const deleteAlert = async (alertId: string) => {
    if (!confirm('¿Estás seguro de eliminar esta alerta?')) return

    try {
      const { error: deleteError } = await supabase
        .from('rate_alerts')
        .delete()
        .eq('id', alertId)
        .eq('user_id', user.id)

      if (deleteError) throw deleteError

      setAlerts(alerts.filter(a => a.id !== alertId))
      setSuccess('Alerta eliminada exitosamente')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error: any) {
      setError('Error al eliminar la alerta')
      setTimeout(() => setError(''), 3000)
    }
  }

  const toggleAlert = async (alertId: string, currentState: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('rate_alerts')
        .update({ is_active: !currentState })
        .eq('id', alertId)
        .eq('user_id', user.id)

      if (updateError) throw updateError

      setAlerts(alerts.map(a =>
        a.id === alertId ? { ...a, is_active: !currentState } : a
      ))

      setSuccess(`Alerta ${!currentState ? 'activada' : 'pausada'} exitosamente`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (error: any) {
      setError('Error al actualizar la alerta')
      setTimeout(() => setError(''), 3000)
    }
  }

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'below': return <TrendingDown className="w-5 h-5" />
      case 'above': return <TrendingUp className="w-5 h-5" />
      case 'equals': return <Minus className="w-5 h-5" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'below': return 'Menor a'
      case 'above': return 'Mayor a'
      case 'equals': return 'Igual a'
      default: return condition
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'below': return 'text-red-600'
      case 'above': return 'text-green-600'
      case 'equals': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const canCreateAlert = isPremium || alerts.length < 3

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando alertas...</p>
        </div>
      </div>
    )
  }

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
              onClick={() => router.push('/dashboard')}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              ← Volver al Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Bell className="w-10 h-10 text-blue-600" />
            Mis Alertas de Tasas
          </h1>
          <p className="text-gray-600">
            Recibe notificaciones cuando la tasa alcance tu objetivo
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">{success}</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Stats & Create Button */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {alerts.filter(a => a.is_active).length}
            </div>
            <div className="text-gray-600">Alertas Activas</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {alerts.filter(a => a.triggered_at).length}
            </div>
            <div className="text-gray-600">Alertas Activadas</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {isPremium ? '∞' : `${3 - alerts.length}/3`}
            </div>
            <div className="text-gray-600">
              {isPremium ? 'Alertas Ilimitadas' : 'Disponibles (Plan Free)'}
            </div>
          </div>
        </div>

        {/* Create Alert Button */}
        <div className="mb-8">
          {canCreateAlert ? (
            <button
              onClick={() => router.push('/alerts/create')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg flex items-center justify-center gap-3"
            >
              <Plus className="w-6 h-6" />
              Crear Nueva Alerta
            </button>
          ) : (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-2xl p-6 text-center">
              <div className="text-orange-800 font-semibold mb-2">
                Has alcanzado el límite de 3 alertas del plan gratuito
              </div>
              <p className="text-sm text-orange-700 mb-4">
                Actualiza a Premium para crear alertas ilimitadas y acceder a más funciones
              </p>
              <button
                onClick={() => router.push('/premium')}
                className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition shadow-lg"
              >
                Ver Planes Premium
              </button>
            </div>
          )}
        </div>

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Bell className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No tienes alertas configuradas
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primera alerta para recibir notificaciones cuando la tasa de cambio alcance tu objetivo
            </p>
            <button
              onClick={() => router.push('/alerts/create')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Crear Mi Primera Alerta
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-lg p-6 ${
                  !alert.is_active ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Alert Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        alert.is_active ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {getConditionIcon(alert.condition)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">
                          {alert.country_code} - {getConditionText(alert.condition)} {alert.target_rate.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Creada el {new Date(alert.created_at).toLocaleDateString('es', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Notification Channels */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-gray-600">Notificar por:</span>
                      {alert.notify_email && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          📧 Email
                        </span>
                      )}
                      {alert.notify_telegram && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          📱 Telegram
                        </span>
                      )}
                      {alert.notify_whatsapp && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          💬 WhatsApp
                        </span>
                      )}
                    </div>

                    {/* Status & Triggered */}
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        alert.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {alert.is_active ? '✓ Activa' : '⏸ Pausada'}
                      </span>
                      {alert.triggered_at && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                          🔔 Activada {new Date(alert.triggered_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAlert(alert.id, alert.is_active)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title={alert.is_active ? 'Pausar' : 'Activar'}
                    >
                      {alert.is_active ? '⏸' : '▶️'}
                    </button>
                    <button
                      onClick={() => router.push(`/alerts/${alert.id}/edit`)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                      title="Editar"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">💡 ¿Cómo funcionan las alertas?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Las alertas se verifican cada hora automáticamente</li>
            <li>• Recibirás notificaciones por los canales que hayas elegido</li>
            <li>• Las alertas se desactivan automáticamente después de activarse</li>
            <li>• Plan Free: máximo 3 alertas activas</li>
            <li>• Plan Premium: alertas ilimitadas + notificaciones prioritarias</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
