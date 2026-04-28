// Tableau de bord administrateur : vue globale de l'état du hackathon
import { motion } from 'framer-motion'
import { FiUsers, FiFolder, FiHeart, FiLayers, FiAlertCircle } from 'react-icons/fi'
import { useTeams } from '../hooks/useTeams'
import { useProjects } from '../hooks/useProjects'
import { useThemes } from '../hooks/useThemes'
import GlassCard from '../components/ui/GlassCard'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -20 },
}

const COLORS = ['#6C63FF', '#FF6B35', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6']

const AdminDashboard = () => {
  const { teams } = useTeams()
  const { projects } = useProjects()
  const { themes } = useThemes()

  const teamsArr = Array.isArray(teams) ? teams : []
  const projectsArr = Array.isArray(projects) ? projects : []
  const themesArr = Array.isArray(themes) ? themes : []

  const stats = [
    { icon: FiUsers, label: 'Équipes', value: teamsArr.length, color: '#6C63FF' },
    { icon: FiFolder, label: 'Projets', value: projectsArr.length, color: '#FF6B35' },
    { icon: FiLayers, label: 'Thèmes', value: themesArr.length, color: '#10B981' },
    { icon: FiHeart, label: 'Intéressés', value: '—', color: '#F59E0B' },
  ]

  // Données pour le graphique de distribution
  const chartData = projectsArr.map(p => ({
    name: p.name,
    value: p.interested_count ?? 0,
  })).filter(d => d.value > 0)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)] mb-2">Dashboard Admin</h1>
      <p className="text-[var(--text-muted)] mb-8">Vue d'ensemble du hackathon.</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon style={{ color: stat.color }} size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                  <p className="text-xl font-display font-bold text-[var(--text)]">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <GlassCard>
          <h3 className="font-display font-semibold text-[var(--text)] mb-4">Distribution des intérêts</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-app)', borderRadius: '12px', color: 'var(--text)' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-[var(--text-muted)] text-center py-12">Aucune donnée disponible</p>
          )}
        </GlassCard>

        {/* Alerts */}
        <GlassCard>
          <h3 className="font-display font-semibold text-[var(--text)] mb-4">Alertes</h3>
          <div className="space-y-3">
            {teamsArr.length === 0 && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                <FiAlertCircle className="text-[#F59E0B] flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-[var(--text)]">Aucune équipe n'a encore été créée.</p>
              </div>
            )}
            {projectsArr.length === 0 && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/20">
                <FiAlertCircle className="text-[#FF6B35] flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-[var(--text)]">Aucun projet disponible. Créez des projets.</p>
              </div>
            )}
            {teamsArr.length > 0 && projectsArr.length > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
                <FiAlertCircle className="text-[#10B981] flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-[var(--text)]">Tout semble en ordre ! 🎉</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
