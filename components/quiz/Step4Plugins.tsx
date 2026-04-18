import { FormData } from '@/app/quiz/page'
import styles from './Step.module.css'

const PLUGINS = ['Xfer Serum v2', 'Kickstart v2', 'Kontakt', 'Korg M1']

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step4Plugins({ data, update }: Props) {
  const togglePlugin = (p: string) => {
    const pluginsUsed = data.pluginsUsed.includes(p)
      ? data.pluginsUsed.filter(x => x !== p)
      : [...data.pluginsUsed, p]
    update({ pluginsUsed })
  }

  return (
    <div className={styles.step}>
      <p className={styles.num}>04</p>
      <h2 className={styles.q}>Плагины и инструменты</h2>
      <p className={styles.hint}>Воссоздание только через стандартные плагины</p>

      <div className={styles.field}>
        <label className={styles.label}>Какие из этих плагинов знаете?</label>
        <div className={styles.tags}>
          {PLUGINS.map(p => (
            <button
              key={p}
              className={`${styles.tag} ${data.pluginsUsed.includes(p) ? styles.tagSelected : ''}`}
              onClick={() => togglePlugin(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Работаете со стоковыми плагинами?</label>
        <div className={styles.options}>
          {['Да, комфортно', 'Иногда', 'Предпочитаю свои'].map(opt => (
            <button
              key={opt}
              className={`${styles.option} ${data.usesStock === opt ? styles.selected : ''}`}
              onClick={() => update({ usesStock: opt })}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Ваш email для связи</label>
        <input
          className={styles.input}
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={e => update({ email: e.target.value })}
        />
      </div>
    </div>
  )
}
