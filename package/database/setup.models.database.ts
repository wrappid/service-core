import { Sequelize } from "sequelize";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";
import ModelsRegistry from "../registry/ModelsRegistry";
import { GenericObject } from "../types/generic.types";
import { coreConstant } from "./../index";
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
  // databaseProvider[databaseName].models = {};
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

export const setupModels = async () => {
  WrappidLogger.logFunctionStart("setupModels");
  const promises: Promise<boolean>[] = [];
  const AppModelsRegistry: GenericObject = ApplicationContext.getContext(constant.registry.MODELS__REGISTRY);
  const modelsRegistry:GenericObject = { ...ModelsRegistry, ...AppModelsRegistry };
  try {
    Object.keys(databaseProvider).forEach(async (databaseName) => {
      // eslint-disable-next-line no-async-promise-executor
      promises.push(new Promise(async (resolve, reject) => {
        try {
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
           * 2. Add modelInstance to database provider using genericmodel.ts
           */
          const allModelJson = await databaseActions.findAll(databaseName, "ModelSchemas", {
            where: {
              // database: databaseName,
              _status: coreConstant.entityStatus.PUBLISHED
            }
          });
          ApplicationContext.setContext(constant.registry.MODELS__REGISTRY, allModelJson); 
          allModelJson.forEach((data: GenericObject) => {
            const modelInstance = GenericModel(data.name, data.schema, 
              databaseProvider[databaseName].sequelize,
              Sequelize);
            databaseProvider[databaseName].models[data.name] = modelInstance;
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
          //New structure from table
          allModelJson.forEach((model:GenericObject) => {
            if (databaseProvider[databaseName].models[model.name].associate) {
              try {
                databaseProvider[databaseName].models[model.name].associate(
                  databaseProvider[databaseName].models
                );
              } catch (error: any) {
                WrappidLogger.error(`${model.name} not associated due to the following error:`);
                WrappidLogger.error(error);
              }
            }
          });
          resolve(true);
        } catch(error) {
          reject(error);
        }
      }));
    });
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd("setupModels");
  }
  return Promise.all(promises);
};
