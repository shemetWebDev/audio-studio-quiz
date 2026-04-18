import { FormData } from '@/app/quiz/page'
import styles from './Step.module.css'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step1Experience({ data, update }: Props) {
  return (
    <div className={styles.step}>
      <p className={styles.num}>01</p>
      <h2 className={styles.q}>Есть ли у вас опыт воссоздания треков?</h2>
      <p className={styles.hint}>По волне и по спектру, до идеального один в один</p>

      <div className={styles.options}>
        {['Да, есть опыт', 'Немного, пробовал', 'Первый раз'].map(opt => (
          <button
            key={opt}
            className={`${styles.option} ${data.hasExperience === opt ? styles.selected : ''}`}
            onClick={() => update({ hasExperience: opt })}
          >
            {opt}
          </button>
        ))}
      </div>

      {data.hasExperience === 'Да, есть опыт' && (
        <div className={styles.field}>
          <label className={styles.label}>Примеры работ — ссылки или описание</label>
          <textarea
            className={styles.textarea}
            placeholder="SoundCloud, Google Drive, YouTube..."
            value={data.experienceLinks}
            onChange={e => update({ experienceLinks: e.target.value })}
            rows={3}
          />
        </div>
      )}
    </div>
  )
}
