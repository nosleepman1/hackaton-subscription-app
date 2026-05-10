import { REGISTER } from "@/services/auth/register"
import type { RegisterError, RegisterRequest, RegisterResponse } from "@/types/auth"
import { useState } from "react"



 const useRegister = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<RegisterError | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const register = async (request: RegisterRequest)  => {
       
        try {
            setLoading(true)
            setError(null)
            const response : RegisterResponse | RegisterError = await REGISTER(request)  
            
            if((response as RegisterResponse).success) {
                setSuccess((response as RegisterResponse).message)
            } else {
                setError(response as RegisterError)
                console.log(response)
            }


        } catch (error) {  
            setError(error as RegisterError)
        } finally {
            setLoading(false)
        }
    }

    return { register, loading, error, success }
}

export default useRegister