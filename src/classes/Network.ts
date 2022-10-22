import express from "express";
import Server, { Layers, NetworkLayers } from "./Server.js";
import ServerLayer from "./Layer.js";

export class Layer<T extends ServerLayer = ServerLayer> {

    private type: Layers;

    constructor(type: Layers) {
        this.type = type;
        this.getType.bind(this);
        this.pass.bind(this);
        this.create.bind(this);
    };

    getType() {
        return this.type;
    };

    pass: express.ErrorRequestHandler = (data: any, req, res, next) => {
        this.create()?.selfCall(data, req, res, next);
    };

    //@ts-expect-errors
    create: () => T | null = () => {
        return Server.createLayer(this.type);
    }
}

export default class Network implements NetworkLayers {
    public static Layer = Layer;

    constructor(){
        this.createNew.bind(this);
    }
    
    createNew(Type: Layers, layer: ServerLayer): Layer<ServerLayer> {
        return new Layer<typeof layer>(Type);
    }


}

