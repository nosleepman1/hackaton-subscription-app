export interface TeamRequest {
    name: string,
    project_id: number
    user_id: number
}

export interface TeamResponse {
    id: number,
    name: string,
    project_id: number,
    owner_id: number, 
    members: string[]
}

export interface TeamError {
    message: string,
    errors: {
        name?: string[]
        project_id?: number[]
        user_id?: number[]
    }
}

