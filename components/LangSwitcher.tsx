'use client'
import { useLang } from '@/contexts/LangContext'
import { Lang } from '@/lib/i18n'
import './LangSwitcher.scss'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'ua', label: 'UA' },
  { code: 'en', label: 'EN' },
]

export default function LangSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switcher">
      {LANGS.map((l, i) => (
        <span key={l.code} className="lang-switcher__item">
          <button
            className={`lang-switcher__btn${lang === l.code ? ' lang-switcher__btn--active' : ''}`}
            onClick={() => setLang(l.code)}
          >
            {l.label}
          </button>
          {i < LANGS.length - 1 && <span className="lang-switcher__sep">·</span>}
        </span>
      ))}
    </div>
  )
}
