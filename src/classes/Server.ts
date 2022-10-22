import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import Data_Structures from "../../Data-Structures/src/index.js";
import RESTApi from "../rest/RESTApi.js";
import Layer from "../classes/Layer.js";
import ServerRouter from "./ServerRouter.js";
import Database from "../rest/database/Database.js";
import Network, { Layer as NetworkLayer } from "./Network.js";

export enum Policies {
    Private = "private",
    None = "Not Defined"
}

export enum Layers {
    Connection = "connection",
    RESTApi = "api",
    Database = "database",
    Analizier = "analizing",
}

export enum Constants {
    Default_Port = process.env.DEFAULT_PORT ? parseInt(process.env.DEFAULT_PORT) : 80
}


export interface NetworkLayers {
    createNew(Type: Layers, layer: Layer): NetworkLayer;
}

export default class Server {
    public static Database: Database;

    public expressApp: express.Express;
    private restApi: RESTApi;
    private router: ServerRouter;
    private port: number;
    private whitelist: Data_Structures.List<string> | null;
    private policy: Policies;
    private corsPolicy: cors.CorsOptions;
    private static layers: Data_Structures.List<{ type: Layers, layer: Layer }>;

    public static createLayer(type: Layers) {
        const With = Server.layers.findOne((v) => v?.type === type);
        return With ? With.layer : null;
    };

    constructor(restApi: RESTApi, port?: number) {
        Server.Database = new Database(new Database.Client());
        Server.layers = new Data_Structures.List<{ type: Layers, layer: any }>();
        this.expressApp = express();
        this.restApi = restApi;
        this.port = port || -1;
        this.whitelist = null;
        this.policy = Policies.None;
        this.corsPolicy = {};
        this.getRESTApi.bind(this);
        this.getRouter.bind(this);
        this.getPort.bind(this);
        this.getWhitelist.bind(this);
        this.getPolicy.bind(this);
        this.getCorsPolicy.bind(this);
        this.setRouter.bind(this);
        this.setPort.bind(this);
        this.setWhitelist.bind(this);
        this.setPolicy.bind(this);
        this.setCorsPolicy.bind(this);
        this.listen.bind(this);
        this.addLayer.bind(this);
        this.#onLayerFinished.bind(this);
        this.run.bind(this);
        this.verifyIp.bind(this);
    };


    public getRESTApi(): RESTApi {
        return this.restApi;
    }

    public getRouter(): ServerRouter {
        return this.router;
    }

    public getPort(): number {
        return this.port;
    }

    public getWhitelist(): Data_Structures.List<string> | null {
        return this.whitelist;
    }

    public getPolicy(): Policies {
        return this.policy;
    }

    public getCorsPolicy(): cors.CorsOptions {
        return this.corsPolicy;
    }

    public setRouter(router: ServerRouter): void {
        this.#onLayerFinished(router.getLayer(), router.run);
        this.router = router;
    }

    public setPort(port: number = Constants.Default_Port): void {
        this.port = port;
    }

    public setWhitelist(list: Data_Structures.List<string>): void {
        this.whitelist = list;
    }

    public setPolicy(policy: Policies): void {
        this.policy = policy;
    }

    public setCorsPolicy(corsPolicy: cors.CorsOptions): void {
        this.corsPolicy = corsPolicy;
    }

    public listen(callback?: (server: Server) => any, port: number = Constants.Default_Port) {
        if (port && this.port == -1) this.setPort(port);
        if (!this.port) throw new Error("ProsTeam ServerERROR: None Port has Provided!");
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(helmet());
        this.expressApp.use(cors(this.corsPolicy));
        this.expressApp.use(this.verifyIp);
        this.expressApp.disable("x-powered-by");
        this.expressApp.enable("trust proxy");
        callback?.(this);
    }

    public addLayer<T extends Layer = Layer>(For: string, Type: Layers, Layer: T) {
        Server.layers.add({ type: Type, layer: Layer });
        const network = new Network();
        this.expressApp.use(For, (req, res, next) => {
            if (Type === Layers.Connection) {
                network.createNew(Type, Layer).pass({ socket: req.socket }, req, res, next);
            } else if (Type === Layers.RESTApi) {
                network.createNew(Type, Layer).pass({ api: this.restApi }, req, res, next);
            } else if (Type === Layers.Database) {
                network.createNew(Type, Layer).pass({ database: Server.Database }, req, res, next);
            } else if (Type === Layers.Analizier) {
                network.createNew(Type, Layer).pass({ decrypt: this.restApi.decrypt, format: "json" }, req, res, next);
            };
        });
    }

    #onLayerFinished(type: Layers, run: (app: express.Application, request: express.Request, response: express.Response, next: express.NextFunction) => any) {
        const Network_Layer = Server.layers.findOne((nl) => nl?.type === type);
        if (Network_Layer) Network_Layer.layer.on("finish", (app: express.Application, request: express.Request, response: express.Response, next: express.NextFunction) => {
            run(app, request, response, next);
        });
    };

    public run(callback?: (server: Server) => any): void {
        if (this.port == -1) throw new Error("ProsTeam ServerERROR: None Port has Provided!");
        const server = this.expressApp.listen(this.port, () => {
            if (callback) callback(this);
        });
        server.keepAliveTimeout = (60 * 1000) + 1000;
        server.headersTimeout = (60 * 1000) + 2000;
    }

    private readonly verifyIp: express.RequestHandler = (req, res, next) => {
        console.log("verifing ip");
        const ip = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"][0] : req.socket.remoteAddress;
        console.log("ip verified");
        next();
        /*  if (this.whitelist?.contains(ip || "")) {
              console.log("ip verified");
              next();
          } else {
              next(new ServerError("ProsTeam ServerERROR", "Invalid Server Ip"));
          }*/
    }
}
