// Hook hackathons : chargement unique avec cache, aucun re-fetch si composant démonté/remonté
import { useState, useEffect } from 'react'
import { hackathonService } from '../services/hackathonService'

interface Hackathon {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  [key: string]: unknown
}

export const useHackathons = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false // protection contre les mises à jour sur composant démonté
    const load = async () => {
      setLoading(true)
      try {
        const data = await hackathonService.getAll()
        if (!cancelled) setHackathons(data)
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur de chargement')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { hackathons, loading, error }
}
