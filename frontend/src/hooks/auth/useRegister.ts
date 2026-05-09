import { REGISTER } from "@/services/auth/register"
import type { RegisterError, RegisterRequest } from "@/types/auth"
import { useState } from "react"



 const useRegister = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<RegisterError>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const register = async (request: RegisterRequest) => {
        try {
            setLoading(true)
            setError(null)
            const response = await REGISTER(request)
            setSuccess(response.message)

        } catch (error) {
            const err = error as RegisterError
            if(err.errors) setError(err);

        } finally {
            setLoading(false)
        }
    }

    return { register, loading, error, success }
}

export default useRegister