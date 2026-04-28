// Hook projets : chargement, filtre par thème, CRUD admin
import { useState, useEffect, useCallback } from 'react'
import { projectService } from '../services/projectService'

interface Project {
  id: number
  name: string
  description: string
  theme_id: number
  max_members: number
  tech_stack: string[]
  interested_count?: number
  theme?: { id: number; name: string; color: string }
  [key: string]: unknown
}

export const useProjects = (themeId?: number) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Filtre par thème si un themeId est fourni, sinon charge tout
      const data = themeId
        ? await projectService.getByTheme(themeId)
        : await projectService.getAll()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }, [themeId])

  useEffect(() => { load() }, [load])

  const createProject = async (data: Parameters<typeof projectService.create>[0]) => {
    await projectService.create(data)
    setSuccess(true)
    await load()
  }

  const updateProject = async (id: number, data: Parameters<typeof projectService.update>[1]) => {
    await projectService.update(id, data)
    await load()
  }

  const deleteProject = async (id: number) => {
    await projectService.delete(id)
    await load()
  }

  return { projects, loading, error, success, createProject, updateProject, deleteProject, refetch: load }
}
