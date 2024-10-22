const _systemRoutesRegistry = {
  getVersion: {
    title: "Get Version API",
    url: "version",
    authRequired: false,
    entityRef: "getVersion",
    reqMethod: "get",
    controllerRef: "getVersion",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
    }
  },
  getDatabases:{
    title: "Get Databases",
    url: "business/databases",
    authRequired: true,
    entityRef: "getDatabases",
    reqMethod: "get",
    controllerRef: "getDatabases",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getDatabaseTables: {
    title: "Get Database Tables",
    url: "business/tables/:database",
    authRequired: true,
    entityRef: "getDatabaseTables",
    reqMethod: "get",
    controllerRef: "getDatabaseTables",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getAttributes: {
    title: "Get Table Attributes",
    url: "business/tables/attributes/:database/:table",
    authRequired: true,
    entityRef: "getAttributes",
    reqMethod: "get",
    controllerRef: "getAttributes",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getBusinessEntityColumns: {
    title: "Get Entity",
    url: "noauth/business/columns/:entity",
    authRequired: false,
    entityRef: "getBusinessEntityColumns",
    reqMethod: "get",
    controllerRef: "getBusinessEntityColumns",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  },
  getBusinessEntities: {
    title: "Get Business Entities",
    url: "business/entities",
    authRequired: true,
    entityRef: "getBusinessEntities",
    reqMethod: "get",
    controllerRef: "getBusinessEntities",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getEntityData: {
    title: "Get Entity Count",
    url: "business/count/:entity",
    authRequired: true,
    entityRef: "getEntityData",
    reqMethod: "get",
    controllerRef: "getEntityData",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getIndividualEntityData: {
    title: "Get Individual EntityData",
    url: "business/individual/:entity",
    authRequired: true,
    entityRef: "getIndividualEntityData",
    reqMethod: "get",
    controllerRef: "getIndividualEntityData",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getAllEntityData: {
    title: "Get All Entity Data",
    url: "business/all/:entity",
    authRequired: true,
    entityRef: "getAllEntityData",
    reqMethod: "get",
    controllerRef: "getAllEntityData",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  noAuthGetAllEntityData: {
    title: "No Auth Get All Entity Data",
    url: "noauth/business/all/:entity",
    authRequired: false,
    entityRef: "noAuthGetAllEntityData",
    reqMethod: "get",
    controllerRef: "noAuthGetAllEntityData",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  },
  getNoAuthFormSchema: {
    title: "Get No Auth Form Schema",
    url: "noauth/formSchema/:formID",
    authRequired: false,
    entityRef: "getNoAuthFormSchema",
    reqMethod: "get",
    controllerRef: "getNoAuthFormSchema",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  },
  getFormSchema: {
    title: "Form Schema",
    url: "formSchema/:formID",
    authRequired: true,
    entityRef: "formSchema",
    reqMethod: "get",
    controllerRef: "getFormSchema",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getSettingMeta:{
    title: "Setting Meta",
    url: "settingMeta",
    authRequired: true,
    entityRef: "settingMeta",
    reqMethod: "get",
    controllerRef: "getSettingMeta",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getModels: {
    title: "Get Database Models",
    url: "models/:database",
    authRequired: true,
    entityRef: "getModels",
    reqMethod: "get",
    controllerRef: "getModels",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getDatabaseModels: {
    title: "Get database Models",
    url: "data/:model",
    authRequired: true,
    entityRef: "getDatabaseModels",
    reqMethod: "get",
    controllerRef: "getDatabaseModels",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  getDatabaseModelRow: {
    title: "Get Database Model Row by id ",
    url: "data/:model/:id",
    authRequired: true,
    entityRef: "getDatabaseModelRow",
    reqMethod: "get",
    controllerRef: "getDatabaseModelRow",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  postDatabaseModel: {
    title: "Create row in model",
    url: "data/:model",
    authRequired: true,
    entityRef: "postDatabaseModel",
    reqMethod: "post",
    controllerRef: "postDatabaseModel",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  putDatabaseModel: {
    title: "Update model",
    url: "data/:model/:id",
    authRequired: true,
    entityRef: "putDatabaseModel",
    reqMethod: "put",
    controllerRef: "putDatabaseModel",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  putUpdateStatus: {
    title: "Update Status",
    url: "data/:model/status/:id",
    authRequired: true,
    entityRef: "putUpdateStatus",
    reqMethod: "put",
    controllerRef: "putUpdateStatus",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  patchDatabaseModel: {
    title: "Delete Database Model",
    url: "data/:model/:id",
    authRequired: true,
    entityRef: "patchDatabaseModel",
    reqMethod: "PATCH",
    controllerRef: "patchDatabaseModel",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  postTestCommunication: {
    title: "Test communication",
    url: "communication/test/:commType",
    authRequired: false,
    entityRef: "postTestCommunication",
    reqMethod: "post",
    controllerRef: "postTestCommunication",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  },
  //Get Registry data
  getRegistry: {
    title: "Get Registry Data",
    url: "registry/:title",
    authRequired: false,
    entityRef: "getRegistry",
    reqMethod: "get",
    controllerRef: "getRegistry",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  },
  getRegistryList: {
    title: "Get Registry list",
    url: "regitry/list",
    authRequired: false,
    entityRef: "getRegistryList",
    reqMethod: "get",
    controllerRef: "getRegistryList",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  },
  //clone 
  postCloneDataModel: {
    title: "Clone data model",
    url: "data/clone/:model/:entityRef",
    authRequired: true,
    entityRef: "postCloneDataModel",
    reqMethod: "post",
    controllerRef: "postCloneDataModel",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ],
      "security": [
        {
          "bearerAuth": [
            "jwtbearer"
          ]
        }
      ],
    }
  },
  postDataModelSync: {
    title: "Post data model sync",
    url: "data/sync/:model",
    authRequired: false,
    entityRef: "postDataModelSync",
    reqMethod: "post",
    controllerRef: "postDataModelSync",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  }
};
export default _systemRoutesRegistry;
