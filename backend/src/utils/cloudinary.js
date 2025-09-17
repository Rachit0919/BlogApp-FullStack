import { V2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { ApiError } from "./ApiError";

dotenv.config({ path: "D:/MegaProject-Blog/backend/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            response_type: auto
        })
        fs.unlinkSync(localFilePath)
    } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new ApiError(500, "Uploading image on cloudinary failed!!!")
    }
}

export {uploadOnCloudinary}