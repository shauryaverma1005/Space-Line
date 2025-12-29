import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ENV } from "../config/ENV.js";
import {ApiResponse} from "../utils/ApiResponse.js"


// Generate access and refresh token 
const generateAccessAndRefreshToken = asyncHandler( async (userId)=> {
    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(400, "User with this id does not exist")
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return {accessToken, refreshToken};
})

// signup controller
const signup = asyncHandler( async (req, res)=> {
    const {email, fullName, password} = req.body

    if([email, fullName, password].some((field) => field?.trim() ==="")){
        throw new ApiError(400, "All fields are required")
    }

    if(password.length<6) {
          throw new ApiError(400, "Password should be minimum of 6 characters")
    }

    const existingUser = await User.findOne({email})

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

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

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

//login controller
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({email: email})

    if(!user){
        throw new ApiError(404, "Account with this email does not exist")
    }

    const isPasswordValid = await user.isPasswordValid(password)

    if(!isPasswordValid) {
        throw new ApiError(400, "Email or password is incorrect")
    }

    const loginUser = await User.findById(user._id).select("-password -refreshToken")

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: ENV.NODE_ENV!=="development"
    }

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "login successful", loginUser)
    )
})

//logout controller 
const logout = asyncHandler(async (req ,res) => {

    if(!req.user?._id){
        throw new ApiError(400, "User not authenticated")
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {refreshToken: ""}
        },
        {new: true}
    )

    const options = {
        httpOnly: true,
        secure: ENV.NODE_ENV !== "development"
    }

    res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, "user logout successful")
    )
})