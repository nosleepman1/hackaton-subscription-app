import API from "@/api/api";
import axios from "axios";

export const GET_INTERESTEDS = async (): Promise<any> => {
    try {
        const response = await API.get(`/interesteds`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
