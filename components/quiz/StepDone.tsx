import styles from './StepDone.module.css'

export default function StepDone() {
  return (
    <div className={styles.wrap}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>
        <h2 className={styles.title}>Анкета отправлена</h2>
        <p className={styles.sub}>Мы свяжемся с вами в ближайшее время</p>
      </div>
    </div>
  )
}
