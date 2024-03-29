import { Sequelize } from "sequelize";
import ModelsRegistry from "../registry/ModelsRegistry";
import { databaseProvider } from "./provider.database";

export const setupModels = (AppModelsRegistry: any) => {
  const modelsRegistry = { ...ModelsRegistry, ...AppModelsRegistry };

  try {
    Object.keys(databaseProvider).forEach((databaseName) => {
      const models = Object.keys(modelsRegistry).filter((model) => {
        return modelsRegistry[model].database === databaseName;
      });

      console.log(`Adding models to ${databaseName} database...`);
      databaseProvider[databaseName].models = {};
      models.forEach((model) => {
        console.log(`Adding ~${model}~ model...`);
        try {
          const modelInstance = modelsRegistry[model].model(
            databaseProvider[databaseName].sequelize,
            Sequelize
          );
          databaseProvider[databaseName].models[model] = modelInstance;
        } catch (error: any) {
          console.error(
            `${model} not added to the ${databaseName} database due to ${error?.message}`
          );
        }
      });
      console.log(`Setup models to ${databaseName} database successfully.`);

      /**
       * Run sequelize association
       */
      models.forEach((modelName) => {
        if (databaseProvider[databaseName].models[modelName].associate) {
          try {
            databaseProvider[databaseName].models[modelName].associate(
              databaseProvider[databaseName].models
            );
          } catch (error: any) {
            console.error(
              `${modelName} not associated due to ${error?.message}`
            );
          }
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
