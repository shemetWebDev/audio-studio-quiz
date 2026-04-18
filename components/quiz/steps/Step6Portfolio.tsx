// [EXTRA] Чтобы удалить этот шаг:
// 1. Убери импорт в app/quiz/page.tsx
// 2. Убери {step === 6 && <Step6Portfolio ... />}
// 3. TOTAL_STEPS = 6 в types/form.ts
// 4. Удали portfolioLinks, tracksDescription из FormData

import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step6Portfolio({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <span className={`${b}__extra-badge`}>+ дополнительный шаг</span>

      <p className={`${b}__index`}>06 · Портфолио</p>
      <h2 className={`${b}__heading`}>Ваши работы</h2>
      <p className={`${b}__subheading`}>
        Необязательный шаг — но сильное портфолио значительно ускоряет принятие решения
      </p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Ссылки на работы</label>
        <textarea
          className={`${b}__textarea`}
          placeholder="SoundCloud, Spotify, YouTube, Bandcamp, Google Drive — по одной ссылке на строку"
          value={data.portfolioLinks}
          onChange={e => update({ portfolioLinks: e.target.value })}
          rows={4}
        />
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Что демонстрируют эти работы?</label>
        <textarea
          className={`${b}__textarea`}
          placeholder="Какие треки воссоздавали, что было технически сложно, чем особенно гордитесь..."
          value={data.tracksDescription}
          onChange={e => update({ tracksDescription: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}
