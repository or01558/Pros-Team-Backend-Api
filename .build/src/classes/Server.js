var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  Constants: () => Constants,
  Layers: () => Layers,
  Policies: () => Policies,
  default: () => Server
});
var import_express = __toModule(require("express"));
var import_cors = __toModule(require("cors"));
var import_helmet = __toModule(require("helmet"));
var import_body_parser = __toModule(require("body-parser"));
var import_src = __toModule(require("../../Data-Structures/src/index.js"));
var import_Database = __toModule(require("../rest/database/Database.js"));
var import_Network = __toModule(require("./Network.js"));
var Policies;
(function(Policies2) {
  Policies2["Private"] = "private";
  Policies2["None"] = "Not Defined";
})(Policies || (Policies = {}));
var Layers;
(function(Layers2) {
  Layers2["Connection"] = "connection";
  Layers2["RESTApi"] = "api";
  Layers2["Database"] = "database";
  Layers2["Analizier"] = "analizing";
})(Layers || (Layers = {}));
var Constants;
(function(Constants2) {
  Constants2[Constants2["Default_Port"] = process.env.DEFAULT_PORT ? parseInt(process.env.DEFAULT_PORT) : 80] = "Default_Port";
})(Constants || (Constants = {}));
class Server {
  static Database;
  expressApp;
  restApi;
  router;
  port;
  whitelist;
  policy;
  corsPolicy;
  static layers;
  static createLayer(type) {
    const With = Server.layers.findOne((v) => (v == null ? void 0 : v.type) === type);
    return With ? With.layer : null;
  }
  constructor(restApi, port) {
    Server.Database = new import_Database.default(new import_Database.default.Client());
    Server.layers = new import_src.default.List();
    this.expressApp = (0, import_express.default)();
    this.restApi = restApi;
    this.port = port || -1;
    this.whitelist = null;
    this.policy = Policies.None;
    this.corsPolicy = {};
    this.getRESTApi.bind(this);
    this.getRouter.bind(this);
    this.getPort.bind(this);
    this.getWhitelist.bind(this);
    this.getPolicy.bind(this);
    this.getCorsPolicy.bind(this);
    this.setRouter.bind(this);
    this.setPort.bind(this);
    this.setWhitelist.bind(this);
    this.setPolicy.bind(this);
    this.setCorsPolicy.bind(this);
    this.listen.bind(this);
    this.addLayer.bind(this);
    this.#onLayerFinished.bind(this);
    this.run.bind(this);
    this.verifyIp.bind(this);
  }
  getRESTApi() {
    return this.restApi;
  }
  getRouter() {
    return this.router;
  }
  getPort() {
    return this.port;
  }
  getWhitelist() {
    return this.whitelist;
  }
  getPolicy() {
    return this.policy;
  }
  getCorsPolicy() {
    return this.corsPolicy;
  }
  setRouter(router) {
    this.#onLayerFinished(router.getLayer(), router.run);
    this.router = router;
  }
  setPort(port = Constants.Default_Port) {
    this.port = port;
  }
  setWhitelist(list) {
    this.whitelist = list;
  }
  setPolicy(policy) {
    this.policy = policy;
  }
  setCorsPolicy(corsPolicy) {
    this.corsPolicy = corsPolicy;
  }
  listen(callback, port = Constants.Default_Port) {
    if (port && this.port == -1)
      this.setPort(port);
    if (!this.port)
      throw new Error("ProsTeam ServerERROR: None Port has Provided!");
    this.expressApp.use(import_body_parser.default.urlencoded({ extended: false }));
    this.expressApp.use(import_body_parser.default.json());
    this.expressApp.use((0, import_helmet.default)());
    this.expressApp.use((0, import_cors.default)(this.corsPolicy));
    this.expressApp.use(this.verifyIp);
    this.expressApp.disable("x-powered-by");
    this.expressApp.enable("trust proxy");
    callback == null ? void 0 : callback(this);
  }
  addLayer(For, Type, Layer2) {
    Server.layers.add({ type: Type, layer: Layer2 });
    const network = new import_Network.default();
    this.expressApp.use(For, (req, res, next) => {
      if (Type === Layers.Connection) {
        network.createNew(Type, Layer2).pass({ socket: req.socket }, req, res, next);
      } else if (Type === Layers.RESTApi) {
        network.createNew(Type, Layer2).pass({ api: this.restApi }, req, res, next);
      } else if (Type === Layers.Database) {
        network.createNew(Type, Layer2).pass({ database: Server.Database }, req, res, next);
      } else if (Type === Layers.Analizier) {
        network.createNew(Type, Layer2).pass({ decrypt: this.restApi.decrypt, format: "json" }, req, res, next);
      }
      ;
    });
  }
  #onLayerFinished(type, run) {
    const Network_Layer = Server.layers.findOne((nl) => (nl == null ? void 0 : nl.type) === type);
    if (Network_Layer)
      Network_Layer.layer.on("finish", (app, request, response, next) => {
        run(app, request, response, next);
      });
  }
  run(callback) {
    if (this.port == -1)
      throw new Error("ProsTeam ServerERROR: None Port has Provided!");
    const server = this.expressApp.listen(this.port, () => {
      if (callback)
        callback(this);
    });
    server.keepAliveTimeout = 60 * 1e3 + 1e3;
    server.headersTimeout = 60 * 1e3 + 2e3;
  }
  verifyIp = (req, res, next) => {
    console.log("verifing ip");
    const ip = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"][0] : req.socket.remoteAddress;
    console.log("ip verified");
    next();
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Constants,
  Layers,
  Policies
});
//# sourceMappingURL=Server.js.map
