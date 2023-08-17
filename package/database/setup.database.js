const Sequelize = require("sequelize");
const { ModelsRegistry } = require("../registry");
const databaseProvider = require("./provider.database");

const setupModels = (AppModelsRegistry) => {
    let modelsRegistry = { ...ModelsRegistry, ...AppModelsRegistry };

    Object.keys(databaseProvider).forEach(databaseName => {
        let database = databaseProvider[databaseName];

        let models = Object.keys(modelsRegistry).filter(model => {
            return modelsRegistry[model].database === databaseName;
        });

        console.log(`Adding models to ${databaseName} database...`);
        databaseProvider[databaseName].models = {}
        models.forEach(model => {
            console.log(`Adding ~${model}~ model...`);
            databaseProvider[databaseName].models[model] = modelsRegistry[model].model(databaseProvider[databaseName].sequelize, Sequelize);
        });
        console.log(`Models added to ${databaseName} database successfully.`);
    });
}

module.exports = setupModels;