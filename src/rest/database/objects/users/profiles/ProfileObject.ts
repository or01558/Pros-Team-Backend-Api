import Data_Structures from "../../../../../../Data-Structures/src/index.js";
import DBObject, { Reference } from "../../../classes/DBObject.js";
import MapObject from "../maps/MapObject.js";

export interface UserProfile {
    image?: string;
    nickname?: string;
    icon?: string;
    aboutMe?: string;
    skills?: string;
    creator?: boolean;
    creator_code?: string;
    maps: Data_Structures.List<MapObject>;
};


export interface ProfileData {
    id: string | null;
    properties?: UserProfile | {};
}

export default class ProfileObject extends DBObject<ProfileObject, UserProfile> {


    public static createNull(id: string) {
        return new ProfileObject(id);
    }

    public static createFrom({ id = null, properties = {} }: ProfileData, state?: string): ProfileObject {
        return new ProfileObject(id, properties, state);
    };

    public createNull(id: string) {
        return new ProfileObject(id);
    }

    public createFrom({ id = null, properties = {} }: ProfileData, state?: string): ProfileObject {
        return ProfileObject.createFrom({ id, properties }, state);
    };

    constructor(id: string | null = null, properties: UserProfile | Data_Structures.IObjectKeys = {}, state?: string) {
        const references = new Data_Structures.List<Reference>()
            .add({ dataType: "maps", object: MapObject.createNull, selfName: "maps", columnName: "creator", dependsOn: true, list: true });
        if (id) {
            properties.image = properties.image === undefined ? "" : properties.image;
            properties.nickname = properties.nickname === undefined ? "" : properties.nickname;
            properties.icon = properties.icon === undefined ? "" : properties.icon;
            properties.aboutMe = properties.aboutMe === undefined ? "" : properties.aboutMe;
            properties.skills = properties.skills === undefined ? "" : properties.skills;
            properties.creator = properties.creator === undefined ? false : properties.creator;
            properties.creator_code = properties.creator_code === undefined ? "" : properties.creator_code;

        };
        super("profiles", id, properties, state, references);
        this.createFrom.bind(this);
    };
};

