// Contexte d'authentification global
// Gère l'état utilisateur, le token Sanctum et le rôle détecté automatiquement

import React, { createContext, useContext, useEffect, useState } from 'react'
import axiosClient, { axiosRoot } from '../api/axiosClient'
import queryCache from '../store/queryCache'

type Role = 'admin' | 'user' | null

interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  role: Role
}

interface AuthContextType {
  user: User | null
  token: string | null
  role: Role
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (data: Record<string, string>) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'))
  const [isLoading, setIsLoading] = useState(true)

  // Hydrate l'utilisateur au chargement si un token est présent
  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        // /api/user est hors du préfixe /v1
        const { data } = await axiosRoot.get('/user')
        // Le rôle est stocké dans localStorage car /api/user ne le retourne pas
        const storedRole = localStorage.getItem('auth_role') as Role
        setUser({ ...data, role: storedRole || 'user' })
      } catch {
        // Token invalide ou expiré : nettoyage
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_role')
        setToken(null)
      } finally {
        setIsLoading(false)
      }
    }
    hydrate()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    const { data } = await axiosClient.post('/auth/login', credentials)
    if (!data.success) {
      throw new Error(data.message || 'Échec de la connexion')
    }
    localStorage.setItem('auth_token', data.token)
    localStorage.setItem('auth_role', data.role)
    setToken(data.token)

    try {
      const userRes = await axiosRoot.get('/user', {
        headers: { Authorization: `Bearer ${data.token}` }
      })
      setUser({ ...userRes.data, role: data.role })
    } catch {
      setUser({ id: 0, firstname: '', lastname: '', email: credentials.email, role: data.role })
    }
  }

  const register = async (registerData: Record<string, string>) => {
    try {
      const { data } = await axiosClient.post('/auth/register', registerData)
      if (!data.success) {
        throw new Error(data.message || "Échec de l'inscription")
      }
      // Le backend ne retourne pas de token à l'inscription, il faut se connecter après
      // On fait un login automatique
      await login({ email: registerData.email, password: registerData.password })
    } catch (err: unknown) {
      // Extraire les erreurs de validation Laravel (422)
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
        const validationErrors = axiosErr.response?.data?.errors
        if (validationErrors) {
          const messages = Object.values(validationErrors).flat().join('. ')
          throw new Error(messages)
        }
        if (axiosErr.response?.data?.message) {
          throw new Error(axiosErr.response.data.message)
        }
      }
      throw err
    }
  }

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout')
    } finally {
      // Nettoyage systématique même si la requête échoue
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_role')
      setToken(null)
      setUser(null)
      queryCache.invalidateAll()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook pratique pour consommer le contexte d'authentification
export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext doit être utilisé dans un AuthProvider')
  return ctx
}
