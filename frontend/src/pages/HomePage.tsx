// Page d'accueil publique : vitrine principale du hackathon
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiClock, FiUsers, FiCode, FiAward } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useThemes } from '../hooks/useThemes'
import { useProjects } from '../hooks/useProjects'
import ProjectList from '../components/project/ProjectList'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

// Date de fin du hackathon (statique — pas de endpoint /hackathons dans le backend)
const HACKATHON_END = new Date('2026-06-01T00:00:00')

const HomePage = () => {
  const { isAuthenticated } = useAuthContext()
  const { themes } = useThemes()
  const { projects, loading: projectsLoading } = useProjects()
  const [selectedTheme, setSelectedTheme] = useState<number | undefined>(undefined)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Countdown timer
  useEffect(() => {
    const target = HACKATHON_END.getTime()
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const filteredProjects = selectedTheme
    ? (projects ?? []).filter(p => p.theme_id === selectedTheme)
    : (projects ?? [])

  const themesList = Array.isArray(themes) ? themes : []

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[#FF6B35]/10 pointer-events-none" />
        <div className="absolute top-20 -left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-10 w-56 sm:w-96 h-56 sm:h-96 bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-6">
              <FiCode size={14} /> Hackathon 2026
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--text)] mb-4 leading-tight">
            Bienvenue au Hackathon
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-[var(--text-muted)] mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Rejoignez une aventure de code, d'innovation et de collaboration.
          </motion.p>

          {/* Countdown */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10">
            {[
              { value: countdown.days, label: 'Jours' },
              { value: countdown.hours, label: 'Heures' },
              { value: countdown.minutes, label: 'Min' },
              { value: countdown.seconds, label: 'Sec' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-[var(--surface)] border border-[var(--border-app)] flex items-center justify-center">
                  <span className="text-xl sm:text-3xl font-display font-bold text-[var(--accent)]">{String(value).padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)] mt-1.5">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Link to={isAuthenticated ? '/dashboard' : '/auth'}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-[var(--accent)] text-white font-semibold text-base sm:text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[var(--accent)]/25">
              Participer <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-display font-bold text-[var(--text)] mb-6">Thèmes</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <button onClick={() => setSelectedTheme(undefined)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              !selectedTheme ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-app)] hover:border-[var(--accent)]'
            }`}>
            Tous
          </button>
          {themesList.map(theme => (
            <button key={theme.id} onClick={() => setSelectedTheme(theme.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedTheme === theme.id ? 'text-white' : 'text-[var(--text-muted)] border border-[var(--border-app)] hover:border-[var(--accent)]'
              }`}
              style={selectedTheme === theme.id ? { backgroundColor: theme.color } : { backgroundColor: `${theme.color}10` }}>
              {theme.icon} {theme.name}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-display font-bold text-[var(--text)] mb-6">Projets</h2>
        <ProjectList projects={filteredProjects} loading={projectsLoading} />
      </section>

      {/* Timeline Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-display font-bold text-[var(--text)] mb-8 text-center">Comment ça marche</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {[
            { icon: FiUsers, title: 'Inscrivez-vous', desc: 'Créez votre compte et explorez les projets proposés.' },
            { icon: FiCode, title: 'Exprimez vos intérêts', desc: "Marquez les projets qui vous passionnent." },
            { icon: FiClock, title: 'Formez une équipe', desc: "Rejoignez ou créez une équipe autour d'un projet." },
            { icon: FiAward, title: 'Innovez !', desc: 'Développez votre solution et présentez-la au jury.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-app)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="text-[var(--accent)]" size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[var(--text)]">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Espacement pour la bottom nav sur mobile */}
      <div className="h-4 lg:hidden" />
    </motion.div>
  )
}

export default HomePage
