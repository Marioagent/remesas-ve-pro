'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Clock, Shield, Zap, Users } from 'lucide-react'
import TasasAPI from '@/lib/api-clients/tasas-api'
import { TasaCambio } from '@/types'
import { formatNumber } from '@/lib/utils'

export default function Home() {
  const [tasas, setTasas] = useState<TasaCambio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarTasas()
  }, [])

  const cargarTasas = async () => {
    try {
      const data = await TasasAPI.obtenerTodasLasTasas()
      setTasas(data)
    } catch (error) {
      console.error('Error cargando tasas:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header/Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                RemesasVE Pro
              </span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#calculadora" className="text-gray-700 hover:text-blue-600 transition">
                Calculadora
              </a>
              <a href="#comparador" className="text-gray-700 hover:text-blue-600 transition">
                Comparador
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-blue-600 transition">
                Cómo Funciona
              </a>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
              Comenzar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Envía remesas a{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Venezuela
              </span>{' '}
              con la mejor tasa
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Compara en tiempo real las tasas de cambio de todos los servicios de remesas.
              Ahorra hasta 8% en cada envío. 100% seguro y transparente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/calculadora"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg hover:shadow-xl text-center"
              >
                Calcular Ahora
              </a>
              <a
                href="/calculadora"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold text-lg transition text-center"
              >
                Ver Demo
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold text-gray-900">8+</div>
                <div className="text-sm text-gray-600">Servicios</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Actualización</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">0%</div>
                <div className="text-sm text-gray-600">Comisión</div>
              </div>
            </div>
          </motion.div>

          {/* Live Rates Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Tasas en Vivo</h3>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Actualizado</span>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {tasas.map((tasa, index) => (
                  <motion.div
                    key={tasa.fuente}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tasa.icono}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{tasa.fuente}</div>
                          <div className="text-xs text-gray-500">{tasa.nombre}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatNumber(tasa.promedio, 2)}
                        </div>
                        <div className="text-xs text-gray-500">Bs/USD</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <button
              onClick={cargarTasas}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
            >
              Actualizar Tasas
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué RemesasVE Pro?
            </h2>
            <p className="text-xl text-gray-600">
              La forma más inteligente de enviar dinero a Venezuela
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Mejor Tasa Garantizada',
                description: 'Comparamos 8+ servicios en tiempo real para que siempre obtengas el mejor precio'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Entrega Rápida',
                description: 'Desde 5 minutos hasta tu cuenta. Sin esperas innecesarias'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: '100% Seguro',
                description: 'Solo trabajamos con servicios verificados y legales'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Sin Comisiones Ocultas',
                description: 'Transparencia total. Sabes exactamente cuánto llega'
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Ahorra hasta 8%',
                description: 'En cada envío comparado con servicios tradicionales'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Miles Confían en Nosotros',
                description: 'Únete a la comunidad de venezolanos que ahorran'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 hover:shadow-xl transition"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Comienza a Ahorrar Hoy
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de venezolanos que ya están ahorrando en cada envío
          </p>
          <a
            href="/calculadora"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition shadow-lg hover:shadow-xl inline-block"
          >
            Calcular Mi Primera Remesa
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-6 h-6" />
                <span className="text-xl font-bold">RemesasVE Pro</span>
              </div>
              <p className="text-gray-400">
                La mejor forma de enviar dinero a Venezuela
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Calculadora</a></li>
                <li><a href="#" className="hover:text-white transition">Comparador</a></li>
                <li><a href="#" className="hover:text-white transition">Alertas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@remesasve.pro</li>
                <li>@RemesasVEPro</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RemesasVE Pro. Todos los derechos reservados.</p>
            <p className="mt-2 text-sm">
              No procesamos transacciones. Comparamos y redirigimos a servicios legales.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
