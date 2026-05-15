import MemberCard from "./MemberCard"

type Props = {
  members: any[]
  onRefresh?: () => void
}

const TeamMembersList = ({ members, onRefresh }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {members.map((member) => (
        <MemberCard key={member.id} member={member.teamMate} onRefresh={onRefresh} />
      ))}
    </div>
  )
}

export default TeamMembersList