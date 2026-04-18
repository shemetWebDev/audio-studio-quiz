import { NextRequest, NextResponse } from 'next/server'
import { buildTelegramMessage, buildEmailHtml, buildEmailText } from '@/lib/buildMessage'
import { FormData } from '@/types/form'

// ─── Config ───────────────────────────────────────────────────────────────────
// Скопируй .env.local.example → .env.local и заполни значения

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '' // ← токен бота от @BotFather
const TELEGRAM_CHAT_ID   = process.env.TELEGRAM_CHAT_ID   ?? '' // ← chat id (@userinfobot)
const RESEND_API_KEY     = process.env.RESEND_API_KEY      ?? '' // ← resend.com API key
const EMAIL_TO           = process.env.EMAIL_TO            ?? '' // ← куда приходят анкеты
const EMAIL_FROM         = process.env.EMAIL_FROM          ?? '' // ← от кого (верифицирован в Resend)

// ─── Telegram ─────────────────────────────────────────────────────────────────

async function sendTelegram(text: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[Telegram] Токены не заданы — пропускаем')
    return
  }
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    console.error('[Telegram] Ошибка:', err)
    throw new Error('Telegram send failed')
  }
}

// ─── Email via Resend ─────────────────────────────────────────────────────────

async function sendEmail(html: string, text: string, name: string): Promise<void> {
  if (!RESEND_API_KEY || !EMAIL_TO) {
    console.warn('[Email] Resend не настроен — пропускаем')
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      subject: `🎛 Анкета — ${name || 'Кандидат'} · Audio Studio`,
      html,
      text,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error('[Email] Ошибка:', err)
    throw new Error('Email send failed')
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const data: FormData = await req.json()

    const [tgResult, emailResult] = await Promise.allSettled([
      sendTelegram(buildTelegramMessage(data)),
      sendEmail(buildEmailHtml(data), buildEmailText(data), data.fullName),
    ])

    const errors = [tgResult, emailResult]
      .filter(r => r.status === 'rejected')
      .map(r => (r as PromiseRejectedResult).reason?.message)

    // Оба упали — возвращаем ошибку
    if (errors.length === 2) {
      return NextResponse.json({ ok: false, errors }, { status: 500 })
    }

    // Хотя бы один канал сработал
    return NextResponse.json({ ok: true, ...(errors.length ? { warnings: errors } : {}) })
  } catch (err) {
    console.error('[Submit]', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
