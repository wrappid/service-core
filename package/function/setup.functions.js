let appFunctionsRegistry = {};

const setupFunctions = async (AppFunctionsRegistry) => {
  try{
    appFunctionsRegistry = AppFunctionsRegistry;
    console.log(appFunctionsRegistry);
  }catch(error){
    console.log(error);
    throw error;
  }
};

module.exports = { setupFunctions, appFunctionsRegistry };
