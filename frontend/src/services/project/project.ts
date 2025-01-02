import API from "@/api/api";
import type { ProjectRequest, ProjectResponse, ProjectError } from "@/types/project";
import axios from "axios";

const GET_PROJECTS = async () => {

    const response = await API.get(`/projects`)
    return response.data
}


const GET_PROJECT_BY_ID = async (id: string) => {

    const response = await API.get(`/projects/${id}`)
    return response.data
}

const CREATE_PROJECT = async (data: ProjectRequest) : Promise<ProjectResponse | ProjectError> => {
    try {
        const response = await API.post(`/projects`, data)
        return response.data
    } catch (error) {
        if(axios.isAxiosError<ProjectError>(error)) {
            return error.response?.data
        }
    }
}

const UPDATE_PROJECT = async (id: number, data: ProjectRequest) : Promise<ProjectResponse | ProjectError> => {
    try {
        const response = await API.put(`/projects/${id}`, data)
        return response.data
    } catch (error) {
        if(axios.isAxiosError<ProjectError>(error)) {
            return error.response?.data
        }
    }
}

const DELETE_PROJECT = async (id: number) : Promise<any> => {
    const response = await API.delete(`/projects/${id}`)
    return response.data
}

export {
    GET_PROJECTS,
    GET_PROJECT_BY_ID,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
}