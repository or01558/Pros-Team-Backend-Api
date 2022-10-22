var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => RequestHandler
});
class RequestHandler {
  request;
  response;
  next;
  constructor(req, res, next) {
    this.request = req;
    this.response = res;
    this.next = next;
    this.call.bind(this);
    const result = this.validateRequestBody();
    if (result)
      this.call();
  }
  validateRequestBody() {
    return true;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=RequestHandler.js.map
