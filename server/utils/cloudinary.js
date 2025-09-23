import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload File to Cloudinary
export const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    // Upload file
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // auto handles images, videos, pdfs etc.
    });

    console.log("File uploaded on Cloudinary:", response.url);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
