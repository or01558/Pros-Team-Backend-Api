var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => Tables
});
class Tables {
  static Client = null;
  static replaceWords(value) {
    const words = ["key"];
    for (const word of words) {
      value = value.replace(word, `\`${word}\``);
    }
    ;
    return value;
  }
  static create(table) {
    return new Promise((resolve, reject) => {
      const client = this.Client;
      if (!client)
        return reject("Tables Creation Error: Database client is null");
      client.query(`CREATE TABLE ${table.getName()} (${this.replaceWords(table.getColumns().trim())})`).then(() => {
        resolve(table);
      }).catch((err) => reject(err));
    });
  }
  static delete(table) {
    return new Promise((resolve, reject) => {
      const client = this.Client;
      if (!client)
        return reject("Tables Deletion Error: Database client is null");
      client.query(`DROP TABLE ${table.getName()};`).then(() => {
        resolve(table);
      }).catch((err) => reject(err));
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Tables.js.map
