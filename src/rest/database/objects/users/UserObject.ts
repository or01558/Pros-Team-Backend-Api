import Data_Structures from "../../../../../Data-Structures/src/index.js";
import Generator from "../../../../generators/Generator.js";
import DBObject, { Reference } from "../../classes/DBObject.js";
import ProfileObject from "./profiles/ProfileObject.js";
import UserRoleObject from "./UserRoleObject.js";

export enum STATUSS {
    ONLINE = "online",
    OFFLINE = "offline",
    AFK = "afk",
    DND = "do not disturb",
};

export interface UserActivity {
    name?: string;
    type?: number;
    id?: string;
    icon?: string;
    image?: string;
    banner?: string;
    timeSpent?: string;
    user?: string;
};

export interface User {
    [key: string]: any;
    username: string;
    password: string;
    email: string;
    bot?: boolean;
    profile?: ProfileObject;
    roles?: Data_Structures.List<UserRoleObject>;
    status?: STATUSS;
    activity?: UserActivity | { datatype: "activities", value: UserActivity };
};


export interface UserData {
    id: string | null;
    properties?: User | Data_Structures.IObjectKeys;
};

export default class UserObject extends DBObject<UserObject, User> {

    private username: string;

    public static createFrom({ id = null, properties = {} }: UserData, state?: string): UserObject {
        return new UserObject(id, properties, state);
    };

    public createFrom({ id = null, properties = {} }: UserData, state?: string): UserObject {
        return this.createFrom({ id, properties }, state);
    };

    public createNull(id: string) {
        return new UserObject(id);
    }

    constructor(id: string | null = null, properties: User | {} = {}, state?: string) {
        if ("username" in properties) {
            properties.bot = properties.bot === undefined && id ? false : properties.bot;
            properties.status = properties.status === undefined && id ? STATUSS.ONLINE : properties.status;
        };

        const references = new Data_Structures.List<Reference>().add({ dataType: "profiles", object: ProfileObject.createNull, selfName: "profile", columnName: "id", dependsOn: true, list: false })
            .add({
                dataType: "activities", selfName: "activity", columnName: "user", dependsOn: true, list: false, defaultValues: {
                    name: "activities", values: {
                        name: "",
                        type: 0,
                        get id() {
                            return Generator.Ids.generate();
                        },
                        icon: "",
                        image: "",
                        banner: "",
                        timeSpent: "1-2-2023 13:22:",
                        user: "",
                    }
                }
            })
            .add({ dataType: "maps", selfName: "", columnName: "creator", dependsOn: true, list: true })
            .add({ dataType: "user_roles", object: UserRoleObject.createNull, selfName: "roles", columnName: "id", dependsOn: true, list: true });
        super("users", id, properties, state, references);//UserRoleObject
        this.username = "username" in properties ? properties.username : "";
        this.createFrom.bind(this);

    };

    getUsername(): string {
        return this.username;
    };

    comparePasswords(password: string): boolean {
        const properties = this.properties
        return "password" in properties && properties.password === password;
    };
    
};

