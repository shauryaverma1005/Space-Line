import {create} from "zustand"
import axiosInstance from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set)=> ({
    authProfile: null,
    isSigningUp:false,
    isLoggingIn: false,

    isCheckingAuth: true,

    checkAuth: async ()=> {
        try {
            const response = await axiosInstance.get("/auth/profile");
            set({authProfile: response.data})
        } catch (error) {
            console.log(`Error in check auth: ${error}`)
            set({authProfile: null})
        } finally{
            set({isCheckingAuth: false})
        }
    }

    signup: async (data) => {
        try {
            set({isSigningUp: true})
            const response = await axiosInstance.post("/auth/signup", data)
            toast.success("Account created successfully")
            set({authProfile: response.data})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp: false})
        }
    }
}))