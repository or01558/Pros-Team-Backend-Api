import { ErrorRequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import fs from "fs";
import { ParsedQs } from "qs";
import Layer from "../classes/Layer.js";
import Server, { Layers } from "../classes/Server.js";
import UserObject from "../rest/database/objects/users/UserObject.js";

export default class Database extends Layer<Layers.Database>{
    public selfCall: ErrorRequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> = async (data, req, res, next) => {
        const database = data.database;
        req.body.userId = "1k22kk2k";
        next();
       /* if (!database.isConnected()) return res.status(503).send({ message: "Service Unavailable", reason: "Api Services Failed", requested: "Api Resource", provided: "valid information", status: 503 });;

        if (!req.headers["authorization"]) return res.status(401).send({ message: "Unauthorized", reason: "No Authorization Header", requested: "User Resource", provided: "none authorization", status: 401 });

        const auth = req.headers['authorization'].split(' ');
        const authType = auth[0];
        const accessToken = auth[1];

        if (authType !== "Bearer") return res.status(403).send({ message: "Unauthorized", reason: "Invalid Authorization", requested: "User Resource", provided: "invalid authorization type", status: 403 });

        if (!accessToken) return res.status(401).send({ message: "Unauthorized", reason: "No Authorization Token", requested: "User Resource", provided: "none access token", status: 401 });

        try {
            const tokenData = jwt.verify(accessToken, fs.readFileSync("../../private.key").toString().replace("-----BEGIN RSA PRIVATE KEY-----\r\n", "").replace("\n-----END RSA PRIVATE KEY-----", "").replace("//LG7a5vljVVC", ""));
            if (typeof tokenData !== "string") {
                const { id, serverCertificate, sign } = tokenData;
                if (id) {
                    const user = await Server.Database.getObject(new UserObject(id));
                    if (!user) return res.status(403).send({ message: "Unauthenticated", reason: "Invalid Authentication", requested: "User Resource", provided: "invalid user id", status: 403 });
                    req.body.userId = id;
                } else if (serverCertificate && sign) {
                    if (sign !== fs.readFileSync("../../certificate.key").toString().replace("-----BEGIN CERTIFICATE REQUEST-----\r\n", "").replace("\n-----END CERTIFICATE REQUEST-----", "")) return res.status(403).send({ message: "Unauthenticated", reason: "Invalid Authentication", requested: "Api Resource", provided: "invalid certificate key", status: 403 });
                    req.body.userId = null;
                } else return res.status(401).send({ message: "Unauthenticated", reason: "Invalid Authentication", requested: "Server Resource", provided: "missing authentication details", status: 403 });
                next();
            } else return res.status(401).send({ message: "Unauthenticated", reason: "Invalid Authentication", requested: "Server Resource", provided: "invalid authentication details", status: 403 });;
        } catch (err: unknown) {
            if (err instanceof jwt.TokenExpiredError) return res.status(401).send({ message: "Unauthenticated", reason: "Invalid Authentication", requested: "Server Resource", provided: "access token expired ", status: 401 });
            else {
                console.log(err, "server error");
                return res.status(500).send({ message: "Something Went Wrong", reason: "An Error Occurred", requested: "Server Resource", provided: "none", status: 500 });
            };
        };*/
    };
}