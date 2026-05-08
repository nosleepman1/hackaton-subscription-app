
export interface LoginResponse {
    user: User
    token: string
    success: boolean
    message: string
    role: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterResponse {
    success: boolean
    message: string
}

export interface RegisterRequest {
    email: string
    password: string
    matricule: string
    firstname: string
    lastname: string
    grade: string
    filiere: string
    phone: string
}

export interface User {
    id: number
    matricule?: string
    firstname?: string
    lastname?: string
    email: string
    grade?: string
    filiere?: string
    name?: string
} 

export interface AuthContextType {
    user: User | null
    token: string
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}