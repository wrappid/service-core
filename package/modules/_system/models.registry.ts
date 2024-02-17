import { BusinessEntitySchemas } from "./models/BusinessEntitySchemas.model";
import { FormSchemas } from "./models/FormSchemas.model";

const AppBuilderModelsRegistry = {
  BusinessEntitySchemas: {
    database: "application",
    model: BusinessEntitySchemas,
  },
  FormSchemas: {
    database: "application",
    model: FormSchemas,
  },
};

export default AppBuilderModelsRegistry;
