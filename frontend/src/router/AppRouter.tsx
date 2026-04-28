// Routeur principal de l'application
// Organise les routes publiques, utilisateur et admin avec AnimatePresence pour les transitions

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import AppLayout from '../components/layout/AppLayout'

// Guards
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'

// Pages publiques
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'

// Pages utilisateur connecté
import DashboardPage from '../pages/DashboardPage'
import BrowsePage from '../pages/BrowsePage'
import MyTeamPage from '../pages/MyTeamPage'

// Pages admin
import AdminDashboard from '../pages/AdminDashboard'
import AdminTeamsPage from '../pages/AdminTeamsPage'
import AdminInterestedPage from '../pages/AdminInterestedPage'
import AdminThemesPage from '../pages/AdminThemesPage'
import AdminProjectsPage from '../pages/AdminProjectsPage'

const AppRouter = () => {
  const location = useLocation()

  return (
    // AnimatePresence permet les animations de transition entre pages
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ── Routes avec layout principal ── */}
        <Route element={<AppLayout />}>

          {/* Routes publiques : accessibles sans connexion */}
          <Route path="/" element={<HomePage />} />

          {/* Routes guest : redirige si déjà connecté */}
          <Route element={<GuestRoute />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>

          {/* Routes utilisateur connecté (user + admin) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/my-team" element={<MyTeamPage />} />
          </Route>

          {/* Routes admin uniquement */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/teams" element={<AdminTeamsPage />} />
            <Route path="/admin/interested" element={<AdminInterestedPage />} />
            <Route path="/admin/themes" element={<AdminThemesPage />} />
            <Route path="/admin/projects" element={<AdminProjectsPage />} />
          </Route>

        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AppRouter
