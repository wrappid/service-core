/* eslint-disable no-unused-vars */
// // 3 functions
// // -upload in s3
// // -upload in local
// // -upload (storage type, naming, validation) type = s3/local
var multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { constant } = require("../constants/server.constant");
const configProvider = require("../config/provider.config");

const env = process.env.NODE_ENV || "development";
const s3Bucket = configProvider.storage.s3.bucket;
const region = configProvider.storage.s3.region;
const accessKeyId = configProvider.storage.s3.accessKeyId;
const secretAccessKey = configProvider.storage.s3.secretAccessKey;
const acceptedType = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

aws.config.update({
  region: region, // Put your aws region here
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

var s3 = new aws.S3({
  /* ... */
});

/*
const validation = {
  file_count: "single",
  mimeType: [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/svg",
    "image/gif",
    "image/bmp",
    "video/mp4",
    "application/pdf",
  ],
  maxSize: 5000000,
};
*/

/*
function uploadS3({ filename, req, res, next }) {
  try {
    const uploadFile = multer({
      limits: {
        fileSize: validation.maxSize,
      },
      storage: multerS3({
        s3: s3,
        bucket: s3Bucket,
        acl: "public-read",
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          // console.error('file.originalname.split(".") = ', file.originalname.split('.'));
          // cb(null, "prescriptionDocuments/"+Date.now().toString()+"."+file.originalname.split('.')[1])
          console.error(
            "file.originalname.split(\".\") = ",
            file.originalname.split(".")
          );
          let temp = file.originalname.split(".");
          let type = temp[temp.length - 1];
          console.error("type = ", type);
          if (acceptedType.indexOf(type) > -1) {
            cb(null, file.fieldname + "-" + Date.now().toString() + "." + type);
            // callback(null, file.fieldname + '-' + Date.now() +"."+ type);
          } else {
            throw "Wrong file type";
          }
        },
      }),
    });

    // if(count === 1) {
    let uploadSingleFile = uploadFile.single(filename);

    // Here call the upload middleware of multer
    uploadSingleFile(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        const err = new Error("Multer error");
        next(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        const err = new Error("Server Error");
        next(err);
      }

      // Everything went fine.
      next();
    });
    // } else {
    // 	let uploadFiles = uploadFile.array(filename, count);

    // 	// Here call the upload middleware of multer
    // 	uploadFiles(req, res, function (err) {
    // 		if (err instanceof multer.MulterError) {
    // 			// A Multer error occurred when uploading.
    // 			const err = new Error("Multer error");
    // 			next(err);
    // 		} else if (err) {
    // 			// An unknown error occurred when uploading.
    // 			const err = new Error("Server Error");
    // 			next(err);
    // 		}

    // 		// Everything went fine.
    // 		next();
    // 	});
    // }
  } catch (error) {
    console.error(error);
  }
}

/*
function uploadLocal({ filename, req, res, next }) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./src/wrappid/prescriptionDocuments/");
      },
      filename: function (req, file, callback) {
        console.error(
          'file.originalname.split(".") = ',
          file.originalname.split(".")
        );
        temp = file.originalname.split(".");
        type = temp[temp.length - 1];
        console.error("type = ", type);
        if (acceptedType.indexOf(type) > -1) {
          callback(null, file.fieldname + "-" + Date.now() + "." + type);
        } else {
          throw "Wrong file type";
        }
      },
    });

    const uploadFile = multer({
      storage: storage,
      limits: {
        fileSize: validation.maxSize,
      },
    });

    // if(count === 1) {
    const uploadSingleFile = uploadFile.single(filename);

    // Here call the upload middleware of multer
    uploadSingleFile(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        const err = new Error("Multer error");
        next(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        const err = new Error("Server Error");
        next(err);
      }

      // Everything went fine.
      next();
    });
    // } else {
    // 	let uploadFiles = uploadFile.array(filename, count);

    // 	// Here call the upload middleware of multer
    // 	uploadFiles(req, res, function (err) {
    // 		if (err instanceof multer.MulterError) {
    // 			// A Multer error occurred when uploading.
    // 			const err = new Error("Multer error");
    // 			next(err);
    // 		} else if (err) {
    // 			// An unknown error occurred when uploading.
    // 			const err = new Error("Server Error");
    // 			next(err);
    // 		}

    // 		// Everything went fine.
    // 		next();
    // 	});
    // }
  } catch (error) {
    console.error(error);
    res.send("Error:", error.message);
  }
}
*/

/*
function _upload({ storageType, filename, req, res, next }) {
  switch (storageType) {
    case constant.storageType.LOCAL:
      uploadLocal({ filename, storageType, req, res, next });
      break;

    case constant.storageType.AWS_S3:
    default:
      uploadS3({ filename, storageType, req, res, next });
      break;
  }
}
*/

const s3Config = new aws.S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  Bucket: s3Bucket,
});

const fileFilter = (req, file, cb) => {
  try{
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }catch(error){
    console.log(error);
    throw error;
  }
};

// this is just to test locally if multer is working fine.
/*
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "src/api/media/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
*/
const multerS3Config = multerS3({
  s3: s3Config,
  bucket: s3Bucket,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    console.log(file);
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});

// module.exports.getPublicUrl = (originalName) => {
//     console.log(">>>>>>>>>>>>>>>>>>>> 2 originalName = ", originalName);
//     return (
//       "https://" + s3Bucket + ".s3-" + region + ".amazonaws.com/" + originalName
//     );
//   };

module.exports = upload;
