import { NextResponse } from 'next/server'
import { getRAGMac1Instance } from '@/lib/ragmac1-core'

// POST /api/chatbot - Chatbot powered by RAGMac1
export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          error: 'Chatbot no configurado',
          message: 'RAGMac1 requiere ANTHROPIC_API_KEY',
          ragmac1: false
        },
        { status: 503 }
      )
    }

    // Usar RAGMac1 para responder
    const ragmac1 = getRAGMac1Instance()

    const response = await ragmac1.query({
      query: message,
      conversationHistory,
      k: 5
    })

    return NextResponse.json({
      message: response.answer,
      conversationId: response.conversationId,
      sources: response.sources,
      confidence: response.confidence,
      usage: response.usage,
      ragmac1: true,
      powered_by: 'RAGMac1',
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error en chatbot:', error)

    if (error.status === 401) {
      return NextResponse.json(
        { error: 'API key inválida', ragmac1: false },
        { status: 401 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Límite de rate excedido', ragmac1: false },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        error: 'Error procesando mensaje',
        details: error.message,
        ragmac1: false
      },
      { status: 500 }
    )
  }
}

// GET /api/chatbot - Información del chatbot
export async function GET() {
  try {
    const ragmac1 = getRAGMac1Instance()
    const stats = ragmac1.getStats()

    return NextResponse.json({
      chatbot: 'Reme Global Assistant',
      powered_by: 'RAGMac1',
      version: '1.0.0',
      status: 'operational',
      stats,
      preguntasFrecuentes: [
        '¿Cuál es el servicio más rápido?',
        '¿Cuál tiene menor comisión?',
        '¿Cómo funciona Binance P2P?',
        '¿Cuál es la mejor tasa actual?',
        '¿Qué documentos necesito?',
        '¿Cómo configurar alertas?',
        '¿Cuánto puedo ahorrar al año?',
        '¿Qué servicio recomiendas para $500?'
      ],
      categorias: [
        'Comparación de servicios',
        'Tasas de cambio',
        'Costos y comisiones',
        'Tiempos de entrega',
        'Proceso de envío',
        'Alertas inteligentes',
        'Análisis de ahorro'
      ],
      capabilities: [
        'Respuestas contextuales',
        'Análisis inteligente',
        'Recomendaciones personalizadas',
        'Predicción de ahorros',
        'Comparación automática',
        'Memoria conversacional'
      ]
    })

  } catch (error: any) {
    return NextResponse.json({
      chatbot: 'Reme Global Assistant',
      powered_by: 'RAGMac1',
      status: 'not_configured',
      message: 'Configura ANTHROPIC_API_KEY para activar',
      ragmac1: false
    }, { status: 503 })
  }
}
