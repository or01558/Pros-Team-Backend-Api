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
  Layer: () => Layer,
  default: () => Network
});
var import_Server = __toModule(require("./Server.js"));
class Layer {
  type;
  constructor(type) {
    this.type = type;
    this.getType.bind(this);
    this.pass.bind(this);
    this.create.bind(this);
  }
  getType() {
    return this.type;
  }
  pass = (data, req, res, next) => {
    var _a;
    (_a = this.create()) == null ? void 0 : _a.selfCall(data, req, res, next);
  };
  create = () => {
    return import_Server.default.createLayer(this.type);
  };
}
class Network {
  static Layer = Layer;
  constructor() {
    this.createNew.bind(this);
  }
  createNew(Type, layer) {
    return new Layer(Type);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Layer
});
//# sourceMappingURL=Network.js.map
