// Hook d'authentification : abstraction pratique autour du AuthContext
// Expose login/register/logout avec gestion d'état loading/error intégrée

import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const ctx = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true)
    setError(null)
    try {
      await ctx.login(credentials)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Échec de la connexion'
      setError(msg)
      throw err // permet au composant de réagir si nécessaire
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    setLoading(true)
    setError(null)
    try {
      await ctx.register(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Échec de l'inscription"
      setError(msg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    user: ctx.user,
    role: ctx.role,
    isAuthenticated: ctx.isAuthenticated,
    isLoading: ctx.isLoading,
    login,
    register,
    logout: ctx.logout,
    loading,
    error,
  }
}
