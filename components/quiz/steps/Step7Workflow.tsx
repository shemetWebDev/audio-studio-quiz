// [EXTRA] Чтобы удалить этот шаг:
// 1. Убери импорт в app/quiz/page.tsx
// 2. Убери {step === 7 && <Step7Workflow ... />}
// 3. TOTAL_STEPS = 6 в types/form.ts
// 4. Удали availability, rateExpectation, startDate, additionalInfo из FormData

import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const AVAILABILITY_OPTIONS = [
  { value: 'fulltime', label: 'Полная занятость' },
  { value: 'parttime', label: 'Частичная' },
  { value: 'project',  label: 'Проектная' },
] as const

export default function Step7Workflow({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <span className={`${b}__extra-badge`}>+ дополнительный шаг</span>

      <p className={`${b}__index`}>07 · Условия</p>
      <h2 className={`${b}__heading`}>Формат сотрудничества</h2>
      <p className={`${b}__subheading`}>
        Помогает сразу понять, совпадают ли ожидания — экономит время с обеих сторон
      </p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Предпочтительный формат</label>
        <div className={`${b}__options`}>
          {AVAILABILITY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.availability === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ availability: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${b}__row`}>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Ожидания по оплате</label>
          <input
            className={`${b}__input`}
            placeholder="напр. $500/мес или за трек"
            value={data.rateExpectation}
            onChange={e => update({ rateExpectation: e.target.value })}
          />
        </div>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Готов приступить с</label>
          <input
            className={`${b}__input`}
            placeholder="напр. сразу / с 1 июня"
            value={data.startDate}
            onChange={e => update({ startDate: e.target.value })}
          />
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Дополнительная информация</label>
        <textarea
          className={`${b}__textarea`}
          placeholder="Вопросы к студии, особые условия, что важно знать о вас..."
          value={data.additionalInfo}
          onChange={e => update({ additionalInfo: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}
