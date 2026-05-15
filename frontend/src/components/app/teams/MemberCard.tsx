import { Mail, Phone, GraduationCap, User } from "lucide-react"
import { DeleteMemberAction } from "./MemberAction"
import { toast } from "sonner"
import useTeamMate from "@/hooks/mates/useTeamMate"
import EditMemberModal from "./EditMemberModal"

type Props = {
  member: any
  onRefresh?: () => void
}

const ISI_BLUE = "#0055A4"

const MemberCard = ({ member, onRefresh }: Props) => {
  
  if (!member) return null

  const { deleteTeamMate } = useTeamMate()
  

  const handleRemoveMember = async (id: number) => {
    const response = await deleteTeamMate(id)
    if (response) {
      toast.success("Membre supprimé avec succès")
      onRefresh?.()
    } else {
      toast.error("Erreur lors de la suppression du membre")
    }
  }

  const initials = `${(member.firstName || "")[0] || ""}${(member.lastName || "")[0] || ""}`.toUpperCase()

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm"
          style={{ background: `linear-gradient(135deg, ${ISI_BLUE}, #3b82f6)` }}
        >
          {initials || <User size={16} />}
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-slate-900 text-sm truncate">
            {member.firstName} {member.lastName}
          </h4>
          {member.matricule && (
            <p className="text-[11px] text-slate-400 font-mono">
              {member.matricule}
            </p>
          )}
        </div>
      </div>

      {/* Info rows */}
      <div className="space-y-2.5 text-[13px] text-slate-500">
        {member.email && (
          <p className="flex items-center gap-2.5 truncate">
            <Mail size={13} className="text-slate-300 shrink-0" />
            <span className="truncate">{member.email}</span>
          </p>
        )}

        {member.phone && (
          <p className="flex items-center gap-2.5">
            <Phone size={13} className="text-slate-300 shrink-0" />
            {member.phone}
          </p>
        )}

        {(member.grade || member.filiere) && (
          <p className="flex items-center gap-2.5">
            <GraduationCap size={13} className="text-slate-300 shrink-0" />
            <span>
              {member.grade}{member.grade && member.filiere ? " · " : ""}{member.filiere}
            </span>
          </p>
        )}
        <div className="flex justify-between mt-4">

          {/* if update member */}
          <EditMemberModal member={member} onMemberAdded={onRefresh} />
          {/* if delete member*/}
          <DeleteMemberAction member={member} onDelete={handleRemoveMember} />
        </div>
      </div>
    </div>
  )
} 

export default MemberCard