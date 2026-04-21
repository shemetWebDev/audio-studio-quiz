'use client'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/done.scss'

export default function StepDone() {
  const { t } = useLang()
  const b = 'done'

  return (
    <div className={b}>
      <div className={`${b}__bg`} />
      <div className={`${b}__content`}>
        <div className={`${b}__check`}>✓</div>
        <h2 className={`${b}__title`}>{t.doneTitle}</h2>
        <p className={`${b}__sub`}>{t.doneSub}</p>
        <a href="/" className={`${b}__back`}>{t.doneBack}</a>
      </div>
    </div>
  )
}
