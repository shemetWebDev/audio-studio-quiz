'use client'
import Link from 'next/link'
import '@/app/home.scss'

export default function Home() {
  const b = 'home'

  return (
    <main className={b}>
      <div className={`${b}__bg`} />
      <div className={`${b}__grain`} />

      <div className={`${b}__hero`}>
        {/* <span className={`${b}__badge`}>Открытый набор</span> */}

        <h1 className={`${b}__title`}>
          Audio<br />
          <span className={`${b}__title-outline`}>Studio</span>
        </h1>

        <p className={`${b}__description`}>
          Заполните форму для продолжения —<br />
          это займёт не более пяти минут.
        </p>

        <Link href="/quiz" className={`${b}__cta`}>
          Заполнить анкету
          <span className={`${b}__cta-arrow`}>↗</span>
        </Link>
      </div>

      <div className={`${b}__wave`}>
        <svg viewBox="0 0 900 100" preserveAspectRatio="none">
          <polyline
            points="0,50 50,25 100,70 150,15 200,60 250,35 300,75 350,20 400,55 450,30 500,65 550,18 600,50 650,35 700,72 750,22 800,58 850,38 900,50"
            fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"
          />
          <polyline
            points="0,70 50,48 100,85 150,40 200,75 250,55 300,88 350,45 400,72 450,52 500,80 550,42 600,68 650,55 700,85 750,45 800,72 850,58 900,70"
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"
          />
        </svg>
      </div>
    </main>
  )
}
