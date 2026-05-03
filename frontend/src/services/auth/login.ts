import API from "@/api/api"
import type { LoginRequest, LoginResponse } from "@/types/auth"


export const login = async (request: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await API.post<LoginResponse>("/auth/login", request)
        return response.data

    } catch (error) {
        throw error 
    }
}
