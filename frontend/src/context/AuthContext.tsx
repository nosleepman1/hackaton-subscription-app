
import { createContext, useEffect, useState } from "react"
import type { User } from "@/types/auth"
import type { LoginRequest, LoginResponse } from "@/types/auth"
import { login } from "@/services/auth/login"
import { register } from "@/services/auth/register"
import type { LoginRequest } from "@/types/auth"
import CURRENT_USER from "@/services/auth/currentUser"

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    // login and register function are already in services/auth/login.ts and services/auth/register.ts use them directly

   const login = async (newToken : string) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
        const currentUser = await CURRENT_USER(newToken)
        setUser(currentUser)
   }

   const logout = () : Promise<void> => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    return Promise.resolve()
   }

   useEffect(() => {
    const loadUser = async () => {
        if(token) {
            try {
                const currentUser = await CURRENT_USER(token)
                setUser(currentUser)
            } catch {
                logout()
            } finally {
                setLoading(false)
            }
        }
    }

    loadUser()
   }, [token])
   
   const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading } }>
            {children}
        </AuthContext.Provider>
    )
}

