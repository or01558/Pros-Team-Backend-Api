import { config as Config } from "dotenv";
import Data_Structures from "./Data-Structures/src/index.js";
import Server, { Layers, Policies } from "./src/classes/Server.js";
import ServerRouter from "./src/classes/ServerRouter.js";
import Generator from "./src/generators/Generator.js";
import Analizier from "./src/layers/Analizer.js";
import Api from "./src/layers/Api.js";
import Connection from "./src/layers/Connection.js";
import Database from "./src/layers/Database.js";
import RESTApi from "./src/rest/RESTApi.js";
import testDatabase from "./testDatabase.js";

const { List } = Data_Structures;

//creates and generates config for a new server with new RestApi and new KeyGen value
Config();
const server = new Server(new RESTApi(Generator.KeyGen.generate()));
const whitelist = server.getWhitelist();
const ips: string[] = [];
if (whitelist) whitelist.forEach(v => {
    if (v == null) return;
    if (ips.length == 0) ips.unshift(v);
    else ips.push(v);
});

//setup the server environment
server.setPort(5000);
server.setWhitelist(new List<string>().add(process.env.webServer || null).add(process.env.appServer || null));
server.setPolicy(Policies.Private);
server.setCorsPolicy({ origin: ips.length == 0 ? "*" : ips, methods: ["GET", "POST", "DELETE", "PUT"], credentials: true, maxAge: 120, preflightContinue: true, optionsSuccessStatus: 200 });

//add listener for the server
server.listen(() => {

    //add layers
    server.addLayer("*", Layers.Connection, new Connection());
    server.addLayer("*", Layers.RESTApi, new Api());
    server.addLayer("*", Layers.Database, new Database());
    server.addLayer("*", Layers.Analizier, new Analizier());

    //set the a new server router with the rest api that runs after the Validater layer
    server.setRouter(new ServerRouter(server.getRESTApi(), Layers.Analizier));

    //connect to the database
    Server.Database.get().connect(() => {

        testDatabase();
        //run the server
        server.run();

    });
});
