import { GET_TEAM_BY_ID } from "@/services/team/team"
import type { TeamError, TeamResponse } from "@/types/team"
import { useState } from "react"


const useGetTeam = () => {

    const [team, setTeam] = useState<TeamResponse | null | TeamResponse[]>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<TeamError | null>(null)

    const getTeam = async () => {
        try {
            setLoading(true)
            setError(null)
            const response : TeamResponse | TeamError | TeamResponse[] = await GET_TEAM_BY_ID()
            
            if((response as TeamResponse)) {
                console.log(response)
                setTeam(response as TeamResponse)
                setLoading(false)
            } else if((response as TeamResponse[])) {
                console.log(response)
                setTeam((response as TeamResponse[])[0])
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

    const reset = () => {
        setTeam(null)
        setError(null)
    }

    return { getTeam, team, loading, error, reset }
}   

export default useGetTeam
