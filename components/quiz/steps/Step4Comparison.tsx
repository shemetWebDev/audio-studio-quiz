import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const ASSESS_OPTIONS = [
  { value: 'yes',       label: 'Справлюсь' },
  { value: 'partially', label: 'Частично' },
  { value: 'no',        label: 'Затрудняюсь' },
] as const

export default function Step4Tracks({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>04 · Треки</p>
      <h2 className={`${b}__heading`}>Оцените разницу</h2>
      <p className={`${b}__subheading`}>
        Один трек — оригинал, второй — воссозданный командой TopMusicArts.
        Прослушайте оба и оцените свои возможности.
      </p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Оригинал</label>
        <audio
          controls
          src="/tracks/original.mp3"
          className={`${b}__audio`}
        />
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Воссозданный — TopMusicArts</label>
        <audio
          controls
          src="/tracks/recreated.mp3"
          className={`${b}__audio`}
        />
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Сможете воссоздать на таком уровне?</label>
        <div className={`${b}__options`}>
          {ASSESS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.canRecreate === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ canRecreate: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
