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

const getMessages = asyncHandler(async (req, res)=> {
    const myID = req.user._id;
    if(!myID){
        throw new ApiError(400, "User not authenticated")
    }

    const {id: ChatPersonId} = req.param
    if(!ChatPersonId){
        throw new ApiError(400, "Chat person id not found")
    }

    const messages = await Message.find({
        $or : [{senderId: myID, receiverId: ChatPersonId},
                {senderId: ChatPersonId, receiverId: myID}
        ]
    })

    res.status(200).json(
        new ApiResponse(200, "Messages fetched successfully", messages)
    )

})

export {getUsers}