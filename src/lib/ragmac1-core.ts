/**
 * RAGMac1 Core Integration for Reme Global
 * Sistema central de inteligencia artificial
 */

import Anthropic from '@anthropic-ai/sdk'

interface RAGConfig {
  anthropicApiKey?: string
  model?: string
  temperature?: number
  maxTokens?: number
}

interface RAGDocument {
  content: string
  metadata?: Record<string, any>
  embedding?: number[]
}

interface RAGQuery {
  query: string
  context?: string
  conversationHistory?: Array<{ role: string; content: string }>
  k?: number
}

interface RAGResponse {
  answer: string
  sources?: string[]
  confidence?: number
  conversationId?: string
  usage?: {
    inputTokens: number
    outputTokens: number
  }
}

/**
 * RAGMac1 System - Sistema de Retrieval Augmented Generation
 * Integrado específicamente para Reme Global
 */
export class RAGMac1System {
  private anthropic: Anthropic
  private model: string
  private temperature: number
  private maxTokens: number
  private documents: RAGDocument[] = []
  private conversationHistory: Array<{ role: string; content: string }> = []

  // Context específico de REME LAT-USA
  private remesasContext = `
Eres el asistente experto de REME LAT-USA, powered by RAGMac1.

IMPORTANTE: REME LAT-USA es una plataforma de COMPARACIÓN de tasas de cambio.
NO procesamos transacciones. Solo comparamos tasas de 60+ casas de cambio y servicios,
y redirigimos a los usuarios a los sitios oficiales de cada servicio.

CONOCIMIENTO CORE DE CASAS DE CAMBIO EN LATINOAMÉRICA:

SERVICIOS DISPONIBLES:
1. Zoom - 0% comisión, 15-30 min
   - Mejor para: Envíos rápidos sin comisión
   - Métodos: Tarjeta, transferencia, Zelle
   - Límites: $1 - $5,000

2. Reserve - 1.5% comisión, 5-15 min
   - Mejor para: Máxima velocidad
   - Métodos: Cripto, transferencia
   - Límites: $5 - $3,000

3. AirTM - 2.99% comisión, 30-60 min
   - Mejor para: Múltiples métodos de pago
   - Métodos: Tarjeta, PayPal, Zelle, Wise
   - Límites: $1 - $10,000

4. Binance P2P - 0% comisión, 15-45 min
   - Mejor para: Usuarios crypto
   - Métodos: USDT y otras cryptos
   - Límites: $10 - $20,000

5. Western Union - 3.5% + $8, 1-3 días
   - Mejor para: Envíos grandes, tradicionales
   - Métodos: Tarjeta, transferencia
   - Límites: $10 - $7,500

6. MoneyGram - 3% + $7.5, 1-3 días
   - Mejor para: Red física amplia
   - Métodos: Tarjeta, transferencia, efectivo
   - Límites: $15 - $10,000

7. Remesa Feliz - 1% + $2, 1-2 horas
   - Mejor para: Balance precio/velocidad
   - Métodos: Zelle, transferencia
   - Límites: $20 - $5,000

8. Valiu - 0.5% comisión, 10-20 min
   - Mejor para: Crypto users, bajo costo
   - Métodos: Criptomonedas
   - Límites: $1 - $3,000

TASAS DE CAMBIO:
- BCV (Oficial): Tasa del Banco Central de Venezuela
- Paralelo: Tasa del mercado paralelo venezolano
- Binance P2P: Tasa promedio del mercado P2P de Binance

CAPACIDADES DE RAGMac1:
- Análisis inteligente de mejores opciones
- Comparación en tiempo real
- Recomendaciones personalizadas
- Predicciones de ahorro
- Alertas inteligentes
- Optimización de envíos

TU MISIÓN:
- Ayudar a los usuarios a encontrar la mejor tasa de cambio
- Comparar y recomendar casas de cambio según sus necesidades
- Explicar diferencias entre servicios y tasas
- Calcular ahorros potenciales al elegir mejor
- Alertar sobre mejores oportunidades de tasa
- SIEMPRE aclarar que REME LAT-USA solo compara, no procesa transacciones
- Ser conversacional, amigable y preciso
`.trim()

  constructor(config: RAGConfig = {}) {
    const apiKey = config.anthropicApiKey || process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY no configurada para RAGMac1')
    }

    this.anthropic = new Anthropic({ apiKey })
    this.model = config.model || 'claude-3-5-sonnet-20241022'
    this.temperature = config.temperature || 0.7
    this.maxTokens = config.maxTokens || 2048

