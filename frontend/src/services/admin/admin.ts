import API from "@/api/api";
import axios from "axios";

export interface CreateTeamFromInterestedsRequest {
    name: string;
    project_id: number;
    interested_ids: number[];
}

export const CREATE_TEAM_FROM_INTERESTEDS = async (data: CreateTeamFromInterestedsRequest): Promise<any> => {
    try {
        const response = await API.post(`/admin/teams/from-interesteds`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            return error.response.data;
        }
        throw error;
    }
};
