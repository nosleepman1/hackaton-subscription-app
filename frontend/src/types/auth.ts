
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

export interface LoginError {
    message: string,
    success: boolean
}   

//-----------------------------------------------------------------

export interface RegisterResponse {
    success: boolean,
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

export interface RegisterError {
    message: string
    errors: {
        firstname?: string[]
        lastname?: string[]
        email?: string[]
        matricule?: string[]
        phone?: string[]
        grade?: string[]
        filiere?: string[]
        password?: string[]
    }
}

//---------------------------------------------------------

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
    token: string | null
    isAuthenticated: boolean
    login: (newToken : string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}

//--------------------------------------------------------- 


export interface SelectOption {
  value: string
  label: string
}

export interface ApiSelectProps {
  label: string
  id: string
  value: string
  onValueChange: (v: string) => void
  placeholder: string
  isLoading: boolean
  isError: boolean
  items: SelectOption[]
  refetch?: () => void
}