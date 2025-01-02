import API from "@/api/api"


export const GET_FILIERES = async () => {
    try{
        const response = await API.get("filieres")
        return response.data
    } catch (error) {
        return error
    }
}   