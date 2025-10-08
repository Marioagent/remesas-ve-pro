'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  BarChart3,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react'
import { getCurrentUser, signOut } from '@/lib/auth'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [alertas, setAlertas] = useState([])
  const [estadisticas, setEstadisticas] = useState({
    totalEnviado: 0,
    numeroEnvios: 0,
    ahorroTotal: 0,
  })
  const [loading, setLoading] = useState(true)
  const [ragmac1Prediction, setRagmac1Prediction] = useState<string>('')
  const [ragmac1AlertRecommendation, setRagmac1AlertRecommendation] = useState<string>('')
  const [ragmac1Loading, setRagmac1Loading] = useState(false)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const { user: userData, profile } = await getCurrentUser()

      if (userData) {
        setUser({ ...userData, profile })
        await cargarAlertas()
        await cargarEstadisticas()
      }
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const cargarAlertas = async () => {
    try {
      const response = await fetch('/api/alertas')
      const data = await response.json()
      setAlertas(data.alertas || [])
    } catch (error) {
      console.error('Error cargando alertas:', error)
    }
  }

  const cargarEstadisticas = async () => {
    // Simular estadísticas por ahora
    setEstadisticas({
      totalEnviado: 5420.50,
      numeroEnvios: 12,
      ahorroTotal: 234.80,
    })
  }

  const cerrarSesion = async () => {
    await signOut()
    window.location.href = '/'
  }

  const obtenerPrediccionAhorros = async () => {
    setRagmac1Loading(true)
    setRagmac1Prediction('')

    try {
      // Calcular promedio mensual basado en estadísticas
      const promedioMensual = estadisticas.totalEnviado / Math.max(estadisticas.numeroEnvios, 1)

      const response = await fetch('/api/ragmac1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'predict_savings',
          amount: Math.round(promedioMensual),
          frequency: 'mensualmente'
        })
      })

      const data = await response.json()

      if (data.success && data.answer) {
        setRagmac1Prediction(data.answer)
      } else {
        setRagmac1Prediction('RAGMac1 no disponible. Configura ANTHROPIC_API_KEY.')
      }
    } catch (error) {
      console.error('Error obteniendo predicción:', error)
      setRagmac1Prediction('Error al obtener predicción.')
    } finally {
      setRagmac1Loading(false)
    }
  }

  const obtenerRecomendacionAlertas = async () => {
    setRagmac1Loading(true)
    setRagmac1AlertRecommendation('')

    try {
      const promedioMensual = estadisticas.totalEnviado / Math.max(estadisticas.numeroEnvios, 1)

      const userProfile = {
        frequency: 'monthly',
        averageAmount: Math.round(promedioMensual),
        preferredServices: ['zoom', 'reserve'],
        currentAlerts: alertas.length
      }

      const response = await fetch('/api/ragmac1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'recommend_alert',
          userProfile
        })
      })

      const data = await response.json()

      if (data.success && data.answer) {
        setRagmac1AlertRecommendation(data.answer)
      } else {
        setRagmac1AlertRecommendation('RAGMac1 no disponible. Configura ANTHROPIC_API_KEY.')
      }
    } catch (error) {
      console.error('Error obteniendo recomendación alertas:', error)
      setRagmac1AlertRecommendation('Error al obtener recomendación.')
    } finally {
      setRagmac1Loading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Inicia sesión para acceder
          </h2>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition inline-block"
          >
            Ir a inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/logo-reme-lat-usa.svg" alt="REME LAT-USA" className="w-10 h-10 drop-shadow-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                REME LAT-USA
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={cerrarSesion}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Hola, {user.profile?.full_name || user.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Bienvenido a tu panel de control de REME LAT-USA
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Enviado</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${estadisticas.totalEnviado.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {estadisticas.numeroEnvios} envíos realizados
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Ahorro Total</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              ${estadisticas.ahorroTotal.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              vs servicios tradicionales
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Alertas Activas</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {alertas.length}
            </div>
            <div className="text-sm text-gray-500">
              Configuradas
            </div>
          </motion.div>
        </div>

        {/* RAGMac1 Intelligent Insights */}
        <div className="mb-8 space-y-6">
          {/* Savings Prediction Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl shadow-xl p-8 border-2 border-purple-200"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Predicción de Ahorros RAGMac1
                  </h2>
                  <p className="text-sm text-gray-600">
                    IA especializada en comparación de tasas de cambio
                  </p>
                </div>
              </div>
              <button
                onClick={obtenerPrediccionAhorros}
                disabled={ragmac1Loading}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
              >
                {ragmac1Loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Calcular Ahorro
                  </>
                )}
              </button>
            </div>

            {ragmac1Prediction && (
              <div className="bg-white rounded-2xl p-6 shadow-inner">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {ragmac1Prediction}
                </p>
                <div className="mt-4 pt-4 border-t border-purple-100 flex items-center gap-2 text-sm text-purple-600">
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">
                    Análisis generado por RAGMac1 AI
                  </span>
                </div>
              </div>
            )}

            {!ragmac1Prediction && !ragmac1Loading && (
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-300" />
                <p>
                  Haz clic en &quot;Calcular Ahorro&quot; para obtener una predicción personalizada
                </p>
              </div>
            )}
          </motion.div>

          {/* Alert Recommendation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Bell className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recomendación de Alertas Inteligentes
                  </h2>
                  <p className="text-sm text-gray-600">
                    Configura alertas óptimas según tu perfil
                  </p>
                </div>
              </div>
              <button
                onClick={obtenerRecomendacionAlertas}
                disabled={ragmac1Loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
              >
                {ragmac1Loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Obtener Recomendación
                  </>
                )}
              </button>
            </div>

            {ragmac1AlertRecommendation && (
              <div className="bg-white rounded-2xl p-6 shadow-inner">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {ragmac1AlertRecommendation}
                </p>
                <div className="mt-4 pt-4 border-t border-blue-100 flex items-center gap-2 text-sm text-blue-600">
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">
                    Recomendación generada por RAGMac1 AI
                  </span>
                </div>
              </div>
            )}

            {!ragmac1AlertRecommendation && !ragmac1Loading && (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-blue-300" />
                <p>
                  Haz clic en &quot;Obtener Recomendación&quot; para configurar alertas optimizadas
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Alertas Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Mis Alertas</h2>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <Plus className="w-4 h-4" />
                Nueva
              </button>
            </div>

            {alertas.length > 0 ? (
              <div className="space-y-4">
                {alertas.slice(0, 3).map((alerta: any, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">
                        {alerta.fuente || 'Todas las fuentes'}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alerta.activa
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {alerta.activa ? 'Activa' : 'Pausada'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Tasa {alerta.condicion} Bs {alerta.valor_objetivo}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">
                  No tienes alertas configuradas
                </p>
                <button className="text-blue-600 hover:underline font-medium">
                  Crear mi primera alerta
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Acciones Rápidas
            </h2>

            <div className="space-y-4">
              <a
                href="/calculadora"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition"
              >
                <div className="p-3 bg-blue-600 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Comparar Tasas
                  </div>
                  <div className="text-sm text-gray-600">
                    Ver mejores tasas de cambio
                  </div>
                </div>
              </a>

              <a
                href="/dashboard/estadisticas"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-md transition"
              >
                <div className="p-3 bg-green-600 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Ver Estadísticas
                  </div>
                  <div className="text-sm text-gray-600">
                    Análisis detallado de tus envíos
                  </div>
                </div>
              </a>

              <a
                href="/dashboard/configuracion"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition"
              >
                <div className="p-3 bg-purple-600 rounded-xl">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Configuración
                  </div>
                  <div className="text-sm text-gray-600">
                    Personaliza tu cuenta
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
