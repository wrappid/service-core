import { WrappidLogger } from "../logging/wrappid.logger";
import {upload, uploadToS3} from "../utils/upload.utils";

export const fileHandler = 
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
({ storageType, filename }: any) =>
  async (req: any, res: any, next: any) => {
    WrappidLogger.logFunctionStart("fileHandler");
    try {
      const singleUpload = upload.fields([{ name: filename, maxCount: 1 }]);
      //single(filename); // Assuming 'file' is the field name for the uploaded file
      /*
      {
        single/multiple: true/false,
        if single true
          filename
      }
*/
      await singleUpload(req, res, async (error) => {
        if (error) {
          return next(error);
        }

        if (!req.files) {
          WrappidLogger.error("No file uploaded");
          return next(new Error("No file uploaded"));
        }

        try {
          const publicUrl = await uploadToS3(req.files,{ name: filename, maxCount: 1 });
          WrappidLogger.error(publicUrl);
          // console.log(publicUrl);
          next();
        } catch (error:any) {
          WrappidLogger.error(error);
          next(error);
        }
      });
    } catch (error:any) {
      WrappidLogger.error(error);
      next(error);
    }
  };