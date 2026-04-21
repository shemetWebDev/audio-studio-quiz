'use client'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Step7Portfolio({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'
  const emailInvalid = data.email.length > 0 && !emailRe.test(data.email.trim())

  return (
    <div className={b}>
      <h2 className={`${b}__heading`}>{t.s7Heading}</h2>
      <p className={`${b}__subheading`}>{t.s7Sub}</p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s2LabelEmail}</label>
        <input
          className={`${b}__input`}
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={e => update({ email: e.target.value })}
          style={emailInvalid ? { borderColor: 'rgba(255,80,80,0.6)' } : undefined}
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
  )
}
