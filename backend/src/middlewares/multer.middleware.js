import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(process.cwd(), "public", "temp", "avatar")

// Ensure directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// storage option for multer
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, tempDir)
    },
    filename: (req, file, cb)=> {
        const uniqueName = Date.now() +"-"+ Math.round(Math.random * 1e9);
        const ext = path.extname(file.originalname)
        cb(null, `${uniqueName}${ext}`)
    }
});

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// File filtering using multer 
const fileFilter = (req, file, cb) => {
    if(allowedMimeTypes.includes(file.mimeType)){
        cb(null, true)
    } else {
        cb(new Error( "Only JPG, JPEG, PNG, and WEBP image formats are allowed!"), false);
    }
};

// file limit 10 MB
const limits = {
    fileSize: 10 * 1024 * 1024 // 10 MB Size
}

export const upload = multer.upload({
    storage,
    fileFilter,
    limits
})