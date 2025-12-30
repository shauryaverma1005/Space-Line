import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError.js"
import {ENV} from "../config/ENV.js"


const auth = asyncHandler(async (req, res, next)=>{
   try {
     const accessToken = res.cookie?.accessToken
 
     if(!accessToken){
         throw new ApiError(400, "User not authenticated")
     }
 
     const decodedToken = jwt.verify(accessToken, ENV.ACCESS_SECRET)
 
     if(!decodedToken){
         throw new ApiError(400, "Invalid Token")
     }
 
     const user = await User.findById(decodedToken._id)
 
     if(!user){
         throw new ApiError(400, "Invalid Token user not found")
     }
 
     req.user = user
     next();
   } catch (error) {
      throw new ApiError(400, error?.message || "Invalid Access Token ")
   }
})

export {auth}