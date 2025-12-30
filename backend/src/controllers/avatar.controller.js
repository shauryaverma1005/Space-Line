import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";


const updateAvatar = asyncHandler( async(req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Image file is missing")
    }

    const response = await uploadOnCloudinary(avatarLocalPath)

    if(!response) {
        throw new ApiError(400, "Error uploading file to cloudinary")
    }

    const user = await User.findById(req.user._id)
    if (user.avatarPublicId) {
        const deleteResult = await deleteOnCloudinary(user.avatarPublicId);
        if (deleteResult.status === "error") {
            console.log(" Failed to delete old avatar from cloudinary");
        }
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{avatarPublicId: response.public_id, 
                avatar: response.secure_url
            }
        },
        {new: true}
    ).select("-password -refreshToken")

    res.status(200).json(
        new ApiResponse(200, "Avatar uploaded successfully", updatedUser)
    )
})

export {updateAvatar}