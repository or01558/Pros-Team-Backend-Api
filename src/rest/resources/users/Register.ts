import express from "express";
import Server from "../../../classes/Server";
import Data_Structures from "../../../../Data-Structures/src";
import RequestHandler from "../../../classes/RequestHandler";
import UserObject from "../../database/objects/users/UserObject";
import Generator from "../../../generators/Generator";


//{username: {type:"string", value:{minLength: 2}, email:{type:"string", value:{regexs:[/@.+\./]}, password:{type:"string", value:{minLength: 8, regexs:[/^[a-z]+$/i,  /^[0-9]+$/i]}}
export default class Register extends RequestHandler {

    constructor(requset: express.Request, response: express.Response, next: express.NextFunction) {
        super(requset, response, next);
    }
    

    private getRequestBody() {
        return {
            username: {
                type: "string", value: { minLength: 2 },
            },
            email: {
                type: "string", value: { regexs: [/@.+\./] }
            },
            password: { type: "string", value: { minLength: 8, regexs: [/^[a-z]+$/i, /^[0-9]+$/i] } },
        }
    };

    public async call(): Promise<any> {
            try {
                const db = Server.Database;
                const { username, password, email } = requestData;
                await db.createObject(new UserObject(Generator.Ids.generate({ unique: true }), { username, password, email }));
                return response.status(200).json({ message: "Success!", reason: "User Created", requested: "User Registeration", provided: "Valid User Details", status: 200 });
            } catch (err) {
                console.log(err, "server error");
                return response.status(500).send({ message: "Something Went Wrong", reason: "An Error Occurred", requested: "Server Resource", provided: "none", status: 500 });
            };
        };
        //register user..
}