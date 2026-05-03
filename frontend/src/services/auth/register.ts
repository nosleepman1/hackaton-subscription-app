import API from "@/api/api"
import type { RegisterRequest, RegisterResponse } from "@/types/auth"


export const register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await API.post<RegisterResponse>("/auth/register", request)
        return response.data
    } catch (error) {
        throw error
    }
}