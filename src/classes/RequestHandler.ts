import express from "express";
import Data_Structures from "../../Data-Structures/src";

export type JsNumber = { type: "number", value: { min: number, max: number, possibilities: number[] }, required?: boolean, canBeNull?: boolean, defaults: number };
export type JsString = { type: "string", value: { minLength: number, maxLength: number, length: number, regexs: RegExp[], options:Data_Structures.List<string>}, required?: boolean, canBeNull?: boolean, defaults: string };
export type JsBoolean = { type: "boolean", value: {}, required?: boolean, canBeNull?: boolean, defaults: boolean };
export type JsObject = ;
export type JsList = Data_Structures.List<JsObject>;
export type BodyValuesTypes = JsNumber | JsString | JsBoolean | JsObject | JsList;

export interface RequestBody {
   type: "object";
   [key: string] : BodyValuesTypes;
};

export default abstract class RequestHandler {

    protected request: express.Request;
    protected response: express.Response;
    protected next: express.NextFunction;


    constructor(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.request = req;
        this.response = res;
        this.next = next;
        this.call.bind(this);
       if (req.method !== "POST") this.call();
        else {
         const result = this.validateRequestBody();
         if (result) this.call();
        };
    }
    
    abstract getRequestBody(): RequestBody;

    public abstract call(): any; // call the handler

    private validateRequestBody(requestBody?: RequestBody) : express.Response | true {
        const { request, response, next } = this;
        const { requestData } = request.body;
        if (!requestData) return response.status(404);
        if(!requestBody) requestBody = this.getRequestBody();
        for(const key in requestBody){
         if(!requestData[key]){
         } else {
           
         };
        }
        return true;
    };
}