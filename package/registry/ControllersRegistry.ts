import * as helperDatabase from "../database/helper.database";
import AppBuilderControllersRegistry from "app-builder/controllers.registry";
const ControllersRegistry = {
  getDatabases: helperDatabase.getDatabases,
  getTables: helperDatabase.getTables,
  getColumns: helperDatabase.getColumns,
  ...AppBuilderControllersRegistry,
};
export default ControllersRegistry;
