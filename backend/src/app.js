import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ENV } from "./config/ENV.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()

app.use(cors({
    origin: ENV.ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({extended: true, limit: "100kb"}))
app.use(cookieParser())

// Importing routes here
import userRoutes from "./routes/user.routes.js"

app.use("api/v1/user", userRoutes)


app.use(errorHandler);

export {app}
