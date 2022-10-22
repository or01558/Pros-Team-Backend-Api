import Data_Structures from "../../../../../../Data-Structures/src/index.js";
import DBObject, { Reference } from "../../../classes/DBObject.js";
import UserObject from "../UserObject.js";

export interface Map {
    name: string;
    icon: string;
    image: string;
    creator: UserObject;
};

export interface MapData {
    id: string | null;
    properties?: Map | {};
};

export default class MapObject extends DBObject<MapObject, Map>{

    public static createNull(id: string) {
        return new MapObject(id);
    }

    public static createFrom({ id = null, properties = {} }: MapData, state?: string): MapObject {
        return new MapObject(id, properties, state);
    };

    public createFrom({ id = null, properties = {} }: MapData, state?: string): MapObject {
        return MapObject.createFrom({ id, properties }, state);
    };

    public createNull(id: string) {
        return new MapObject(id);
    };

    constructor(id: string | null = null, properties: Map | {} = {}, state?: string) {
        const references = new Data_Structures.List<Reference>()
            .add({ dataType: "maps", object: MapObject.createNull, selfName: "maps", columnName: "creator", dependsOn: true, list: true });
        super("maps", id, properties, state, references);
        this.createFrom.bind(this);
        this.getReferences()
    };

};

