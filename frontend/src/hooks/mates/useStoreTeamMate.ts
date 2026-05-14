import { STORE_TEAM_MATE } from "@/services/mates/teamMate";
import type { AddTeamMateResponse, TeamMateError, TeamMateRequest } from "@/types/teamMate";
import { useState } from "react";


const useStoreTeamMate = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<TeamMateError | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const storeTeamMate = async (teamMate: TeamMateRequest): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            const response : TeamMateError | AddTeamMateResponse = await STORE_TEAM_MATE(teamMate);
            
            // Check if the response is an error (has 'message' or 'errors' property)
            if (response && ('errors' in response || ('message' in response && !('id' in response)))) {
                setError(response as TeamMateError);
                return false;
            } else {
                setSuccess("Membre ajouté avec succès");
                return true;
            }
        } catch (error) {
            setError({message: "Une erreur s'est produite"});
            return false;
        } finally {
            setLoading(false);
        }
    }
    return {storeTeamMate, loading, error, success}  
}

export default useStoreTeamMate;