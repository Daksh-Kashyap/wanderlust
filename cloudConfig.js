const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinaryUrl = process.env.CLOUDINARY_URL;
const parsedCloudinaryUrl = cloudinaryUrl ? new URL(cloudinaryUrl) : null;

const cloudName =
  process.env.CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  parsedCloudinaryUrl?.hostname;
const apiKey =
  process.env.CLOUD_API_KEY ||
  process.env.CLOUDINARY_API_KEY ||
  parsedCloudinaryUrl?.username;
const apiSecret =
  process.env.CLOUD_API_SECRET ||
  process.env.CLOUDINARY_API_SECRET ||
  parsedCloudinaryUrl?.password;

console.log("Cloudinary env check:", {
  cloudName: Boolean(cloudName),
  apiKey: Boolean(apiKey),
  apiSecret: Boolean(apiSecret),
});

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wandderlust_DEV",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
