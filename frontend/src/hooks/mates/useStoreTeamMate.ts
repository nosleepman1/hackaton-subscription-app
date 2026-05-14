import { STORE_TEAM_MATE } from "@/services/mates/teamMate";
import type { TeamMateError, TeamMateRequest } from "@/types/teamMate";
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
            const response = await STORE_TEAM_MATE(teamMate);
            
            // The API returns { success: true/false, message: "..." }
            // Validation errors (422) return { message: "...", errors: {...} }
            if (response?.success === true) {
                setSuccess(response.message || "Membre ajouté avec succès");
                return true;
            } else {
                // Either API error (success: false) or validation error (has errors field)
                setError({
                    message: response?.message || "Une erreur s'est produite",
                    errors: response?.errors
                });
                return false;
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
