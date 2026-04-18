import { FormData } from '@/types/form'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const expMap:    Record<string, string> = { yes: '✅ Есть опыт', learning: '📚 В процессе', no: '🆕 Впервые' }
const theoryMap: Record<string, string> = { basic: 'Базовый', intermediate: 'Средний', advanced: 'Профессиональный' }
const serumMap:  Record<string, string> = { none: 'Не работал', basic: 'Базовый', intermediate: 'Средний', advanced: 'Продвинутый' }
const stockMap:  Record<string, string> = { yes: '✅ Комфортно', sometimes: '⚠️ Иногда', no: '❌ Предпочитает свои' }
const availMap:  Record<string, string> = { fulltime: 'Полная занятость', parttime: 'Частичная', project: 'Проектная' }
const recreateMap: Record<string, string> = { yes: '✅ Справлюсь', partially: '⚠️ Частично', no: '❌ Затрудняюсь' }

const val = (v: string | number | undefined) => v || '—'

// ─── Telegram (Markdown) ──────────────────────────────────────────────────────

export function buildTelegramMessage(data: FormData): string {
  const genres = [...data.genres, data.otherGenres].filter(Boolean).join(', ')

  const lines: (string | null)[] = [
    `🎛 *Новая анкета — Audio Studio*`,
    '',
    `*01 · Контакты*`,
    `👤 ${val(data.fullName)}`,
    `📧 ${val(data.email)}`,
    `✈️ ${data.telegram ? `@${data.telegram.replace('@', '')}` : '—'}`,
    `📍 ${val(data.location)}`,
    '',
    `*02 · Опыт воссоздания*`,
    `Опыт: ${expMap[data.hasRecreationExp] || '—'}`,
    data.recreationCount   ? `Треков воссоздано: ${data.recreationCount}` : null,
    data.recreationDetails ? `Подход к анализу: ${data.recreationDetails}` : null,
    data.experienceLinks   ? `Примеры работ: ${data.experienceLinks}` : null,
    '',
    `*03 · DAW и навыки*`,
    `DAW: ${val(data.daw)}${data.dawYears ? ` · ${data.dawYears} лет` : ''}`,
    `Жанры: ${genres || '—'}`,
    `Муз. теория: ${theoryMap[data.theoryLevel] || '—'}`,
    '',
    `*04 · Тестовое задание*`,
    `Оценка: ${recreateMap[data.canRecreate] || '—'}`,
    data.recreateApproach ? `Подход: ${data.recreateApproach}` : null,
    `Время: ${val(data.timeEstimate)}`,
    `Сложность: ${data.difficultyScore}/10`,
    '',
    `*05 · Плагины*`,
    `Знает: ${data.knownPlugins.length ? data.knownPlugins.join(', ') : '—'}`,
    `Уровень Serum: ${serumMap[data.serumLevel] || '—'}`,
    `Стоковые: ${stockMap[data.stockPluginsOk] || '—'}`,
    data.pluginNotes ? `Дополнительно: ${data.pluginNotes}` : null,

    data.portfolioLinks || data.tracksDescription
      ? ['', '*06 · Портфолио*'].join('\n') : null,
    data.portfolioLinks    ? `Ссылки: ${data.portfolioLinks}` : null,
    data.tracksDescription ? `Описание: ${data.tracksDescription}` : null,

    data.availability || data.rateExpectation
      ? ['', '*07 · Условия*'].join('\n') : null,
    data.availability    ? `Формат: ${availMap[data.availability] || '—'}` : null,
    data.rateExpectation ? `Оплата: ${data.rateExpectation}` : null,
    data.startDate       ? `Старт: ${data.startDate}` : null,
    data.additionalInfo  ? `Доп. информация: ${data.additionalInfo}` : null,
  ]

  return lines.filter(l => l !== null).join('\n')
}

// ─── Email HTML ───────────────────────────────────────────────────────────────

function row(label: string, value: string | number | undefined) {
  if (!value) return ''
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
  const genres = [...data.genres, data.otherGenres].filter(Boolean).join(', ')
  const recreateLabel = { yes: '✅ Справлюсь', partially: '⚠️ Частично', no: '❌ Затрудняюсь' }

  return `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.07)">

    <div style="background:#050508;padding:28px 32px">
      <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:8px">Audio Studio · Hiring</div>
      <div style="font-size:22px;font-weight:600;color:#fff;letter-spacing:-0.02em">Новая анкета</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.4);margin-top:4px">${data.fullName || 'Кандидат'}</div>
    </div>

    <div style="padding:28px 32px">
      ${section('01 · Контакты',
        row('Имя', data.fullName) +
        row('Email', data.email) +
        row('Telegram', data.telegram ? `@${data.telegram.replace('@', '')}` : '') +
        row('Локация', data.location)
      )}
      ${section('02 · Опыт воссоздания',
        row('Опыт', expMap[data.hasRecreationExp]) +
        row('Треков воссоздано', data.recreationCount) +
        row('Подход к анализу', data.recreationDetails) +
        row('Примеры работ', data.experienceLinks)
      )}
      ${section('03 · DAW и навыки',
        row('DAW', `${data.daw}${data.dawYears ? ` · ${data.dawYears} лет` : ''}`) +
        row('Жанры', genres) +
        row('Муз. теория', theoryMap[data.theoryLevel])
      )}
      ${section('04 · Тестовое задание',
        row('Оценка', recreateLabel[data.canRecreate as keyof typeof recreateLabel]) +
        row('Подход', data.recreateApproach) +
        row('Время', data.timeEstimate) +
        row('Сложность', data.difficultyScore ? `${data.difficultyScore}/10` : '')
      )}
      ${section('05 · Плагины',
        row('Знает', data.knownPlugins.join(', ')) +
        row('Уровень Serum', serumMap[data.serumLevel]) +
        row('Стоковые плагины', stockMap[data.stockPluginsOk]) +
        row('Дополнительно', data.pluginNotes)
      )}
      ${data.portfolioLinks || data.tracksDescription ? section('06 · Портфолио',
        row('Ссылки', data.portfolioLinks) +
        row('Описание', data.tracksDescription)
      ) : ''}
      ${data.availability || data.rateExpectation ? section('07 · Условия',
        row('Формат', availMap[data.availability]) +
        row('Оплата', data.rateExpectation) +
        row('Старт', data.startDate) +
        row('Доп. информация', data.additionalInfo)
      ) : ''}
    </div>

    <div style="padding:14px 32px;border-top:1px solid #f0f0f0;font-size:12px;color:#ccc">
      Анкета получена через сайт · Audio Studio Hiring
    </div>
  </div>
</body>
</html>`
}

export function buildEmailText(data: FormData): string {
  return buildTelegramMessage(data).replace(/\*/g, '').replace(/\n{3,}/g, '\n\n')
}
