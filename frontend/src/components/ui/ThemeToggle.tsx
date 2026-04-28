// Bouton de basculement du thème : light ☀️ / dark 🌙 / system 💻
// Cycle au click avec animation de rotation, état persisté

import { motion } from 'framer-motion'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'
import { useThemeContext } from '../../context/ThemeContext'

const icons = { light: FiSun, dark: FiMoon, system: FiMonitor }
const next = { light: 'dark', dark: 'system', system: 'light' } as const

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext()
  const Icon = icons[theme]

  return (
    <motion.button
      onClick={() => setTheme(next[theme])}
      whileTap={{ rotate: 180, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors"
      aria-label={`Thème actuel : ${theme}`}
    >
      <Icon size={20} />
    </motion.button>
  )
}

export default ThemeToggle
