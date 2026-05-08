import API from "@/api/api";
import type { ProjectRequest, ProjectResponse } from "@/types/project";

const GET_PROJECTS = async () => {

    const response = await API.get(`/project`)
    return response.data
}


const GET_PROJECT_BY_ID = async (id: string) => {

    const response = await API.get(`/project/${id}`)
    return response.data
}

const CREATE_PROJECT = async (data: ProjectRequest) : Promise<ProjectResponse> => {
    const response = await API.post(`/project`, data)
    return response.data
}





export {
    GET_PROJECTS,
    GET_PROJECT_BY_ID,
    CREATE_PROJECT
}