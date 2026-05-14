

export interface TeamMateRequest {
    firstname: string
    lastname: string
    email: string
    phone: string
    grade: string
    filiere: string
    matricule : string
}

export interface TeamMateError {
    message: string,
    errors?: {
        firstname?: string[],
        lastname?: string[],
        email?: string[],
        phone?: string[],
        grade?: string[],
        filiere?: string[],
    }
}

export interface AddTeamMateResponse {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    grade: string
    filiere: string
}

export interface UpdateTeamMateForm {
    firstName: string
    lastName: string
    email: string
    phone: string
    grade: string
    filiere: string
}

