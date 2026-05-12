
export interface TeamRequest {
    name: string,
    project_id: number
    user_id: number
}

export interface TeamResponse {
    sucess: boolean,
    message: string,
    data: {
        id: number,
        name: string,
        project: {
            id: number,
            name: string,
            description: string,
        },
        members: {
            id: number,
            firstName: string,
            lastName: string,
            email: string,
            phone: string,
            grade: string,
            filiere: string,
            
        }[]
    }
}

export interface TeamError {
    message: string,
    errors?: {
        name?: string[]
        project_id?: number[]
        user_id?: number[]
    }
}

