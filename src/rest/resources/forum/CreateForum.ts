import express from "express";
import RequestHandler from "../../../classes/RequestHandler";


export default class CreateForum extends RequestHandler {

    constructor(requset: express.Request, response: express.Response, next: express.NextFunction) {
        super(requset, response, next);
    }

    public call(): any {
        //create forum..
    }
}