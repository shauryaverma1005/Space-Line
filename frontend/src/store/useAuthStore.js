import {create} from "zustand"
import axiosInstance from "../lib/axios.js"
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

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
    },

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
    },

    login: async (data) => {
        try {
            set({isLoggingIn: true})
            const response = await axiosInstance.post("/auth/login", data)
            set({authProfile: response.data})
            toast.success("Login successful")
        } catch (error) {
            toast.error(error.message)
        } finally {
            set({isLoggingIn: false})
        }
    },

    LogOut: async ()=> {
        try {
            await axiosInstance.post("/auth/logout")
            set({authProfile: null})
            toast.success("Logout Successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }
}))