import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { GET_THEMES, CREATE_THEME, UPDATE_THEME, DELETE_THEME } from "@/services/theme/theme"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ThemeManager() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [editingTheme, setEditingTheme] = useState<{ id: number; name: string; description: string } | null>(null)
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  // Fetch themes
  const { data: themesData, isLoading } = useQuery({
    queryKey: ["themes"],
    queryFn: GET_THEMES,
  })

  const themes = themesData?.data || []

  // Create theme mutation
  const createMutation = useMutation({
    mutationFn: CREATE_THEME,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] })
      toast.success("Thème créé avec succès !")
      closeModal()
    },
    onError: () => {
      toast.error("Erreur lors de la création du thème.")
    }
  })

  // Update theme mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string; description: string } }) => UPDATE_THEME(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] })
      toast.success("Thème mis à jour avec succès !")
      closeModal()
    },
    onError: () => {
      toast.error("Erreur lors de la modification du thème.")
    }
  })

  // Delete theme mutation
  const deleteMutation = useMutation({
    mutationFn: DELETE_THEME,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] })
      toast.success("Thème supprimé avec succès !")
    },
    onError: () => {
      toast.error("Erreur lors de la suppression du thème.")
    }
  })

  const openCreateModal = () => {
    setEditingTheme(null)
    setName("")
    setDescription("")
    setIsOpen(true)
  }

  const openEditModal = (theme: { id: number; name: string; description: string }) => {
    setEditingTheme(theme)
    setName(theme.name)
    setDescription(theme.description)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setEditingTheme(null)
    setName("")
    setDescription("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) {
      toast.warning("Veuillez remplir tous les champs.")
      return
    }

    if (editingTheme) {
      updateMutation.mutate({ id: editingTheme.id, data: { name, description } })
    } else {
      createMutation.mutate({ name, description })
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce thème ?")) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Thèmes</h2>
          <p className="text-sm text-slate-500">Créez, modifiez ou supprimez les thèmes du hackathon</p>
        </div>
        <Button onClick={openCreateModal} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <Plus size={16} />
          Nouveau Thème
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingTheme ? "Modifier le Thème" : "Ajouter un Thème"}</DialogTitle>
              <DialogDescription>
                Définissez les détails du thème ici. Cliquez sur enregistrer lorsque vous avez terminé.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom du thème</Label>
                <Input
                  id="name"
                  placeholder="Ex: Intelligence Artificielle et Santé"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1-orange focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-slate-200"
                  placeholder="Expliquez brièvement l'objectif de ce thème..."
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

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : themes.length === 0 ? (
        <Card className="border-dashed border-2 py-12 text-center text-slate-500">
          <CardContent>
            <p className="font-medium text-lg">Aucun thème disponible</p>
            <p className="text-sm mt-1">Commencez par ajouter un nouveau thème.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme: any) => (
            <Card key={theme.id} className="relative overflow-hidden border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="h-1 bg-gradient-to-r from-orange-400 to-rose-500" />
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-850 font-bold leading-snug">{theme.name}</CardTitle>
                <CardDescription className="line-clamp-4 mt-2 text-slate-600 leading-relaxed text-sm">
                  {theme.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end gap-2 border-t border-slate-50 mt-4 py-3 bg-slate-50/50">
                <Button variant="ghost" size="sm" onClick={() => openEditModal(theme)} className="text-slate-600 hover:text-orange-600 hover:bg-orange-50">
                  <Pencil size={14} className="mr-1" />
                  Modifier
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(theme.id)} className="text-slate-600 hover:text-red-600 hover:bg-red-50">
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
