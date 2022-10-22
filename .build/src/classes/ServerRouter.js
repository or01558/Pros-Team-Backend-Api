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
  default: () => ServerRouter
});
var import_fs = __toModule(require("fs"));
var import_url = __toModule(require("url"));
const __dirname = process.cwd();
class ServerRouter {
  #rest;
  #layer;
  constructor(rest, layer) {
    this.#rest = rest;
    this.#layer = layer;
    this.getRest.bind(this);
    this.getLayer.bind(this);
    this.run.bind(this);
    this.endPoint.bind(this);
  }
  getRest() {
    return this.#rest;
  }
  getLayer() {
    return this.#layer;
  }
  run = (app, request, response, next) => {
    const endPointRejex = /\/resources\/(.*)\/?/;
    const { originalUrl } = request;
    const path = originalUrl;
    if (!path.match(endPointRejex))
      return response.status(404).send({ message: "Resource Not Found", reason: "Invalid Resource Path", requested: "Server Resource", provided: "Invalid Server Resource", status: 404 });
    else {
      try {
        const URL_PARTS = path.replace("/resources/", "").split("/").filter((value) => value !== "");
        const lastPartIndex = URL_PARTS.length - 1;
        request.endPoint = URL_PARTS.filter((value, index) => index !== lastPartIndex).join("/");
        request.action = URL_PARTS[lastPartIndex];
        this.endPoint(app, request, response, next);
      } catch (err) {
        console.log(err, "server error");
        return response.status(500).send({ message: "Something Went Wrong", reason: "An Error Occurred", requested: "Server Resource", provided: "Server Resource", status: 500 });
      }
    }
  };
  async endPoint(app, request, response, next) {
    let endPointFound = false;
    let { endPoint, action } = request;
    const rootPath = `${__dirname}/src/rest/resources/${endPoint}`;
    const configPath = `${rootPath}\\endpoints_config.json`;
    if (!(0, import_fs.existsSync)(configPath))
      return response.status(404).send({ message: "Resource Not Found", reason: "Invalid Resource", requested: "Server Resource", provided: "Server Resource", status: 404 });
    const endpoints_config = JSON.parse((0, import_fs.readFileSync)(`${rootPath}\\endpoints_config.json`, "utf8").replace(new RegExp("\n | \r"), ""));
    const endPointsNames = endpoints_config.endPoints;
    for (const endPointName of endPointsNames) {
      const fileName = `${action.replace(action[0], action[0].toUpperCase())}${endPointName}`;
      const handlerPath = `${rootPath}/${fileName}.js`;
      if (!(0, import_fs.existsSync)(handlerPath))
        continue;
      endPointFound = true;
      const module2 = await import((0, import_url.pathToFileURL)(handlerPath).toString());
      const Handler = module2.default;
      new Handler(request, response, next);
    }
    ;
    if (!endPointFound)
      return response.status(404).send({ message: "Resource Not Found", reason: "Invalid Resource", requested: "Server Resource", provided: "Server Resource", status: 404 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ServerRouter.js.map
