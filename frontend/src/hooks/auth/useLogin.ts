import { LOGIN } from "@/services/auth/login"
import type { LoginError, LoginRequest, LoginResponse } from "@/types/auth"
import  { useState } from "react"

const useLogin = ()  => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<LoginError | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const login = async (request: LoginRequest) => {

        try {
            setLoading(true)
            const response : LoginError | LoginResponse = await LOGIN(request)  
            
            if((response as LoginResponse).success) {
                setSuccess((response as LoginResponse).message)
            } else {
                setError(response as LoginError)
            }
            console.log(response);
            
        } catch (error) {
            setError(error as LoginError)
        } finally {
            setLoading(false)
        }
    }

    return {
        login,
        loading,
        error,
        success
    }

}

export default useLogin