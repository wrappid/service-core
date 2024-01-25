const Sequelize = require("sequelize");
const { ModelsRegistry } = require("../registry");
const databaseProvider = require("./provider.database");

const setupModels = (AppModelsRegistry) => {
  let modelsRegistry = { ...ModelsRegistry, ...AppModelsRegistry };
  
  try{
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


     
    });


    /**
      * Run sequelize association
      */
    let allModels = {};
    Object.assign(allModels, ...Object.keys(databaseProvider).map((databaseName)=>{
      return databaseProvider[databaseName].models;
    }));

    Object.keys(databaseProvider).forEach((databaseName) => {
      let models = Object.keys(modelsRegistry).filter((model) => {
        return modelsRegistry[model].database === databaseName;
      });

      models.forEach((modelName) => {
        if (databaseProvider[databaseName].models[modelName].associate) {
          databaseProvider[databaseName].models[modelName].associate(allModels);
        }
      });
    });
  }catch(error){
    console.log(error);
    throw error;
  }
};

module.exports = setupModels;
