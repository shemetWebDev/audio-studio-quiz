import '@/components/quiz/steps/done.scss'

type Props = { name?: string }

export default function StepDone({ name }: Props) {
  const b = 'done'

  return (
    <div className={b}>
      <div className={`${b}__bg`} />
      <div className={`${b}__content`}>
        <div className={`${b}__check`}>✓</div>
        <h2 className={`${b}__title`}>
          {name ? `Спасибо, ${name.split(' ')[0]}` : 'Анкета отправлена'}
        </h2>
        <p className={`${b}__sub`}>
          Мы изучим вашу анкету и свяжемся по указанным контактам
        </p>
        <a href="/" className={`${b}__back`}>← На главную</a>
      </div>
    </div>
  )
}
