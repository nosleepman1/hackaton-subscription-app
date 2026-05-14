import { STORE_TEAM_MATE } from "@/services/mates/teamMate";
import type { AddTeamMateResponse, TeamMateError, TeamMateRequest } from "@/types/teamMate";
import { useState } from "react";


const useStoreTeamMate = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<TeamMateError | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const storeTeamMate = async (teamMate: TeamMateRequest) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            const response : TeamMateError | AddTeamMateResponse = await STORE_TEAM_MATE(teamMate);
            if (response as TeamMateError) {
                setError(response as TeamMateError);
            } else {
                setSuccess("Membre ajouté avec succès");     
            }
        } catch (error) {
            setError({message: "Une erreur s'est produite"});
        } finally {
            setLoading(false);
        }
    }
    return {storeTeamMate, loading, error, success}  
}

export default useStoreTeamMate;