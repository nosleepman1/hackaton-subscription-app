import type { User } from "./auth";
import type { ProjectResponse } from "./project";


export interface InterrestRequest {
    user_id: number,
    project_id: number,
}

export interface InterrestResponse {
    user : User,
    project: ProjectResponse
}