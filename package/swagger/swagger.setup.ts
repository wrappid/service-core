import swaggerUi from "swagger-ui-express";
import { WrappidLogger } from "../logging/wrappid.logger";
import { GenericObject } from "types/generic.types";

const setupSwagger = async (wrappidApp: any, swaggerJsonFile: GenericObject, packageInfo: GenericObject) => {
  WrappidLogger.logFunctionStart("setupSwagger");
  try {
    /**
     * @todo
     * Generate swaggerJson File
     */
    wrappidApp.use(
      "/apiDocs",
      swaggerUi.serve,
      swaggerUi.setup({...swaggerJsonFile, info: {...swaggerJsonFile.info, title: packageInfo.name, version: packageInfo.version}})
    );
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd("setupSwagger");
  }
};

export = setupSwagger;
