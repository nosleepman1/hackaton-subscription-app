import API from "@/api/api"
import type { RegisterRequest, RegisterResponse } from "@/types/auth"


export const REGISTER = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const response = await API.post("auth/register", request)
    return response.data
}