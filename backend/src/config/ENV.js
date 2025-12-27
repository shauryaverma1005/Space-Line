import dotenv from "dotenv";
dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    ORIGIN: process.env.ORIGIN
};

export { ENV }
