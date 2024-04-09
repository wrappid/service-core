import { BusinessEntitySchemas } from "./models/BusinessEntitySchemas.model";
import { FormSchemas } from "./models/FormSchemas.model";
import { ThemeSchemas } from "./models/ThemeSchemas.model";

const AppBuilderModelsRegistry = {
  BusinessEntitySchemas: {
    database: "application",
    model: BusinessEntitySchemas,
  },
  FormSchemas: {
    database: "application",
    model: FormSchemas,
  },
  ThemeSchemas: {
    database: "application",
    model: ThemeSchemas,
  },
};

export default AppBuilderModelsRegistry;
