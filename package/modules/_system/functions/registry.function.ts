import { constant } from "./../../../constants/server.constant";
import { ApplicationContext } from "./../../../context/application.context";

/**
   * 
   * @param req 
   * @returns 
   */
export const getRegistryFunc =  async (req:any) => {
  try {
    const name = req.params.name;
    let registry: any = {};
    switch (name) {
      case constant.registry.CONTROLLER_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.CONTROLLER_REGISTRY);
        break;
      case constant.registry.FUNCTION_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.FUNCTION_REGISTRY);
        break;
      case constant.registry.MIDDLEWARE_REGISTRY:
        registry = ApplicationContext.getContext(constant.registry.MIDDLEWARE_REGISTRY);
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