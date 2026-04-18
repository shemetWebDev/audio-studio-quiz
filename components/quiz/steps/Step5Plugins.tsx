import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const PLUGINS = [
  { value: 'Xfer Serum v2.0.16', label: 'Xfer Serum v2.0.16', required: true },
  { value: 'Kickstart v2',       label: 'Kickstart v2',        required: true },
  { value: 'Kontakt',            label: 'Kontakt',             required: false },
  { value: 'Korg M1',            label: 'Korg M1',             required: false },
]

const SERUM_LEVELS = [
  { value: 'none',         label: 'Не работал' },
  { value: 'basic',        label: 'Базовый' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced',     label: 'Продвинутый' },
] as const

const STOCK_OPTIONS = [
  { value: 'yes',       label: 'Комфортно работаю' },
  { value: 'sometimes', label: 'Иногда' },
  { value: 'no',        label: 'Предпочитаю свои' },
] as const

export default function Step5Plugins({ data, update }: Props) {
  const b = 'step'

  const togglePlugin = (p: string) => {
    const knownPlugins = data.knownPlugins.includes(p)
      ? data.knownPlugins.filter(x => x !== p)
      : [...data.knownPlugins, p]
    update({ knownPlugins })
  }

  return (
    <div className={b}>
      <p className={`${b}__index`}>05 · Плагины</p>
      <h2 className={`${b}__heading`}>Требования студии к инструментарию</h2>
      <p className={`${b}__subheading`}>
        Воссоздание ведётся преимущественно стоковыми инструментами.
        Xfer Serum v2 — основной синтезатор для большинства задач.
      </p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Какие из плагинов знаете?</label>
        <div className={`${b}__tags`}>
          {PLUGINS.map(p => (
            <button
              key={p.value}
              className={`${b}__tag${data.knownPlugins.includes(p.value) ? ` ${b}__tag--selected` : ''}`}
              onClick={() => togglePlugin(p.value)}
            >
              {p.label}{p.required && <span style={{ marginLeft: 5, opacity: 0.4, fontSize: 10 }}>★</span>}
            </button>
          ))}
        </div>
        <span className={`${b}__note`}>★ — обязательные плагины студии</span>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Уровень владения Xfer Serum</label>
        <div className={`${b}__options`}>
          {SERUM_LEVELS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.serumLevel === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ serumLevel: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Работа со стоковыми плагинами DAW</label>
        <div className={`${b}__options`}>
          {STOCK_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.stockPluginsOk === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ stockPluginsOk: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Другие плагины, которыми владеете</label>
        <textarea
          className={`${b}__textarea`}
          placeholder="Дополнительные синтезаторы, эффекты, анализаторы спектра..."
          value={data.pluginNotes}
          onChange={e => update({ pluginNotes: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  )
}
