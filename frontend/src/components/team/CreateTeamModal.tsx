// Modale de création d'équipe en 3 étapes (wizard)
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import Modal from '../ui/Modal'

interface Project { id: number; name: string; description: string }
interface InterestedUser { id: number; name: string; email: string }

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onFetchInterested: (projectId: number) => Promise<InterestedUser[]>
  onSubmit: (data: { name: string; project_id: number; member_ids: number[] }) => Promise<void>
}

const CreateTeamModal = ({ isOpen, onClose, projects, onFetchInterested, onSubmit }: CreateTeamModalProps) => {
  const [step, setStep] = useState(1)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [interested, setInterested] = useState<InterestedUser[]>([])
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [teamName, setTeamName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleProjectSelect = async (projectId: number) => {
    setSelectedProject(projectId)
    const users = await onFetchInterested(projectId)
    setInterested(users)
    setStep(2)
  }

  const toggleMember = (userId: number) => {
    setSelectedMembers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId])
  }

  const handleSubmit = async () => {
    if (!selectedProject || !teamName.trim()) return
    setLoading(true)
    try {
      await onSubmit({ name: teamName, project_id: selectedProject, member_ids: selectedMembers })
      onClose()
      setStep(1); setSelectedProject(null); setSelectedMembers([]); setTeamName('')
    } finally { setLoading(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Créer une équipe — Étape ${step}/3`} size="lg">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-sm text-[var(--text-muted)] mb-4">Sélectionnez un projet</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {projects.map(p => (
                <button key={p.id} onClick={() => handleProjectSelect(p.id)}
                  className="p-4 rounded-xl border border-[var(--border-app)] bg-[var(--surface-2)] hover:border-[var(--accent)] text-left transition-colors">
                  <h4 className="font-semibold text-[var(--text)] text-sm">{p.name}</h4>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">{p.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-sm text-[var(--text-muted)] mb-4">Sélectionnez les membres intéressés</p>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto mb-4">
              {interested.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] text-center py-8">Aucun utilisateur intéressé</p>
              ) : interested.map(u => (
                <label key={u.id} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-app)] cursor-pointer hover:bg-[var(--surface-2)] transition-colors">
                  <input type="checkbox" checked={selectedMembers.includes(u.id)} onChange={() => toggleMember(u.id)}
                    className="w-4 h-4 rounded accent-[var(--accent)]" />
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-xs font-semibold text-[var(--accent)]">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{u.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{u.email}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm text-[var(--text-muted)] hover:bg-[var(--surface-2)]">
                <FiChevronLeft size={16} /> Retour
              </button>
              <button onClick={() => setStep(3)} className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium">
                Suivant <FiChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-sm text-[var(--text-muted)] mb-4">Nommez votre équipe et confirmez</p>
            <input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Nom de l'équipe"
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-app)] text-[var(--text)] focus:border-[var(--accent)] outline-none mb-4" />
            <p className="text-xs text-[var(--text-muted)] mb-4">{selectedMembers.length} membre(s) sélectionné(s)</p>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm text-[var(--text-muted)] hover:bg-[var(--surface-2)]">
                <FiChevronLeft size={16} /> Retour
              </button>
              <button onClick={handleSubmit} disabled={loading || !teamName.trim()}
                className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-50">
                <FiCheck size={16} /> {loading ? 'Création...' : 'Créer l\'équipe'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}

export default CreateTeamModal
