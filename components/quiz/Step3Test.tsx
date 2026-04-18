import { FormData } from '@/app/quiz/page'
import styles from './Step.module.css'

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

export default function Step3Test({ data, update }: Props) {
  return (
    <div className={styles.step}>
      <p className={styles.num}>03</p>
      <h2 className={styles.q}>Тестовое задание</h2>

      {/* TODO: сюда добавить изображения оригинала и воссозданного трека */}
      <div className={styles.imgPlaceholder}>
        <span>🎛</span>
        <p>Оригинал + воссозданный трек<br /><small>Изображения добавит дизайнер</small></p>
      </div>

      <div className={styles.options}>
        {['Да, смогу', 'Частично', 'Затрудняюсь'].map(opt => (
          <button
            key={opt}
            className={`${styles.option} ${data.canRecreate === opt ? styles.selected : ''}`}
            onClick={() => update({ canRecreate: opt })}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Сколько времени потребуется?</label>
        <input
          className={styles.input}
          placeholder="например: 2-3 дня"
          value={data.timeNeeded}
          onChange={e => update({ timeNeeded: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Насколько это сложно для вас? <span className={styles.scaleVal}>{data.difficulty}/10</span>
        </label>
        <input
          type="range"
          min={1} max={10}
          value={data.difficulty}
          onChange={e => update({ difficulty: Number(e.target.value) })}
          className={styles.range}
        />
        <div className={styles.rangeLabels}>
          <span>Легко</span>
          <span>Очень сложно</span>
        </div>
      </div>
    </div>
  )
}
