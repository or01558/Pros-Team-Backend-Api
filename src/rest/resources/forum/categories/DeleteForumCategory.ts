import express from "express";
import RequestHandler from "../../../../classes/RequestHandler";


export default class DeleteForumCategory extends RequestHandler {

    constructor(requset: express.Request, response: express.Response, next: express.NextFunction) {
        super(requset, response, next);
    }

    public call(): any {
        //delete category..
    }
}