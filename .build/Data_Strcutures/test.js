var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target3) => __defProp(target3, "__esModule", { value: true });
var __reExport = (target3, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target3, key) && key !== "default")
        __defProp(target3, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target3;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_src = __toModule(require("./src"));
const lst = new import_src.default.List();
lst.add(5);
console.log(lst.exists((number) => number == 4));
console.log(lst.exists((number) => number == 5));
lst.add(9);
lst.add(10);
lst.add(11);
const results = lst.find((v) => v == 1);
const results2 = lst.find((v) => v == 11);
const target = lst.findOne((num) => num == 11);
lst.delete((num) => num == 11);
const target2 = lst.findOne((num) => num == 11);
console.log(lst.size);
lst.remove(0);
console.log(lst.size);
console.log(import_src.default.List.notNULL(lst));
lst.clear();
console.log(import_src.default.List.notNULL(lst));
//# sourceMappingURL=test.js.map
