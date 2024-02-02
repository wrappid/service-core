let appFunctionsRegistry: any = {};

const setupFunctions = async (AppFunctionsRegistry: any) => {
  try {
    appFunctionsRegistry = AppFunctionsRegistry;
    console.log(appFunctionsRegistry);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { setupFunctions, appFunctionsRegistry };
