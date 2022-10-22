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
  default: () => DBObject
});
var import_src = __toModule(require("../../../../Data-Structures/src/index.js"));
var import_Generator = __toModule(require("../../../generators/Generator.js"));
class DBObject {
  #references;
  #dataType;
  #id;
  properties;
  #state;
  static createNull(id, dataType) {
    return DBObject.createFrom({ id, dataType: dataType || "" });
  }
  static createFrom(obj) {
    const { dataType, id, properties, state } = obj;
    const o = new DBObject(dataType || "", id || null, properties || {}, state || null);
    return o;
  }
  createRefObject(datatype, values) {
    const obj = { datatype, value: {} };
    for (const property in values) {
      obj.value[property] = values[property];
    }
    ;
    return obj;
  }
  initValues(id, data, references) {
    references == null ? void 0 : references.forEach((reference) => {
      const selfName = reference == null ? void 0 : reference.selfName;
      if (reference && selfName) {
        const current = data[selfName] || {};
        let value;
        if (reference.object && Object.keys(current).length !== 0) {
          const obj = reference.object("");
          value = reference.list ? new import_src.default.List() : reference.object(data[selfName] ? data[selfName] : import_Generator.default.Ids.generate());
        } else if (reference.defaultValues && !reference.object) {
          const obj = this.createRefObject(reference.dataType, reference.defaultValues.values);
          for (const property in current) {
            if (current[property] !== void 0)
              obj["value"][property] = current[property];
          }
          value = obj;
        }
        ;
        data[selfName] = value;
      }
      ;
    });
    return data;
  }
  initProperties(id, data, references) {
    data = this.initValues(id, data, references);
    references == null ? void 0 : references.forEach((reference) => {
      if (reference && !reference.object) {
        const { selfName, dataType } = reference;
        const value = data[selfName];
        if (value && !("datatype" in value))
          data[value] = { datatype: dataType, value };
      }
      ;
    });
    return data;
  }
  constructor(dataType, id, properties = {}, state = null, references) {
    this.#references = references ? references : new import_src.default.List();
    if (id)
      properties = this.initProperties(id, properties, references);
    this.#dataType = dataType;
    this.#id = id;
    this.properties = properties;
    this.#state = null;
    this.createFrom.bind(this);
    this.getReferences.bind(this);
    this.getDataType.bind(this);
    this.getId.bind(this);
    this.getProperties.bind(this);
    this.getState.bind(this);
    this.getProps.bind(this);
    this.getValues.bind(this);
    this.getPropsAndValues.bind(this);
  }
  createNull(id, datatype) {
    return DBObject.createNull(id, datatype);
  }
  createFrom(obj) {
    return DBObject.createFrom(obj);
  }
  getReferences() {
    return this.#references;
  }
  getDataType() {
    return this.#dataType;
  }
  getId() {
    return this.#id;
  }
  getProperties() {
    return this.properties;
  }
  getState() {
    return this.#state;
  }
  getProps(sign = "$") {
    const properties = this.properties;
    let props = "";
    for (const prop in properties) {
      if (props === "")
        props += `${prop}`;
      else
        props += ` ${sign} ${prop}`;
    }
    ;
    return props;
  }
  getValues(sign = "#") {
    const properties = this.properties;
    let values = "";
    for (const prop in properties) {
      let value = properties[prop];
      if (value instanceof DBObject || typeof value === "object")
        value = value instanceof import_src.default.List ? this.getId() : value instanceof DBObject ? value.getId() : value.value.id;
      value = typeof value === "string" ? `"${value}"` : value;
      if (values === "")
        values += value;
      else
        values += ` ${sign} ${value}`;
    }
    ;
    return values;
  }
  getPropsAndValues(propsSign = "$", valuesSign = "#") {
    const props = this.getProps(propsSign);
    const values = this.getValues(valuesSign).split(valuesSign);
    const results = props.split(propsSign);
    let str = "";
    let i = 0;
    results.forEach((prop) => {
      results[i] = `${prop.trim()} ${propsSign} ${values[i].trim()}${results.indexOf(prop) < results.length - 1 ? valuesSign : ""} `;
      i++;
    });
    results.forEach((result) => {
      str += result;
    });
    return str;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=DBObject.js.map
