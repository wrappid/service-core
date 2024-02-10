import { BusinessEntitySchemas } from "./models/BusinessEntitySchemas.model";
import { FormSchemas } from "./models/FormSchemas.model";
import { Users } from "./models/Users.model";
const AppBuilderModelsRegistry = {
  BusinessEntitySchemas: {
    database: "application",
    model: BusinessEntitySchemas,
  },
  FormSchemas: {
    database: "application",
    model: FormSchemas,
  },
  Users: {
    database: "application",
    model: Users,
  },
};

export default AppBuilderModelsRegistry;
