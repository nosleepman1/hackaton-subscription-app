// Composant Card réutilisable avec effet glassmorphism
// Variantes : default, elevated, bordered

import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean // active l'effet de survol lift
}

const GlassCard = ({ children, className = '', hover = false }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(108,99,255,0.15)' } : {}}
      className={`
        rounded-2xl border border-[var(--border-app)]
        bg-[var(--surface)] backdrop-blur-md
        p-5 transition-colors
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
