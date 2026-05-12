import { CREATE_TEAM } from "@/services/team/team"
import type { TeamError, TeamRequest, TeamResponse } from "@/types/team"
import { useState } from "react"


const useStoreTeam = () => {
    
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<TeamError | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const storeTeam = async (data: TeamRequest) => {

        try {
            setLoading(true)
            setError(null)
            const response : TeamResponse | TeamError = await CREATE_TEAM(data)
            
            if((response as TeamResponse).id) {
                setSuccess(true)
                setLoading(false)
            } else {
                setError(response as TeamError)
                setLoading(false)
            }
        } catch (error) {
            setError(error as TeamError)
            setLoading(false)
        }
    }

    return { storeTeam, loading, error, success }
}

export default useStoreTeam
