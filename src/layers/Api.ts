import { ErrorRequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Layer from "../classes/Layer.js";
import { Layers } from "../classes/Server.js";

export default class Api extends Layer<Layers.RESTApi>{
    public selfCall: ErrorRequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = (data, req, res, next) => {
        
        const apiKey = req.headers['pros-team-api-key'];

        if (!apiKey) return res.status(400).send({ message: "Missing Access", reason: "No Api Access", requested: "Api Access", provided: "None Api Key", status: 400 });

        if (typeof apiKey === "string" && !data.api.hasAccess(apiKey)) {
            return res.status(403).json({ message: "Missing Access", reason: "No Api Access", requested: "Api Access", provided: "Invalid Api Key", status: 403 })
        };

        next();

    };
}