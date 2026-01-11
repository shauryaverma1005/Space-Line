import {Server} from "socket.io"
import http from "http"
import { app } from "../app.js"


const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
    }
})

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {}

io.on("connection", (socket)=>{
    console.log(`A user connected: ${socket.id}`)
        const userId = socket.handshake.query.userId || socket.handshake.query.userID
        if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap) )

    socket.on("disconnect", ()=> {
        console.log("A user disconnected", userId)
        if (userId) delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {io, app, server}