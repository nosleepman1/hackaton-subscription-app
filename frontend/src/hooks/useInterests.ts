// Hook intérêts : permet à un utilisateur solo de marquer/retirer des projets
// Le backend retourne des objets { id, project_id, user_id, project, user }
import { useState, useEffect, useCallback } from 'react'
import { interestService } from '../services/interestService'

interface InterestEntry {
  id: number
  project_id: number
  user_id: number
  project?: { id: number; name: string }
}

export const useInterests = () => {
  const [interests, setInterests] = useState<InterestEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const data = await interestService.getMyInterests()
      if (Array.isArray(data)) {
        setInterests(data)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    }
  }, [])

  useEffect(() => { load() }, [load])

  // Liste des project_id pour faciliter les vérifications
  const myInterests = interests.map(i => i.project_id)

  // Vérifie si l'utilisateur est déjà intéressé par un projet
  const isInterested = (projectId: number) => myInterests.includes(projectId)

  // Trouve l'ID de l'entrée interested pour un projet donné
  const getInterestedId = (projectId: number) => interests.find(i => i.project_id === projectId)?.id

  const expressInterest = async (projectId: number) => {
    setLoading(true)
    try {
      await interestService.express(projectId)
      await load() // recharge pour obtenir le vrai ID
    } catch {
      // erreur silencieuse
    } finally {
      setLoading(false)
    }
  }

  const removeInterest = async (projectId: number) => {
    const interestedId = getInterestedId(projectId)
    if (!interestedId) return
    // Mise à jour optimiste
    setInterests(prev => prev.filter(i => i.project_id !== projectId))
    setLoading(true)
    try {
      await interestService.remove(interestedId)
    } catch {
      await load() // rollback
    } finally {
      setLoading(false)
    }
  }

  return { myInterests, interests, isInterested, expressInterest, removeInterest, loading, error }
}
