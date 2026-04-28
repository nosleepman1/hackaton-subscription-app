// Service intérêts : un utilisateur peut signaler son intérêt pour un projet
// Backend: /interesteds (apiResource)
// GET /interesteds → { success, data: [...] } (user: ses propres intérêts)
// POST /interesteds → { success, data: {...} } (body: { project_id })
// DELETE /interesteds/{id} → { success }
import axiosClient from '../api/axiosClient'
import queryCache from '../store/queryCache'

const CACHE_KEY = 'interests:me'

export const interestService = {
  // Récupère les intérêts de l'utilisateur connecté
  getMyInterests: async () => {
    if (queryCache.has(CACHE_KEY)) return queryCache.get(CACHE_KEY)
    const response = await axiosClient.get('/interesteds')
    const data = response.data.data ?? response.data
    queryCache.set(CACHE_KEY, data)
    return data
  },

  // Exprime un intérêt pour un projet
  express: async (projectId: number) => {
    const response = await axiosClient.post('/interesteds', { project_id: projectId })
    queryCache.invalidate(CACHE_KEY)
    return response.data.data ?? response.data
  },

  // Retire un intérêt (supprime par ID de l'interested)
  remove: async (interestedId: number) => {
    const response = await axiosClient.delete(`/interesteds/${interestedId}`)
    queryCache.invalidate(CACHE_KEY)
    return response.data
  },
}
