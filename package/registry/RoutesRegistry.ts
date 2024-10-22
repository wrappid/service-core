import _systemRoutesRegistry from "../modules/_system/routes.registry";

const RoutesRegistry = {
  getTables: {
    title: "Get database table",
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
    }
  },
  getColumns: {
    title: "Get all",
    url: "wrappidall",
    authRequired: false,
    entityRef: "getColumns",
    reqMethod: "get",
    controllerRef: "getColumns",
    system: true,
    swaggerJson: {
      "tags": [
        "service-core"
      ]
    }
  },
  ..._systemRoutesRegistry
};
export default RoutesRegistry;
