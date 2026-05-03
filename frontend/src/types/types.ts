

/**
 * Type user have 2 diffrents things
 * Admin with his own instance class in Laravel with fillables (name, email, password)
 * and User with his own instance class in Laravel with fillables (matricule, firstname, lastname, email, grade, filiere)
 */



export interface Hackathon {
    id: number
    name: string
    description: string
    start_date: string
    end_date: string
    location: string
}

export interface TeamMate {
    id: number
    matricule: string
    firstname: string
    lastname: string
    email: string
    grade: string
    filiere: string
    phone: string
}

export interface Team {
    id: number
    name: string
    description: string
    team_mates: TeamMate[]
}
