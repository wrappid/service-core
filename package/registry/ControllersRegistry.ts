import * as helperDatabase from "../database/helper.database";
const ControllersRegistry = {
  getDatabases: helperDatabase.getDatabases,
  getTables: helperDatabase.getTables,
  getColumns: helperDatabase.getColumns,
};
export default ControllersRegistry;
