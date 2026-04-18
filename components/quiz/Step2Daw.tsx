import { FormData } from '@/app/quiz/page'
import styles from './Step.module.css'

const GENRES = ['Tech House', 'Melodic Techno', 'House', 'Techno', 'Deep House', 'Другое']

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step2Daw({ data, update }: Props) {
  const toggleGenre = (g: string) => {
    const genres = data.genres.includes(g)
      ? data.genres.filter(x => x !== g)
      : [...data.genres, g]
    update({ genres })
  }

  return (
    <div className={styles.step}>
      <p className={styles.num}>02</p>
      <h2 className={styles.q}>Ваш инструментарий</h2>

      <div className={styles.field}>
        <label className={styles.label}>Какая у вас DAW?</label>
        <input
          className={styles.input}
          placeholder="Ableton, FL Studio, Logic Pro..."
          value={data.daw}
          onChange={e => update({ daw: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>В каких жанрах пишете музыку?</label>
        <div className={styles.tags}>
          {GENRES.map(g => (
            <button
              key={g}
              className={`${styles.tag} ${data.genres.includes(g) ? styles.tagSelected : ''}`}
              onClick={() => toggleGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
