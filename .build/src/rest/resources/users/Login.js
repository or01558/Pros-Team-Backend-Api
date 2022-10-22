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
  default: () => Login
});
var import_RequestHandler = __toModule(require("../../../classes/RequestHandler"));
var import_Server = __toModule(require("../../../classes/Server"));
var import_UserObject = __toModule(require("../../database/objects/users/UserObject"));
class Login extends import_RequestHandler.default {
  constructor(requset, response, next) {
    super(requset, response, next);
  }
  getDataKeys() {
    return ["username", "password"];
  }
  validateRequestData(requestData) {
    const DATA_KEYS = this.getDataKeys();
    for (const key of DATA_KEYS) {
      if (!requestData[key])
        return this.response.status(404);
      if (typeof requestData[key] !== "string")
        return this.response.status(404);
    }
    ;
    return true;
  }
  async call() {
    const { request, response, next } = this;
    if (request.method !== "POST")
      return;
    const { requestData } = request.body;
    if (!requestData)
      return;
    const success = this.validateRequestData(requestData);
    if (typeof success === "boolean" && success) {
      try {
        const db = import_Server.default.Database;
        const { username, password } = requestData;
        const user = await db.findObject(new import_UserObject.default(), (user2) => user2 !== null && user2.getUsername() === username && user2.comparePasswords(password));
        if (user == null)
          return this.response.status(401);
        return response.status(200).json({ message: "Success!", reason: "User Created", requested: "User Registeration", provided: "Valid User Details", status: 200 });
      } catch (err) {
        console.log(err, "server error");
        return response.status(500).send({ message: "Something Went Wrong", reason: "An Error Occurred", requested: "Server Resource", provided: "none", status: 500 });
      }
      ;
    }
    ;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Login.js.map
