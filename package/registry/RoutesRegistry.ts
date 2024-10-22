import _systemRoutesRegistry from "../modules/_system/routes.registry";

const RoutesRegistry = {
  getTables: {
    title: "Get database tables",
    url: "getAllTables/:database",
    authRequired: false,
    entityRef: "getTables",
    reqMethod: "get",
    controllerRef: "getTables",
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
      "summary": "Get all table in databse",
      "description": "Get all table in databse",
      "operationId": "GetDatabaseTables",
      "parameters": [
        {
          "name": "database",
          "in": "path",
          "description": "Name of the database",
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
                    "type": "object"
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
                "GetTables": {
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
                "type": "object"
              }
            },
            "examples": {
              "GetTables": {
                "message": "Error to fetch tables"
              }
            }
          }
        }
      }
    }    
  },
  getColumns: {
    title: "Get all attributes of table",
    url: "wrappidall",
    authRequired: false,
    entityRef: "getColumns",
    reqMethod: "get",
    controllerRef: "getColumns",
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
      "summary": "Get all attributes in table",
      "description": "Get all attributes in table",
      "operationId": "GetTableAttributes",
   
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
                "GetTableAttributes": {
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
                "type": "object"
              }
            },
            "examples": {
              "GetTableAttributes": {
                "message": "Error to fetch attributes"
              }
            }
          }
        }
      }
    }
  },
  ..._systemRoutesRegistry
};
export default RoutesRegistry;
