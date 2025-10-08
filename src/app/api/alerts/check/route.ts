import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Types
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
  users: {
    email: string
    full_name?: string
    telegram_chat_id?: string
    whatsapp_number?: string
  }
}

interface CurrentRate {
  rate: number
  source: string
}

// Fetch current rate for a country
async function getCurrentRate(countryCode: string): Promise<CurrentRate | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/tasas/${countryCode}`,
      { next: { revalidate: 0 } }
    )

    if (!response.ok) return null

    const data = await response.json()

    // Get the best (highest) rate from all sources
    if (data.tasas && data.tasas.length > 0) {
      const bestRate = data.tasas.reduce((max: any, current: any) =>
        current.promedio > max.promedio ? current : max
      )

      return {
        rate: bestRate.promedio,
        source: bestRate.fuente
      }
    }

    return null
  } catch (error) {
    console.error(`Error fetching rate for ${countryCode}:`, error)
    return null
  }
}

// Check if alert condition is met
function checkCondition(condition: string, targetRate: number, currentRate: number): boolean {
  switch (condition) {
    case 'below':
      return currentRate < targetRate
    case 'above':
      return currentRate > targetRate
    case 'equals':
      // Within 0.5% tolerance
      return Math.abs(currentRate - targetRate) / targetRate <= 0.005
    default:
      return false
  }
}

// Send email notification
async function sendEmailNotification(alert: Alert, currentRate: CurrentRate) {
  if (!alert.notify_email) return

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/notifications/email`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: alert.users.email,
          subject: `🔔 Alerta de Tasa Activada - ${alert.country_code}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">🔔 ¡Alerta Activada!</h1>
              </div>

              <div style="background: white; padding: 30px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 10px 10px;">
                <p style="font-size: 18px; color: #1F2937; margin-bottom: 20px;">
                  Hola ${alert.users.full_name || 'Usuario'},
                </p>

                <p style="font-size: 16px; color: #4B5563; margin-bottom: 20px;">
                  Tu alerta de tasa de cambio se ha activado:
                </p>

                <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px; color: #6B7280; font-size: 14px;">País:</td>
                      <td style="padding: 10px; color: #1F2937; font-size: 16px; font-weight: bold; text-align: right;">
                        ${alert.country_code}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; color: #6B7280; font-size: 14px;">Condición:</td>
                      <td style="padding: 10px; color: #1F2937; font-size: 16px; font-weight: bold; text-align: right;">
                        ${alert.condition === 'below' ? 'Menor a' : alert.condition === 'above' ? 'Mayor a' : 'Igual a'} ${alert.target_rate.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; color: #6B7280; font-size: 14px;">Tasa Actual:</td>
                      <td style="padding: 10px; color: #10B981; font-size: 20px; font-weight: bold; text-align: right;">
                        ${currentRate.rate.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; color: #6B7280; font-size: 14px;">Fuente:</td>
                      <td style="padding: 10px; color: #1F2937; font-size: 14px; text-align: right;">
                        ${currentRate.source}
                      </td>
                    </tr>
                  </table>
                </div>

                <p style="font-size: 16px; color: #4B5563; margin: 20px 0;">
                  Esta alerta ha sido desactivada automáticamente. Puedes crear una nueva alerta en cualquier momento.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/calculadora"
                     style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Calcular Remesa Ahora
                  </a>
                </div>

                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

                <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
                  REME LAT-USA - Tu comparador de remesas<br>
                  <a href="${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/alerts" style="color: #2563EB;">Gestionar Alertas</a>
                </p>
              </div>
            </div>
          `
        })
      }
    )

    if (!response.ok) {
      console.error('Failed to send email:', await response.text())
    }
  } catch (error) {
    console.error('Error sending email notification:', error)
  }
}

// Send Telegram notification
async function sendTelegramNotification(alert: Alert, currentRate: CurrentRate) {
  if (!alert.notify_telegram || !alert.users.telegram_chat_id) return

  try {
    const message = `
🔔 *Alerta de Tasa Activada*

País: *${alert.country_code}*
Condición: ${alert.condition === 'below' ? '📉 Menor a' : alert.condition === 'above' ? '📈 Mayor a' : '➖ Igual a'} *${alert.target_rate.toFixed(2)}*
Tasa Actual: *${currentRate.rate.toFixed(2)}*
Fuente: ${currentRate.source}

Esta alerta ha sido desactivada automáticamente.

[Calcular Remesa](${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/calculadora) | [Ver Alertas](${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/alerts)
    `.trim()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/notifications/telegram`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: alert.users.telegram_chat_id,
          message,
          parse_mode: 'Markdown'
        })
      }
    )

    if (!response.ok) {
      console.error('Failed to send Telegram:', await response.text())
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error)
  }
}

// Main check function
export async function GET(request: Request) {
  try {
    // Verify cron secret (for Vercel Cron)
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET) {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    // Get all active alerts
    const { data: alerts, error: alertsError } = await supabase
      .from('rate_alerts')
      .select(`
        *,
        users (
          email,
          full_name,
          telegram_chat_id,
          whatsapp_number
        )
      `)
      .eq('is_active', true)
      .is('triggered_at', null)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    if (alertsError) throw alertsError

    if (!alerts || alerts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active alerts to check',
        checked: 0,
        triggered: 0
      })
    }

    console.log(`Checking ${alerts.length} active alerts...`)

    let triggeredCount = 0
    const results = []

    // Check each alert
    for (const alert of alerts as Alert[]) {
      try {
        // Get current rate for country
        const currentRate = await getCurrentRate(alert.country_code)

        if (!currentRate) {
          console.log(`No rate available for ${alert.country_code}`)
          continue
        }

        // Check if condition is met
        const conditionMet = checkCondition(alert.condition, alert.target_rate, currentRate.rate)

        if (conditionMet) {
          console.log(`Alert ${alert.id} triggered! Target: ${alert.target_rate}, Current: ${currentRate.rate}`)

          // Send notifications
          await Promise.all([
            sendEmailNotification(alert, currentRate),
            sendTelegramNotification(alert, currentRate),
            // sendWhatsAppNotification can be added here
          ])

          // Update alert: deactivate and mark as triggered
          await supabase
            .from('rate_alerts')
            .update({
              is_active: false,
              triggered_at: new Date().toISOString()
            })
            .eq('id', alert.id)

          triggeredCount++
          results.push({
            alert_id: alert.id,
            country: alert.country_code,
            triggered: true,
            target: alert.target_rate,
            current: currentRate.rate
          })
        } else {
          results.push({
            alert_id: alert.id,
            country: alert.country_code,
            triggered: false,
            target: alert.target_rate,
            current: currentRate.rate
          })
        }

      } catch (error) {
        console.error(`Error checking alert ${alert.id}:`, error)
        results.push({
          alert_id: alert.id,
          error: (error as Error).message
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Checked ${alerts.length} alerts, ${triggeredCount} triggered`,
      checked: alerts.length,
      triggered: triggeredCount,
      results
    })

  } catch (error: any) {
    console.error('Error in alerts check:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    )
  }
}

// Allow POST as well for manual triggers
export async function POST(request: Request) {
  return GET(request)
}
