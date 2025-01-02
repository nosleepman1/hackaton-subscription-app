import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { GET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "@/services/project/project"
import { GET_THEMES } from "@/services/theme/theme"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Loader2, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectManager() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<{ id: number; name: string; description: string; theme?: { id: number } } | null>(null)
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [themeId, setThemeId] = useState<string>("")

  // Fetch projects
  const { data: projectsData, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: GET_PROJECTS,
  })

  // Fetch themes for dropdown
  const { data: themesData, isLoading: isThemesLoading } = useQuery({
    queryKey: ["themes"],
    queryFn: GET_THEMES,
  })

  const projects = projectsData?.data || []
  const themes = themesData?.data || []

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: CREATE_PROJECT,
    onSuccess: (res: any) => {
      if (res && (res.errors || res.success === false)) {
        toast.error(res.message || "Erreur de validation lors de la création.")
      } else {
        queryClient.invalidateQueries({ queryKey: ["projects"] })
        toast.success("Projet créé avec succès !")
        closeModal()
      }
    },
    onError: () => {
      toast.error("Erreur lors de la création du projet.")
    }
  })

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => UPDATE_PROJECT(id, data),
    onSuccess: (res: any) => {
      if (res && (res.errors || res.success === false)) {
        toast.error(res.message || "Erreur de validation lors de la modification.")
      } else {
        queryClient.invalidateQueries({ queryKey: ["projects"] })
        toast.success("Projet mis à jour avec succès !")
        closeModal()
      }
    },
    onError: () => {
      toast.error("Erreur lors de la modification du projet.")
    }
  })

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: DELETE_PROJECT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Projet supprimé avec succès !")
    },
    onError: () => {
      toast.error("Erreur lors de la suppression du projet.")
    }
  })

  const openCreateModal = () => {
    setEditingProject(null)
    setName("")
    setDescription("")
    setThemeId("")
    setIsOpen(true)
  }

  const openEditModal = (project: any) => {
    setEditingProject(project)
    setName(project.name)
    setDescription(project.description)
    setThemeId(project.theme?.id ? String(project.theme.id) : "")
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setEditingProject(null)
    setName("")
    setDescription("")
    setThemeId("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim() || !themeId) {
      toast.warning("Veuillez remplir tous les champs et sélectionner un thème.")
      return
    }

    const payload = {
      name,
      description,
      theme_id: Number(themeId)
    }

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Projets</h2>
          <p className="text-sm text-slate-500">Créez, modifiez ou supprimez les sujets de projet disponibles</p>
        </div>
        <Button onClick={openCreateModal} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <Plus size={16} />
          Nouveau Projet
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingProject ? "Modifier le Projet" : "Ajouter un Projet"}</DialogTitle>
              <DialogDescription>
                Renseignez le nom, la description et le thème de rattachement pour ce projet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Nom du projet</Label>
                <Input
                  id="project-name"
                  placeholder="Ex: Chatbot Médical basé sur LLM"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="project-theme">Thème associé</Label>
                <Select value={themeId} onValueChange={setThemeId}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Choisir un thème" />
                  </SelectTrigger>
                  <SelectContent>
                    {isThemesLoading ? (
                      <div className="flex justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                      </div>
                    ) : themes.length === 0 ? (
                      <div className="text-center p-2 text-xs text-slate-400">Aucun thème disponible. Créez un thème d'abord.</div>
                    ) : (
                      themes.map((t: any) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="project-description">Description</Label>
                <textarea
                  id="project-description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-slate-200"
                  placeholder="Détaillez le cahier des charges simplifié ou les technologies suggérées..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white" disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isProjectsLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed border-2 py-12 text-center text-slate-500">
          <CardContent>
            <p className="font-medium text-lg">Aucun projet disponible</p>
            <p className="text-sm mt-1">Commencez par ajouter un nouveau projet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project: any) => (
            <Card key={project.id} className="relative overflow-hidden border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
              <CardHeader className="pb-3">
                {project.theme && (
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-1 bg-indigo-50 px-2 py-0.5 rounded">
                    <BookOpen size={10} />
                    {project.theme.name}
                  </div>
                )}
                <CardTitle className="text-lg text-slate-850 font-bold leading-snug">{project.name}</CardTitle>
                <CardDescription className="line-clamp-4 mt-2 text-slate-600 leading-relaxed text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end gap-2 border-t border-slate-50 mt-4 py-3 bg-slate-50/50">
                <Button variant="ghost" size="sm" onClick={() => openEditModal(project)} className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                  <Pencil size={14} className="mr-1" />
                  Modifier
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)} className="text-slate-600 hover:text-red-600 hover:bg-red-50">
                  <Trash2 size={14} className="mr-1" />
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
