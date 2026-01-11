import {User} from "../models/user.model.js"
import {Message} from "../models/message.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getUsers = asyncHandler(async (req, res)=> {
    const loggedInUser = req.user?._id
    if(!loggedInUser){
        throw new ApiError(400,"User not authenticatedd")
    }
    const AllUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
    res.status(200).json(
        new ApiResponse(200, "All users fetched successfully", AllUser)
    )
})

const getMessages = asyncHandler(async (req, res)=> {
    const myID = req.user._id;
    if(!myID){
        throw new ApiError(400, "User not authenticated")
    }

    const {id: ChatPersonId} = req.params
    if(!ChatPersonId){
        throw new ApiError(400, "Chat person ID is required")
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

const sendMessage = asyncHandler(async (req, res)=> {
    const myId = req?.user?._id
    const {text} = req.body
    const { id: receiverId } = req.params

   // Validate sender & receiver
    const [sender, receiver] = await Promise.all([
        User.findById(myId),
        User.findById(receiverId)
    ]);

    if (!sender) {
        throw new ApiError(404, "Sender not found");
    }

    if (!receiver) {
        throw new ApiError(404, "Receiver not found");
    }

    if(!(text || req.file?.path)){
        throw new ApiError(400, "No content to send message")
    }

    let imageLocalPath;
    let imageURL= null;
    if(req.file && req.file?.path){
        imageLocalPath =req.file?.path
        const response = await uploadOnCloudinary(imageLocalPath)
        if(!response){
            console.log("No image found to upload")
          }
          imageURL = response.secure_url
    }

    const newMessage = await Message.create({
        senderId: myId,
        receiverId: receiverId,
        text:text ?? "",
        image: imageURL ?? ""
    })

    if(!newMessage){
        throw new ApiError(500, "Error Creating message entry in database")
    }

    res.status(201)
    .json(
        new ApiResponse(201, "Message sent successfully", newMessage)
    )
})

export {
    getUsers,
    getMessages,
    sendMessage
}