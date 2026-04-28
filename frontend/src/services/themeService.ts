// Service thèmes (catégories de projets) : CRUD complet + gestion cache
// Backend retourne { message, themes: [...] } pour index
import axiosClient from '../api/axiosClient'
import queryCache from '../store/queryCache'

const CACHE_KEY = 'themes'

export const themeService = {
  // Récupère tous les thèmes (mis en cache)
  getAll: async () => {
    if (queryCache.has(CACHE_KEY)) return queryCache.get(CACHE_KEY)
    const response = await axiosClient.get('/themes')
    const themes = response.data.themes ?? response.data.data ?? response.data
    queryCache.set(CACHE_KEY, themes)
    return themes
  },

  // Crée un nouveau thème (invalide le cache)
  create: async (data: { name: string; description: string; color: string; icon: string }) => {
    const response = await axiosClient.post('/themes', data)
    queryCache.invalidate(CACHE_KEY)
    return response.data.theme ?? response.data
  },

  // Met à jour un thème existant (invalide le cache)
  update: async (id: number, data: Partial<{ name: string; description: string; color: string; icon: string }>) => {
    const response = await axiosClient.put(`/themes/${id}`, data)
    queryCache.invalidate(CACHE_KEY)
    return response.data.theme ?? response.data
  },

  // Supprime un thème (invalide le cache)
  delete: async (id: number) => {
    const response = await axiosClient.delete(`/themes/${id}`)
    queryCache.invalidate(CACHE_KEY)
    return response.data
  },
}
