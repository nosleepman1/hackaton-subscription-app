import axios from "axios"

// get API URL from env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"

const API = axios.create({
    baseURL: API_URL,
})



export default API