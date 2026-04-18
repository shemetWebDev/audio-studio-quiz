'use client'
import { useState } from 'react'
import { FormData, defaultFormData, TOTAL_STEPS } from '@/types/form'
import ProgressBar     from '@/components/quiz/ProgressBar'
import Step1Contacts   from '@/components/quiz/steps/Step1Contacts'
import Step2Experience from '@/components/quiz/steps/Step2Experience'
import Step3Skills     from '@/components/quiz/steps/Step3Skills'
import Step4Comparison from '@/components/quiz/steps/Step4Comparison'
import Step5Plugins    from '@/components/quiz/steps/Step5Plugins'
import Step6Portfolio  from '@/components/quiz/steps/Step6Portfolio'  // [EXTRA]
import Step7Workflow   from '@/components/quiz/steps/Step7Workflow'   // [EXTRA]
import StepDone        from '@/components/quiz/steps/StepDone'
import '@/app/quiz/quiz.scss'

export default function QuizPage() {
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

  return (
    <div className={b}>
      <div className={`${b}__bg`} />
      <div className={`${b}__card`}>
        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div className={`${b}__body`}>
          {step === 1 && <Step1Contacts   data={formData} update={update} />}
          {step === 2 && <Step2Experience data={formData} update={update} />}
          {step === 3 && <Step3Skills     data={formData} update={update} />}
          {step === 4 && <Step4Comparison data={formData} update={update} />}
          {step === 5 && <Step5Plugins    data={formData} update={update} />}
          {step === 6 && <Step6Portfolio  data={formData} update={update} />}
          {step === 7 && <Step7Workflow   data={formData} update={update} />}
        </div>

        {error && <p className={`${b}__error`}>{error}</p>}

        <div className={`${b}__nav`}>
          {step > 1 && (
            <button
              className={`${b}__btn-back`}
              onClick={back}
              disabled={sending}
            >
              ← Назад
            </button>
          )}
          <button
            className={`${b}__btn-next`}
            onClick={step === TOTAL_STEPS ? handleSubmit : next}
            disabled={sending}
          >
            {sending ? 'Отправка...' : step === TOTAL_STEPS ? 'Отправить анкету' : 'Далее →'}
          </button>
        </div>
      </div>
    </div>
  )
}
