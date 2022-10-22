import { ErrorRequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Layer from "../classes/Layer.js";
import { Layers } from "../classes/Server.js";

export default class Connection extends Layer<Layers.Connection>{
    public selfCall: ErrorRequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = (data, req, res, next) => {
        console.log("Connection");
        next();
    };
}