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
  default: () => MapObject
});
var import_src = __toModule(require("../../../../../../Data-Structures/src/index.js"));
var import_DBObject = __toModule(require("../../../classes/DBObject.js"));
;
;
class MapObject extends import_DBObject.default {
  static createNull(id) {
    return new MapObject(id);
  }
  static createFrom({ id = null, properties = {} }, state) {
    return new MapObject(id, properties, state);
  }
  createFrom({ id = null, properties = {} }, state) {
    return MapObject.createFrom({ id, properties }, state);
  }
  createNull(id) {
    return new MapObject(id);
  }
  constructor(id = null, properties = {}, state) {
    const references = new import_src.default.List().add({ dataType: "maps", object: MapObject.createNull, selfName: "maps", columnName: "creator", dependsOn: true, list: true });
    super("maps", id, properties, state, references);
    this.createFrom.bind(this);
    this.getReferences();
  }
}
;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=MapObject.js.map
