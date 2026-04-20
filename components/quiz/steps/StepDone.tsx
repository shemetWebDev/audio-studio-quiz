'use client'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/done.scss'

type Props = { name?: string }

export default function StepDone({ name }: Props) {
  const { t } = useLang()
  const b = 'done'
  const firstName = name?.split(' ')[0]

  return (
    <div className={b}>
      <div className={`${b}__bg`} />
      <div className={`${b}__content`}>
        <div className={`${b}__check`}>✓</div>
        <h2 className={`${b}__title`}>
          {firstName ? `${t.doneThanks}, ${firstName}` : t.doneTitle}
        </h2>
        <p className={`${b}__sub`}>{t.doneSub}</p>
        <a href="/" className={`${b}__back`}>{t.doneBack}</a>
      </div>
    </div>
  )
}
