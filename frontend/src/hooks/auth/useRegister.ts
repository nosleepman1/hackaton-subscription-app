import { REGISTER } from "@/services/auth/register"
import type { RegisterRequest } from "@/types/auth"
import { useState } from "react"


const useRegister = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    const register = async (request: RegisterRequest) => {
        try {
            setLoading(true)
            await REGISTER(request)
            setSuccess(true)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {
        register,
        loading,
        error,
        success
    }

}


export default useRegister
