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

const fileFilter = (req: any, file: any, cb: any) => {
  WrappidLogger.logFunctionStart();
  try {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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

export const uploadToS3 = async (inputFile: {[key: string]: Express.Multer.File[]}, options: UploadOptions) => {
  WrappidLogger.logFunctionStart();
  const { storage } = ApplicationContext.getContext(constant.CONFIG_KEY);
  const { bucket, region = "us-east-1", accessKeyId, secretAccessKey } = storage.s3;

  // const file: Express.Multer.File = inputFile[options.name][0];
  const file: any = inputFile[options.name][0];
  const fileName = new Date().toISOString() + "-" + file.originalname; // Generate unique filename
  const uploadParams: PutObjectCommandInput = {
    Bucket: bucket,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Make the uploaded file publicly accessible
  };

  try {
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
    WrappidLogger.error(error);
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  } finally {
    WrappidLogger.logFunctionEnd();
  }
};

