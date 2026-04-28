// Sidebar desktop : collapse par défaut (64px) → expand au survol (240px)
// Items avec icônes + labels qui apparaissent en fondu lors de l'expansion

import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiSearch, FiUsers, FiUser, FiGrid, FiList, FiStar, FiLogOut, FiZap } from 'react-icons/fi'
import { useAuthContext } from '../../context/AuthContext'
import ThemeToggle from '../ui/ThemeToggle'

const guestLinks = [
  { to: '/', label: 'Accueil', icon: FiHome },
  { to: '/auth', label: 'Connexion', icon: FiUser },
]

const userLinks = [
  { to: '/dashboard', label: 'Accueil', icon: FiHome },
  { to: '/browse', label: 'Explorer', icon: FiSearch },
  { to: '/my-team', label: 'Mon équipe', icon: FiUsers },
]

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid },
  { to: '/admin/teams', label: 'Équipes', icon: FiUsers },
  { to: '/admin/interested', label: 'Intéressés', icon: FiStar },
  { to: '/admin/themes', label: 'Thèmes', icon: FiList },
  { to: '/admin/projects', label: 'Projets', icon: FiSearch },
]

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)
  const { role, isAuthenticated, user, logout } = useAuthContext()
  const navigate = useNavigate()

  const links = !isAuthenticated ? guestLinks : role === 'admin' ? adminLinks : userLinks

  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }

  return (
    <motion.nav
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ width: expanded ? 240 : 64 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden lg:flex fixed left-0 top-0 h-screen flex-col z-40
                 bg-[var(--surface)] border-r border-[var(--border-app)]
                 py-6 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
          <FiZap className="text-white" size={18} />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-display font-bold text-lg whitespace-nowrap text-[var(--text)]"
            >
              Hackathon
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation links */}
      <div className="flex-1 flex flex-col gap-1 px-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/' || to === '/admin'}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`
            }
          >
            <Icon size={20} className="flex-shrink-0" />
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </div>

      {/* Bottom section: theme toggle + user */}
      <div className="flex flex-col gap-2 px-2 mt-auto">
        <div className="flex items-center gap-3 px-3">
          <ThemeToggle />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-[var(--text-muted)] whitespace-nowrap"
              >
                Thème
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {isAuthenticated && (
          <>
            <div className="h-px bg-[var(--border-app)] mx-2 my-1" />
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-[var(--accent)]">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-sm font-medium text-[var(--text)] truncate">{user?.name}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <FiLogOut size={20} className="flex-shrink-0" />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    Déconnexion
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </>
        )}
      </div>
    </motion.nav>
  )
}

export default Sidebar
