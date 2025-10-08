// Sistema de notificaciones para WhatsApp y Telegram

interface NotificacionParams {
  destinatario: string
  mensaje: string
  tipo: 'whatsapp' | 'telegram' | 'email'
}

// Cliente Telegram
export class TelegramNotifier {
  private botToken: string
  private apiUrl: string

  constructor(botToken?: string) {
    this.botToken = botToken || process.env.TELEGRAM_BOT_TOKEN || ''
    this.apiUrl = `https://api.telegram.org/bot${this.botToken}`
  }

  async enviarMensaje(chatId: string, mensaje: string): Promise<boolean> {
    if (!this.botToken) {
      console.warn('Token de Telegram no configurado')
      return false
    }

    try {
      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: mensaje,
          parse_mode: 'Markdown'
        })
      })

      const data = await response.json()
      return data.ok
    } catch (error) {
      console.error('Error enviando mensaje Telegram:', error)
      return false
    }
  }

  async enviarAlertaTasa(chatId: string, fuente: string, tasa: number, condicion: string) {
    const mensaje = `
🚨 *Alerta de Tasa - Reme Global*

💱 *${fuente}*: Bs ${tasa.toFixed(2)}

La tasa cumple con tu condición: *${condicion}*

👉 [Ver en Reme Global](https://remesasve.pro)
    `.trim()

    return this.enviarMensaje(chatId, mensaje)
  }
}

// Cliente WhatsApp (Twilio)
export class WhatsAppNotifier {
  private accountSid: string
  private authToken: string
  private whatsappNumber: string

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || ''
    this.authToken = process.env.TWILIO_AUTH_TOKEN || ''
    this.whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'
  }

  async enviarMensaje(destinatario: string, mensaje: string): Promise<boolean> {
    if (!this.accountSid || !this.authToken) {
      console.warn('Credenciales de Twilio no configuradas')
      return false
    }

    try {
      const auth = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64')

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: this.whatsappNumber,
            To: `whatsapp:${destinatario}`,
            Body: mensaje
          })
        }
      )

      return response.ok
    } catch (error) {
      console.error('Error enviando mensaje WhatsApp:', error)
      return false
    }
  }

  async enviarAlertaTasa(destinatario: string, fuente: string, tasa: number, condicion: string) {
    const mensaje = `
🚨 Alerta de Tasa - Reme Global

💱 ${fuente}: Bs ${tasa.toFixed(2)}

La tasa cumple con tu condición: ${condicion}

👉 Ver en: https://remesasve.pro
    `.trim()

    return this.enviarMensaje(destinatario, mensaje)
  }
}

// Sistema unificado de notificaciones
export class NotificationService {
  private telegram: TelegramNotifier
  private whatsapp: WhatsAppNotifier

  constructor() {
    this.telegram = new TelegramNotifier()
    this.whatsapp = new WhatsAppNotifier()
  }

  async enviarNotificacion(params: NotificacionParams): Promise<boolean> {
    const { destinatario, mensaje, tipo } = params

    try {
      if (tipo === 'telegram') {
        return await this.telegram.enviarMensaje(destinatario, mensaje)
      } else if (tipo === 'whatsapp') {
        return await this.whatsapp.enviarMensaje(destinatario, mensaje)
      } else if (tipo === 'email') {
        // Implementar envío de email si es necesario
        console.log('Email notification not implemented yet')
        return false
      }
      return false
    } catch (error) {
      console.error('Error en envío de notificación:', error)
      return false
    }
  }

  async enviarAlertaTasa(
    destinatario: string,
    tipo: 'telegram' | 'whatsapp',
    fuente: string,
    tasa: number,
    condicion: string
  ): Promise<boolean> {
    if (tipo === 'telegram') {
      return await this.telegram.enviarAlertaTasa(destinatario, fuente, tasa, condicion)
    } else {
      return await this.whatsapp.enviarAlertaTasa(destinatario, fuente, tasa, condicion)
    }
  }

  async enviarAlertaMulticanal(
    canales: Array<{ tipo: 'telegram' | 'whatsapp', destinatario: string }>,
    fuente: string,
    tasa: number,
    condicion: string
  ): Promise<{ exitosos: number, fallidos: number }> {
    let exitosos = 0
    let fallidos = 0

    const promesas = canales.map(async (canal) => {
      const exito = await this.enviarAlertaTasa(
        canal.destinatario,
        canal.tipo,
        fuente,
        tasa,
        condicion
      )
      if (exito) exitosos++
      else fallidos++
    })

    await Promise.all(promesas)

    return { exitosos, fallidos }
  }
}

export default new NotificationService()
