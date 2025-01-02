import { GET_GRADES } from "@/services/auth/grade"
import { useQuery } from "@tanstack/react-query"



export const useGrade = () => {
    try {
        const {data, isLoading, isError, error} = useQuery({
            queryKey: ["grade"],
            queryFn: GET_GRADES,
        })
        return {data, isLoading, isError, error}
    } catch (error) {
        return error
    }
}