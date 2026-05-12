import API from "@/api/api"
import type { TeamRequest, TeamResponse, TeamError } from "@/types/team"
import axios from "axios"


export const CREATE_TEAM = async (data: TeamRequest) : Promise<TeamResponse | TeamError> => {
    try {
        const response = await API.post(`/teams`, data)
        return response.data
    } catch (error) {
        if(axios.isAxiosError<TeamError>(error)) {
            return error.response?.data
        }
    }
}

export const UPDATE_TEAM = async (data: TeamRequest) : Promise<TeamResponse | TeamError> => {
    try {
        const response = await API.put(`/teams`, data)
        return response.data
    } catch (error) {
        if(axios.isAxiosError<TeamError>(error)) {
            return error.response?.data
        }
    }
}



export const GET_TEAMS = async () : Promise<TeamResponse[] | TeamError> => {
    try {
        const response = await API.get(`/teams`)
        return response.data
    } catch (error) {
        if(axios.isAxiosError<TeamError>(error)) {
            return error.response?.data
        }
    }
}


export const GET_TEAM_BY_ID = async () : Promise<TeamResponse[] | TeamResponse | TeamError> => {
    try {
        const response = await API.get(`/teams`)
        return response.data
    } catch (error) {
        if(axios.isAxiosError<TeamError>(error)) {
            return error.response?.data
        }
    }
}


export const DELETE_TEAM = async (id: string) : Promise<TeamResponse | TeamError> => {
    try {
        const response = await API.delete(`/teams/${id}`)
        return response.data
    } catch (error) {
        if(axios.isAxiosError<TeamError>(error)) {
            return error.response?.data
        }
    }
}



