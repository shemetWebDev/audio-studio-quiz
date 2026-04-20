'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang, T } from '@/lib/i18n'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: T }

const LangContext = createContext<Ctx>({
  lang: 'ru',
  setLang: () => {},
  t: translations.ru,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as T }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
