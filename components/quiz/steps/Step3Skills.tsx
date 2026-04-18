import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const GENRES = [
  'Tech House', 'Melodic Techno', 'House',
  'Techno', 'Deep House', 'Afro House', 'Minimal', 'Другое',
]

const THEORY_OPTIONS = [
  { value: 'basic',        label: 'Базовый' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced',     label: 'Профессиональный' },
] as const

export default function Step3Skills({ data, update }: Props) {
  const b = 'step'

  const toggleGenre = (g: string) => {
    const genres = data.genres.includes(g)
      ? data.genres.filter(x => x !== g)
      : [...data.genres, g]
    update({ genres })
  }

  return (
    <div className={b}>
      <p className={`${b}__index`}>03 · DAW и навыки</p>
      <h2 className={`${b}__heading`}>Рабочая среда и жанровая экспертиза</h2>

      <div className={`${b}__row`}>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Основная DAW</label>
          <input
            className={`${b}__input`}
            placeholder="Ableton, FL Studio..."
            value={data.daw}
            onChange={e => update({ daw: e.target.value })}
          />
        </div>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Лет в DAW</label>
          <input
            className={`${b}__input`}
            placeholder="3"
            value={data.dawYears}
            onChange={e => update({ dawYears: e.target.value })}
          />
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>
          Жанры, в которых работаете
          <span className={`${b}__label-value`}>
            {data.genres.length > 0 ? data.genres.length : ''}
          </span>
        </label>
        <div className={`${b}__tags`}>
          {GENRES.map(g => (
            <button
              key={g}
              className={`${b}__tag${data.genres.includes(g) ? ` ${b}__tag--selected` : ''}`}
              onClick={() => toggleGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
        {data.genres.includes('Другое') && (
          <input
            className={`${b}__input`}
            placeholder="Укажите жанры..."
            value={data.otherGenres}
            onChange={e => update({ otherGenres: e.target.value })}
          />
        )}
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Уровень музыкальной теории</label>
        <div className={`${b}__options`}>
          {THEORY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.theoryLevel === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ theoryLevel: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
