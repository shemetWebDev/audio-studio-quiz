'use client'
import { useState } from 'react'
import { FormData, defaultFormData, TOTAL_STEPS } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import ProgressBar    from '@/components/quiz/ProgressBar'
import Step1Join      from '@/components/quiz/steps/Step1Contacts'
import Step2Contacts  from '@/components/quiz/steps/Step2Experience'
import Step3Task      from '@/components/quiz/steps/Step3Skills'
import Step5Daw       from '@/components/quiz/steps/Step5Plugins'
import Step4Tracks    from '@/components/quiz/steps/Step4Comparison'
import StepProject    from '@/components/quiz/steps/StepProject'
import Step7Portfolio from '@/components/quiz/steps/Step6Portfolio'
import StepDone       from '@/components/quiz/steps/StepDone'
import '@/app/quiz/quiz.scss'

function canProceed(step: number, data: FormData): boolean {
  switch (step) {
    case 1: return data.wantsToJoin === 'yes' && data.aboutSelf.trim().length > 0
    case 2: return !!data.fullName.trim() && !!data.email.trim() && !!data.telegram.trim()
    case 3: return !!data.taskConfidence
    case 4: return !!data.daw
    case 5: return !!data.tracksAssess
    case 6: return !!data.canRecreate
    case 7: return true
    default: return true
  }
}

export default function QuizPage() {
  const { t } = useLang()
  const b = 'quiz'

  const [step, setStep]         = useState(1)
  const [sending, setSending]   = useState(false)
  const [error, setError]       = useState('')
  const [formData, setFormData] = useState<FormData>(defaultFormData)

  const update = (fields: Partial<FormData>) =>
    setFormData(prev => ({ ...prev, ...fields }))

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const handleSubmit = async () => {
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Ошибка отправки')
      next()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Что-то пошло не так')
    } finally {
      setSending(false)
    }
  }

  if (step > TOTAL_STEPS) return <StepDone name={formData.fullName} />

  const ready = canProceed(step, formData)

  return (
    <div className={b}>
      <div className={`${b}__bg`} />
      <div className={`${b}__card`}>
        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div className={`${b}__body`}>
          {step === 1 && <Step1Join      data={formData} update={update} />}
          {step === 2 && <Step2Contacts  data={formData} update={update} />}
          {step === 3 && <Step3Task      data={formData} update={update} />}
          {step === 4 && <Step5Daw       data={formData} update={update} />}
          {step === 5 && <Step4Tracks    data={formData} update={update} />}
          {step === 6 && <StepProject    data={formData} update={update} />}
          {step === 7 && <Step7Portfolio data={formData} update={update} />}
        </div>

        {error && <p className={`${b}__error`}>{error}</p>}

        <div className={`${b}__nav`}>
          {step > 1 && (
            <button className={`${b}__btn-back`} onClick={back} disabled={sending}>
              {t.navBack}
            </button>
          )}
          <button
            className={`${b}__btn-next`}
            onClick={step === TOTAL_STEPS ? handleSubmit : next}
            disabled={!ready || sending}
          >
            {sending ? t.navSending : step === TOTAL_STEPS ? t.navSubmit : t.navNext}
          </button>
        </div>
      </div>
    </div>
  )
}
