// Tableau de bord utilisateur : vue personnalisée après connexion
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiUsers, FiHeart, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useTeams } from '../hooks/useTeams'
import { useInterests } from '../hooks/useInterests'
import { useProjects } from '../hooks/useProjects'
import GlassCard from '../components/ui/GlassCard'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const DashboardPage = () => {
  const { user } = useAuthContext()
  const { myTeam, loadMyTeam } = useTeams()
  const { myInterests } = useInterests()
  const { projects } = useProjects()

  useEffect(() => { loadMyTeam() }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)]">
          {greeting}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-[var(--text-muted)] mt-1">Voici un résumé de votre activité.</p>
      </div>

      <GlassCard className="mb-8 bg-gradient-to-r from-[var(--accent)]/5 to-[#FF6B35]/5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
            {myTeam ? <FiUsers className="text-[var(--accent)]" size={22} /> : <FiHeart className="text-[var(--accent)]" size={22} />}
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-[var(--text)] text-sm sm:text-base truncate">
              {myTeam ? `Membre de : ${myTeam.name}` : 'Vous êtes en solo'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              {myTeam ? `${myTeam.members?.length || 0} membre(s) dans votre équipe` : 'Explorez les projets et trouvez votre équipe !'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: FiHeart, label: 'Mes intérêts', value: (myInterests ?? []).length, color: '#6C63FF' },
          { icon: FiSearch, label: 'Projets disponibles', value: (Array.isArray(projects) ? projects : []).length, color: '#FF6B35' },
          { icon: FiUsers, label: 'Statut équipe', value: myTeam ? 'En équipe' : 'Solo', color: '#10B981' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon style={{ color: stat.color }} size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                  <p className="text-lg font-display font-bold text-[var(--text)]">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-display font-semibold text-[var(--text)] mb-4">Actions rapides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/browse">
          <GlassCard hover className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                <FiSearch className="text-[var(--accent)]" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text)]">Explorer les projets</h3>
                <p className="text-xs text-[var(--text-muted)]">Découvrez et marquez vos intérêts</p>
              </div>
            </div>
            <FiArrowRight className="text-[var(--text-muted)]" />
          </GlassCard>
        </Link>
        <Link to="/my-team">
          <GlassCard hover className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                <FiUsers className="text-[#FF6B35]" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text)]">Mon équipe</h3>
                <p className="text-xs text-[var(--text-muted)]">{myTeam ? 'Voir les détails' : 'Créer une équipe'}</p>
              </div>
            </div>
            <FiArrowRight className="text-[var(--text-muted)]" />
          </GlassCard>
        </Link>
      </div>
    </motion.div>
  )
}

export default DashboardPage
