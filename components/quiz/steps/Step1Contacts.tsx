'use client'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const MAX = 500

export default function Step1Join({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'
  const len = data.aboutSelf.length

  return (
    <div className={b}>
      <p className={`${b}__index`}>{t.s1Index}</p>
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

      {data.wantsToJoin === 'yes' && (
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>
            {t.s1LabelAbout}
            <span className={`${b}__label-value`} style={{ color: len > MAX ? 'rgba(255,80,80,0.8)' : undefined }}>
              {len}/{MAX}
            </span>
          </label>
          <textarea
            className={`${b}__textarea`}
            placeholder={t.s1PlaceholderAbout}
            value={data.aboutSelf}
            maxLength={MAX}
            onChange={e => update({ aboutSelf: e.target.value })}
            rows={4}
          />
        </div>
      )}
    </div>
  )
}
