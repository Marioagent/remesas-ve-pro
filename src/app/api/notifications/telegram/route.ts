import { NextResponse } from 'next/server'

// Telegram Bot notification handler

export async function POST(request: Request) {
  try {
    const { chat_id, message, parse_mode = 'Markdown' } = await request.json()

    // Validate input
    if (!chat_id || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: chat_id, message' },
        { status: 400 }
      )
    }

    // Check if Telegram Bot Token is configured
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      // Development mode - log to console
      if (process.env.NODE_ENV === 'development') {
        console.log('📱 Telegram Notification (dev mode):')
        console.log(`Chat ID: ${chat_id}`)
        console.log(`Message: ${message}`)

        return NextResponse.json({
          success: true,
          message: 'Telegram message logged to console (development mode)',
          provider: 'console'
        })
      }

      return NextResponse.json(
        {
          success: false,
          error: 'TELEGRAM_BOT_TOKEN not configured'
        },
        { status: 500 }
      )
    }

    // Send via Telegram Bot API
    const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id,
        text: message,
        parse_mode,
        disable_web_page_preview: false
      })
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      throw new Error(data.description || 'Failed to send Telegram message')
    }

    return NextResponse.json({
      success: true,
      message: 'Telegram notification sent successfully',
      provider: 'telegram',
      message_id: data.result.message_id
    })

  } catch (error: any) {
    console.error('Error sending Telegram notification:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    )
  }
}

// Get Telegram bot info (for setup verification)
export async function GET() {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: 'TELEGRAM_BOT_TOKEN not configured'
        },
        { status: 500 }
      )
    }

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`
    )

    const data = await response.json()

    if (!response.ok || !data.ok) {
      throw new Error(data.description || 'Failed to get bot info')
    }

    return NextResponse.json({
      success: true,
      bot: {
        id: data.result.id,
        username: data.result.username,
        first_name: data.result.first_name
      },
      instructions: {
        step1: `Search for @${data.result.username} on Telegram`,
        step2: 'Send /start to the bot',
        step3: 'Copy your chat_id from the bot response',
        step4: 'Save it in your profile settings'
      }
    })

  } catch (error: any) {
    console.error('Error getting Telegram bot info:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    )
  }
}
