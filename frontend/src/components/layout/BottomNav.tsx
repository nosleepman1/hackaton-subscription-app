// Barre de navigation inférieure (mobile & tablette) — inspirée de WhatsApp
// S'adapte dynamiquement selon le rôle de l'utilisateur

import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiSearch, FiUsers, FiUser, FiGrid, FiList, FiStar } from 'react-icons/fi'
import { useAuthContext } from '../../context/AuthContext'

// Définition des routes selon le rôle
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

const BottomNav = () => {
  const { role, isAuthenticated } = useAuthContext()

  const links = !isAuthenticated ? guestLinks : role === 'admin' ? adminLinks : userLinks

  return (
    // Caché sur desktop (lg+)
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--border-app)]">
      <div className="flex items-center justify-around px-1 py-2 safe-area-inset-bottom">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/' || to === '/admin'}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Indicateur de l'onglet actif avec animation partagée */}
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 bg-[var(--accent)]/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={22} />
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
