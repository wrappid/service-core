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
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "getVersion": {
                  "value": {
                    "message": "Get Version API call Sucessfully"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "getVersion": {
                  "value": {
                    "message": "Error to fetch version"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Get Database Tables",
      "description": "Get Database Tables",
      "operationId": "GetDatabaseTables",
      "parameters": [
        {
          "name": "database",
          "in": "path",
          "description": "Database name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "data": {
                    "type": "object",
                    "properties": {
                      "rows": {
                        "type": "array",
                        "xml": {
                          "wrapped": true
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "totalRecords": {
                        "type": "integer"
                      }
                    }
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "data": {
                      "rows": [
                        {
                          "id": "****",
                          "name": "****"
                        }
                      ],
                      "totalRecords": 1
                    },
                    "message": "Tables fetched successfully"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized Access!!"
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "message": "Error to fetch tables"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Get Table Attributes",
      "description": "Get Table Attributes",
      "operationId": "GetTableAttributes",
      "parameters": [
        {
          "name": "database",
          "in": "path",
          "description": "Database name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "table",
          "in": "path",
          "description": "table name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "data": {
                    "type": "object",
                    "properties": {
                      "entity": {
                        "type": "string"
                      },
                      "rows": {
                        "type": "array",
                        "xml": {
                          "wrapped": true
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "totalRecords": {
                        "type": "integer"
                      }
                    }
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetTablesAttributes": {
                  "value": {
                    "data": {
                      "entity": "****",
                      "rows": [
                        {
                          "id": "****",
                          "name": "****"
                        }
                      ],
                      "totalRecords": 1
                    },
                    "message": "Tables fetched successfully"
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized Access!!"
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "message": "Error to fetch tables"
                  }
                }
              }
            }
          }
        }
      },
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
      ],
      "summary": "No Auth Business Entity Columns",
      "description": "No Auth Business Entity Columns",
      "operationId": "NoAuthBusinessEntityColumns",
      "parameters": [
        {
          "name": "entity",
          "in": "path",
          "description": "Entity name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "data": {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "array",
                        "xml": {
                          "wrapped": true
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "label": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "totalRecords": {
                        "type": "integer"
                      }
                    }
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetTablesAttributes": {
                  "value": {
                    "data": [
                      {
                        "id": "****",
                        "name": "****",
                        "type": "***"
                      }
                    ],
                    "message": "Business entity columns found successfully"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseTables": {
                  "value": {
                    "error": "Error: Entity is missing",
                    "message": "Something went wrong"
                  }
                }
              }
            }
          }
        }
      }
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
      ],    "summary": "Get Business Entity Count",
      "description": "Get Business Entity Count",
      "operationId": "GetBusinessEntityCount",
      "parameters": [
        {
          "name": "entity",
          "in": "path",
          "description": "Entity Name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "data": {
                    "type": "integer"
                  },
                  "totalRecords": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetBusinessEntityCount": {
                  "value": {
                    "data": "*",
                    "message": "Business entity columns found successfully"
                  }
                }
              }
            }
          }
        },
        "204": {
          "description": "No Content",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "data": {
                    "type": "integer"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetBusinessEntityCount": {
                  "value": {
                    "data": 0,
                    "message": "No entity found"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetBusinessEntityCount": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetBusinessEntityCount": {
                  "value": {
                    "error": "****",
                    "message": "Something went wrong"
                  }
                }
              }
            }
          }
        }
      },
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
      ],        "summary": "Get Individual EntityData",
      "description": "Get Individual EntityData",
      "operationId": "GetIndividualEntityData",
      "parameters": [
        {
          "name": "entity",
          "in": "path",
          "description": "Entity Name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "object"
                      },
                      "entity": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "examples": {
                "GetIndividualEntityData": {
                  "value": {
                    "message": "Entity data found successfully",
                    "data": {
                      "data": {},
                      "entity": "**"
                    }
                  }
                }
              }
            }
          }
        },
        "204": {
          "description": "No Content",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetIndividualEntityData": {
                  "value": {
                    "message": "Entity not found on the request"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetIndividualEntityData": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetIndividualEntityData": {
                  "value": {
                    "error": "****",
                    "message": "Something went wrong"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Get All Entity Data",
      "description": "Get All Entity Data",
      "operationId": "GetAllEntityData",
      "parameters": [
        {
          "name": "entity",
          "in": "path",
          "description": "Entity Name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "entity": {
                        "type": "string"
                      },
                      "columns": {
                        "type": "array"
                      },
                      "rows": {
                        "type": "array"
                      },
                      "totalRecords": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "examples": {
                "GetIndividualEntityData": {
                  "value": {
                    "message": "Entity data found successfully",
                    "data": {
                      "entity": "****",
                      "columns": "[]",
                      "rows": "[]",
                      "totalRecords": "*"
                    }
                  }
                }
              }
            }
          }
        },
        "204": {
          "description": "No Content",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetAllEntityData": {
                  "value": {
                    "message": "Entity is missing"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetAllEntityData": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetAllEntityData": {
                  "value": {
                    "error": "****",
                    "message": "Something went wrong"
                  }
                }
              }
            }
          }
        }
      },
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
      ],
      "summary": "No Auth Get All Entity Data",
      "description": "No Auth Get All Entity Data",
      "operationId": "NoAuthGetAllEntityData",
      "parameters": [
        {
          "name": "entity",
          "in": "path",
          "description": "Entity Name to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "entity": {
                        "type": "string"
                      },
                      "columns": {
                        "type": "array"
                      },
                      "rows": {
                        "type": "array"
                      },
                      "totalRecords": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "examples": {
                "NoAuthGetAllEntityData": {
                  "value": {
                    "message": "Entity data found successfully",
                    "data": {
                      "entity": "****",
                      "columns": "[]",
                      "rows": "[]",
                      "totalRecords": "*"
                    }
                  }
                }
              }
            }
          }
        },
        "204": {
          "description": "No Content",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "NoAuthGetAllEntityData": {
                  "value": {
                    "message": "Entity is missing"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "NoAuthGetAllEntityData": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "NoAuthGetAllEntityData": {
                  "value": {
                    "error": "****",
                    "message": "Something went wrong"
                  }
                }
              }
            }
          }
        }
      }
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
      ],
      "summary": "Get Form Schema",
      "description": "Get Form Schema",
      "operationId": "GetFormSchema",
      "parameters": [
        {
          "name": "formID",
          "in": "path",
          "description": "FormID to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "data": {
                    "type": "array"
                  },
                  "formID": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetFormSchema": {
                  "value": {
                    "message": "Entity data found successfully",
                    "data": "***",
                    "formID": "***"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetFormSchema": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetFormSchema": {
                  "value": {
                    "error": "****",
                    "message": "Something went wrong"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Get Form Schema",
      "description": "Get Form Schema",
      "operationId": "GetFormSchema",
      "parameters": [
        {
          "name": "formID",
          "in": "path",
          "description": "FormID to return",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "data": {
                    "type": "array"
                  },
                  "formID": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetFormSchema": {
                  "value": {
                    "message": "Entity data found successfully",
                    "data": "***",
                    "formID": "***"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetFormSchema": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetFormSchema": {
                  "value": {
                    "error": "****",
                    "message": "Something went wrong"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Get Database Models",
      "description": "Get Database Models",
      "operationId": "GetModels",
      "parameters": [
        {
          "name": "model",
          "in": "path",
          "description": "Databse name for show models",
          "required": false,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "data": {
                    "type": "array"
                  },
                  "totalRecords": {
                    "type": "number"
                  }
                }
              },
              "examples": {
                "GetModels": {
                  "value": {
                    "message": "Models fetched successfully",
                    "data": [
                      {
                        "id": 1,
                        "name": "ApiRequestLogs"
                      },
                      {
                        "id": 2,
                        "name": "CronSchemas"
                      },
                      {
                        "id": 3,
                        "name": "Routes"
                      },
                      {
                        "id": 4,
                        "name": "Pages"
                      },
                      {
                        "id": 5,
                        "name": "Applications"
                      }
                    ],
                    "totalRecords": 5
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetFormSchema": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetSettingMeta": {
                  "value": {
                    "message": "Error to fetch models"
                  }
                }
              }
            }
          }
        }
      },
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
      ], "summary": "Not in use!!",
      "description": "Not in use!!",
      "operationId": "getModels",
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
      "summary": "Get Database Model Row by id",
      "description": "Get Database Model Row by id",
      "operationId": "GetDatabaseModelRow",
      "parameters": [
        {
          "name": "model",
          "in": "path",
          "description": "Model name for get data",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "id",
          "in": "path",
          "description": "id for get data",
          "required": true,
          "schema": {
            "type": "integer"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "data": {
                    "type": "object"
                  }
                }
              },
              "examples": {
                "GetDatabaseModelRow": {
                  "value": {
                    "message": "Data fetched successfully",
                    "data": {
                      "id": 1,
                      "email": "john@wrappid.com",
                      "phone": "988888888",
                      "password": "$2bGDWfxe2GGFW",
                      "deletedBy": "null",
                      "createdBy": "null",
                      "updatedBy": "null"
                    }
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseModelRow": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "integer"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "GetDatabaseModelRow": {
                  "value": {
                    "error": "****",
                    "message": "Error to fetch data from model"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Create row in model",
      "description": "Create row in model",
      "operationId": "PostDatabaseModel",
      "parameters": [
        {
          "name": "model",
          "in": "path",
          "description": "Model name for create data",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "requestBody": {
        "description": "Create row in model",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "dataKey": {
                  "type": "string",
                  "example": "dataValue"
                }
              }
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  },
                  "entity": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PostDatabaseModel": {
                  "value": {
                    "entity": "model",
                    "message": "<modelName> created successfully"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PostDatabaseModel": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PostDatabaseModel": {
                  "value": {
                    "error": "****",
                    "message": "Error to create data"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Update model data",
      "description": "Update model data",
      "operationId": "PutDatabaseModel",
      "parameters": [
        {
          "name": "model",
          "in": "path",
          "description": "Model name for get data",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "id",
          "in": "path",
          "description": "id name for get data",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "requestBody": {
        "description": "Update data model",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "dataKey": {
                  "type": "string",
                  "example": "dataValue"
                }
              }
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "entity": {
                    "type": "string"
                  },
                  "data": {
                    "type": "object"
                  }
                }
              },
              "examples": {
                "PutDatabaseModel": {
                  "value": {
                    "entity": "<modelName>",
                    "message": "<modelName> updated successfully"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PutDatabaseModel": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "integer"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PutDatabaseModel": {
                  "value": {
                    "entity": "<modelName>",
                    "error": "<errorMessage>",
                    "message": "Error to update <modelName>"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Update status of data",
      "description": "Update status of data",
      "operationId": "PutUpdateStatus",
      "parameters": [
        {
          "name": "model",
          "in": "path",
          "description": "Model name for get data",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "id",
          "in": "path",
          "description": "id for get data",
          "required": true,
          "schema": {
            "type": "integer"
          }
        }
      ],
      "requestBody": {
        "description": "Update status",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "comment": {
                  "type": "string"
                },
                "nextStatus": {
                  "type": "string"
                },
                "requestTime": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "PutUpdateStatus": {
                "comment": "Changes",
                "nextStatus": "published",
                "requestTime": "500"
              }
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PutUpdateStatus": {
                  "value": {
                    "message": "Status updated successfully"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PutUpdateStatus": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "integer"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PutUpdateStatus": {
                  "value": {
                    "error": "<errorMessage>"
                  }
                }
              }
            }
          }
        }
      },
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
      "summary": "Delete Database Model",
      "description": "Delete Database Model",
      "operationId": "PatchDatabaseModel",
      "parameters": [
        {
          "name": "model",
          "in": "path",
          "description": "Model name for delete data",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "id",
          "in": "path",
          "description": "id for delete data",
          "required": true,
          "schema": {
            "type": "integer"
          }
        }
      ],
      "requestBody": {
        "description": "Update status",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "comment": {
                  "type": "string"
                },
                "nextStatus": {
                  "type": "string"
                },
                "requestTime": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "PatchDatabaseModel": {
                "comment": "Changes",
                "nextStatus": "published",
                "requestTime": "500"
              }
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PatchDatabaseModel": {
                  "value": {
                    "entity": "<modelName>",
                    "message": "<modelName> deleted successfully"
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PatchDatabaseModel": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "integer"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PatchDatabaseModel": {
                  "value": {
                    "error": "<errorMessage>"
                  }
                }
              }
            }
          }
        }
      },
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
      ],
      "summary": "Test Communication",
      "description": "Test Communication",
      "operationId": "PostTestCommunication",
      "parameters": [
        {
          "name": "commType",
          "in": "path",
          "description": "Communication type name",
          "required": true,
          "schema": {
            "type": "string",
            "default": "phone",
            "enum": [
              "phone",
              "email",
              "whatsapp"
            ]
          }
        }
      ],
      "requestBody": {
        "description": "Update status",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "data": {
                  "type": "string",
                  "example": "john@wrappid.com"
                }
              }
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Successful operation",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PostTestCommunication": {
                  "value": {
                    "message": "OTP <commType> sent successfully."
                  }
                }
              }
            }
          }
        },
        "404": {
          "description": "Request API Not Found!!"
        },
        "403": {
          "description": "Forbidden!!",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string"
                  }
                }
              },
              "examples": {
                "PostTestCommunication": {
                  "value": {
                    "message": "Invalid request"
                  }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "integer"
                  }
                }
              },
              "examples": {
                "PostTestCommunication": {
                  "value": {
                    "error": "<errorMessage>"
                  }
                }
              }
            }
          }
        }
      },
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
