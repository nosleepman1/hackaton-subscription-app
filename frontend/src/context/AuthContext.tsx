
import { createContext, useState } from "react"
import type { User } from "@/types/auth"
import type { LoginRequest, LoginResponse } from "@/types/auth"
import { login } from "@/services/auth/login"
import { register } from "@/services/auth/register"


interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    // login and register function are already in services/auth/login.ts and services/auth/register.ts use them directly

   
    
    



    
    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout } }>
            {children}
        </AuthContext.Provider>
    )
}

