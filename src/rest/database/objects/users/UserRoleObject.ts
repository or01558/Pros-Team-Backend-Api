import DBObject from "../../classes/DBObject.js";

export interface UserRole {
    roleId: string;
};

export interface UserRoleData {
    id: string | null;
    properties?: UserRole | {};
};

export default class UserRoleObject extends DBObject<UserRoleObject, UserRole>{

    public static createNull(id: string) {
        return new UserRoleObject(id);
    }

    public static createFrom({ id = null, properties = {} }: UserRoleData, state?: string): UserRoleObject {
        return new UserRoleObject(id, properties, state);
    };

    public createFrom({ id = null, properties = {} }: UserRoleData, state?: string): UserRoleObject {
        return UserRoleObject.createFrom({ id, properties }, state);
    };

    public createNull(id: string) {
        return new UserRoleObject(id);
    }

    constructor(id: string | null = null, properties: UserRole | {} = {}, state?: string) {
        super("user_roles", id, properties, state);
        this.createFrom.bind(this);
    }

}

