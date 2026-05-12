import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { TeamRequest } from "@/types/team"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/AuthContext"
import { useGetProjects } from "@/hooks/project/useGetProject"
import { Spinner } from "@/components/ui/spinner"
import useStoreTeam from "@/hooks/team/useStoreTeam"



const CreateTeam = () => {

    const [name, setName] = useState('')
    const [projectId, setProjectId] = useState(0)
    const {data: projects, isLoading, error} = useGetProjects()
    const { storeTeam, loading, error: teamError, success } = useStoreTeam()

    const { user } = useContext(AuthContext)
    const userId = user?.id

    const handleSubmit = () => {
        const team: TeamRequest = {
            name: name,
            project_id: projectId,
            user_id: userId
        }
        storeTeam(team)
    }

    if (isLoading || loading) {
        return <div className="flex items-center gap-2">Chargement <Spinner /></div>
    }

    if (error || teamError) {
        return <div className="text-red-500 text-center">Erreur: {error?.message || teamError?.message}</div>
    }

    if (success) {
        return <div className="text-green-500 text-center">Équipe créée avec succès</div>
    }
    
    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">

                    <Label htmlFor="name">Nom de l'équipe</Label>
                    <Input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="border border-gray-300 rounded-md p-2" 
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="project_id">Project </Label>
                    <select
                        value={projectId.toString()}
                        onChange={(e) => setProjectId(Number(e.target.value))}
                        className="border border-gray-300 rounded-md p-2"
                    >
                        {projects?.data?.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    onClick={handleSubmit} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Create Team
                </Button>
            </div>
        </div>
    )
}

export default CreateTeam   