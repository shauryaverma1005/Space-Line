import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ENV} from "../config/ENV.js"


const auth = asyncHandler(async (req, res, next)=>{
     const accessToken = req.cookies?.accessToken
 
    if (!accessToken) {
        throw new ApiError(401, "User not authenticated. Token missing.");
    }
 
    let decodedToken;
    try {
        decodedToken = jwt.verify(accessToken, ENV.ACCESS_SECRET);
    } catch (err) {
        console.log("JWT Error:", err.message)
        throw new ApiError(403, "Token is invalid or expired.");
    }
 
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
 
    if (!user) {
        throw new ApiError(404, "User not found for this token.");
    }
 
     req.user = user
     next();
})

export {auth}