    console.log('✅ RAGMac1 System inicializado para REME LAT-USA')
  }

  /**
   * Agregar documentos al sistema RAG
   */
  addDocuments(docs: RAGDocument[]): void {
    this.documents.push(...docs)
    console.log(`📚 RAGMac1: ${docs.length} documentos agregados`)
  }

  /**
   * Query principal de RAGMac1
   */
  async query(params: RAGQuery): Promise<RAGResponse> {
    const { query, context, conversationHistory, k = 5 } = params

    // Buscar documentos relevantes (simplified semantic search)
    const relevantDocs = this.searchDocuments(query, k)

    // Construir contexto completo
    const fullContext = this.buildContext(context, relevantDocs)

    // Construir historial de conversación
    const messages = [
      ...(conversationHistory || this.conversationHistory),
      {
        role: 'user' as const,
        content: query
      }
    ]

    try {
      // Llamar a Claude con RAGMac1
      const response = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        system: this.remesasContext + '\n\n' + fullContext,
        messages: messages as any
      })

      const answer = response.content[0].type === 'text'
        ? response.content[0].text
        : ''

      // Actualizar historial
      this.conversationHistory = [
        ...this.conversationHistory,
        { role: 'user', content: query },
        { role: 'assistant', content: answer }
      ]

      // Mantener solo últimas 10 interacciones
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20)
      }

      return {
        answer,
        sources: relevantDocs.map(d => d.metadata?.source || 'internal'),
        confidence: this.calculateConfidence(relevantDocs),
        conversationId: response.id,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens
        }
      }
    } catch (error: any) {
      console.error('❌ Error en RAGMac1:', error)
      throw new Error(`RAGMac1 Error: ${error.message}`)
    }
  }

  /**
   * Análisis inteligente de servicios
   */
  async analyzeServices(amount: number, requirements?: string): Promise<RAGResponse> {
    const query = requirements
      ? `Para enviar $${amount} USD a Venezuela, considerando: ${requirements}, ¿cuál servicio me recomiendas y por qué?`
      : `¿Cuál es el mejor servicio para enviar $${amount} USD a Venezuela?`

    return this.query({ query })
  }

  /**
   * Comparación inteligente
   */
  async compareServices(services: string[], amount: number): Promise<RAGResponse> {
    const query = `Compara ${services.join(', ')} para enviar $${amount} USD. Dame una tabla con ventajas y desventajas de cada uno.`

    return this.query({ query })
  }

  /**
   * Predicción de ahorro
   */
  async predictSavings(amount: number, frequency: string): Promise<RAGResponse> {
    const query = `Si envío $${amount} USD ${frequency} usando Reme Global para elegir el mejor servicio, ¿cuánto ahorraría en un año versus usar siempre Western Union?`

    return this.query({ query })
  }

  /**
   * Recomendación de alerta
   */
  async recommendAlert(userProfile: any): Promise<RAGResponse> {
    const query = `Basado en este perfil de usuario: ${JSON.stringify(userProfile)}, ¿qué tipo de alerta de tasa le recomendarías configurar?`

    return this.query({ query })
  }

  /**
   * Búsqueda semántica de documentos (simplified)
   */
  private searchDocuments(query: string, k: number): RAGDocument[] {
    if (this.documents.length === 0) return []

    // Simple keyword matching (en producción usaríamos embeddings reales)
    const keywords = query.toLowerCase().split(' ')

    const scored = this.documents.map(doc => {
      const content = doc.content.toLowerCase()
      const score = keywords.reduce((acc, keyword) => {
        return acc + (content.includes(keyword) ? 1 : 0)
      }, 0)

      return { doc, score }
    })

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(item => item.doc)
  }

  /**
   * Construir contexto para Claude
   */
  private buildContext(customContext?: string, docs?: RAGDocument[]): string {
    let context = customContext || ''

    if (docs && docs.length > 0) {
      context += '\n\nDOCUMENTOS RELEVANTES:\n'
      docs.forEach((doc, i) => {
        context += `\n[Documento ${i + 1}]\n${doc.content}\n`
      })
    }

    return context
  }

  /**
   * Calcular confianza de la respuesta
   */
  private calculateConfidence(docs: RAGDocument[]): number {
    if (docs.length === 0) return 0.5
    if (docs.length >= 3) return 0.9
    return 0.7
  }

  /**
   * Limpiar historial de conversación
   */
  clearHistory(): void {
    this.conversationHistory = []
    console.log('🧹 RAGMac1: Historial limpiado')
  }

  /**
   * Obtener estadísticas del sistema
   */
  getStats() {
    return {
      documentsCount: this.documents.length,
      conversationLength: this.conversationHistory.length,
      model: this.model,
      status: 'active'
    }
  }
}

/**
 * Singleton instance de RAGMac1 para Reme Global
 */
let ragInstance: RAGMac1System | null = null

export function getRAGMac1Instance(config?: RAGConfig): RAGMac1System {
  if (!ragInstance) {
    ragInstance = new RAGMac1System(config)
  }
  return ragInstance
}

export default RAGMac1System
