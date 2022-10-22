import fs from "fs";
import path from "path";
import Layer from "../classes/Layer.js";
import { isUserResource } from "../rest/resources/Resources.js";
import NodeRSA from 'node-rsa';
import { ErrorRequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

const __dirname = process.cwd();

export default class Analizier extends Layer {
    public selfCall: ErrorRequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = (data, req, res, next) => {
        const body = req.body;
        const { userId, requestData } = body;
        let resourceData = null;

        if (data.format === "json") {
            if (!userId && isUserResource(req.path)) {
                return res.status(403).json({ message: "Missing Access", reason: "Client not logged in", requested: "user resource", provided: "none token", status: 403 });
            };

            if (req.headers["content-type"] !== "application/json")
                return res.status(415).json({ message: "Not A Json Format", reason: "Server dosen't know this format", requested: "api resource", provided: "invalid content type", status: 415 });

            if (req.method !== "GET" && !requestData)
                return res.status(400).json({ message: "Server Failed", reason: "Can't analize the request", requested: "none get request", provided: "none request data", status: 400 });

            if (req.method !== "GET") {
                const privateKey = new NodeRSA(fs.readFileSync(path.resolve(__dirname, "../server.key")), "private");
                const encrypted = data.decrypt(requestData);
                const json = privateKey.decrypt(encrypted).toString();
                resourceData = JSON.parse(json);
                // @ts-expect-error
                req.resourceData = resourceData;
                this.request = req;
                this.response = res;
                this.finish();
            };

            this.request = req;
            this.response = res;
            this.finish();
            next();
        }
        else {
            //other formats may come in the future...
        }
    };
}
//# sourceMappingURL=Analizer.js.map