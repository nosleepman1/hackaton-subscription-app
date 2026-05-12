import { useState, useContext, useEffect } from "react"
import { Users, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { AuthContext } from "@/context/AuthContext"
import { useGetProjects } from "@/hooks/project/useGetProject"
import useStoreTeam from "@/hooks/team/useStoreTeam"
import type { TeamRequest } from "@/types/team"
import { toast } from "sonner" 

const CreateTeam = () => {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [projectId, setProjectId] = useState(0)

  const { user } = useContext(AuthContext)
  const { data: projects, isLoading, error } = useGetProjects()
  const { storeTeam, loading, error: teamError, success, reset } = useStoreTeam()

  const handleSubmit = () => {
    const team: TeamRequest = {
      name,
      project_id: projectId,
      user_id: user?.id,
    }
    storeTeam(team)
  }

  const handleOpenChange = (val: boolean) => {
    setOpen(val)
    if (!val) {
      setName("")
      setProjectId(0)
    }
  }

  useEffect(() => {
  if (success) {
    setOpen(false)
    reset()
    setName("")
    setProjectId(0)
    toast.success("Équipe créée avec succès")        // ← cette ligne change juste ici
  }
}, [success])
  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Users size={16} />
        Créer une équipe
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Nouvelle équipe</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Associez une équipe à un projet existant
            </p>
          </DialogHeader>

          {isLoading || loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
              Chargement <Spinner />
            </div>
          ) : error || teamError ? (
            <p className="text-sm text-destructive text-center py-4">
              Erreur : {error?.message || teamError?.message}
            </p>
          ) : success ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-green-600">
              <Check size={16} />
              Équipe créée avec succès
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Nom de l'équipe</Label>
                <Input
                  id="name"
                  placeholder="ex: Frontend, DevOps…"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="project_id">Projet</Label>
                <select
                  id="project_id"
                  value={projectId}
                  onChange={(e) => setProjectId(Number(e.target.value))}
                  className="border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value={0} disabled>Sélectionner un projet</option>
                  {projects?.data?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => handleOpenChange(false)}>
                  Annuler
                </Button>
                <Button className="flex-2 gap-2" onClick={handleSubmit} disabled={!name || !projectId}>
                  <Check size={15} />
                  Créer l'équipe
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateTeam