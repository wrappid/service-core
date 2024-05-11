import { DataTypes, Sequelize } from "sequelize";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";
import ModelsRegistry from "../registry/ModelsRegistry";
import { GenericObject } from "../types/generic.types";
import { databaseActions } from "./actions.database";
import { GenericModel } from "./generic.model";
import { databaseProvider } from "./setup.database";

/**
 * This function add models to database provider from modelsRegistry
 * 
 * @param databaseName : Database Name
 * @param modelsRegistry : Models Registry
 * @param models : All Models
 */
const setupFromExistingModelRegistry = (databaseName: string, modelsRegistry: GenericObject, models: string[]) => {
  
  WrappidLogger.info(`Adding models to ${databaseName} database...`);
  databaseProvider[databaseName].models = {};
  models.forEach((model) => {
    WrappidLogger.info(`Adding ~${model}~ model...`);
    try {
      const modelInstance = modelsRegistry[model].model(
        databaseProvider[databaseName].sequelize,
        Sequelize
      );
      databaseProvider[databaseName].models[model] = modelInstance;
    } catch (error: any) {
      WrappidLogger.error(`${model} not added to the ${databaseName} database due to the follwing error: `);
      WrappidLogger.error(error);
    }
  });
  
  WrappidLogger.info(`Setup models to ${databaseName} database successfully.`);
  
};


export const setupModels = () => {
  WrappidLogger.logFunctionStart("setupModels");
  const AppModelsRegistry: GenericObject = ApplicationContext.getContext(constant.registry.MODELS__REGISTRY);
  const modelsRegistry:GenericObject = { ...ModelsRegistry, ...AppModelsRegistry };

  try {
    Object.keys(databaseProvider).forEach(async (databaseName) => {
      const models = Object.keys(modelsRegistry).filter((model) => {
        return modelsRegistry[model].database === databaseName;
      });
      /**
       * @todo
       * Once all the *model.ts files turn into json schema and moved to database or registry 
       * Will remove this function
       */
      setupFromExistingModelRegistry(databaseName, modelsRegistry, models);

      /**
       * Model Schema json from database will be added to databse provider with generic model structure
       */
      
      /**
       * @todo
       * 1. Get all the models schema from the database where database = databaseName
       * 2. Add to database provider using genericmodel.ts
       */
      const allModelJson = await databaseActions.findAll(databaseName, "ModelSchemas", {
        where: {
          database: databaseName
        }
      });
      allModelJson.forEach((data: GenericObject) => {
        const model = GenericModel(data.name, data.schema, Sequelize, DataTypes);
        const modelInstance = model(
          databaseProvider[databaseName].sequelize,
          Sequelize
        );
        databaseProvider[databaseName].models[model] = modelInstance;
      });
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
            WrappidLogger.error(`${modelName} not associated due to the following error:`);
            WrappidLogger.error(error);
          }
        }
      });
    });
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd("setupModels");
  }
};
