var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var import_node_fetch = __toModule(require("node-fetch"));
var import_sha256 = __toModule(require("sha256"));
var import_node_rsa = __toModule(require("node-rsa"));
var import_crypto = __toModule(require("crypto"));
const encryptedData = encryptRequestData({ id: "1" });
const requestData = encrypt(encryptedData);
(0, import_node_fetch.default)("http://localhost:5000/resources/forum/posts/manage", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "pros-team-api-key": getApiKey(),
    "authorization": "Bearer 111"
  },
  body: JSON.stringify({ requestData })
}).then((r) => {
  r.json().then((json) => console.log(json));
}).catch((err) => {
  console.log(err);
});
function getApiKey() {
  return (0, import_sha256.default)("32&3Ds64Da1%&@657732u$$hn)^@)#*$@4l0540Xn", { asBytes: true });
}
function encryptRequestData(data) {
  const publicKey = new import_node_rsa.default("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKR4FyhSENqceTxMI6e57b5SAAgxE+5pV2GFQv1QMUC1n25NryZGNybme4vrTX8ajTs44qJAF85tYgw5yPicNNUCAwEAAQ==", "public");
  return publicKey.encrypt(data, "base64");
}
;
function encrypt(data) {
  const iv = Buffer.from([
    137,
    69,
    171,
    8,
    102,
    75,
    142,
    106,
    211,
    142,
    113,
    48,
    239,
    56,
    38,
    26
  ]);
  const cipher = import_crypto.default.createCipheriv("aes-256-cbc", Buffer.from(getApiKey()), iv);
  let encryptedData2 = cipher.update(data, "utf8", "hex");
  encryptedData2 += cipher.final("hex");
  return encryptedData2;
}
;
//# sourceMappingURL=testApi.js.map
