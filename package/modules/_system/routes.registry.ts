const _systemRoutesRegistry = {
  getVersion: {
    name: "Get Version API",
    url: "version",
    authRequired: false,
    entityRef: "getVersion",
    reqMethod: "get",
    controllerRef: "getVersion",
  },
  getDatabaseTables: {
    name: "Get Database Tables",
    url: "business/tables/:database",
    authRequired: true,
    entityRef: "getDatabaseTables",
    reqMethod: "get",
    controllerRef: "getDatabaseTables",
  },
  getAttributes: {
    name: "Get Table Attributes",
    url: "business/tables/attributes/:database/:table",
    authRequired: true,
    entityRef: "getAttributes",
    reqMethod: "get",
    controllerRef: "getAttributes",
  },
  getBusinessEntityColumns: {
    name: "Get Entity",
    url: "noauth/business/columns/:entity",
    authRequired: false,
    entityRef: "getBusinessEntityColumns",
    reqMethod: "get",
    controllerRef: "getBusinessEntityColumns",
  },
  getBusinessEntities: {
    name: "Get Business Entities",
    url: "business/entities",
    authRequired: true,
    entityRef: "getBusinessEntities",
    reqMethod: "get",
    controllerRef: "getBusinessEntities",
  },
  getEntityData: {
    name: "Get Entity Count",
    url: "business/count/:entity",
    authRequired: true,
    entityRef: "getEntityData",
    reqMethod: "get",
    controllerRef: "getEntityData",
  },
  getIndividualEntityData: {
    name: "Get Individual EntityData",
    url: "business/individual/:entity",
    authRequired: true,
    entityRef: "getIndividualEntityData",
    reqMethod: "get",
    controllerRef: "getIndividualEntityData",
  },
  getAllEntityData: {
    name: "Get All Entity Data",
    url: "business/all/:entity",
    authRequired: true,
    entityRef: "getAllEntityData",
    reqMethod: "get",
    controllerRef: "getAllEntityData",
  },
  noAuthGetAllEntityData: {
    name: "No Auth Get All Entity Data",
    url: "noauth/business/all/:entity",
    authRequired: false,
    entityRef: "noAuthGetAllEntityData",
    reqMethod: "get",
    controllerRef: "noAuthGetAllEntityData",
  },
  getNoAuthFormSchema: {
    name: "Get No Auth Form Schema",
    url: "noauth/formSchema/:formID",
    authRequired: false,
    entityRef: "getNoAuthFormSchema",
    reqMethod: "get",
    controllerRef: "getNoAuthFormSchema",
  },
  getFormSchema: {
    name: "Form Schema",
    url: "formSchema/:formID",
    authRequired: true,
    entityRef: "formSchema",
    reqMethod: "get",
    controllerRef: "getFormSchema",
  },
  putFormSchema: {
    name: "Put Data",
    url: "data/:model/:id",
    authRequired: true,
    entityRef: "putFormSchema",
    reqMethod: "put",
    controllerRef: "putFormSchema",
  },
  getSettingMeta:{
    name: "Setting Meta",
    url: "settingMeta",
    authRequired: true,
    entityRef: "settingMeta",
    reqMethod: "get",
    controllerRef: "getSettingMeta"
  },
  //done
  getModels: {
    name: "Get Database Models",
    url: "models/:database",
    authRequired: true,
    entityRef: "getModels",
    reqMethod: "get",
    controllerRef: "getModels"
  },
  //done
  getDatabaseModels: {
    name: "Get database Models",
    url: "data/:database/:model",
    authRequired: true,
    entityRef: "getDatabaseModels",
    reqMethod: "get",
    controllerRef: "getDatabaseModels"
  },
  //done
  getDatabaseModelRow: {
    name: "Get Database Model Row by id ",
    url: "data/:database/:model/:id",
    authRequired: true,
    entityRef: "getDatabaseModelRow",
    reqMethod: "get",
    controllerRef: "getDatabaseModelRow"
  },
  
  postDatabaseModel: {
    name: "Create row in model",
    url: "data/:database/:model",
    authRequired: true,
    entityRef: "postDatabaseModel",
    reqMethod: "post",
    controllerRef: "postDatabaseModel"
  },
  putDatabaseModel: {
    name: "Update model",
    url: "data/:database/:model/:id",
    authRequired: true,
    entityRef: "putDatabaseModel",
    reqMethod: "put",
    controllerRef: "putDatabaseModel"
  },
  //done
  putUpdateStatus: {
    name: "Update Status",
    url: "data/:database/:model/status/:id",
    authRequired: true,
    entityRef: "putUpdateStatus",
    reqMethod: "put",
    controllerRef: "putUpdateStatus"
  },
  //done
  patchDatabaseModel: {
    name: "Delete Database Model",
    url: "data/:database/:model/:id",
    authRequired: true,
    entityRef: "patchDatabaseModel",
    reqMethod: "patch",
    controllerRef: "patchDatabaseModel"
  },
  //test communication
  postTestCommunication: {
    name: "Test communication",
    url: "communication/test/:commType",
    authRequired: false,
    entityRef: "postTestCommunication",
    reqMethod: "post",
    controllerRef: "postTestCommunication"
  }
};
export default _systemRoutesRegistry;
