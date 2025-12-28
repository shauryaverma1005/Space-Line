import dotenv from "dotenv";
dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
    ORIGIN: process.env.ORIGIN,
    ACCESS_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET_KEY,
    REFRESH_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET_KEY
};

export { ENV }
