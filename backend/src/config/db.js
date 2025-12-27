import mongoose from "mongoose"
import { ENV } from "./ENV.js"
import { DB_NAME } from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstance = mongoose.connect(`${ENV.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected successfully`)
        console.log(`connection Instance: ${connectionInstance}`)
    } catch (error) {
        console.log(`Error connecting MongoDB`)
        process.exit(1);
    }
}

export {connectDB}