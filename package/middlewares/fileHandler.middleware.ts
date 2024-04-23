import {upload, uploadToS3} from "../utils/upload.utils";

export const fileHandler = 
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
({ storageType, filename }: any) =>
  async (req: any, res: any, next: any) => {
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
          return next(new Error("No file uploaded"));
        }

        try {
          const publicUrl = await uploadToS3(req.files,{ name: filename, maxCount: 1 });
          console.log(publicUrl);
          next();
        } catch (error) {
          next(error);
        }
      });
    } catch (error) {
      next(error);
    }
  };