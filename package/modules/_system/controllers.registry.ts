import { validation } from "../../middlewares/validation.middleware";
import * as _systemController from "./controllers/_system.controller";
import * as businessController from "./controllers/business.controller";
import * as dataController from "./controllers/data.controller";
import * as databaseController from "./controllers/database.controller";
import * as formsController from "./controllers/forms.controller";
import { getSettingMeta } from "./validations/_system.validation";

const AppBuilderControllersRegistry = {
  //database
  getDatabaseTables: databaseController.getDatabaseTables,
  getAttributes: databaseController.getAttributes,
  getBusinessEntityColumns: databaseController.getBusinessEntityColumns,

  //business controller
  getBusinessEntities: businessController.getBusinessEntities,
  getEntityData: businessController.getEntityData,
  getIndividualEntityData: businessController.getIndividualEntityData,
  getAllEntityData: businessController.getAllEntityData,
  noAuthGetAllEntityData: businessController.noAuthGetAllEntityData,

  // forms controller
  getNoAuthFormSchema: formsController.getNoAuthFormSchema,
  getFormSchema: formsController.getFormSchema,
  putFormSchema: formsController.putFormSchema,

  // version 
  getVersion: [_systemController.getVersion],

  //
  getSettingMeta: [
    validation(getSettingMeta),
    _systemController.getSettingMeta,
  ],

  //data
  // getModels: [dataController.getModels],
  getDatabaseModels: [dataController.getDatabaseModels],
  getDatabaseModelRow: [dataController.getDatabaseModelRow],
  postDatabaseModel: [dataController.postDatabaseModel],
  putUpdateStatus: [dataController.putUpdateStatus],
  putDatabaseModel: [dataController.putDatabaseModel],
  patchDatabaseModel: [dataController.patchDatabaseModel]

};
export default AppBuilderControllersRegistry;
