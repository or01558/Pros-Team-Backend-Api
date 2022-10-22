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
  default: () => RESTApi
});
var import_sha256 = __toModule(require("sha256"));
var import_Database = __toModule(require("./database/Database.js"));
var import_crypto = __toModule(require("crypto"));
class RESTApi {
  _genKey;
  database;
  constructor(_genKey) {
    this._genKey = (0, import_sha256.default)(_genKey, { asBytes: true });
    console.log(_genKey, "api key");
    this.database = new import_Database.default(new import_Database.default.Client());
    this.hasAccess.bind(this);
    this.verify.bind(this);
    this.decrypt.bind(this);
  }
  decrypt = (data) => {
    const iv = Buffer.from([
      137,
      69,
      171,
      8,
      102,
      75,
      142,
      106,
      211,
      142,
      113,
      48,
      239,
      56,
      38,
      26
    ]);
    const decipher = import_crypto.default.createDecipheriv("aes-256-cbc", Buffer.from(this._genKey), iv);
    let decryptedData = decipher.update(data, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
  };
  hasAccess(key) {
    return key === this._genKey.toString();
  }
  verify(req) {
    return true;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=RESTApi.js.map
