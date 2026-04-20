'use client'
import { useState } from 'react'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step4Tracks({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'
  const [showComment, setShowComment] = useState(!!data.tracksComment)

  const ASSESS = [
    { value: 'yes',       label: t.s6OptYes },
    { value: 'partially', label: t.s6OptPartially },
    { value: 'no',        label: t.s6OptNo },
  ] as const

  return (
    <div className={b}>
      <p className={`${b}__index`}>{t.s5Index}</p>
      <h2 className={`${b}__heading`}>{t.s5Heading}</h2>
      <p className={`${b}__subheading`}>{t.s5Sub}</p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s5LabelOriginal}</label>
        <audio controls src="/tracks/original.mp3" className={`${b}__audio`} />
        <a href="/tracks/original.mp3" download className={`${b}__download-link`}>
          {t.s5DlOriginal}
        </a>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s5LabelRecreated}</label>
        <audio controls src="/tracks/recreated.mp3" className={`${b}__audio`} />
        <a href="/tracks/recreated.mp3" download className={`${b}__download-link`}>
          {t.s5DlRecreated}
        </a>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s5LabelAssess}</label>
        <div className={`${b}__options`}>
          {ASSESS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.tracksAssess === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ tracksAssess: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <button
          className={`${b}__comment-toggle`}
          onClick={() => { setShowComment(v => !v); if (showComment) update({ tracksComment: '' }) }}
        >
          {showComment ? t.hideComment : t.addComment}
        </button>
        {showComment && (
          <textarea
            className={`${b}__textarea`}
            placeholder={t.commentPlaceholder}
            value={data.tracksComment}
            onChange={e => update({ tracksComment: e.target.value })}
            rows={2}
          />
        )}
      </div>
    </div>
  )
}
