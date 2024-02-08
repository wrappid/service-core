import { apiLogger } from "../middlewares/apiLogger.middleware";
import { fileHandler } from "../middlewares/fileHandler.middleware";
import { jwtVerify } from "../middlewares/jwtVerify.middleware";
import { validation } from "../middlewares/validation.middleware";
const MiddlewaresRegistry: any = {
  apiLogger: apiLogger,
  fileHandler: fileHandler,
  jwtVerify: jwtVerify,
  validation: validation,
};
export default MiddlewaresRegistry;
