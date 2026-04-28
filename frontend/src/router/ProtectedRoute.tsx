// Route protégée avec vérification du rôle (user ou admin)
// Redirige vers /auth si non connecté, vers /dashboard si le rôle est insuffisant

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

interface ProtectedRouteProps {
  role?: 'user' | 'admin' // rôle minimum requis pour accéder à la route
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { isAuthenticated, role: userRole, isLoading } = useAuthContext()

  // Attends la fin de l'hydratation avant de prendre une décision de redirection
  if (isLoading) return null

  // Non connecté → redirection vers la page d'authentification
  if (!isAuthenticated) return <Navigate to="/auth" replace />

  // Rôle insuffisant → redirection vers le dashboard utilisateur
  if (role === 'admin' && userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
