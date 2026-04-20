import { FormData } from '@/types/form'

const confidenceMap: Record<string, string> = {
  easy: '✅ Уверен — справлюсь',
  mixed: '⚠️ Частично понимаю задачу',
  learning: '📚 Хочу разобраться',
}
const assessMap: Record<string, string> = {
  yes: '✅ Справлюсь',
  partially: '⚠️ Частично',
  no: '❌ Затрудняюсь',
}

const val = (v: string | undefined) => v?.trim() || '—'
const opt = (label: string, v: string | undefined) =>
  v?.trim() ? `${label}: ${v.trim()}` : null

export function buildTelegramMessage(data: FormData): string {
  const lines: (string | null)[] = [
    `🎛 *Новая анкета — TopMusicArts*`,
    '',
    `👤 *${val(data.fullName)}*`,
    `📧 ${val(data.email)}`,
    `✈️ ${data.telegram ? `@${data.telegram.replace('@', '')}` : '—'}`,
    `📍 ${val(data.location)}`,
    '',
    `*01 · О себе*`,
    val(data.aboutSelf),
    '',
    `*03 · Задача*`,
    `Оценка: ${confidenceMap[data.taskConfidence] || '—'}`,
    opt('Комментарий', data.taskComment),
    '',
    `*04 · DAW*`,
    val(data.daw),
    '',
    `*05 · Треки*`,
    `Оценка: ${assessMap[data.tracksAssess] || '—'}`,
    opt('Комментарий', data.tracksComment),
    '',
    `*06 · Проект*`,
    `Воссоздать: ${assessMap[data.canRecreate] || '—'}`,
    opt('Комментарий', data.projectComment),
    data.portfolioLinks
      ? ['', `*07 · Портфолио*`, data.portfolioLinks].join('\n')
      : null,
  ]

  return lines.filter(l => l !== null).join('\n')
}

function row(label: string, value: string | undefined) {
  if (!value?.trim()) return ''
  return `
    <tr>
      <td style="padding:5px 16px 5px 0;color:#888;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>
      <td style="padding:5px 0;font-size:14px;color:#111;word-break:break-word">${value}</td>
    </tr>`
}

function section(title: string, rows: string) {
  if (!rows.trim()) return ''
  return `
    <div style="margin-bottom:28px">
      <div style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#bbb;font-weight:600;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #f0f0f0">${title}</div>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
    </div>`
}

export function buildEmailHtml(data: FormData): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.07)">
    <div style="background:#050508;padding:28px 32px">
      <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:8px">TopMusicArts · Hiring</div>
      <div style="font-size:22px;font-weight:600;color:#fff;letter-spacing:-0.02em">Новая анкета</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4);margin-top:4px">${data.fullName || 'Кандидат'}</div>
    </div>
    <div style="padding:28px 32px">
      ${section('Контакты',
        row('Имя', data.fullName) +
        row('Email', data.email) +
        row('Telegram', data.telegram ? `@${data.telegram.replace('@', '')}` : '') +
        row('Локация', data.location)
      )}
      ${section('01 · О себе', row('', data.aboutSelf))}
      ${section('03 · Задача',
        row('Оценка', confidenceMap[data.taskConfidence]) +
        row('Комментарий', data.taskComment)
      )}
      ${section('04 · DAW', row('DAW', data.daw))}
      ${section('05 · Треки',
        row('Оценка', assessMap[data.tracksAssess]) +
        row('Комментарий', data.tracksComment)
      )}
      ${section('06 · Проект',
        row('Воссоздать', assessMap[data.canRecreate]) +
        row('Комментарий', data.projectComment)
      )}
      ${data.portfolioLinks ? section('07 · Портфолио', row('Ссылки', data.portfolioLinks)) : ''}
    </div>
    <div style="padding:14px 32px;border-top:1px solid #f0f0f0;font-size:12px;color:#ccc">
      Анкета получена через сайт · TopMusicArts Hiring
    </div>
  </div>
</body>
</html>`
}

export function buildEmailText(data: FormData): string {
  return buildTelegramMessage(data).replace(/\*/g, '').replace(/\n{3,}/g, '\n\n')
}
