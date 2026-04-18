import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step1Contacts({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>01 · Контакты</p>
      <h2 className={`${b}__heading`}>Расскажите о себе</h2>
      <p className={`${b}__subheading`}>
        Укажите актуальные контакты — по ним свяжемся после рассмотрения анкеты
      </p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Имя и фамилия</label>
        <input
          className={`${b}__input`}
          placeholder="Иван Петров"
          value={data.fullName}
          onChange={e => update({ fullName: e.target.value })}
        />
      </div>

      <div className={`${b}__row`}>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Email</label>
          <input
            className={`${b}__input`}
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={e => update({ email: e.target.value })}
          />
        </div>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Telegram</label>
          <input
            className={`${b}__input`}
            placeholder="@username"
            value={data.telegram}
            onChange={e => update({ telegram: e.target.value })}
          />
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Город / страна</label>
        <input
          className={`${b}__input`}
          placeholder="Киев, Украина"
          value={data.location}
          onChange={e => update({ location: e.target.value })}
        />
      </div>
    </div>
  )
}
