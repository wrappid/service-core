const _systemRoutesRegistry = {
  getVersion: {
    name: "Get Version API",
    url: "version",
    authRequired: false,
    entityRef: "getVersion",
    reqMethod: "get",
    controllerRef: "getVersion",
    system: true
  },
  getDatabaseTables: {
    name: "Get Database Tables",
    url: "business/tables/:database",
    authRequired: true,
    entityRef: "getDatabaseTables",
    reqMethod: "get",
    controllerRef: "getDatabaseTables",
    system: true
  },
  getAttributes: {
    name: "Get Table Attributes",
    url: "business/tables/attributes/:database/:table",
    authRequired: true,
    entityRef: "getAttributes",
    reqMethod: "get",
    controllerRef: "getAttributes",
    system: true
  },
  getBusinessEntityColumns: {
    name: "Get Entity",
    url: "noauth/business/columns/:entity",
    authRequired: false,
    entityRef: "getBusinessEntityColumns",
    reqMethod: "get",
    controllerRef: "getBusinessEntityColumns",
    system: true
  },
  getBusinessEntities: {
    name: "Get Business Entities",
    url: "business/entities",
    authRequired: true,
    entityRef: "getBusinessEntities",
    reqMethod: "get",
    controllerRef: "getBusinessEntities",
    system: true
  },
  getEntityData: {
    name: "Get Entity Count",
    url: "business/count/:entity",
    authRequired: true,
    entityRef: "getEntityData",
    reqMethod: "get",
    controllerRef: "getEntityData",
    system: true
  },
  getIndividualEntityData: {
    name: "Get Individual EntityData",
    url: "business/individual/:entity",
    authRequired: true,
    entityRef: "getIndividualEntityData",
    reqMethod: "get",
    controllerRef: "getIndividualEntityData",
    system: true
  },
  getAllEntityData: {
    name: "Get All Entity Data",
    url: "business/all/:entity",
    authRequired: true,
    entityRef: "getAllEntityData",
    reqMethod: "get",
    controllerRef: "getAllEntityData",
    system: true
  },
  noAuthGetAllEntityData: {
    name: "No Auth Get All Entity Data",
    url: "noauth/business/all/:entity",
    authRequired: false,
    entityRef: "noAuthGetAllEntityData",
    reqMethod: "get",
    controllerRef: "noAuthGetAllEntityData",
    system: true
  },
  getNoAuthFormSchema: {
    name: "Get No Auth Form Schema",
    url: "noauth/formSchema/:formID",
    authRequired: false,
    entityRef: "getNoAuthFormSchema",
    reqMethod: "get",
    controllerRef: "getNoAuthFormSchema",
    system: true
  },
  getFormSchema: {
    name: "Form Schema",
    url: "formSchema/:formID",
    authRequired: true,
    entityRef: "formSchema",
    reqMethod: "get",
    controllerRef: "getFormSchema",
    system: true
  },
  getSettingMeta:{
    name: "Setting Meta",
    url: "settingMeta",
    authRequired: true,
    entityRef: "settingMeta",
    reqMethod: "get",
    controllerRef: "getSettingMeta",
    system: true
  },
  getModels: {
    name: "Get Database Models",
    url: "models/:database",
    authRequired: true,
    entityRef: "getModels",
    reqMethod: "get",
    controllerRef: "getModels",
    system: true
  },
  getDatabaseModels: {
    name: "Get database Models",
    url: "data/:model",
    authRequired: true,
    entityRef: "getDatabaseModels",
    reqMethod: "get",
    controllerRef: "getDatabaseModels",
    system: true
  },
  getDatabaseModelRow: {
    name: "Get Database Model Row by id ",
    url: "data/:model/:id",
    authRequired: true,
    entityRef: "getDatabaseModelRow",
    reqMethod: "get",
    controllerRef: "getDatabaseModelRow",
    system: true
  },
  postDatabaseModel: {
    name: "Create row in model",
    url: "data/:model",
    authRequired: true,
    entityRef: "postDatabaseModel",
    reqMethod: "post",
    controllerRef: "postDatabaseModel",
    system: true
  },
  putDatabaseModel: {
    name: "Update model",
    url: "data/:model/:id",
    authRequired: true,
    entityRef: "putDatabaseModel",
    reqMethod: "put",
    controllerRef: "putDatabaseModel",
    system: true
  },
  putUpdateStatus: {
    name: "Update Status",
    url: "data/:model/status/:id",
    authRequired: true,
    entityRef: "putUpdateStatus",
    reqMethod: "put",
    controllerRef: "putUpdateStatus",
    system: true
  },
  patchDatabaseModel: {
    name: "Delete Database Model",
    url: "data/:model/:id",
    authRequired: true,
    entityRef: "patchDatabaseModel",
    reqMethod: "PATCH",
    controllerRef: "patchDatabaseModel",
    system: true
  },
  postTestCommunication: {
    name: "Test communication",
    url: "communication/test/:commType",
    authRequired: false,
    entityRef: "postTestCommunication",
    reqMethod: "post",
    controllerRef: "postTestCommunication",
    system: true
  },
  //Get Registry data
  getRegistry: {
    name: "Get Registry Data",
    url: "registry/:name",
    authRequired: false,
    entityRef: "getRegistry",
    reqMethod: "get",
    controllerRef: "getRegistry",
    system: true
  },
  getRegistryList: {
    name: "Get Registry list",
    url: "regitry/list",
    authRequired: false,
    entityRef: "getRegistryList",
    reqMethod: "get",
    controllerRef: "getRegistryList",
    system: true
  },
  //clone 
  postCloneDataModel: {
    name: "Clone data model",
    url: "data/clone/:model/:entityRef",
    authRequired: true,
    entityRef: "postCloneDataModel",
    reqMethod: "post",
    controllerRef: "postCloneDataModel",
    system: true
  },
  postDataModelSync: {
    name: "Post data model sync",
    url: "data/sync/:model",
    authRequired: false,
    entityRef: "postDataModelSync",
    reqMethod: "post",
    controllerRef: "postDataModelSync",
    system: true
  }
};
export default _systemRoutesRegistry;
