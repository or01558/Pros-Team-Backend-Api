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
  default: () => Register
});
var import_Server = __toModule(require("../../../classes/Server"));
var import_RequestHandler = __toModule(require("../../../classes/RequestHandler"));
var import_UserObject = __toModule(require("../../database/objects/users/UserObject"));
var import_Generator = __toModule(require("../../../generators/Generator"));
class Register extends import_RequestHandler.default {
  constructor(requset, response, next) {
    super(requset, response, next);
  }
  getValidBody() {
    return {
      username: {
        type: "string",
        value: { minLength: 2 }
      },
      email: {
        type: "string",
        value: { regexs: [/@.+\./] }
      },
      password: { type: "string", value: { minLength: 8, regexs: [/^[a-z]+$/i, /^[0-9]+$/i] } }
    };
  }
  getDataKeys() {
    return ["username", "email", "password"];
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
    const checks = [this.checkUsername(requestData.username), this.checkPassword(requestData.password), this.checkEmail(requestData.email)];
    for (const check of checks) {
      if (typeof check !== "boolean" && check || !check)
        return false;
    }
    ;
    return true;
  }
  checkUsername(username) {
    if (username.length < 2)
      return this.response.status(404);
    return true;
  }
  checkPassword(password) {
    if (password.length < 8)
      return this.response.status(404);
    const lettersRegex = /^[a-z]+$/i;
    const numbersRegex = /^[0-9]+$/i;
    if (!lettersRegex.test(password))
      return this.response.status(404);
    if (!numbersRegex.test(password))
      return this.response.status(404);
    return true;
  }
  checkEmail(email) {
    const emailRegex = /@.+\./;
    if (!emailRegex.test(email))
      return this.response.status(404);
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
        const { username, password, email } = requestData;
        await db.createObject(new import_UserObject.default(import_Generator.default.Ids.generate({ unique: true }), { username, password, email }));
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
//# sourceMappingURL=Register.js.map
