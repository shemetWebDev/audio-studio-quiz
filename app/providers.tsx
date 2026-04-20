'use client'
import { LangProvider } from '@/contexts/LangContext'
import LangSwitcher from '@/components/LangSwitcher'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <LangSwitcher />
      {children}
    </LangProvider>
  )
}
