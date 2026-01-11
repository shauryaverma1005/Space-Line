import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://space-line-4.onrender.com/api/v1",
    withCredentials: true
})

export default axiosInstance