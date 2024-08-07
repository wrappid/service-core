import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";

import multer from "multer";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";

// const acceptedType = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

type UploadOptions = {
  name: string;
  maxCount: number;
}
/**
 * Function to filter file type
 * @param req - Request object
 * @param file - File object 
 * @param cb - Callback function
 */
const fileFilter = (req: any, file: any, cb: any) => {
  WrappidLogger.logFunctionStart("fileFilter");
  try {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "application/msword" || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error:any) {
    WrappidLogger.error(error);
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
/**
 * Function to upload file to S3
 * @param inputFile - Uploaded file
 * @param options - Upload options
 * @returns 
 */
export const uploadToS3 = async (inputFile: {[key: string]: Express.Multer.File[]}, options: UploadOptions) => {
  try {
    WrappidLogger.logFunctionStart("uploadToS3");
    const { storage } = ApplicationContext.getContext(constant.CONFIG_KEY);
    const { bucket, region = "us-east-1", accessKeyId, secretAccessKey } = storage.s3;


    // const file: Express.Multer.File = inputFile[options.name][0];

    if (inputFile[options.name] === undefined) {
      WrappidLogger.warn("No file uploaded");
      return "";
    }
    const file: any = inputFile[options.name][0];
    const fileName = new Date().toISOString() + "-" + file.originalname; // Generate unique filename
    const uploadParams: PutObjectCommandInput = {
      Bucket: bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // Make the uploaded file publicly accessible
    };
    // Replace with your AWS credentials and bucket configuration
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      region: region
    });

    await s3Client.send(new PutObjectCommand(uploadParams));
    
    const publicUrl = `https://s3.${region}.amazonaws.com/${bucket}/${fileName}`; // Construct URL
    
    file.location = publicUrl;
    
    return publicUrl; 
  } catch (error:any) {
    WrappidLogger.error(error.message);
    console.error("Error uploading file to S3:", error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd("uploadToS3");
  }
};

