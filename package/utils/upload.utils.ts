/* eslint-disable no-unused-vars */
// // 3 functions
// // -upload in s3
// // -upload in local
// // -upload (storage type, naming, validation) type = s3/local
import { S3Client,PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";

import multer from "multer";
import { configProvider } from "../config/provider.config";

const s3Bucket = configProvider().storage.s3.bucket;
const region = configProvider().storage.s3.region;
const accessKeyId = configProvider().storage.s3.accessKeyId;
const secretAccessKey = configProvider().storage.s3.secretAccessKey;
const acceptedType = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

type UploadOptions = {
  name: string;
  maxCount: number;
}

// Replace with your AWS credentials and bucket configuration
const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: region, // e.g., 'us-east-1'
});



const fileFilter = (req: any, file: any, cb: any) => {
  try {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const upload = multer({
  storage:  multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});

export const uploadToS3 = async (inputFile: {[key: string]: Express.Multer.File[]}, options: UploadOptions) => {
  // const file: Express.Multer.File = inputFile[options.name][0];
  const file: any = inputFile[options.name][0];
  const fileName = new Date().toISOString() + "-" + file.originalname; // Generate unique filename
  const uploadParams: PutObjectCommandInput = {
    Bucket: s3Bucket,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Make the uploaded file publicly accessible
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    const publicUrl = `https://s3.${region}.amazonaws.com/${s3Bucket}/${fileName}`; // Construct URL
    file.location = publicUrl;
    return publicUrl; 
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};

