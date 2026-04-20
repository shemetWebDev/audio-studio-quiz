import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const DAWS = ['Ableton', 'Logic Pro', 'FL Studio'] as const

export default function Step3Daw({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>03 · DAW</p>
      <h2 className={`${b}__heading`}>В какой DAW вы создаёте музыку?</h2>
      <p className={`${b}__subheading`}>
        От выбора зависит, какой проект вы получите для ознакомления на следующем шаге.
      </p>

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
