import '@/components/quiz/progress-bar.scss'

type Props = { current: number; total: number }

export default function ProgressBar({ current, total }: Props) {
  const b = 'progress-bar'
  const pct = Math.round((current / total) * 100)

  return (
    <div className={b}>
      <div className={`${b}__track`}>
        <div className={`${b}__fill`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`${b}__label`}>
        {current}<span className={`${b}__label-total`}>/{total}</span>
      </span>
    </div>
  )
}
