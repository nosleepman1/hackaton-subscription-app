// Composant EmptyState pour les écrans sans données

import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FiInbox } from 'react-icons/fi'

interface EmptyStateProps {
  icon?: IconType
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = ({ icon: Icon = FiInbox, title, description, action }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
        <Icon size={28} className="text-[var(--accent)]" />
      </div>
      <h3 className="text-lg font-display font-semibold text-[var(--text)] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--text-muted)] max-w-sm mb-4">{description}</p>
      )}
      {action}
    </motion.div>
  )
}

export default EmptyState
