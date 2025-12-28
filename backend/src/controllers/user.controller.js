import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ENV } from "../config/ENV.js";

const generateAccessAndRefreshToken = asyncHandler( async (userId)=> {
    const user = User.findById(userId)

    if(!user){
        throw new ApiError(400, "User with this id does not exist")
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return {accessToken, refreshToken};
})

const signup = asyncHandler( async (req, res)=> {
    const {email, fullName, password} = req.body

    if([email, fullName, password].some((field) => field?.trim() ==="")){
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.find({email})

    if(existingUser){
        throw new ApiError(400, "User with email already exists")
    }

    const createdUser = await User.create({
        email,
        fullName,
        password
    })

    const user = await User.findById(createdUser._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(500, "something went wrong while registering user")
    }

    const {accessToken, refreshToken} = generateAccessAndRefreshToken()

    const option = {
        httpOnly: true,
        secure: ENV.NODE_ENV!=="development",
    }

    res.status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(200, "User created successfully !", user)
    )
})