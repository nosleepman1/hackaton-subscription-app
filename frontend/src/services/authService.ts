// Service d'authentification : toutes les interactions avec les endpoints auth Laravel Sanctum
// Routes sous /v1/auth/
import axiosClient from '../api/axiosClient'

export const authService = {
  // Connexion : retourne { success, message, token, role }
  login: async (credentials: { email: string; password: string }) => {
    const response = await axiosClient.post('/auth/login', credentials)
    return response.data
  },

  // Inscription : retourne { success, message }
  register: async (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    const response = await axiosClient.post('/auth/register', data)
    return response.data
  },

  // Déconnexion : invalide le token côté serveur
  logout: async () => {
    const response = await axiosClient.post('/auth/logout')
    return response.data
  },

  // Récupère les grades disponibles
  getGrades: async () => {
    const response = await axiosClient.get('/auth/grades')
    return response.data
  },

  // Récupère les filières disponibles
  getFilieres: async () => {
    const response = await axiosClient.get('/auth/filieres')
    return response.data
  },
}
