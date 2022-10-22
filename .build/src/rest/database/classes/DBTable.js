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
  BigIntType: () => BigIntType,
  BooleanType: () => BooleanType,
  DateTimeType: () => DateTimeType,
  VarcharType: () => VarcharType,
  default: () => DBTable
});
var import_Varchar = __toModule(require("../types/Varchar.js"));
;
;
const VarcharType = function varchar(len) {
  return {
    type: import_Varchar.Varchar,
    _sql_type_name: `varchar(${len})`
  };
};
const BigIntType = {
  type: BigInt,
  _sql_type_name: "bigint"
};
const BooleanType = {
  type: Boolean,
  _sql_type_name: "boolean"
};
const DateTimeType = {
  type: Date,
  _sql_type_name: "datetime"
};
class DBTable {
  name;
  types;
  constraints;
  constructor(name, types, constraints) {
    this.name = name;
    this.types = types;
    this.constraints = constraints;
    this.getName.bind(this);
    this.getTypes.bind(this);
    this.getConstraints.bind(this);
    this.getColumns.bind(this);
  }
  getName() {
    return this.name;
  }
  getTypes() {
    return this.types;
  }
  getConstraints() {
    return this.constraints;
  }
  getColumns() {
    const types = this.types;
    const constraints = this.constraints;
    let columns = "";
    for (const name in types) {
      const dbColumn = types[name];
      let column = `${name.includes('"') ? `"${name}"` : name} ${dbColumn._sql_type_name} ${constraints[name] || ""}`;
      if (columns === "")
        columns += column;
      else
        columns += `, ${column}`;
    }
    ;
    return columns;
  }
}
;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BigIntType,
  BooleanType,
  DateTimeType,
  VarcharType
});
//# sourceMappingURL=DBTable.js.map
