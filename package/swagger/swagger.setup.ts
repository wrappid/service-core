import swaggerUi from "swagger-ui-express";
import { WrappidLogger } from "../logging/wrappid.logger";
import { generateSwaggerJson } from "./swagger-generate";
import { GenericObject } from "types/generic.types";

const setupSwagger = async (wrappidApp: any, packageInfo: GenericObject, swagger:GenericObject) => {
  WrappidLogger.logFunctionStart("setupSwagger");
  try {
    /**
     * @todo
     * Generate swaggerJson File
     * 
     */
    const swaggerJsonFile:GenericObject=await generateSwaggerJson(swagger);
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
