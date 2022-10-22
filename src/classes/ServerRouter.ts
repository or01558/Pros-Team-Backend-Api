import express from "express";
import { existsSync, readFileSync } from "fs";
import { pathToFileURL } from "url";
import RESTApi from "../rest/RESTApi.js";
import RequestHandler from "./RequestHandler.js";
import { Layers } from "./Server.js";

const __dirname = process.cwd();

export default class ServerRouter {

    #rest: RESTApi;
    #layer: Layers;

    constructor(rest: RESTApi, layer: Layers) {
        this.#rest = rest;
        this.#layer = layer;
        this.getRest.bind(this);
        this.getLayer.bind(this);
        this.run.bind(this);
        this.endPoint.bind(this);
    };


    public getRest(): RESTApi {
        return this.#rest;
    };

    public getLayer(): Layers {
        return this.#layer;
    };

    public run = (app : express.Application, request : express.Request, response : express.Response, next : express.NextFunction) => {
        const endPointRejex = /\/resources\/(.*)\/?/;
        const { originalUrl } = request;
        const path = originalUrl;
        if (!path.match(endPointRejex))
            return response.status(404).send({ message: "Resource Not Found", reason: "Invalid Resource Path", requested: "Server Resource", provided: "Invalid Server Resource", status: 404 }); //...
        else {
            try {
                const URL_PARTS = path.replace("/resources/", "").split("/").filter(value => value !== "");
                const lastPartIndex = URL_PARTS.length - 1;
                // @ts-expect-error
                request.endPoint = URL_PARTS.filter((value, index) => index !== lastPartIndex).join("/");
                // @ts-expect-error
                request.action = URL_PARTS[lastPartIndex];
                this.endPoint(app, request, response, next);
            }
            catch (err) {
                console.log(err, "server error");
                return response.status(500).send({ message: "Something Went Wrong", reason: "An Error Occurred", requested: "Server Resource", provided: "Server Resource", status: 500 });
            }
        }
    };
    
    public async endPoint(app : express.Application, request : express.Request, response : express.Response, next : express.NextFunction) {
        let endPointFound = false;
        // @ts-expect-error
        let { endPoint, action } = request;
        const rootPath = `${__dirname}/src/rest/resources/${endPoint}`;
        const configPath = `${rootPath}\\endpoints_config.json`;
        if (!existsSync(configPath)) return response.status(404).send({ message: "Resource Not Found", reason: "Invalid Resource", requested: "Server Resource", provided: "Server Resource", status: 404 });
        const endpoints_config = JSON.parse(readFileSync(`${rootPath}\\endpoints_config.json`, "utf8").replace(new RegExp("\n | \r"), ""));
        const endPointsNames = endpoints_config.endPoints;
        for (const endPointName of endPointsNames) {
            const fileName = `${action.replace(action[0], action[0].toUpperCase())}${endPointName}`;
            const handlerPath = `${rootPath}/${fileName}.js`;
            if (!existsSync(handlerPath))
                continue;
            endPointFound = true;
            const module = await import(pathToFileURL(handlerPath).toString());
            const Handler : typeof RequestHandler = module.default;
            // @ts-expect-error
            new Handler(request, response, next);
        }
        ;
        if (!endPointFound)
            return response.status(404).send({ message: "Resource Not Found", reason: "Invalid Resource", requested: "Server Resource", provided: "Server Resource", status: 404 });
    }
}