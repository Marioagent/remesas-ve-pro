import { NextResponse } from 'next/server'
import { getRAGMac1Instance } from '@/lib/ragmac1-core'

// POST /api/ragmac1 - Query principal de RAGMac1
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query, context, conversationHistory, k = 5, action } = body

    if (!query && !action) {
      return NextResponse.json(
        { error: 'Query o action requerido' },
        { status: 400 }
      )
    }

    // Obtener instancia de RAGMac1
    const ragmac1 = getRAGMac1Instance()

    let response

    // Manejar diferentes acciones
    switch (action) {
      case 'analyze_services':
        response = await ragmac1.analyzeServices(
          body.amount,
          body.requirements
        )
        break

      case 'compare_services':
        response = await ragmac1.compareServices(
          body.services,
          body.amount
        )
        break

      case 'predict_savings':
        response = await ragmac1.predictSavings(
          body.amount,
          body.frequency
        )
        break

      case 'recommend_alert':
        response = await ragmac1.recommendAlert(body.userProfile)
        break

      default:
        // Query estándar
        response = await ragmac1.query({
          query,
          context,
          conversationHistory,
          k
        })
    }

    return NextResponse.json({
      success: true,
      ...response,
      ragmac1: true,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Error en RAGMac1 API:', error)

    // Manejar errores específicos
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        {
          error: 'RAGMac1 no configurado',
          message: 'Configura ANTHROPIC_API_KEY en variables de entorno',
          ragmac1: false
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        error: 'Error en RAGMac1',
        message: error.message,
        ragmac1: false
      },
      { status: 500 }
    )
  }
}

// GET /api/ragmac1 - Estado y estadísticas de RAGMac1
export async function GET() {
  try {
    const ragmac1 = getRAGMac1Instance()
    const stats = ragmac1.getStats()

    return NextResponse.json({
      ragmac1: true,
      status: 'operational',
      version: '1.0.0',
      powered_by: 'MarioAgent',
      stats,
      capabilities: [
        'Análisis inteligente de servicios',
        'Comparación automática',
        'Predicción de ahorros',
        'Recomendaciones personalizadas',
        'Alertas inteligentes',
        'Conversación contextual'
      ],
      endpoints: {
        query: 'POST /api/ragmac1 with { query }',
        analyze: 'POST /api/ragmac1 with { action: "analyze_services", amount, requirements }',
        compare: 'POST /api/ragmac1 with { action: "compare_services", services, amount }',
        predict: 'POST /api/ragmac1 with { action: "predict_savings", amount, frequency }',
        recommend: 'POST /api/ragmac1 with { action: "recommend_alert", userProfile }'
      }
    })

  } catch (error: any) {
    return NextResponse.json({
      ragmac1: false,
      status: 'not_configured',
      message: 'RAGMac1 requiere ANTHROPIC_API_KEY',
      error: error.message
    }, { status: 503 })
  }
}

// DELETE /api/ragmac1 - Limpiar historial
export async function DELETE() {
  try {
    const ragmac1 = getRAGMac1Instance()
    ragmac1.clearHistory()

    return NextResponse.json({
      success: true,
      message: 'Historial de RAGMac1 limpiado'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
