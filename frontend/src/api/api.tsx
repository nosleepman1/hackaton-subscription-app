import axios from "axios"

// get API URL from env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Add a request interceptor to include the token
API.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})



export default API