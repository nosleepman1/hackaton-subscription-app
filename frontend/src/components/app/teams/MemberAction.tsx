
//use alert dialog to confirm delete and edit


type Props = {
    member: any
    onDelete: (id: number) => void
}

import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const MemberAction = ({ member, onDelete }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    const handleRemoveMember = (id: number) => {
        setOpen(true)
        setSelectedMemberId(id)
    }
    
    const handleConfirmAction = async () => {
        setLoading(true)
        setError(null)
        await onDelete(selectedMemberId)
        setLoading(false)
        setOpen(false)
    }
    
    return (
        <div className="flex gap-2">
            <Button size="sm" className="rounded-xl" variant="destructive" onClick={() => handleRemoveMember(member.id)}>
                Supprimer
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer ce membre ?
                    </AlertDialogDescription>
                    <AlertDialogAction onClick={handleConfirmAction} disabled={loading}>
                        {loading ? "Chargement..." : "Confirmer"}
                    </AlertDialogAction>
                    <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default MemberAction
