// Route réservée aux visiteurs non connectés (ex: page auth)
// Redirige vers /dashboard si l'utilisateur est déjà authentifié

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuthContext()

  // Attends la fin de l'hydratation du contexte avant de rediriger
  if (isLoading) return null

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default GuestRoute
