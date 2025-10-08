import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// POST /api/afiliados/track - Registrar click en enlace de afiliado
export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { servicioId, monto, userId } = await request.json()

    if (!servicioId) {
      return NextResponse.json(
        { error: 'Servicio ID requerido' },
        { status: 400 }
      )
    }

    // Registrar el click
    const { data, error } = await supabase
      .from('clicks_afiliados')
      .insert({
        servicio_id: servicioId,
        monto: monto || 0,
        usuario_id: userId || null,
        timestamp: new Date().toISOString(),
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown'
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      clickId: data.id,
      message: 'Click registrado'
    })
  } catch (error) {
    console.error('Error registrando click:', error)
    return NextResponse.json(
      { error: 'Error registrando click' },
      { status: 500 }
    )
  }
}

// GET /api/afiliados/track - Obtener estadísticas de afiliados
export async function GET(request: Request) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const periodo = searchParams.get('periodo') || '30d'

    // Calcular fecha de inicio según período
    const fechaInicio = new Date()
    if (periodo === '7d') {
      fechaInicio.setDate(fechaInicio.getDate() - 7)
    } else if (periodo === '30d') {
      fechaInicio.setDate(fechaInicio.getDate() - 30)
    } else if (periodo === '90d') {
      fechaInicio.setDate(fechaInicio.getDate() - 90)
    }

    // Obtener estadísticas
    const { data: clicks, error } = await supabase
      .from('clicks_afiliados')
      .select('*')
      .gte('timestamp', fechaInicio.toISOString())

    if (error) throw error

    // Calcular estadísticas
    const totalClicks = clicks?.length || 0
    const totalMonto = clicks?.reduce((sum, click) => sum + (click.monto || 0), 0) || 0
    const comisionEstimada = totalMonto * 0.015 // 1.5% promedio

    // Agrupar por servicio
    const porServicio = clicks?.reduce((acc: any, click) => {
      const servicioId = click.servicio_id
      if (!acc[servicioId]) {
        acc[servicioId] = {
          clicks: 0,
          monto: 0
        }
      }
      acc[servicioId].clicks++
      acc[servicioId].monto += click.monto || 0
      return acc
    }, {})

    return NextResponse.json({
      periodo,
      estadisticas: {
        totalClicks,
        totalMonto,
        comisionEstimada,
        conversionRate: totalClicks > 0 ? ((totalMonto / totalClicks) * 100).toFixed(2) : 0
      },
      porServicio
    })
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return NextResponse.json(
      { error: 'Error obteniendo estadísticas' },
      { status: 500 }
    )
  }
}
