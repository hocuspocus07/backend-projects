import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv"
dotenv.config({
    path:'../.env'
})

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if (!localFilePath) return null;
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // console.log("file uploaded successfully ", response.url);
        if (response) {
            fs.unlinkSync(localFilePath);
        } else {
            throw new Error("Cloudinary upload failed.");
        }
        return response
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Error uploading file to Cloudinary: ", error);
        throw new Error("Failed to upload image on Cloudinary.");
    }
}

export {uploadOnCloudinary}