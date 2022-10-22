import EventEmitter from "events";
import express from "express";
import { Layers } from "./Server.js";

export default abstract class Layer<T = Layers> extends EventEmitter {

    #finished: boolean;
    protected request: express.Request;
    protected response: express.Response;

    constructor() {
        super();
        this.#finished = false;
    };

    public abstract selfCall: express.ErrorRequestHandler;

    finish() {
        const request = this.request;
        const response = this.response;
        this.#finished = true;
        this.emit("finish", request.app, request, response);
    };

}