import { GET_FILIERES } from "@/services/auth/filiere"
import { useQuery } from "@tanstack/react-query"


export const useFiliere = () => {
    const {data, isLoading, isError, error, refetch} = useQuery({
            queryKey: ["filiere"],
            queryFn: GET_FILIERES,
        })
    return {data, isLoading, isError, error, refetch}
}