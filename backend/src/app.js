import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"
import path from "path"

const __dirname = path.resolve();

const app = express()

app.use(cors({
  origin: [process.env.ORIGIN, "http://localhost:5173"].filter(Boolean),
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

// Chrome DevTools may probe this path; return 204 to avoid noisy 404s.
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).end();
});

if (process.env.NODE_ENV === "production") {
  const distDir = path.join(__dirname, "../frontend/dist");

  app.use(express.static(distDir));

  // SPA fallback (no "*" route; avoids path-to-regexp errors on Express 5)
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api")) return next();
    return res.sendFile(path.join(distDir, "index.html"));
  });
}

app.use(errorHandler);

export {app}
