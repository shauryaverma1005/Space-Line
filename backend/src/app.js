import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ENV } from "./config/ENV.js"

const app = express()

app.use(cors({
    origin: ENV.ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended: true, limit: "100kb"}))
app.use(cookieParser())

export {app}
