import {v2 as cloudinary} from "cloudinary"
import fs from "fs";
import { ENV } from "../config/ENV.js";

 cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath)=> {
    try {
        if(!localPath) return null;
    
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

export {uploadOnCloudinary}