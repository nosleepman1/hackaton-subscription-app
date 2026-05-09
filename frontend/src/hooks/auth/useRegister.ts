import { REGISTER } from "@/services/auth/register"
import type { RegisterRequest } from "@/types/auth"
import { useState } from "react"
import { isAxiosError } from "axios"



export const useRegister = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const register = async (request: RegisterRequest) => {
        try {
            setLoading(true)
            setError(null)
            const response = await REGISTER(request)
            setSuccess(true)
        } catch (err) {
            if (isAxiosError(err)) {
                const status = err.response?.status
                const data = err.response?.data
                
                if (status === 422) {
                    const messages = data?.errors
                        ? Object.values(data.errors).flat().join(", ")
                        : data?.message ?? "Données invalides"
                    
                    setError(messages)
                    console.log("MESSAGES: ", messages)
                } else {
                    setError(data?.message ?? "Une erreur est survenue")
                    console.log("DATA MESSAGE: ", data?.message)
                }
            } else {
                setError("Erreur inattendue")
            }
        } finally {
            setLoading(false)
        }
    }

    return { register, loading, error, success }
}