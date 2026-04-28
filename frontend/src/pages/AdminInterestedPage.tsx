// Liste des participants intéressés n'ayant pas encore d'équipe
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiFilter } from 'react-icons/fi'
import { useProjects } from '../hooks/useProjects'
import { teamService } from '../services/teamService'
import CreateTeamModal from '../components/team/CreateTeamModal'
import { useTeams } from '../hooks/useTeams'
import GlassCard from '../components/ui/GlassCard'
import EmptyState from '../components/ui/EmptyState'

interface InterestedUser { id: number; name: string; email: string; project_id?: number; project_name?: string }

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const AdminInterestedPage = () => {
  const { projects } = useProjects()
  const { createTeam } = useTeams()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [interested, setInterested] = useState<InterestedUser[]>([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!selectedProject) return
    const load = async () => {
      setLoading(true)
      try {
        const data = await teamService.getInterestedByProject(selectedProject)
        setInterested(data)
      } catch { setInterested([]) }
      finally { setLoading(false) }
    }
    load()
  }, [selectedProject])

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)]">Intéressés</h1>
          <p className="text-[var(--text-muted)]">Participants sans équipe ayant exprimé un intérêt.</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm">
          <FiUsers size={18} /> Créer une équipe
        </motion.button>
      </div>

      {/* Project filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="text-[var(--text-muted)]" size={16} />
          <span className="text-sm font-medium text-[var(--text)]">Filtrer par projet</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {projects.map(p => (
            <button key={p.id} onClick={() => setSelectedProject(p.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedProject === p.id
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-app)]'
              }`}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {!selectedProject ? (
        <EmptyState icon={FiFilter} title="Sélectionnez un projet" description="Choisissez un projet pour voir les participants intéressés." />
      ) : loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl bg-[var(--surface)] border border-[var(--border-app)] p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--surface-2)]" />
                <div className="flex-1"><div className="h-4 w-1/3 bg-[var(--surface-2)] rounded mb-1" /><div className="h-3 w-1/2 bg-[var(--surface-2)] rounded" /></div>
              </div>
            </div>
          ))}
        </div>
      ) : interested.length === 0 ? (
        <EmptyState title="Aucun intéressé" description="Aucun participant n'a exprimé d'intérêt pour ce projet." />
      ) : (
        <div className="space-y-3">
          {interested.map(user => (
            <motion.div key={user.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[var(--accent)]">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{user.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      <CreateTeamModal
        isOpen={showModal} onClose={() => setShowModal(false)} projects={projects}
        onFetchInterested={teamService.getInterestedByProject}
        onSubmit={async (data) => { await createTeam(data) }}
      />
    </motion.div>
  )
}

export default AdminInterestedPage
