var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var import_dotenv = __toModule(require("dotenv"));
var import_src = __toModule(require("./Data-Structures/src/index.js"));
var import_Server = __toModule(require("./src/classes/Server.js"));
var import_ServerRouter = __toModule(require("./src/classes/ServerRouter.js"));
var import_Generator = __toModule(require("./src/generators/Generator.js"));
var import_Analizer = __toModule(require("./src/layers/Analizer.js"));
var import_Api = __toModule(require("./src/layers/Api.js"));
var import_Connection = __toModule(require("./src/layers/Connection.js"));
var import_Database = __toModule(require("./src/layers/Database.js"));
var import_RESTApi = __toModule(require("./src/rest/RESTApi.js"));
var import_testDatabase = __toModule(require("./testDatabase.js"));
const { List } = import_src.default;
(0, import_dotenv.config)();
const server = new import_Server.default(new import_RESTApi.default(import_Generator.default.KeyGen.generate()));
const whitelist = server.getWhitelist();
const ips = [];
if (whitelist)
  whitelist.forEach((v) => {
    if (v == null)
      return;
    if (ips.length == 0)
      ips.unshift(v);
    else
      ips.push(v);
  });
server.setPort(5e3);
server.setWhitelist(new List().add(process.env.webServer || null).add(process.env.appServer || null));
server.setPolicy(import_Server.Policies.Private);
server.setCorsPolicy({ origin: ips.length == 0 ? "*" : ips, methods: ["GET", "POST", "DELETE", "PUT"], credentials: true, maxAge: 120, preflightContinue: true, optionsSuccessStatus: 200 });
server.listen(() => {
  server.addLayer("*", import_Server.Layers.Connection, new import_Connection.default());
  server.addLayer("*", import_Server.Layers.RESTApi, new import_Api.default());
  server.addLayer("*", import_Server.Layers.Database, new import_Database.default());
  server.addLayer("*", import_Server.Layers.Analizier, new import_Analizer.default());
  server.setRouter(new import_ServerRouter.default(server.getRESTApi(), import_Server.Layers.Analizier));
  import_Server.default.Database.get().connect(() => {
    (0, import_testDatabase.default)();
    server.run();
  });
});
//# sourceMappingURL=index.js.map
