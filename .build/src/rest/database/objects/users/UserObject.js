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
  STATUSS: () => STATUSS,
  default: () => UserObject
});
var import_src = __toModule(require("../../../../../Data-Structures/src/index.js"));
var import_Generator = __toModule(require("../../../../generators/Generator.js"));
var import_DBObject = __toModule(require("../../classes/DBObject.js"));
var import_ProfileObject = __toModule(require("./profiles/ProfileObject.js"));
var import_UserRoleObject = __toModule(require("./UserRoleObject.js"));
var STATUSS;
(function(STATUSS2) {
  STATUSS2["ONLINE"] = "online";
  STATUSS2["OFFLINE"] = "offline";
  STATUSS2["AFK"] = "afk";
  STATUSS2["DND"] = "do not disturb";
})(STATUSS || (STATUSS = {}));
;
;
;
;
class UserObject extends import_DBObject.default {
  username;
  static createFrom({ id = null, properties = {} }, state) {
    return new UserObject(id, properties, state);
  }
  createFrom({ id = null, properties = {} }, state) {
    return this.createFrom({ id, properties }, state);
  }
  createNull(id) {
    return new UserObject(id);
  }
  constructor(id = null, properties = {}, state) {
    if ("username" in properties) {
      properties.bot = properties.bot === void 0 && id ? false : properties.bot;
      properties.status = properties.status === void 0 && id ? STATUSS.ONLINE : properties.status;
    }
    ;
    const references = new import_src.default.List().add({ dataType: "profiles", object: import_ProfileObject.default.createNull, selfName: "profile", columnName: "id", dependsOn: true, list: false }).add({
      dataType: "activities",
      selfName: "activity",
      columnName: "user",
      dependsOn: true,
      list: false,
      defaultValues: {
        name: "activities",
        values: {
          name: "",
          type: 0,
          get id() {
            return import_Generator.default.Ids.generate();
          },
          icon: "",
          image: "",
          banner: "",
          timeSpent: "1-2-2023 13:22:",
          user: ""
        }
      }
    }).add({ dataType: "maps", selfName: "", columnName: "creator", dependsOn: true, list: true }).add({ dataType: "user_roles", object: import_UserRoleObject.default.createNull, selfName: "roles", columnName: "id", dependsOn: true, list: true });
    super("users", id, properties, state, references);
    this.username = "username" in properties ? properties.username : "";
    this.createFrom.bind(this);
  }
  getUsername() {
    return this.username;
  }
  comparePasswords(password) {
    const properties = this.properties;
    return "password" in properties && properties.password === password;
  }
}
;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  STATUSS
});
//# sourceMappingURL=UserObject.js.map
