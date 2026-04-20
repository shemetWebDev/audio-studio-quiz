'use client'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step7Portfolio({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>{t.s7Index}</p>
      <h2 className={`${b}__heading`}>{t.s7Heading}</h2>
      <p className={`${b}__subheading`}>{t.s7Sub}</p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>
          {t.s7LabelPortfolio}
          <span className={`${b}__label-value`} style={{ fontSize: 11, opacity: 0.45 }}>{t.s7Optional}</span>
        </label>
        <textarea
          className={`${b}__textarea`}
          placeholder={t.s7PlaceholderPortfolio}
          value={data.portfolioLinks}
          onChange={e => update({ portfolioLinks: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}
