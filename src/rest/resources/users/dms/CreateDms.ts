import express from "express";
import RequestHandler from "../../../../classes/RequestHandler";
import Server from "../../../../classes/Server";


export default class CreateDms extends RequestHandler {

    constructor(requset: express.Request, response: express.Response, next: express.NextFunction) {
        super(requset, response, next);
    }

    public call(): any {
        //create dms..
    }
}