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
import { Plus } from "lucide-react"

const AddMemberModal = () => {
  const [open, setOpen] = useState(false)

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

        <form className="grid gap-4 mt-4">
          <Input placeholder="Prénom" />
          <Input placeholder="Nom" />
          <Input placeholder="Email" />
          <Input placeholder="Téléphone" />
          <Input placeholder="Grade" />
          <Input placeholder="Filière" />

          <Button className="w-full mt-2">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddMemberModal