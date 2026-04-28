import axios from 'axios'

// Instance axios principale avec l'URL de base du backend Laravel
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Instance séparée pour les routes hors /v1 (comme /api/user)
export const axiosRoot = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Intercepteur de requête : injecte automatiquement le token Bearer depuis localStorage
const addToken = (config: import('axios').InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

axiosClient.interceptors.request.use(addToken)
axiosRoot.interceptors.request.use(addToken)

// Intercepteur de réponse : redirige vers /auth si le token est expiré ou invalide
const handleUnauthorized = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    localStorage.removeItem('auth_token')
    window.location.href = '/auth'
  }
  return Promise.reject(error)
}

axiosClient.interceptors.response.use((r) => r, handleUnauthorized)
axiosRoot.interceptors.response.use((r) => r, handleUnauthorized)

export default axiosClient
