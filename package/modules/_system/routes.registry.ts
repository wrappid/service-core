const _systemRoutesRegistry = {
  getVersion: {
    name: "Get Version API",
    url: "version",
    authRequired: false,
    entityRef: "getVersion",
    reqMethod: "get",
    controllerRef: "getVersion",
  },
};
export default _systemRoutesRegistry;
