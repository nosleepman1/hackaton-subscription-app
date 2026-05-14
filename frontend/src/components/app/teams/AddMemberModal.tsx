import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader, Plus } from "lucide-react"
import { useFiliere } from "@/hooks/filiere/useFiliere"
import { useGrade } from "@/hooks/grade/useGrade"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TeamMateRequest } from "@/types/teamMate"
import useStoreTeamMate from "@/hooks/mates/useStoreTeamMate"
import { Label } from "@/components/ui/label"
import {toast} from "sonner"


type AddMemberModalProps = {
  onMemberAdded?: () => void
}

const AddMemberModal = ({ onMemberAdded }: AddMemberModalProps) => {

  const [form, setForm] = useState<TeamMateRequest>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    grade: "",
    filiere: "",
    matricule: ""
  })
  const [open, setOpen] = useState(false)
  const {data: filieres, isLoading:isLoadingFiliere} = useFiliere()
  const {data: grades, isLoading: isLoadingGrade} = useGrade()
  const {storeTeamMate, loading, error, success} = useStoreTeamMate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSuccess = await storeTeamMate(form)


    if (isSuccess) {
      setOpen(false)
      toast.success("Membre ajouté avec succès")
      onMemberAdded?.()
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        grade: "",
        filiere: "",
        matricule: ""
      })    
    }
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">
          <Plus size={16} className="mr-2" />
          Ajouter membre
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl rounded-3xl">
        <DialogHeader>
          <DialogTitle>Nouveau membre</DialogTitle>
        </DialogHeader>

        <form 
          onSubmit={handleSubmit}
          className="grid gap-4 mt-4"
        >


          <Label htmlFor="matricule">Matricule</Label>
          <Input
            id="matricule"
            value={form.matricule}
            onChange={(e) => setForm({...form, matricule : e.target.value})}/>

          <Label htmlFor="firstName">Prénom</Label>
          <Input 
            id="firstName" 
            placeholder="Prénom"    
            value={form.firstname}
            onChange={(e) => setForm({...form, firstname: e.target.value})} />

          {error?.errors?.firstname && (
            <p className="text-red-500">{error.errors.firstname[0]}</p>
          )}
            
          <Label htmlFor="lastName">Nom</Label>
          <Input 
            id="lastName" 
            placeholder="Nom"
            value={form.lastname}
            onChange={(e) => setForm({...form, lastname: e.target.value})} />

          {error?.errors?.lastname && (
            <p className="text-red-500">{error.errors.lastname[0]}</p>
          )}

          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})} />

          {error?.errors?.email && (
            <p className="text-red-500">{error.errors.email[0]}</p>
          )}

          <Label htmlFor="phone">Téléphone</Label>
          <Input 
            id="phone" 
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})} />

          {error?.errors?.phone && (
            <p className="text-red-500">{error.errors.phone[0]}</p>
          )}

          

          {isLoadingFiliere || isLoadingGrade ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <>
            <Label htmlFor="grade">Grade</Label>
            <Select 
              value={form.grade}
              onValueChange={(value) => setForm({...form, grade: value})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {grades?.map((grade) => (
                  <SelectItem key={grade.value} value={grade.value}>
                    {grade.label}
                  </SelectItem>
                ))}
              </SelectContent>
              </Select>
            
            
            <Label htmlFor="filiere">Filière</Label>
            <Select 
              value={form.filiere}
              onValueChange={(value) => setForm({...form, filiere: value})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filière" />
              </SelectTrigger>
              <SelectContent>
                {filieres?.map((filiere) => (
                  <SelectItem key={filiere.value} value={filiere.value}>
                    {filiere.label} 
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </>
          )}

          {error && (
            <div className="text-red-500">
              {error.message}
            </div>
          )}

          <Button className="w-full mt-2" disabled={loading} >
            {loading ? <Loader className="animate-spin" /> : "Ajouter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddMemberModal