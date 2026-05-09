import { GET_PROJECTS } from "@/services/project/project"
import { useQuery } from "@tanstack/react-query"


export const useGetProjects = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["project"],
        queryFn: GET_PROJECTS,
    })

    return {data, isLoading, isError, error}
}