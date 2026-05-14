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


const AddMemberModal = () => {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    grade: "",
    filiere: "",
  })
  const [open, setOpen] = useState(false)
  const {data: filieres, isLoading:isLoadingFiliere, isError: isErrorFiliere} = useFiliere()
  const {data: grades, isLoading: isLoadingGrade, isError: isErrorGrade} = useGrade()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    
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

          <Input 
            placeholder="Prénom"
            value={form.firstName}
            onChange={(e) => setForm({...form, firstName: e.target.value})} />
          <Input 
            placeholder="Nom"
            value={form.lastName}
            onChange={(e) => setForm({...form, lastName: e.target.value})} />
          <Input 
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})} />
          <Input 
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})} />

          {isErrorFiliere || isErrorGrade ? (
            <p className="text-destructive">Erreur de chargement</p>
          ) : (
            <></>
          )}

          {isLoadingFiliere || isLoadingGrade ? (
            <Loader/>
          ) : (
            <>
            <Select >
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

            <Select>
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

          <Button className="w-full mt-2">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddMemberModal