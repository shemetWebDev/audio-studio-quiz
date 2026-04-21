'use client'
import { useState } from 'react'
import { FormData, defaultFormData, TOTAL_STEPS } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import ProgressBar    from '@/components/quiz/ProgressBar'
import Step1Join      from '@/components/quiz/steps/Step1Contacts'
import Step2Task      from '@/components/quiz/steps/Step3Skills'
import Step3Images    from '@/components/quiz/steps/StepImages'
import Step4Daw       from '@/components/quiz/steps/Step5Plugins'
import Step5Tracks    from '@/components/quiz/steps/Step4Comparison'
import Step6Project   from '@/components/quiz/steps/StepProject'
import Step7Contacts  from '@/components/quiz/steps/Step6Portfolio'
import StepDone       from '@/components/quiz/steps/StepDone'
import '@/app/quiz/quiz.scss'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function canProceed(step: number, data: FormData): boolean {
  switch (step) {
    case 1: return data.wantsToJoin === 'yes'
    case 2: return !!data.taskConfidence
    case 3: return !!data.waveformUnderstanding
    case 4: return !!data.tracksAssess
    case 5: return !!data.daw
    case 6: return !!data.canRecreate
    case 7: return emailRe.test(data.email.trim()) && !!data.telegram.trim()
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

  if (step > TOTAL_STEPS) return <StepDone />

  const ready = canProceed(step, formData)

  return (
    <div className={b}>
      <div className={`${b}__bg`} />
      <div className={`${b}__card`}>
        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div className={`${b}__body`}>
          {step === 1 && <Step1Join     data={formData} update={update} />}
          {step === 2 && <Step2Task     data={formData} update={update} />}
          {step === 3 && <Step3Images data={formData} update={update} />}
          {step === 4 && <Step5Tracks   data={formData} update={update} />}
          {step === 5 && <Step4Daw      data={formData} update={update} />}
          {step === 6 && <Step6Project  data={formData} update={update} />}
          {step === 7 && <Step7Contacts data={formData} update={update} />}
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
