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
  default: () => ProfileObject
});
var import_src = __toModule(require("../../../../../../Data-Structures/src/index.js"));
var import_DBObject = __toModule(require("../../../classes/DBObject.js"));
var import_MapObject = __toModule(require("../maps/MapObject.js"));
;
class ProfileObject extends import_DBObject.default {
  static createNull(id) {
    return new ProfileObject(id);
  }
  static createFrom({ id = null, properties = {} }, state) {
    return new ProfileObject(id, properties, state);
  }
  createNull(id) {
    return new ProfileObject(id);
  }
  createFrom({ id = null, properties = {} }, state) {
    return ProfileObject.createFrom({ id, properties }, state);
  }
  constructor(id = null, properties = {}, state) {
    const references = new import_src.default.List().add({ dataType: "maps", object: import_MapObject.default.createNull, selfName: "maps", columnName: "creator", dependsOn: true, list: true });
    if (id) {
      properties.image = properties.image === void 0 ? "" : properties.image;
      properties.nickname = properties.nickname === void 0 ? "" : properties.nickname;
      properties.icon = properties.icon === void 0 ? "" : properties.icon;
      properties.aboutMe = properties.aboutMe === void 0 ? "" : properties.aboutMe;
      properties.skills = properties.skills === void 0 ? "" : properties.skills;
      properties.creator = properties.creator === void 0 ? false : properties.creator;
      properties.creator_code = properties.creator_code === void 0 ? "" : properties.creator_code;
    }
    ;
    super("profiles", id, properties, state, references);
    this.createFrom.bind(this);
  }
}
;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ProfileObject.js.map
