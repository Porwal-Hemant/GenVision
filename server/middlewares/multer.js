import multer from "multer";

// Creating multer middleware for parsing form-data
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;

/* 

// This code sets up Multer, a middleware used for handling file uploads in a Node.js application. Let's break it down step by step:
Uses multer.diskStorage() to define how files are stored.
The filename function customizes the filename before saving:
Date.now() ensures each uploaded file has a unique name (prevents overwriting).
file.originalname retains the original file name.
*/