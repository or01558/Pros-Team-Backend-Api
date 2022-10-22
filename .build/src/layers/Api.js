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
  default: () => Api
});
var import_Layer = __toModule(require("../classes/Layer.js"));
class Api extends import_Layer.default {
  selfCall = (data, req, res, next) => {
    const apiKey = req.headers["pros-team-api-key"];
    if (!apiKey)
      return res.status(400).send({ message: "Missing Access", reason: "No Api Access", requested: "Api Access", provided: "None Api Key", status: 400 });
    if (typeof apiKey === "string" && !data.api.hasAccess(apiKey)) {
      return res.status(403).json({ message: "Missing Access", reason: "No Api Access", requested: "Api Access", provided: "Invalid Api Key", status: 403 });
    }
    ;
    next();
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Api.js.map
