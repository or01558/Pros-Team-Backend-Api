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
  default: () => Client
});
var import_mysql = __toModule(require("mysql"));
class Client {
  #connection;
  connected;
  constructor() {
    const port = process.env.DATABASE_PORT;
    this.#connection = import_mysql.default.createConnection({ database: "PROS_TEAM", host: process.env.DATABASE_HOST, port: port ? parseInt(port) : -1, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD });
    this.connected = false;
    this.connect.bind(this);
    this.query.bind(this);
  }
  connect(callback) {
    this.#connection.connect({}, (err) => {
      if (err)
        throw err;
      this.connected = true;
      callback();
    });
    return true;
  }
  query(command) {
    return new Promise((resolve, reject) => {
      this.#connection.query(command, (err, results, fields) => {
        if (err)
          reject(err);
        if (results && fields)
          resolve(results);
        else if (fields)
          resolve(fields);
        else if (results)
          resolve(results);
        else
          resolve(void 0);
      });
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Client.js.map
