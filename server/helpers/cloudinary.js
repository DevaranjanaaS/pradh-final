const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "ddvxciphm",
  api_key: "451743774268242",
  api_secret: "F1ull9SH-EHH5XReUDJqCbtIaVQ",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    chunk_size: 8388608, // 8MB in bytes
    eager: [
      { width: 1000, height: 1000, crop: "limit" },
      { width: 800, height: 800, crop: "limit" }
    ],
    eager_async: true,
    //eager_notification_url: "https://your-domain.com/webhook"
  });

  return result;
}

// Configure multer to accept larger files (8MB)
const upload = multer({ 
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024, // 8MB in bytes
  }
});

module.exports = { upload, imageUploadUtil };
