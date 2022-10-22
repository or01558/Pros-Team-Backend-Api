import express from "express";
import Data_Structures from "../../../../Data-Structures/src";
import RequestHandler from "../../../classes/RequestHandler";
import Server from "../../../classes/Server";
import DBObject from "../../database/classes/DBObject";
import UserObject, { User } from "../../database/objects/users/UserObject";


export default class Login extends RequestHandler {

    constructor(requset: express.Request, response: express.Response, next: express.NextFunction) {
        super(requset, response, next);
    }

    private getDataKeys() {
        return ["username", "password"];
    };

    private validateRequestData(requestData: Data_Structures.IObjectKeys): boolean | express.Response {
        const DATA_KEYS = this.getDataKeys();

        for (const key of DATA_KEYS) {
            if (!requestData[key]) return this.response.status(404) //...;
            if (typeof requestData[key] !== "string") return this.response.status(404) //...;
        };

        return true;
    };

    public async call(): Promise<any> {
        const { request, response, next } = this;
        if (request.method !== "POST") return //...;
        const { requestData } = request.body;
        if (!requestData) return //...;
        const success = this.validateRequestData(requestData);
        if (typeof success === "boolean" && success) {
            try {
                const db = Server.Database;
                const { username, password } = requestData;

                const user = await db.findObject<UserObject, User>(new UserObject(), (user) => user !== null && user.getUsername() === username && user.comparePasswords(password));
                if (user == null) return this.response.status(401) //...;
                //create user access & refresh tokens and return the access token
                return response.status(200).json({ message: "Success!", reason: "User Created", requested: "User Login", provided: "Valid User Details", status: 200 });
            } catch (err) {
                console.log(err, "server error");
                return response.status(500).send({ message: "Something Went Wrong", reason: "An Error Occurred", requested: "Server Resource", provided: "none", status: 500 });
            };
        };
    }
}