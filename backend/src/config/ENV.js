import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// In production (e.g., Render), prefer platform environment variables.
// Only load a local .env file for development / local runs.
const envPath = path.join(process.cwd(), ".env");
if (process.env.ISDEVELOPING !== "true" && fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
    ORIGIN: process.env.ORIGIN,
    ACCESS_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET_KEY,
    REFRESH_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};

export { ENV }
