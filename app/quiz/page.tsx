'use client'
import { useState } from 'react'
import { FormData, defaultFormData, TOTAL_STEPS } from '@/types/form'
import ProgressBar    from '@/components/quiz/ProgressBar'
import Step1Join      from '@/components/quiz/steps/Step1Contacts'
import Step2Task      from '@/components/quiz/steps/Step2Experience'
import Step3Daw       from '@/components/quiz/steps/Step3Skills'
import Step4Tracks    from '@/components/quiz/steps/Step4Comparison'
import Step5Project   from '@/components/quiz/steps/Step5Plugins'
import Step6Contacts  from '@/components/quiz/steps/Step6Portfolio'
import StepDone       from '@/components/quiz/steps/StepDone'
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
          {step === 1 && <Step1Join     data={formData} update={update} />}
          {step === 2 && <Step2Task     data={formData} update={update} />}
          {step === 3 && <Step3Daw      data={formData} update={update} />}
          {step === 4 && <Step4Tracks   data={formData} update={update} />}
          {step === 5 && <Step5Project  data={formData} update={update} />}
          {step === 6 && <Step6Contacts data={formData} update={update} />}
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
            {sending ? 'Отправка...' : step === TOTAL_STEPS ? 'Отправить' : 'Далее →'}
          </button>
        </div>
      </div>
    </div>
  )
}
