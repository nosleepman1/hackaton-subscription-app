// Page d'exploration : parcourir les thèmes et projets, exprimer ses intérêts
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { useThemes } from '../hooks/useThemes'
import { useProjects } from '../hooks/useProjects'
import { useInterests } from '../hooks/useInterests'
import ProjectList from '../components/project/ProjectList'
import GlassCard from '../components/ui/GlassCard'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const BrowsePage = () => {
  const { themes } = useThemes()
  const [selectedTheme, setSelectedTheme] = useState<number | undefined>(undefined)
  const { projects, loading } = useProjects(selectedTheme)
  const { myInterests } = useInterests()

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)] mb-2">Explorer</h1>
          <p className="text-[var(--text-muted)] mb-6">Parcourez les projets et exprimez vos intérêts.</p>

          {/* Theme filter pills */}
          <div className="flex gap-2 flex-wrap mb-8">
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setSelectedTheme(undefined)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                !selectedTheme ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/25' : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-app)]'
              }`}>
              Tous les projets
            </motion.button>
            {(Array.isArray(themes) ? themes : []).map(theme => (
              <motion.button key={theme.id} whileTap={{ scale: 0.95 }} onClick={() => setSelectedTheme(theme.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedTheme === theme.id ? 'text-white shadow-lg' : 'border border-[var(--border-app)] text-[var(--text-muted)]'
                }`}
                style={selectedTheme === theme.id
                  ? { backgroundColor: theme.color, boxShadow: `0 8px 20px ${theme.color}40` }
                  : { backgroundColor: `${theme.color}08` }
                }>
                {theme.icon} {theme.name}
              </motion.button>
            ))}
          </div>

          <ProjectList projects={Array.isArray(projects) ? projects : []} showInterest loading={loading} />
        </div>

        {/* Sidebar: Mes intérêts (desktop only) */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-8">
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <FiHeart className="text-[var(--accent)]" size={18} />
                <h3 className="font-display font-semibold text-[var(--text)]">Mes intérêts</h3>
              </div>
              {myInterests.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)]">Aucun intérêt exprimé pour le moment.</p>
              ) : (
                <div className="space-y-2">
                  {myInterests.map(projectId => {
                    const project = (Array.isArray(projects) ? projects : []).find(p => p.id === projectId)
                    return project ? (
                      <div key={projectId} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--surface-2)]">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-sm text-[var(--text)] truncate">{project.name}</span>
                      </div>
                    ) : null
                  })}
                  <p className="text-xs text-[var(--text-muted)] mt-2">{myInterests.length} projet(s) marqué(s)</p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BrowsePage
