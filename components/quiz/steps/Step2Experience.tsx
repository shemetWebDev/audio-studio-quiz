import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const EXP_OPTIONS = [
  { value: 'yes',      label: 'Есть опыт' },
  { value: 'learning', label: 'В процессе' },
  { value: 'no',       label: 'Впервые' },
] as const

export default function Step2Experience({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>02 · Опыт</p>
      <h2 className={`${b}__heading`}>Воссоздание треков</h2>
      <p className={`${b}__subheading`}>
        Задача — точное совпадение по волне и спектру.
        Оцените свой уровень честно — это помогает нам правильно выстроить процесс.
      </p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Есть ли опыт воссоздания треков?</label>
        <div className={`${b}__options`}>
          {EXP_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.hasRecreationExp === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ hasRecreationExp: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {data.hasRecreationExp === 'yes' && (
        <>
          <div className={`${b}__field`}>
            <label className={`${b}__label`}>Сколько треков воссоздали?</label>
            <input
              className={`${b}__input`}
              placeholder="напр. 10–15 треков"
              value={data.recreationCount}
              onChange={e => update({ recreationCount: e.target.value })}
            />
          </div>

          <div className={`${b}__field`}>
            <label className={`${b}__label`}>Как подходите к анализу оригинала?</label>
            <textarea
              className={`${b}__textarea`}
              placeholder="Опишите процесс: какие инструменты анализа используете, как сравниваете результат по спектру, что проверяете в первую очередь..."
              value={data.recreationDetails}
              onChange={e => update({ recreationDetails: e.target.value })}
              rows={3}
            />
          </div>

          <div className={`${b}__field`}>
            <label className={`${b}__label`}>Ссылки на примеры работ</label>
            <textarea
              className={`${b}__textarea`}
              placeholder="SoundCloud, Google Drive, Dropbox, YouTube — любые публичные ссылки"
              value={data.experienceLinks}
              onChange={e => update({ experienceLinks: e.target.value })}
              rows={2}
            />
          </div>
        </>
      )}

      {data.hasRecreationExp === 'learning' && (
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Что уже пробовали? Какие результаты?</label>
          <textarea
            className={`${b}__textarea`}
            placeholder="Что получалось, где возникали сложности, над чем работаете сейчас..."
            value={data.recreationDetails}
            onChange={e => update({ recreationDetails: e.target.value })}
            rows={3}
          />
        </div>
      )}
    </div>
  )
}
