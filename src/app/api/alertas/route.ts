import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// GET /api/alertas - Obtener alertas del usuario
export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { data: alertas, error } = await supabase
      .from('alertas')
      .select('*')
      .eq('usuario_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ alertas })
  } catch (error) {
    console.error('Error obteniendo alertas:', error)
    return NextResponse.json(
      { error: 'Error obteniendo alertas' },
      { status: 500 }
    )
  }
}

// POST /api/alertas - Crear nueva alerta
export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const {
      tipo,
      fuente,
      condicion,
      valor_objetivo,
      canales // ['telegram', 'whatsapp', 'email']
    } = body

    // Validaciones
    if (!tipo || !condicion || !valor_objetivo) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    // Crear alerta en base de datos
    const { data: alerta, error } = await supabase
      .from('alertas')
      .insert({
        usuario_id: user.id,
        tipo,
        fuente,
        condicion,
        valor_objetivo,
        canales,
        activa: true
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      alerta,
      message: 'Alerta creada exitosamente'
    })
  } catch (error) {
    console.error('Error creando alerta:', error)
    return NextResponse.json(
      { error: 'Error creando alerta' },
      { status: 500 }
    )
  }
}

// PATCH /api/alertas/:id - Actualizar alerta
export async function PATCH(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const alertaId = searchParams.get('id')
    const body = await request.json()

    if (!alertaId) {
      return NextResponse.json(
        { error: 'ID de alerta requerido' },
        { status: 400 }
      )
    }

    const { data: alerta, error } = await supabase
      .from('alertas')
      .update(body)
      .eq('id', alertaId)
      .eq('usuario_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      alerta,
      message: 'Alerta actualizada'
    })
  } catch (error) {
    console.error('Error actualizando alerta:', error)
    return NextResponse.json(
      { error: 'Error actualizando alerta' },
      { status: 500 }
    )
  }
}

// DELETE /api/alertas/:id - Eliminar alerta
export async function DELETE(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const alertaId = searchParams.get('id')

    if (!alertaId) {
      return NextResponse.json(
        { error: 'ID de alerta requerido' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('alertas')
      .delete()
      .eq('id', alertaId)
      .eq('usuario_id', user.id)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Alerta eliminada'
    })
  } catch (error) {
    console.error('Error eliminando alerta:', error)
    return NextResponse.json(
      { error: 'Error eliminando alerta' },
      { status: 500 }
    )
  }
}
