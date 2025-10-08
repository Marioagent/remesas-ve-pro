import { NextResponse } from 'next/server'

// Email notification handler
// This can be implemented with Resend, SendGrid, or any email service

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json()

    // Validate input
    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      )
    }

    // Check if Resend is configured
    if (process.env.RESEND_API_KEY) {
      return await sendWithResend(to, subject, html)
    }

    // Check if SendGrid is configured
    if (process.env.SENDGRID_API_KEY) {
      return await sendWithSendGrid(to, subject, html)
    }

    // No email service configured - log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email Notification (dev mode):')
      console.log(`To: ${to}`)
      console.log(`Subject: ${subject}`)
      console.log(`Body: ${html.substring(0, 200)}...`)

      return NextResponse.json({
        success: true,
        message: 'Email logged to console (development mode)',
        provider: 'console'
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: 'No email service configured. Set RESEND_API_KEY or SENDGRID_API_KEY'
      },
      { status: 500 }
    )

  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    )
  }
}

// Send email with Resend
async function sendWithResend(to: string, subject: string, html: string) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'REME LAT-USA <noreply@remelat.com>',
        to: [to],
        subject,
        html
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email with Resend')
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      provider: 'resend',
      id: data.id
    })

  } catch (error: any) {
    console.error('Resend error:', error)
    throw error
  }
}

// Send email with SendGrid
async function sendWithSendGrid(to: string, subject: string, html: string) {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }]
        }],
        from: {
          email: process.env.EMAIL_FROM || 'noreply@remelat.com',
          name: 'REME LAT-USA'
        },
        subject,
        content: [{
          type: 'text/html',
          value: html
        }]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`SendGrid error: ${errorText}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      provider: 'sendgrid'
    })

  } catch (error: any) {
    console.error('SendGrid error:', error)
    throw error
  }
}
