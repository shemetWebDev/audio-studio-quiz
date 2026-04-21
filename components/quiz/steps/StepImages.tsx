'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { FormData } from '@/types/form'
import { useLang } from '@/contexts/LangContext'
import '@/components/quiz/steps/step.scss'
import '@/components/quiz/steps/step-images.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const OPTIONS = [
  { value: 'yes',       key: 'sImgOptYes' },
  { value: 'partially', key: 'sImgOptPartially' },
  { value: 'no',        key: 'sImgOptNo' },
] as const

const IMAGES = [
  { src: '/images/step3-1.jpg', alt: 'Waveform comparison',  filename: 'waveform.jpg' },
  { src: '/images/step3-2.jpg', alt: 'Spectrum analysis',    filename: 'spectrum.jpg' },
]

export default function StepImages({ data, update }: Props) {
  const { t } = useLang()
  const b = 'step'
  const [zoomed, setZoomed]       = useState<string | null>(null)
  const [showComment, setShowComment] = useState(!!data.waveformComment)

  return (
    <div className={b}>
      <h2 className={`${b}__heading`}>{t.sImgHeading}</h2>
      <p className={`${b}__subheading`}>{t.sImgSub}</p>

      <div className="step-images__grid">
        {IMAGES.map(img => (
          <div key={img.src} className="step-images__item">
            <button
              className="step-images__thumb"
              onClick={() => setZoomed(img.src)}
              aria-label={img.alt}
            >
              <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="50vw" />
            </button>
            <a
              className="step-images__dl"
              href={img.src}
              download={img.filename}
            >
              {t.s5DlOriginal}
            </a>
          </div>
        ))}
      </div>

      <p className="step-images__hint">{t.sImgHint}</p>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>{t.sImgLabelConfidence}</label>
        <div className={`${b}__options`}>
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.waveformUnderstanding === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ waveformUnderstanding: opt.value })}
            >
              {t[opt.key]}
            </button>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <button
          className={`${b}__comment-toggle`}
          onClick={() => { setShowComment(v => !v); if (showComment) update({ waveformComment: '' }) }}
        >
          {showComment ? t.hideComment : t.addComment}
        </button>
        {showComment && (
          <textarea
            className={`${b}__textarea`}
            placeholder={t.commentPlaceholder}
            value={data.waveformComment}
            onChange={e => update({ waveformComment: e.target.value })}
            rows={3}
          />
        )}
      </div>

      {zoomed && createPortal(
        <div className="step-images__overlay" onClick={() => setZoomed(null)}>
          <div className="step-images__overlay-inner">
            <Image src={zoomed} alt="zoom" fill style={{ objectFit: 'contain' }} sizes="100vw" />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
