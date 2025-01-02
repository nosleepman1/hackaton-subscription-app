
export interface TeamRequest {
    name: string,
    project_id: number
    user_id: number
}

export interface TeamResponse {
    sucess: boolean,
    message: string,
    data: {
        team : {
            id: number,
            name: string,
            project: {
                id: number,
                name: string,
                description: string,
            },
        },
        
        members: {
            id: number,
            teamMate?: {
                id: number,
                firstName: string,
                lastName: string,
                email: string,
                phone: string,
                grade: string,  
                filiere: string,
            } | null   
        }[]
    }
}



export interface AdminTeamResponse {
    success: boolean,
    message: string,
    data: {
        team: {
            id: number,
            name: string,
            project: {
                id: number,
                name: string,
                description: string,
            },
            user: {
                id: number,
                matricule: string,
                firstname: string,
                lastname: string,
                email: string,
                phone: string,
                grade: string,
                filiere: string,
            }
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

