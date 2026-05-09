import API from "@/api/api"


export const GET_GRADES = async () => {
    try {
        const response = await API.get("grades")
        return response.data
    } catch (error) {
        return error
    }
}   