const swaggerUi = require("swagger-ui-express");
const setupSwagger = async (wrappidApp: any, swaggerJsonFile: JSON) => {
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
