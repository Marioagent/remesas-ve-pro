'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Award,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import TasasAPI from '@/lib/api-clients/tasas-api'
import ServiciosRemesasAPI, { SERVICIOS_REMESAS } from '@/lib/api-clients/servicios-remesas'
import { TasaCambio, ServicioRemesa } from '@/types'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface ResultadoComparacion {
  servicio: ServicioRemesa
  costoEnvio: number
  montoRecibir: number
  montoTotal: number
  tasaEfectiva: number
  ahorro?: number
  ranking: number
}

export default function CalculadoraPage() {
  const [montoUSD, setMontoUSD] = useState<string>('100')
  const [tasaSeleccionada, setTasaSeleccionada] = useState<string>('Paralelo')
  const [tasas, setTasas] = useState<TasaCambio[]>([])
  const [resultados, setResultados] = useState<ResultadoComparacion[]>([])
  const [loading, setLoading] = useState(false)
  const [calculado, setCalculado] = useState(false)

  useEffect(() => {
    cargarTasas()
  }, [])

  const cargarTasas = async () => {
    try {
      const data = await TasasAPI.obtenerTodasLasTasas()
      setTasas(data)
      if (data.length > 0 && !tasaSeleccionada) {
        setTasaSeleccionada(data[0].fuente)
      }
    } catch (error) {
      console.error('Error cargando tasas:', error)
    }
  }

  const calcularComparacion = () => {
    setLoading(true)
    setCalculado(false)

    const monto = parseFloat(montoUSD)
    if (isNaN(monto) || monto <= 0) {
      setLoading(false)
      return
    }

    // Obtener tasa seleccionada
    const tasa = tasas.find(t => t.fuente === tasaSeleccionada)
    if (!tasa) {
      setLoading(false)
      return
    }

    // Calcular para cada servicio
    const comparaciones = SERVICIOS_REMESAS
      .filter(s => s.disponibilidad)
      .filter(s => monto >= s.montoMinimo && monto <= s.montoMaximo)
      .map(servicio => {
        const costoEnvio = ServiciosRemesasAPI.calcularCostoTotal(servicio, monto)
        const montoRecibir = ServiciosRemesasAPI.calcularMontoRecibir(servicio, monto, tasa.promedio)
        const montoTotal = monto + costoEnvio

        return {
          servicio,
          costoEnvio,
          montoRecibir,
          montoTotal,
          tasaEfectiva: montoRecibir / monto,
          ranking: 0
        }
      })
      .sort((a, b) => b.montoRecibir - a.montoRecibir)

    // Agregar ranking y calcular ahorro
    const mejorMonto = comparaciones[0]?.montoRecibir || 0
    const resultadosConRanking = comparaciones.map((comp, index) => ({
      ...comp,
      ranking: index + 1,
      ahorro: mejorMonto - comp.montoRecibir
    }))

    setTimeout(() => {
      setResultados(resultadosConRanking)
      setCalculado(true)
      setLoading(false)
    }, 500)
  }

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    if (valor === '' || /^\d*\.?\d*$/.test(valor)) {
      setMontoUSD(valor)
      setCalculado(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                RemesasVE Pro
              </span>
            </Link>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Inicio
              </Link>
              <Link
                href="/calculadora"
                className="text-blue-600 font-semibold"
              >
                Calculadora
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Calculadora de Remesas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Compara 8+ servicios y encuentra la mejor opción para tu envío
          </motion.p>
        </div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Monto Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monto a Enviar
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                  $
                </span>
                <input
                  type="text"
                  value={montoUSD}
                  onChange={handleMontoChange}
                  placeholder="100"
                  className="w-full pl-10 pr-4 py-4 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Monto en dólares estadounidenses (USD)
              </p>
            </div>

            {/* Tasa Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tasa de Cambio
              </label>
              <select
                value={tasaSeleccionada}
                onChange={(e) => {
                  setTasaSeleccionada(e.target.value)
                  setCalculado(false)
                }}
                className="w-full px-4 py-4 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition appearance-none bg-white"
              >
                {tasas.map(tasa => (
                  <option key={tasa.fuente} value={tasa.fuente}>
                    {tasa.fuente} - {formatNumber(tasa.promedio, 2)} Bs/USD
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-2">
                Selecciona la tasa de referencia
              </p>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calcularComparacion}
            disabled={loading || !montoUSD || parseFloat(montoUSD) <= 0}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Calculando...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Comparar Servicios
              </>
            )}
          </button>
        </motion.div>

        {/* Results */}
        {calculado && resultados.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Resultados de Comparación
              </h2>
              <div className="text-sm text-gray-600">
                {resultados.length} servicios disponibles
              </div>
            </div>

            {resultados.map((resultado, index) => (
              <motion.div
                key={resultado.servicio.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition ${
                  resultado.ranking === 1
                    ? 'ring-2 ring-green-500 bg-gradient-to-r from-green-50 to-white'
                    : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Service Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {resultado.ranking === 1 && (
                      <Award className="w-8 h-8 text-green-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {resultado.servicio.nombre}
                        </h3>
                        {resultado.ranking === 1 && (
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            MEJOR OPCIÓN
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {resultado.servicio.tiempoEntrega}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          Comisión: {formatCurrency(resultado.costoEnvio)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amounts */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Recibes</div>
                      <div className="text-2xl md:text-3xl font-bold text-green-600">
                        {formatNumber(resultado.montoRecibir, 2)} Bs
                      </div>
                      <div className="text-xs text-gray-500">
                        Tasa efectiva: {formatNumber(resultado.tasaEfectiva, 2)}
                      </div>
                    </div>

                    {resultado.ahorro !== undefined && resultado.ahorro > 0 && (
                      <div className="text-center bg-red-50 px-4 py-2 rounded-lg">
                        <div className="text-xs text-red-600 font-semibold">Pierdes</div>
                        <div className="text-lg font-bold text-red-600">
                          {formatNumber(resultado.ahorro, 2)} Bs
                        </div>
                      </div>
                    )}

                    {resultado.ranking === 1 && (
                      <div className="text-center bg-green-50 px-4 py-2 rounded-lg">
                        <div className="text-xs text-green-600 font-semibold">Ahorras</div>
                        <div className="text-lg font-bold text-green-600">
                          ¡Mejor tasa!
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <a
                      href={resultado.servicio.urlAfiliado || resultado.servicio.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        resultado.ranking === 1
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap`}
                    >
                      Enviar Ahora
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {calculado && resultados.length === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
            <p className="text-yellow-800 font-semibold">
              No hay servicios disponibles para este monto.
              Intenta con una cantidad diferente.
            </p>
          </div>
        )}

        {/* Info Cards */}
        {!calculado && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: 'Comparación Instantánea',
                description: 'Ve en segundos cuál servicio te da la mejor tasa'
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: 'Ahorra en Cada Envío',
                description: 'La diferencia puede ser hasta 8% entre servicios'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Totalmente Gratis',
                description: '100% gratuito, sin comisiones ocultas por usar el comparador'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
