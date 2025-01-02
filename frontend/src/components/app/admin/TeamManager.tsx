import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { GET_TEAMS } from "@/services/team/team"
import { GET_PROJECTS } from "@/services/project/project"
import { GET_INTERESTEDS } from "@/services/interested/interested"
import { CREATE_TEAM_FROM_INTERESTEDS } from "@/services/admin/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Users, Loader2, Sparkles, User, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function TeamManager() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  const [selectedInterestedIds, setSelectedInterestedIds] = useState<number[]>([])

  // Fetch teams list
  const { data: teamsData, isLoading: isTeamsLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: GET_TEAMS,
  })

  // Fetch interested list
  const { data: interestedsData, isLoading: isInterestedsLoading } = useQuery({
    queryKey: ["interesteds"],
    queryFn: GET_INTERESTEDS,
  })

  // Fetch projects list
  const { data: projectsData, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: GET_PROJECTS,
  })

  const teams = (teamsData as any)?.data?.team || []
  const interesteds = interestedsData?.data || []
  const projects = projectsData?.data || []

  // Create team mutation
  const createTeamMutation = useMutation({
    mutationFn: CREATE_TEAM_FROM_INTERESTEDS,
    onSuccess: (res: any) => {
      if (res && res.success === false) {
        toast.error(res.message || "Erreur lors de la création de l'équipe.")
      } else {
        queryClient.invalidateQueries({ queryKey: ["teams"] })
        queryClient.invalidateQueries({ queryKey: ["interesteds"] })
        toast.success("Équipe créée avec succès à partir des intéressés !")
        closeModal()
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Erreur lors de la création de l'équipe.")
    }
  })

  const openModal = () => {
    setTeamName("")
    setSelectedProjectId("")
    setSelectedInterestedIds([])
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setTeamName("")
    setSelectedProjectId("")
    setSelectedInterestedIds([])
  }

  const handleCheckboxChange = (id: number) => {
    setSelectedInterestedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim() || !selectedProjectId || selectedInterestedIds.length === 0) {
      toast.warning("Veuillez remplir tous les champs et sélectionner au moins un participant.")
      return
    }

    createTeamMutation.mutate({
      name: teamName,
      project_id: Number(selectedProjectId),
      interested_ids: selectedInterestedIds,
    })
  }

  // Filter interesteds by selected project to help guide team creation (optional UI filter)
  const filteredInteresteds = selectedProjectId
    ? interesteds.filter((i: any) => i.project?.id === Number(selectedProjectId))
    : interesteds

  return (
    <div className="space-y-8">
      {/* Header and CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Équipes</h2>
          <p className="text-sm text-slate-500">Visualisez les équipes constituées ou formez-en une nouvelle avec les étudiants intéressés</p>
        </div>
        <Button onClick={openModal} className="bg-orange-500 hover:bg-orange-600 text-white gap-2" disabled={interesteds.length === 0}>
          <Plus size={16} />
          Former une équipe ({interesteds.length})
        </Button>
      </div>

      {/* Team generation Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                <Sparkles size={20} className="text-orange-500" />
                Former une équipe personnalisée
              </DialogTitle>
              <DialogDescription>
                Sélectionnez un projet, puis choisissez parmi les participants intéressés.
                Le capitaine sera automatiquement désigné selon le niveau académique (Grade).
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              {/* Nom de l'équipe */}
              <div className="grid gap-2">
                <Label htmlFor="team-name">Nom de l'équipe</Label>
                <Input
                  id="team-name"
                  placeholder="Ex: ISI Innovators"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              {/* Projet */}
              <div className="grid gap-2">
                <Label htmlFor="team-project">Projet ciblé</Label>
                <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Sélectionner un projet" />
                  </SelectTrigger>
                  <SelectContent>
                    {isProjectsLoading ? (
                      <div className="flex justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                      </div>
                    ) : projects.length === 0 ? (
                      <div className="text-center p-2 text-xs text-slate-400">Aucun projet disponible.</div>
                    ) : (
                      projects.map((p: any) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Liste des personnes intéressées */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Sélectionner les participants ({selectedInterestedIds.length} sélectionnés)</Label>
                  {selectedProjectId && (
                    <span className="text-[11px] text-slate-500 font-medium">
                      Filtré par intérêt sur le projet sélectionné
                    </span>
                  )}
                </div>

                <div className="border border-slate-150 rounded-xl overflow-hidden max-h-[220px] overflow-y-auto bg-slate-50/50 p-2 space-y-1.5">
                  {isInterestedsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                    </div>
                  ) : filteredInteresteds.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      {selectedProjectId
                        ? "Aucun participant intéressé par ce projet en particulier."
                        : "Aucun participant disponible dans la liste d'attente."}
                    </div>
                  ) : (
                    filteredInteresteds.map((i: any) => (
                      <label
                        key={i.id}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border text-sm transition-all cursor-pointer ${selectedInterestedIds.includes(i.id)
                            ? "bg-orange-50/60 border-orange-200"
                            : "bg-white border-slate-100 hover:border-slate-200"
                          }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 accent-orange-500 rounded border-slate-300"
                          checked={selectedInterestedIds.includes(i.id)}
                          onChange={() => handleCheckboxChange(i.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">
                              {i.user?.firstname} {i.user?.lastname}
                            </span>
                            <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 text-[10px] h-4.5 px-1.5 border-slate-200">
                              {i.user?.grade} - {i.user?.filiere}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{i.user?.email}</p>
                          {i.project && (
                            <p className="text-[11px] text-indigo-500 font-medium mt-0.5 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-indigo-400" />
                              Intéressé par : {i.project.name}
                            </p>
                          )}
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={createTeamMutation.isPending || selectedInterestedIds.length === 0}
              >
                {createTeamMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Créer l'équipe ({selectedInterestedIds.length})
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Grid of existing teams */}
      {isTeamsLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : teams.length === 0 ? (
        <Card className="border-dashed border-2 py-12 text-center text-slate-500">
          <CardContent>
            <p className="font-medium text-lg">Aucune équipe n'a encore été formée</p>
            <p className="text-sm mt-1">Vous pouvez en former une à partir des personnes intéressées.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {teams.map((team: any) => (
            <Card key={team.id} className="border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
              <div className="bg-slate-50/50 p-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-none">{team.name}</h3>
                    {team.project && (
                      <span className="text-[11px] text-slate-500 mt-1 inline-block">
                        Projet : {team.project.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <CardContent className="p-4 flex-1">
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Membres de l'équipe
                  </h4>

                  {/* Captain details */}
                  {team.user && (
                    <div className="flex items-start gap-2.5 p-2 bg-slate-50/60 rounded-lg border border-slate-100">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs shrink-0 font-bold">
                        <User size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-800">
                            {team.user.firstname} {team.user.lastname}
                          </span>
                          <span className="text-[9px] bg-indigo-600 text-white font-semibold rounded px-1 py-0.25">
                            Capitaine
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{team.user.email} • {team.user.grade} - {team.user.filiere}</p>
                      </div>
                    </div>
                  )}

                  {/* Other members */}
                  {team.members && team.members.length > 0 ? (
                    <div className="space-y-2">
                      {team.members
                        .filter((m: any) => m.id !== team.user?.id) // Filter out captain from members list if already shown
                        .map((member: any) => (
                          <div key={member.id} className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-slate-50">
                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs shrink-0 font-bold">
                              {member.firstname?.charAt(0) || "U"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium text-slate-800">
                                  {member.firstname} {member.lastname}
                                </span>
                                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 text-[8px] h-3.5 px-1 border-slate-200">
                                  {member.grade} - {member.filiere}
                                </Badge>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5">{member.email}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">Aucun membre supplémentaire.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
