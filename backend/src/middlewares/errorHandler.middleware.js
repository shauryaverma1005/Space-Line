import { ApiError } from "../utils/ApiError.js";
import { ENV } from "../config/ENV.js";

const errorHandler =(err, req, res, next) => {
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data
        })
    }

    return res.status(500).json({
            success: false, 
            message: err.message || "Internal Server Error",
            // Only show stack trace in dev
            stack: ENV.NODE_ENV === "development" ? err.stack : undefined
    })
};

export {errorHandler}