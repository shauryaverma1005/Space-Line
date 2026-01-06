import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import {toast} from "react-hot-toast"
import { getMessages } from "../../../backend/src/controllers/message.controller.js"

export const useChatStore = create((set)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async ()=> {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/messages/getUsers")
            console.log(res.data)
            set({users: res.data.data})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId)=> {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/getMessages/${userId}`)
            console.log(res.data)
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading: false})
        }
    }
}))