// Contexte de thème : gère dark / light / system avec persistance localStorage

import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
  resolvedTheme: 'light' | 'dark' // thème effectivement appliqué
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(
    () => (localStorage.getItem('theme') as ThemeMode) ?? 'system'
  )

  // Calcule le thème réel en tenant compte du thème système
  const getResolved = (mode: ThemeMode): 'light' | 'dark' => {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return mode
  }

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => getResolved(theme))

  useEffect(() => {
    const resolved = getResolved(theme)
    setResolvedTheme(resolved)
    // Applique la classe 'dark' sur l'élément <html> pour Tailwind
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [theme])

  // Écoute les changements du thème système quand le mode est 'system'
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      setResolvedTheme(mq.matches ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', mq.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = (mode: ThemeMode) => {
    localStorage.setItem('theme', mode)
    setThemeState(mode)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeContext doit être utilisé dans un ThemeProvider')
  return ctx
}
