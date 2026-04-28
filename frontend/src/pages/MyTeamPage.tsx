// Gestion de l'équipe personnelle : création ou vue des détails selon l'état
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiPlus, FiStar } from 'react-icons/fi'
import { useTeams } from '../hooks/useTeams'
import { useProjects } from '../hooks/useProjects'
import GlassCard from '../components/ui/GlassCard'
import EmptyState from '../components/ui/EmptyState'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const MyTeamPage = () => {
  const { myTeam, loadMyTeam, createTeam, loading } = useTeams()
  const { projects } = useProjects()
  const [showCreate, setShowCreate] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  useEffect(() => { loadMyTeam() }, [])

  const handleCreate = async () => {
    if (!teamName.trim() || !selectedProject) return
    await createTeam({ name: teamName, project_id: selectedProject, member_ids: [] })
    setShowCreate(false)
    setTeamName('')
    setSelectedProject(null)
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)] mb-2">Mon équipe</h1>
      <p className="text-[var(--text-muted)] mb-8">
        {myTeam ? 'Détails de votre équipe' : 'Vous n\'avez pas encore d\'équipe.'}
      </p>

      {myTeam ? (
        /* Team exists: show details */
        <div className="space-y-6">
          <GlassCard className="bg-gradient-to-r from-[var(--accent)]/5 to-[#FF6B35]/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center">
                <FiUsers className="text-[var(--accent)]" size={28} />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-[var(--text)]">{myTeam.name}</h2>
                {myTeam.project && (
                  <p className="text-sm text-[var(--text-muted)]">
                    Projet : <span className="text-[var(--accent)]">{myTeam.project.name}</span>
                  </p>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Members */}
          <div>
            <h3 className="text-lg font-display font-semibold text-[var(--text)] mb-4">Membres</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {myTeam.members?.map(member => (
                <GlassCard key={member.id}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-[var(--accent)]">{member.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{member.name}</p>
                      {member.is_captain && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#FF6B35]">
                          <FiStar size={10} /> Capitaine
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* No team: show empty state + create form */
        <div>
          {!showCreate ? (
            <EmptyState
              icon={FiUsers}
              title="Pas encore d'équipe"
              description="Créez votre équipe pour participer au hackathon."
              action={
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowCreate(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold">
                  <FiPlus size={18} /> Créer une équipe
                </motion.button>
              }
            />
          ) : (
            <GlassCard className="max-w-md mx-auto">
              <h3 className="font-display font-semibold text-[var(--text)] mb-4">Nouvelle équipe</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nom de l'équipe</label>
                  <input value={teamName} onChange={e => setTeamName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Projet</label>
                  <select value={selectedProject ?? ''} onChange={e => setSelectedProject(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none">
                    <option value="">Sélectionner un projet</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowCreate(false)}
                    className="flex-1 py-3 rounded-xl border border-[var(--border-app)] text-[var(--text-muted)] font-medium">
                    Annuler
                  </button>
                  <motion.button whileTap={{ scale: 0.98 }} onClick={handleCreate} disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold disabled:opacity-50">
                    {loading ? 'Création...' : 'Créer'}
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default MyTeamPage
