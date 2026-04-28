// Hook équipes : vue admin (toutes les équipes) + vue user (mon équipe)
import { useState, useEffect } from 'react'
import { teamService } from '../services/teamService'

interface TeamMember {
  id: number
  name: string
  email: string
  is_captain?: boolean
}

interface Team {
  id: number
  name: string
  project_id: number
  project?: { id: number; name: string }
  members: TeamMember[]
  created_at: string
  [key: string]: unknown
}

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [myTeam, setMyTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const loadAll = async () => {
    setLoading(true)
    try {
      const data = await teamService.getAll()
      setTeams(Array.isArray(data) ? data : [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  // Charge uniquement l'équipe de l'utilisateur connecté
  const loadMyTeam = async () => {
    try {
      const data = await teamService.getMyTeam()
      setMyTeam(data)
    } catch {
      setMyTeam(null) // l'utilisateur n'a pas encore d'équipe
    }
  }

  const createTeam = async (data: Parameters<typeof teamService.create>[0]) => {
    setLoading(true)
    try {
      const team = await teamService.create(data)
      setSuccess(true)
      setMyTeam(team)
      return team
    } finally {
      setLoading(false)
    }
  }

  return { teams, myTeam, loading, error, success, loadMyTeam, createTeam, refetch: loadAll }
}
