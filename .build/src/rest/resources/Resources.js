var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  UserResources: () => UserResources,
  isUserResource: () => isUserResource
});
class UserResources {
  static resources = new Set().add("dashboard").add("settings").add("developers").add("team");
  static has(resource) {
    return this.resources.has(resource.replace("/", ""));
  }
}
function isUserResource(resource) {
  return UserResources.has(resource);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserResources,
  isUserResource
});
//# sourceMappingURL=Resources.js.map
