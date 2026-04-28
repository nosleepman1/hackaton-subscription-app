// Carte de thème avec couleur, icône et nombre de projets

import { motion } from 'framer-motion'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

interface ThemeCardProps {
  theme: {
    id: number
    name: string
    description: string
    color: string
    icon: string
    projects_count?: number
  }
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
}

const ThemeCard = ({ theme, onEdit, onDelete, showActions = false }: ThemeCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: `0 12px 30px ${theme.color}20` }}
      className="rounded-2xl border border-[var(--border-app)] bg-[var(--surface)] p-5 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: `${theme.color}20`, color: theme.color }}
        >
          {theme.icon || '🎯'}
        </div>
        {showActions && (
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <h3 className="font-display font-semibold text-[var(--text)] mb-1">{theme.name}</h3>
      <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{theme.description}</p>

      <div className="flex items-center gap-2">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ backgroundColor: `${theme.color}15`, color: theme.color }}
        >
          {theme.projects_count ?? 0} projet(s)
        </span>
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: theme.color }}
        />
      </div>
    </motion.div>
  )
}

export default ThemeCard
