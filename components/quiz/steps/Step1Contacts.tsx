import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const OPTIONS = [
  { value: 'yes',     label: 'Да, хочу' },
  { value: 'curious', label: 'Расскажите подробнее' },
] as const

export default function Step1Join({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>01 · О команде</p>
      <h2 className={`${b}__heading`}>Хотите стать частью команды TopMusicArts?</h2>
      <p className={`${b}__subheading`}>
        Работать вместе с нами, занимаясь музыкой — воссоздавать треки, развиваться в продакшне.
      </p>

      <div className={`${b}__field`}>
        <div className={`${b}__options`}>
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.wantsToJoin === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ wantsToJoin: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
