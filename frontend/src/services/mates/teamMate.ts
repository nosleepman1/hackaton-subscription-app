

import axios from "axios"
import type { TeamMateError, TeamMateRequest } from "@/types/teamMate"
import API from "@/api/api"

const STORE_TEAM_MATE = async (teamMate: TeamMateRequest) => {
    try {
        const response  = await API.post("/team-mates", teamMate)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError<TeamMateError>(error)) {
            if(error.response?.data) {
                return error.response.data;
            }
        }       
    }
}


export {
    STORE_TEAM_MATE
}
