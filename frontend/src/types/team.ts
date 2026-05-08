export interface TeamRequest {
    name: string,
    project_id: number
    owner_id: number
}

export interface TeamResponse {
    id: number,
    name: string,
    project_id: number,
    owner_id: number, 
}


