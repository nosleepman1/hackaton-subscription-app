// Hook thèmes : CRUD complet + cache + invalidation automatique après mutations
import { useState, useEffect, useCallback } from 'react'
import { themeService } from '../services/themeService'

interface Theme {
  id: number
  name: string
  description: string
  color: string
  icon: string
  projects_count?: number
  [key: string]: unknown
}

export const useThemes = () => {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await themeService.getAll()
      setThemes(Array.isArray(data) ? data : [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // Création d'un thème puis rechargement de la liste
  const createTheme = async (data: Parameters<typeof themeService.create>[0]) => {
    setLoading(true)
    try {
      await themeService.create(data)
      setSuccess(true)
      await load()
    } finally {
      setLoading(false)
    }
  }

  // Mise à jour d'un thème puis rechargement
  const updateTheme = async (id: number, data: Parameters<typeof themeService.update>[1]) => {
    setLoading(true)
    try {
      await themeService.update(id, data)
      await load()
    } finally {
      setLoading(false)
    }
  }

  // Suppression d'un thème puis rechargement
  const deleteTheme = async (id: number) => {
    setLoading(true)
    try {
      await themeService.delete(id)
      await load()
    } finally {
      setLoading(false)
    }
  }

  return { themes, loading, error, success, createTheme, updateTheme, deleteTheme, refetch: load }
}
