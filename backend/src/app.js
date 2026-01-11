import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ENV } from "./config/ENV.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"
import path from "path"

const __dirname = path.resolve();

const app = express()

app.use(cors({
    origin: [ENV.ORIGIN, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Body parser middleware - these MUST come before routes
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

// Importing routes here
import userRoutes from "./routes/auth.routes.js"
import avatarRoutes from "./routes/avatar.routes.js"
import messageRoutes from "./routes/messages.routes.js"

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/avatar", avatarRoutes)
app.use("/api/v1/messages", messageRoutes)

// Serve frontend in production (must be after API routes)
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Express 5 + path-to-regexp v6 does not accept "*". Use a RegExp catch-all.
  app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(errorHandler);

export {app}
