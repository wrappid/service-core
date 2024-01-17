const Sequelize = require("sequelize");
const { ModelsRegistry } = require("../registry");
const databaseProvider = require("./provider.database");

const setupModels = (AppModelsRegistry) => {
  let modelsRegistry = { ...ModelsRegistry, ...AppModelsRegistry };

  Object.keys(databaseProvider).forEach((databaseName) => {
    let models = Object.keys(modelsRegistry).filter((model) => {
      return modelsRegistry[model].database === databaseName;
    });

    console.log(`Adding models to ${databaseName} database...`);
    databaseProvider[databaseName].models = {};
    models.forEach((model) => {
      console.log(`Adding ~${model}~ model...`);
      let modelInstance = modelsRegistry[model].model(
        databaseProvider[databaseName].sequelize,
        Sequelize
      );
      databaseProvider[databaseName].models[model] = modelInstance;
    });
    console.log(`Models added to ${databaseName} database successfully.`);

    /**
     * Run sequelize association
     */
    models.forEach((modelName) => {
      if (databaseProvider[databaseName].models[modelName].associate) {
        databaseProvider[databaseName].models[modelName].associate(
          databaseProvider[databaseName].models
        );
      }
    });
  });
};

module.exports = setupModels;
