'use client'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step2Contacts({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>{t.s2Index}</p>
      <h2 className={`${b}__heading`}>{t.s2Heading}</h2>
      <p className={`${b}__subheading`}>{t.s2Sub}</p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s2LabelName}</label>
        <input
          className={`${b}__input`}
          placeholder={t.s2PlaceholderName}
          value={data.fullName}
          onChange={e => update({ fullName: e.target.value })}
        />
      </div>

      <div className={`${b}__row`}>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>{t.s2LabelEmail}</label>
          <input
            className={`${b}__input`}
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={e => update({ email: e.target.value })}
          />
        </div>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>{t.s2LabelTelegram}</label>
          <input
            className={`${b}__input`}
            placeholder="@username"
            value={data.telegram}
            onChange={e => update({ telegram: e.target.value })}
          />
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s2LabelLocation}</label>
        <input
          className={`${b}__input`}
          placeholder={t.s2PlaceholderLocation}
          value={data.location}
          onChange={e => update({ location: e.target.value })}
        />
      </div>
    </div>
  )
}
