const swaggerUi = require("swagger-ui-express");
const setupSwagger = async (wrappidApp, swaggerJsonFile) => {
  /**
   * @todo
   * Generate swaggerJson File
   */
  wrappidApp.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
};

module.exports = setupSwagger;
