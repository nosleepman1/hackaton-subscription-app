// Gestion des équipes par l'administrateur
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useTeams } from '../hooks/useTeams'
import { useProjects } from '../hooks/useProjects'
import { teamService } from '../services/teamService'
import TeamCard from '../components/team/TeamCard'
import CreateTeamModal from '../components/team/CreateTeamModal'
import EmptyState from '../components/ui/EmptyState'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const AdminTeamsPage = () => {
  const { teams, loading, createTeam, refetch } = useTeams()
  const { projects } = useProjects()
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreateTeam = async (data: { name: string; project_id: number; member_ids: number[] }) => {
    await createTeam(data)
    await refetch()
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)]">Équipes</h1>
          <p className="text-[var(--text-muted)]">{teams.length} équipe(s) au total</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm">
          <FiPlus size={18} /> Nouvelle équipe
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher une équipe..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-[var(--border-app)] bg-[var(--surface)] p-5 animate-pulse">
              <div className="h-5 w-1/2 bg-[var(--surface-2)] rounded mb-3" />
              <div className="h-4 w-3/4 bg-[var(--surface-2)] rounded mb-4" />
              <div className="h-8 w-full bg-[var(--surface-2)] rounded" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title="Aucune équipe" description="Créez la première équipe du hackathon." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(team => (
            <motion.div key={team.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <TeamCard team={team} />
            </motion.div>
          ))}
        </div>
      )}

      <CreateTeamModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        projects={projects}
        onFetchInterested={teamService.getInterestedByProject}
        onSubmit={handleCreateTeam}
      />
    </motion.div>
  )
}

export default AdminTeamsPage
