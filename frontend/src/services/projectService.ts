// Service projets : CRUD complet + filtrage par thème + mise en cache
// Backend retourne { message, projects: [...] } pour index
import axiosClient from '../api/axiosClient'
import queryCache from '../store/queryCache'

const CACHE_KEY = 'projects'

export const projectService = {
  // Récupère tous les projets (mis en cache globalement)
  getAll: async () => {
    if (queryCache.has(CACHE_KEY)) return queryCache.get(CACHE_KEY)
    const response = await axiosClient.get('/projects')
    const projects = response.data.projects ?? response.data.data ?? response.data
    queryCache.set(CACHE_KEY, projects)
    return projects
  },

  // Récupère un projet par son identifiant
  getById: async (id: number) => {
    const key = `${CACHE_KEY}:${id}`
    if (queryCache.has(key)) return queryCache.get(key)
    const response = await axiosClient.get(`/projects/${id}`)
    const project = response.data.project ?? response.data.data ?? response.data
    queryCache.set(key, project)
    return project
  },

  // Récupère les projets filtrés par thème (filtrage côté client car pas de route dédiée)
  getByTheme: async (themeId: number) => {
    const key = `${CACHE_KEY}:theme:${themeId}`
    if (queryCache.has(key)) return queryCache.get(key)
    // Charge tous les projets puis filtre côté client
    const all = await projectService.getAll()
    const filtered = Array.isArray(all) ? all.filter((p: { theme_id: number }) => p.theme_id === themeId) : []
    queryCache.set(key, filtered)
    return filtered
  },

  // Crée un projet (invalide tout le cache projets)
  create: async (data: {
    name: string
    description: string
    theme_id: number
    max_members: number
    tech_stack: string[]
  }) => {
    const response = await axiosClient.post('/projects', data)
    queryCache.invalidatePrefix(CACHE_KEY)
    return response.data.project ?? response.data
  },

  // Met à jour un projet (invalide tout le cache projets)
  update: async (id: number, data: Partial<{
    name: string
    description: string
    theme_id: number
    max_members: number
    tech_stack: string[]
  }>) => {
    const response = await axiosClient.put(`/projects/${id}`, data)
    queryCache.invalidatePrefix(CACHE_KEY)
    return response.data.project ?? response.data
  },

  // Supprime un projet (invalide tout le cache projets)
  delete: async (id: number) => {
    const response = await axiosClient.delete(`/projects/${id}`)
    queryCache.invalidatePrefix(CACHE_KEY)
    return response.data
  },
}
