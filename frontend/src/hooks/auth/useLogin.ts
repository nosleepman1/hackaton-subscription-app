import { LOGIN } from "@/services/auth/login"
import type { LoginRequest } from "@/types/auth"
import  { useState } from "react"

const useLogin = ()  => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const login = async (request: LoginRequest) => {

        try {
            setLoading(true)
            await LOGIN(request)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        login,
        loading,
        error,
    }

}

export default useLogin