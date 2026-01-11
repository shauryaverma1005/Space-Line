import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload file on cloudinary
const uploadOnCloudinary = async (localPath)=> {
    try {
        if(!localPath){
            return null
        }
    
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        });

        if(fs.existsSync(localPath)){
            fs.unlinkSync(localPath);
        }
        
        return response;
        
    } catch (error) {
        if(fs.existsSync(localPath)){
            fs.unlinkSync(localPath)
        }
        return null;
    }
}

// delete file from cloudinary
const deleteOnCloudinary = async (publicId) => {
  if (!publicId) return { status: "skipped", message: "No publicId provided" };

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    return {
      status: "success",
      message: "Cloudinary file deleted",
      result,
    };
  } catch (error) {
    console.error("❌ Cloudinary delete failed:", error.message || error);

    return {
      status: "error",
      message: "Failed to delete Cloudinary file",
      error: error.message || error,
    };
  }
};

export {
    uploadOnCloudinary,
    deleteOnCloudinary
}