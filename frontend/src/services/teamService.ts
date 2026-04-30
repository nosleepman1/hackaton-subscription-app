// Service équipes : création, gestion des membres
// Backend retourne { success, message, data: [...] } pour index
import axiosClient from '../api/axiosClient'
import queryCache from '../store/queryCache'

const CACHE_KEY = 'teams'

export const teamService = {
  // Récupère toutes les équipes (admin : toutes, user : les siennes)
  getAll: async () => {
    const response = await axiosClient.get('/teams')
    return response.data.data ?? response.data
  },

  // Récupère l'équipe de l'utilisateur connecté (première équipe retournée)
  getMyTeam: async () => {
    const response = await axiosClient.get('/teams')
    const teams = response.data.data ?? response.data
    return Array.isArray(teams) && teams.length > 0 ? teams[0] : null
  },

  // Crée une nouvelle équipe
  create: async (data: { name: string; project_id: number; member_ids?: number[] }) => {
    const response = await axiosClient.post('/teams', {
      name: data.name,
      project_id: data.project_id,
    })
    queryCache.invalidate(CACHE_KEY)
    return response.data.data ?? response.data
  },

  // Crée une équipe depuis les intéressés (admin)
  createFromInterested: async (data: { name: string; project_id: number; interested_ids: number[] }) => {
    const response = await axiosClient.post('/admin/teams/from-interesteds', data)
    queryCache.invalidate(CACHE_KEY)
    return response.data.data ?? response.data
  },

  // Récupère les utilisateurs intéressés par un projet donné (admin)
  getInterestedByProject: async (projectId: number) => {
    const response = await axiosClient.get('/interesteds', {
      params: { project_id: projectId }
    })
    const data = response.data.data ?? response.data
    return Array.isArray(data) ? data.map((i: { id: number; user: { id: number; firstname: string; lastname: string; email: string } }) => ({
      id: i.id,
      name: `${i.user?.firstname ?? ''} ${i.user?.lastname ?? ''}`.trim() || 'Inconnu',
      email: i.user?.email ?? '',
      interested_id: i.id,
    })) : []
  },
}
