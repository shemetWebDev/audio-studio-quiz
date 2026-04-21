'use client'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const DAWS = ['Ableton', 'Logic Pro', 'FL Studio'] as const

export default function Step5Daw({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'

  return (
    <div className={b}>
      <h2 className={`${b}__heading`}>{t.s4Heading}</h2>
      <p className={`${b}__subheading`}>{t.s4Sub}</p>

      <div className={`${b}__field`}>
        <div className={`${b}__options`}>
          {DAWS.map(daw => (
            <button
              key={daw}
              className={`${b}__option${data.daw === daw ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ daw })}
            >
              {daw}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
