import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const REQUIREMENTS = [
  'Xfer Serum v2.0.16 — основной синтезатор',
  'Kickstart v2 — для сайдчейна',
  'Стандартные эффекты вашей DAW',
]

const CRITERIA = [
  'Волновая форма и спектр',
  'Ритм и грув',
  'Пресеты и тембры',
  'Аранжировка',
  'Автоматизации',
  'Общий уровень громкости (LUFS)',
]

export default function Step2Task({ data: _data, update: _update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>02 · Задача</p>
      <h2 className={`${b}__heading`}>Что нужно делать</h2>
      <p className={`${b}__subheading`}>
        Воссоздавать инструменталы в DAW с точностью до оригинала.
      </p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Разрешённые инструменты</label>
        <div className={`${b}__info-list`}>
          {REQUIREMENTS.map(r => (
            <div key={r} className={`${b}__info-item`}>
              <span className={`${b}__info-dot`} />
              {r}
            </div>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Критерии оценки</label>
        <div className={`${b}__tags`} style={{ pointerEvents: 'none' }}>
          {CRITERIA.map(c => (
            <span key={c} className={`${b}__tag ${b}__tag--selected`}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
