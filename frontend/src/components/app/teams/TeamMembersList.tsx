import MemberCard from "./MemberCard"

type Props = {
  members: any[]
}

const TeamMembersList = ({ members }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {members.map((member) => (
        <MemberCard key={member.id} member={member.teamMate} />
      ))}
    </div>
  )
}

export default TeamMembersList