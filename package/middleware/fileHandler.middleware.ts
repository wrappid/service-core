import { Injectable, NestMiddleware } from "@nestjs/common";
import { S3 } from "aws-sdk";
import multer from "multer";

@Injectable()
export class FileHandlerMiddleware implements NestMiddleware {
  private readonly s3 = new S3();
  constructor() {
    this.s3 = new S3({
      region: "ap-south-1",
      accessKeyId: "AKIAWFKWOFQIJVSEK2VE",
      secretAccessKey: "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",
    });
  }

  async use(req: any, res: any, next: () => void) {
    const upload = multer();

    upload.any()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const [file] = req.files;

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      try {
        let { originalname } = file;
        // Replace 'your-bucket-name' and 'your-key' with your S3 bucket name and desired key
        const s3Url = await this.uploadFile(
          file,
          "elasticbeanstalk-ap-south-1-423772433424",
          new Date().getTime() + originalname
        );
        console.log(`Upload sucessful`);
        res.locals.s3Url = s3Url; // Store the S3 URL in locals for later use
        next();
      } catch (uploadError: any) {
        return res.status(500).json({ error: uploadError.message });
      }
    });
  }

  private async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
    key: string
  ): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
      ContentDisposition: "inline",
      CreateBucketConfiguration: {
        LocationConstraint: "ap-south-1",
      },
    };

    const result = await this.s3.upload(params).promise();
    // console.log(result);
    return result.Location; // Return the S3 URL
  }
}
