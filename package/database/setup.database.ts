import { Sequelize } from "sequelize";
import { ModelsRegistry } from "../registry/ModelsRegistry";
import { databaseProvider } from "./provider.database";

export const setupModels = (AppModelsRegistry: any) => {
  let modelsRegistry = { ...ModelsRegistry, ...AppModelsRegistry };

  try {
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};
