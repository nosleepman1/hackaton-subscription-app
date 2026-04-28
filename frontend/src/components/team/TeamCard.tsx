// Carte d'équipe avec membres, projet et actions
import { motion } from 'framer-motion'
import { FiUsers, FiCalendar } from 'react-icons/fi'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface TeamMember { id: number; name: string; is_captain?: boolean }

interface TeamCardProps {
  team: {
    id: number; name: string
    project?: { id: number; name: string }
    members: TeamMember[]
    created_at: string
  }
  onClick?: () => void
}

const TeamCard = ({ team, onClick }: TeamCardProps) => (
  <motion.div whileHover={{ y: -2 }} onClick={onClick}
    className="rounded-2xl border border-[var(--border-app)] bg-[var(--surface)] p-5 cursor-pointer transition-colors hover:border-[var(--accent)]/30">
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-display font-semibold text-[var(--text)]">{team.name}</h3>
      <span className="text-xs px-2 py-0.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] font-medium">
        {team.members.length} membre(s)
      </span>
    </div>
    {team.project && (
      <p className="text-sm text-[var(--text-muted)] mb-3">
        Projet : <span className="text-[var(--accent)]">{team.project.name}</span>
      </p>
    )}
    <div className="flex items-center gap-1 mb-3">
      {team.members.slice(0, 5).map((m, i) => (
        <div key={m.id} className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-xs font-semibold text-[var(--accent)] border-2 border-[var(--surface)]"
          style={{ marginLeft: i > 0 ? '-6px' : 0, zIndex: 5 - i }} title={m.name}>
          {m.name.charAt(0).toUpperCase()}
        </div>
      ))}
      {team.members.length > 5 && <span className="text-xs text-[var(--text-muted)] ml-1">+{team.members.length - 5}</span>}
    </div>
    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
      <span className="flex items-center gap-1"><FiUsers size={12} />{team.members.length}</span>
      <span className="flex items-center gap-1"><FiCalendar size={12} />{format(new Date(team.created_at), 'dd MMM yyyy', { locale: fr })}</span>
    </div>
  </motion.div>
)

export default TeamCard
