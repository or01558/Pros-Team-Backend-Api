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
  default: () => Database
});
var import_src = __toModule(require("../../../Data-Structures/src/index.js"));
var import_DBObject = __toModule(require("./classes/DBObject.js"));
var import_Tables = __toModule(require("./classes/Tables.js"));
var import_Client = __toModule(require("./client/Client.js"));
class Database {
  static Client = import_Client.default;
  static Tables = import_Tables.default;
  static DBObject = import_DBObject.default;
  #client;
  constructor(client) {
    this.#client = client;
    Database.Tables.Client = client;
    this.get.bind(this);
    this.isConnected.bind(this);
    this.getReference.bind(this);
    this.getObject.bind(this);
    this.getObjectsById.bind(this);
    this.getObjects.bind(this);
    this.#getRefObject.bind(this);
    this.createObject.bind(this);
    this.deleteObject.bind(this);
    this.clearObjects.bind(this);
    this.updateObject.bind(this);
    this.findObject.bind(this);
    this.findObjects.bind(this);
  }
  get() {
    return this.#client;
  }
  isConnected() {
    return this.#client.connected;
  }
  async getReference(id, properties, reference) {
    if (reference && reference.selfName) {
      const createFunction = reference.object;
      let result = await this.getObjectsById(createFunction ? createFunction(id) : import_DBObject.default.createFrom({ dataType: reference.dataType, id }), reference.columnName);
      if (result) {
        if (reference.list) {
          properties[reference.selfName] = result;
        } else
          properties[reference.selfName] = result.size == 1 ? result.get(0) : result;
        return properties;
      } else if (reference.list)
        properties[reference.selfName] = new import_src.default.List();
      return properties;
    }
    ;
  }
  async findObject(obj, callback) {
    const objects = await this.getObjects(obj);
    if (!objects)
      return null;
    return objects.delete((value) => {
      return !callback(value);
    }).first();
  }
  async findObjects(obj, callback) {
    const objects = await this.getObjects(obj);
    if (!objects)
      return null;
    return objects.delete((value) => {
      return !callback(value);
    });
  }
  getObject(obj, columnName) {
    return new Promise(async (resolve, reject) => {
      this.#client.query(`SELECT * FROM ${obj.getDataType()} WHERE ${columnName ? columnName : "id"} = ${`"${obj.getId()}"` || ""}`).then(async (results) => {
        if (results && results.length > 0 && results[0]) {
          const { id } = results[0];
          delete results[0].id;
          let properties = results[0];
          for (const prop of properties) {
            if (prop.includes("`")) {
              const updatedProp = prop.replace("`", "").replace("`", "");
              properties[updatedProp] = properties[prop];
              delete properties[prop];
            }
            ;
          }
          ;
          const dbObject = obj.createFrom({ id });
          const references = dbObject.getReferences();
          for (let i = 0; i < references.size; i++) {
            const reference = references.get(i);
            if (reference)
              await this.getReference(id, properties, reference);
          }
          resolve(dbObject.createFrom({ id, properties }));
        } else
          resolve(null);
      }).catch((err) => reject(err));
    });
  }
  getObjectsById(obj, columnName) {
    return new Promise((resolve, reject) => {
      this.#client.query(`SELECT * FROM ${obj.getDataType()} WHERE ${columnName ? columnName : "id"} = ${`"${obj.getId()}"` || ""}`).then(async (results) => {
        if (results !== void 0 && results.length > 0) {
          const dbObjects = new import_src.default.List();
          results.forEach(async (result) => {
            if (result) {
              const { id } = result;
              delete result.id;
              const properties = result;
              for (const prop of properties) {
                if (prop.includes("`")) {
                  const updatedProp = prop.replace("`", "").replace("`", "");
                  properties[updatedProp] = properties[prop];
                  delete properties[prop];
                }
                ;
              }
              ;
              const dbObject = obj.createFrom({ id });
              const references = dbObject.getReferences();
              references.forEach(async (reference) => {
                if (reference)
                  await this.getReference(id, properties, reference);
              });
              dbObjects.add(dbObject.createFrom({ id, properties }));
            }
            ;
          });
          resolve(dbObjects);
        } else
          resolve(null);
      }).catch((err) => reject(err));
    });
  }
  getObjects(obj) {
    return new Promise((resolve, reject) => {
      this.#client.query(`SELECT * FROM ${obj.getDataType()}}`).then(async (results) => {
        if (results !== void 0 && results.length > 0) {
          const dbObjects = new import_src.default.List();
          for (const result of results) {
            if (result) {
              const { id } = result;
              const dbObject = await this.getObject(obj.createFrom({ id }));
              dbObjects.add(dbObject);
            }
            ;
          }
          ;
          resolve(dbObjects);
        } else
          resolve(null);
      }).catch((err) => reject(err));
    });
  }
  #getRefObject(value) {
    const condition = typeof value === "object" && value && "datatype" in value && ("value" in value && !(value.value instanceof import_DBObject.default));
    if (value instanceof import_DBObject.default)
      return value;
    else if (value instanceof import_src.default.List) {
      for (let i = 0; i < value.size; i++) {
        const obj = this.#getRefObject(value.get(i));
        value.set(i, obj);
      }
      ;
      return value;
    }
    return condition ? new import_DBObject.default(value.datatype, value.value.id, Object.fromEntries(Object.entries(value.value).filter(([key, value2]) => key !== "id"))) : null;
  }
  createObject(obj) {
    return new Promise(async (resolve, reject) => {
      const id = obj.getId();
      if (typeof id !== "string" || id.length == 0)
        return reject("DatabaseError: Cannot Create an object with null id");
      this.#client.query(`INSERT INTO ${obj.getDataType()} VALUES ("${id}", ${obj.getValues(",")})`).then(async () => {
        const properties = obj.getProperties();
        for (const property in properties) {
          const value = properties[property];
          const refObject = this.#getRefObject(value);
          if (!refObject)
            continue;
          if (refObject instanceof import_src.default.List) {
            refObject.forEach(async (v) => {
              if (v)
                await this.createObject(v);
            });
          } else
            await this.createObject(refObject);
        }
        ;
        resolve(obj);
      }).catch((err) => reject(err));
    });
  }
  deleteObject(obj, columnName) {
    return new Promise((resolve, reject) => {
      this.#client.query(`DELETE FROM ${obj.getDataType()} WHERE ${columnName ? columnName : "id"} = "${obj.getId()}"`).then(async () => {
        const references = obj.getReferences();
        for (let i = 0; i < references.size; i++) {
          const reference = references.get(i);
          if (reference && reference.dependsOn) {
            const id = obj.getId();
            const createFunction = reference.object;
            if (id == null)
              continue;
            await this.deleteObject(createFunction ? createFunction(id) : import_DBObject.default.createFrom({ dataType: reference.dataType, id }), reference.columnName);
          }
        }
        ;
        resolve(obj);
      }).catch((err) => reject(err));
    });
  }
  clearObjects(obj) {
    return new Promise((resolve, reject) => {
      this.#client.query(`DELETE FROM ${obj.getDataType()}`).then(async () => {
        const references = obj.getReferences();
        for (let i = 0; i < references.size; i++) {
          const reference = references.get(i);
          if (reference)
            await this.clearObjects(import_DBObject.default.createFrom({ dataType: reference.dataType, id: null }));
        }
        ;
        resolve(obj.createFrom({ state: "success", id: null }));
      }).catch((err) => reject(err));
    });
  }
  updateObject(obj, columnName) {
    return new Promise((resolve, reject) => {
      this.#client.query(`UPDATE ${obj.getDataType()} SET ${import_Tables.default.replaceWords(obj.getPropsAndValues("=", ","))} WHERE  ${columnName ? columnName : "id"} = "${obj.getId()}"`).then(async (result) => {
        const references = obj.getReferences();
        for (let i = 0; i < references.size; i++) {
          const reference = references.get(i);
          if (reference && reference.selfName) {
            const value = obj.getProperties()[`${reference.selfName}`];
            const refObject = this.#getRefObject(value);
            if (!refObject)
              continue;
            if (refObject instanceof import_src.default.List) {
              if (refObject.size == 0) {
                await this.clearObjects(import_DBObject.default.createFrom({ dataType: reference.dataType, id: null }));
                continue;
              }
              ;
              refObject.forEach(async (v) => {
                if (v) {
                  await this.updateObject(v);
                }
              });
            } else
              await this.updateObject(refObject);
          }
        }
        ;
        if (result && ("affectedRows" in result && result.affectedRows == 0 && result.changedRows == 0))
          return resolve(await this.createObject(obj));
        resolve(obj);
      }).catch((err) => reject(err));
    });
  }
}
;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Database.js.map
