var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => DBType
});
class DBType {
  value;
  constructor(value) {
    this.value = value;
    this.getValue.bind(this);
    this.setValue.bind(this);
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=DBType.js.map
