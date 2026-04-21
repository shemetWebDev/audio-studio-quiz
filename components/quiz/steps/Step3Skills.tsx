'use client'
import { useState } from 'react'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step3Task({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'
  const [showComment, setShowComment] = useState(!!data.taskComment)

  const CONFIDENCE = [
    { value: 'easy',     label: t.s3OptEasy },
    { value: 'mixed',    label: t.s3OptMixed },
    { value: 'learning', label: t.s3OptLearning },
  ] as const

  return (
    <div className={b}>
      <h2 className={`${b}__heading`}>{t.s3Heading}</h2>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s3LabelTools}</label>
        <div className={`${b}__info-list`}>
          {t.toolsItems.map(r => (
            <div key={r} className={`${b}__info-item`}>
              <span className={`${b}__info-dot`} />
              {r}
            </div>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s3LabelCriteria}</label>
        <div className={`${b}__tags`} style={{ pointerEvents: 'none' }}>
          {t.criteriaItems.map(c => (
            <span key={c} className={`${b}__tag ${b}__tag--selected`}>{c}</span>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s3LabelConfidence}</label>
        <div className={`${b}__options`}>
          {CONFIDENCE.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.taskConfidence === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ taskConfidence: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <button
          className={`${b}__comment-toggle`}
          onClick={() => { setShowComment(v => !v); if (showComment) update({ taskComment: '' }) }}
        >
          {showComment ? t.hideComment : t.addComment}
        </button>
        {showComment && (
          <textarea
            className={`${b}__textarea`}
            placeholder={t.commentPlaceholder}
            value={data.taskComment}
            onChange={e => update({ taskComment: e.target.value })}
            rows={3}
          />
        )}
      </div>
    </div>
  )
}
