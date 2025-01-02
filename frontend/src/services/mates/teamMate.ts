

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

const UPDATE_TEAM_MATE = async (id: number, teamMate: TeamMateRequest) => {
    try {
        const response  = await API.put(`/team-mates/${id}`, teamMate)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError<TeamMateError>(error)) {
            if(error.response?.data) {
                return error.response.data;
            }
        }       
    }
}

const DELETE_TEAM_MATE = async (id: number) => {
    try {
        const response  = await API.delete(`/team-mates/${id}`)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError<TeamMateError>(error)) {
            if(error.response?.data) {
                return error.response.data;
            }
        }       
    }
}

const GET_TEAM_MATE = async (id: string) => {
    try {
        const response  = await API.get(`/team-mates/${id}`)
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
    STORE_TEAM_MATE,
    UPDATE_TEAM_MATE,
    DELETE_TEAM_MATE,
    GET_TEAM_MATE
}
