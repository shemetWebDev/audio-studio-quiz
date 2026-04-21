'use client'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step1Join({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'

  return (
    <div className={b}>
      <h2 className={`${b}__heading`}>{t.s1Heading}</h2>
      <p className={`${b}__subheading`}>{t.s1Sub}</p>

      <div className={`${b}__field`}>
        <div className={`${b}__options`}>
          <button
            className={`${b}__option${data.wantsToJoin === 'yes' ? ` ${b}__option--selected` : ''}`}
            onClick={() => update({ wantsToJoin: 'yes' })}
          >
            {t.s1OptYes}
          </button>
        </div>
      </div>
    </div>
  )
}
