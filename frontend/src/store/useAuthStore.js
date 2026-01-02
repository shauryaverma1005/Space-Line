import {create} from "zustand"
import axiosInstance from "../lib/axios.js"

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
}))