import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const PROJECT_MAP: Record<string, { file: string; label: string }> = {
  'Ableton':   { file: '/projects/ableton.zip',   label: 'Ableton Project (.als)' },
  'Logic Pro': { file: '/projects/logic.zip',      label: 'Logic Pro Project (.logicx)' },
  'FL Studio': { file: '/projects/fl-studio.zip',  label: 'FL Studio Project (.flp)' },
}

export default function Step5Project({ data, update: _update }: Props) {
  const b = 'step'
  const project = data.daw ? PROJECT_MAP[data.daw] : null

  return (
    <div className={b}>
      <p className={`${b}__index`}>05 · Проект</p>
      <h2 className={`${b}__heading`}>Скачайте проект для ознакомления</h2>
      <p className={`${b}__subheading`}>
        Посмотрите как разбит бит по дорожкам, как оформлены инструменты,
        ударные и сведение — это эталон качества TopMusicArts.
      </p>

      {project ? (
        <div className={`${b}__download`}>
          <div className={`${b}__download-info`}>
            <span className={`${b}__download-daw`}>{data.daw}</span>
            <span className={`${b}__download-label`}>{project.label}</span>
          </div>
          <a
            href={project.file}
            download
            className={`${b}__download-btn`}
          >
            Скачать ↓
          </a>
        </div>
      ) : (
        <div className={`${b}__placeholder`}>
          <span className={`${b}__placeholder-icon`}>⬆</span>
          Выберите DAW на шаге 3 — здесь появится ваш проект
        </div>
      )}
    </div>
  )
}
