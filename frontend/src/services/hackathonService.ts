// Service hackathon : lecture des hackathons (données relativement stables → mise en cache)
import axiosClient from '../api/axiosClient'
import queryCache from '../store/queryCache'

const CACHE_KEY = 'hackathons'

export const hackathonService = {
  // Récupère tous les hackathons (utilise le cache si disponible)
  getAll: async () => {
    if (queryCache.has(CACHE_KEY)) return queryCache.get(CACHE_KEY)
    const response = await axiosClient.get('/hackathons')
    queryCache.set(CACHE_KEY, response.data)
    return response.data
  },

  // Récupère un hackathon par son identifiant
  getById: async (id: number) => {
    const key = `${CACHE_KEY}:${id}`
    if (queryCache.has(key)) return queryCache.get(key)
    const response = await axiosClient.get(`/hackathons/${id}`)
    queryCache.set(key, response.data)
    return response.data
  },
}
