'use client'
import { useState } from 'react'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const PROJECT_MAP: Record<string, { file: string; labelKey: 'projectAbleton' | 'projectLogic' | 'projectFL' }> = {
  'Ableton':   { file: '/projects/ableton.zip',  labelKey: 'projectAbleton' },
  'Logic Pro': { file: '/projects/logic.zip',     labelKey: 'projectLogic' },
  'FL Studio': { file: '/projects/fl-studio.zip', labelKey: 'projectFL' },
}

export default function StepProject({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'
  const [showComment, setShowComment] = useState(!!data.projectComment)
  const project = data.daw ? PROJECT_MAP[data.daw] : null

  const ASSESS = [
    { value: 'yes',       label: t.s6OptYes },
    { value: 'partially', label: t.s6OptPartially },
    { value: 'no',        label: t.s6OptNo },
  ] as const

  return (
    <div className={b}>
      <p className={`${b}__index`}>{t.s6Index}</p>
      <h2 className={`${b}__heading`}>{t.s6Heading}</h2>
      <p className={`${b}__subheading`}>{t.s6Sub}</p>

      {project ? (
        <div className={`${b}__field`}>
          <div className={`${b}__download`}>
            <div className={`${b}__download-info`}>
              <span className={`${b}__download-daw`}>{data.daw}</span>
              <span className={`${b}__download-label`}>{t[project.labelKey]}</span>
            </div>
            <a href={project.file} download className={`${b}__download-btn`}>
              {t.s6DlProject}
            </a>
          </div>
          <button
            className={`${b}__comment-toggle`}
            onClick={() => { setShowComment(v => !v); if (showComment) update({ projectComment: '' }) }}
          >
            {showComment ? t.hideComment : t.addComment}
          </button>
          {showComment && (
            <textarea
              className={`${b}__textarea`}
              placeholder={t.commentPlaceholder}
              value={data.projectComment}
              onChange={e => update({ projectComment: e.target.value })}
              rows={2}
            />
          )}
        </div>
      ) : (
        <div className={`${b}__placeholder`}>
          <span className={`${b}__placeholder-icon`}>⬆</span>
          Выберите DAW на шаге 4 — здесь появится ваш проект
        </div>
      )}

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.s6LabelAssess}</label>
        <div className={`${b}__options`}>
          {ASSESS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.canRecreate === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ canRecreate: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
