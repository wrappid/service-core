import { constant } from "./../../../constants/server.constant";
import { ApplicationContext } from "./../../../context/application.context";

/**
 * This function will return registry entries
 * 
 * @param req : api request
 * @returns registryEntries
 */
export const getRegistryFunc =  async (req:any) => {
  try {
    const name = req.params.name;
    let registry: any = {};
    switch (name) {
      case constant.registry.CONTROLLERS_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.CONTROLLERS_REGISTRY);
        break;
      case constant.registry.FUNCTIONS_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.FUNCTIONS_REGISTRY);
        break;
      case constant.registry.MIDDLEWARES_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.MIDDLEWARES_REGISTRY);
        break;
      case constant.registry.MODELS__REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.MODELS__REGISTRY);
        break;
      case constant.registry.TASKS_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.TASKS_REGISTRY);
        break;
      case constant.registry.VALIDATIONS_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.VALIDATIONS_REGISTRY);
        break;
      case constant.registry.ROUTES_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.ROUTES_REGISTRY);
        break;
        
      default:
        break;
    }
    const options = registry
      ? Object.keys(registry)?.map((com) => {
        return { id: com, label: com };
      })
      : [];
    const totalRecords = Object.keys(options).length;
    return {status:200, data: options, totalRecords: totalRecords,  message: `${name} fetched successfully`};   
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  
export const getRegistryListFunc = async () => {
  try {
   
    return {status: 200, message: "API Call Success"};
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};  