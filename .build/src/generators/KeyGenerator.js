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
  default: () => KeyGenerator
});
var import_src = __toModule(require("../../Data-Structures/src/index.js"));
var import_getRandomInt = __toModule(require("../functions/getRandomInt.js"));
const { List } = import_src.default;
const signs = new List();
const numbers = new List();
const letters = new List();
signs.add("$");
signs.add("#");
signs.add("%");
signs.add("@");
signs.add("^");
signs.add("&");
signs.add("*");
signs.add("(");
signs.add(")");
for (let i = 0; i <= 9; i++) {
  numbers.add(i.toString());
}
;
for (let i = 65; i <= 90; i++) {
  letters.add(String.fromCharCode(i));
}
;
for (let i = 97; i <= 122; i++) {
  letters.add(String.fromCharCode(i));
}
;
class KeyGenerator {
  constructor() {
    this.generate.bind(this);
    this.genarateChars.bind(this);
  }
  generate() {
    let keys = new List();
    for (let i = 0; i < 16; i++) {
      const count = (0, import_getRandomInt.default)(1, 2);
      for (let j = 0; j < count; j++) {
        const chance = (0, import_getRandomInt.default)(1, 3);
        if (chance == 1) {
          keys.add(this.genarateChars(signs, true));
        } else if (chance == 2) {
          keys.add(this.genarateChars(numbers, true));
        } else if (chance == 3) {
          keys.add(this.genarateChars(letters, true));
        }
      }
    }
    return keys.toString();
  }
  genarateChars(chars, randomCount) {
    const generated = new List();
    const chance = randomCount ? (0, import_getRandomInt.default)(1, 2) : 1;
    for (let j = 0; j < chance; j++) {
      let charIndex = Math.floor(Math.random() * chars.size);
      let char = chars.get(charIndex) || "";
      while (!char) {
        charIndex = Math.floor(Math.random() * chars.size);
        char = chars.get(charIndex) || "";
      }
      ;
      generated.add(char);
    }
    ;
    return generated;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=KeyGenerator.js.map
