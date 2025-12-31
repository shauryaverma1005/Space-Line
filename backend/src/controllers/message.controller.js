import {User} from "../models/user.model.js"
import {Message} from "../models/message.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const getUsers = asyncHandler(async (req, res)=> {
    const loggedInUser = req.body._id
    if(!loggedInUser){
        throw new ApiError(400,"User not authenticatedd")
    }
    const AllUser = await User.find({ $ne: {_id: loggedInUser}}).select("-password")
    res.status(200).json(
        new ApiResponse(200, "All users fetched successfully", AllUser)
    )
})

export {getUsers}