import CreateTeam from "@/components/app/teams/createTeam"


const Team = () => {
    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold">Team</h1>
            <div className="grid grid-cols-2 gap-4">
                <CreateTeam />
            </div>
        </div>
    )
}

export default Team