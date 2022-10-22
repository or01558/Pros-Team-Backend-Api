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
  default: () => Analizier
});
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
var import_Layer = __toModule(require("../classes/Layer.js"));
var import_Resources = __toModule(require("../rest/resources/Resources.js"));
var import_node_rsa = __toModule(require("node-rsa"));
const __dirname = process.cwd();
class Analizier extends import_Layer.default {
  selfCall = (data, req, res, next) => {
    const body = req.body;
    const { userId, requestData } = body;
    let resourceData = null;
    if (data.format === "json") {
      if (!userId && (0, import_Resources.isUserResource)(req.path)) {
        return res.status(403).json({ message: "Missing Access", reason: "Client not logged in", requested: "user resource", provided: "none token", status: 403 });
      }
      ;
      if (req.headers["content-type"] !== "application/json")
        return res.status(415).json({ message: "Not A Json Format", reason: "Server dosen't know this format", requested: "api resource", provided: "invalid content type", status: 415 });
      if (req.method !== "GET" && !requestData)
        return res.status(400).json({ message: "Server Failed", reason: "Can't analize the request", requested: "none get request", provided: "none request data", status: 400 });
      if (req.method !== "GET") {
        const privateKey = new import_node_rsa.default(import_fs.default.readFileSync(import_path.default.resolve(__dirname, "../server.key")), "private");
        const encrypted = data.decrypt(requestData);
        const json = privateKey.decrypt(encrypted).toString();
        resourceData = JSON.parse(json);
        req.resourceData = resourceData;
        this.request = req;
        this.response = res;
        this.finish();
      }
      ;
      this.request = req;
      this.response = res;
      this.finish();
      next();
    } else {
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Analizer.js.map
