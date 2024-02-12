/* eslint-disable no-unused-vars */
import upload from "../utils/upload.utils";

export const fileHandler =
  ({ storageType, filename }: any) =>
    async (req: any, res: any, next: any) => {
      try {
        console.log("File Handler middleware called");

        // req.storageType = storageType;

        upload.fields([{ name: filename, maxCount: 1 }])(
          req,
          res,
          async function (err: any) {
          // eslint-disable-next-line no-useless-catch
            try {
              if (err) {
                console.log("FIle Upload error", err);
                throw err;
              } else {
                next();
              }
            } catch (err) {
              throw err;
            }
          }
        );
      // res.status(200).json({message: "FileHandler middleware res.status"});
      } catch (error: any) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Something went wrong in middleware" });
      }
    };

// const filesHandler = ({storageType, files}) => (req, res, next) => {
//   try {
//     console.log("FilesHandler in middleware called");

//     req.storageType = storageType;
//     upload({storageType, files, req, res, next});

//     res.status(200).json({message: "Calling FilesHandler in middleware"});
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({message: "Somethin went wrong in middleware"});
//   }
// };

// module.exports = {
//   fileHandler,
//   filesHandler
// };
