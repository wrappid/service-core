import _systemRoutesRegistry from "../modules/_system/routes.registry";

const RoutesRegistry = {
  getDatabases: {
    name: "getDatabases",
    url: "getAllDatabases",
    authRequired: false,
    entityRef: "testGetAllAPI",
    reqMethod: "get",
    controllerRef: "getDatabases",
  },
  getTables: {
    name: "getTables",
    url: "getAllTables/:database",
    authRequired: false,
    entityRef: "testGetAllAPI",
    reqMethod: "get",
    controllerRef: "getTables",
  },
  getColumns: {
    name: "getAllColumns/:database/:table",
    url: "wrappidall",
    authRequired: false,
    entityRef: "testGetAllAPI",
    reqMethod: "get",
    controllerRef: "getColumns",
  },
  ..._systemRoutesRegistry
};
export default RoutesRegistry;
