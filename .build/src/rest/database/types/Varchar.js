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
  Varchar: () => Varchar,
  default: () => varchar
});
var import_DBType = __toModule(require("../classes/DBType.js"));
class Varchar extends import_DBType.default {
  chars;
  count;
  constructor(len) {
    super("");
    this.chars = new Array(len);
    this.count = 0;
  }
  getValue() {
    const chars = this.chars;
    let value = "";
    chars.forEach((char) => {
      if (char.length > 1)
        throw new Error("VarChar Error: Char must be one length");
      value += char;
    });
    return value;
  }
  setValue(value) {
    if (value.length !== this.chars.length)
      throw new Error("VarChar Error: Cannot create value that is bigger then the varchar length");
    for (const char of value) {
      this.add(char);
    }
    ;
    super.setValue(value);
  }
  add(char) {
    if (char.length > 1)
      throw new Error("VarChar Error: Char must be one length");
    if (this.count + 1 > this.chars.length)
      throw new Error("VarChar Error: Cannot create value that is bigger then the varchar length");
    this.chars[this.count] = char;
    this.count++;
    return this;
  }
}
;
function varchar(len) {
  return new Varchar(len);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Varchar
});
//# sourceMappingURL=Varchar.js.map
