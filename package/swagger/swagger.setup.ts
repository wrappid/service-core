import swaggerUi from "swagger-ui-express";
import { GenericObject } from "types/generic.types";

const setupSwagger = async (wrappidApp: any, swaggerJsonFile: GenericObject) => {
  try {
    /**
     * @todo
     * Generate swaggerJson File
     */
    wrappidApp.use(
      "/apiDocs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerJsonFile)
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export = setupSwagger;
