import Data_Structures from "../../../Data-Structures/src/index.js";
import DBObject, { Reference } from "./classes/DBObject.js";
import Tables from "./classes/Tables.js";
import DBClient from "./client/Client.js";

export type Client = DBClient;

export default class Database {
    static Client = DBClient;
    static Tables = Tables;
    static DBObject = DBObject;

    #client: DBClient;

    constructor(client: DBClient) {
        this.#client = client;
        Database.Tables.Client = client;
        this.get.bind(this);
        this.isConnected.bind(this);
        this.getReference.bind(this);
        this.getObject.bind(this);
        this.getObjectsById.bind(this);
        this.getObjects.bind(this);
        this.#getRefObject.bind(this);
        this.createObject.bind(this);
        this.deleteObject.bind(this);
        this.clearObjects.bind(this);
        this.updateObject.bind(this);
        this.findObject.bind(this);
        this.findObjects.bind(this);
    };

    get() {
        return this.#client;
    };

    isConnected() {
        return this.#client.connected;
    };

    async getReference(id: string, properties: Data_Structures.IObjectKeys, reference: Reference): Promise<Data_Structures.IObjectKeys | undefined> {
        if (reference && reference.selfName) {
            const createFunction = reference.object;
            let result = await this.getObjectsById(createFunction ? createFunction(id) : DBObject.createFrom({ dataType: reference.dataType, id }), reference.columnName);
            if (result) {
                if (reference.list) {
                    properties[reference.selfName] = result;
                } else
                    properties[reference.selfName] = result.size == 1 ? result.get(0) : result;
                return properties;
            } else if (reference.list) properties[reference.selfName] = new Data_Structures.List();
            return properties;
        };
    };

    async findObject<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U, callback: (obj: U | null) => boolean): Promise<U | null> {
        const objects = await this.getObjects(obj);
        if (!objects) return null;
       return objects.delete((value) => {
            return !callback(value);
        }).first();
    };

    async findObjects<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U, callback: (obj: U | null) => boolean): Promise<Data_Structures.List<U> | null> {
        const objects = await this.getObjects(obj);
        if (!objects) return null;
        return objects.delete((value) => {
            return !callback(value);
        });

    };


    getObject<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U, columnName?: string): Promise<U | null> {
        return new Promise<U | null>(async (resolve, reject) => {
            this.#client.query(`SELECT * FROM ${obj.getDataType()} WHERE ${columnName ? columnName : "id"} = ${`"${obj.getId()}"` || ""}`).then(async (results: any) => {
                if (results && results.length > 0 && results[0]) {
                    const { id } = results[0];
                    delete results[0].id;
                    let properties = results[0];
                    for (const prop of properties) {
                        if (prop.includes("`")) {
                            const updatedProp = prop.replace("`", "").replace("`", "");
                            properties[updatedProp] = properties[prop];
                            delete properties[prop];
                        };
                    };
                    const dbObject = obj.createFrom({ id });
                    const references = dbObject.getReferences();
                    for (let i = 0; i < references.size; i++) {
                        const reference = references.get(i);
                        if (reference)
                            await this.getReference(id, properties, reference);
                    }

                    resolve((dbObject.createFrom({ id, properties }) as U));
                }
                else
                    resolve(null);
            }).catch((err: unknown) => reject(err));
        });
    };

    getObjectsById<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U, columnName?: string): Promise<Data_Structures.List<U> | null> {
        return new Promise<Data_Structures.List<U> | null>((resolve, reject) => {
            this.#client.query(`SELECT * FROM ${obj.getDataType()} WHERE ${columnName ? columnName : "id"} = ${`"${obj.getId()}"` || ""}`).then(async (results: any) => {
                if (results !== undefined && results.length > 0) {
                    const dbObjects = new Data_Structures.List<U>();
                    results.forEach(async (result: any) => {
                        if (result) {
                            const { id } = result;
                            delete result.id;
                            const properties = result;
                            for (const prop of properties) {
                                if (prop.includes("`")) {
                                    const updatedProp = prop.replace("`", "").replace("`", "");
                                    properties[updatedProp] = properties[prop];
                                    delete properties[prop];
                                };
                            };
                            const dbObject = obj.createFrom({ id });
                            const references = dbObject.getReferences();
                            references.forEach(async (reference) => {
                                if (reference)
                                    await this.getReference(id, properties, reference);
                            });
                            dbObjects.add((dbObject.createFrom({ id, properties }) as U));
                        }
                        ;
                    });
                    resolve(dbObjects);
                }
                else
                    resolve(null);
            }).catch((err: unknown) => reject(err));
        });
    };

    getObjects<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U): Promise<Data_Structures.List<U> | null> {
        return new Promise<Data_Structures.List<U> | null>((resolve, reject) => {
            this.#client.query(`SELECT * FROM ${obj.getDataType()}}`).then(async (results: any) => {
                if (results !== undefined && results.length > 0) {
                    const dbObjects = new Data_Structures.List<U>();
                    for (const result of results) {
                        if (result) {
                            const { id } = result;
                            const dbObject = (await this.getObject(obj.createFrom({ id })) as U);
                            dbObjects.add(dbObject);
                        };
                    };
                    resolve(dbObjects);
                }
                else
                    resolve(null);
            }).catch((err: unknown) => reject(err));
        });
    };

    #getRefObject<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(value: any): U | Data_Structures.List<U> | null {
        const condition = ((typeof value === "object" && value) && ("datatype" in value) && ("value" in value && !(value.value instanceof DBObject)));
        if (value instanceof DBObject) return (value as U);
        else if (value instanceof Data_Structures.List<U>) {
            for (let i = 0; i < value.size; i++) {
                const obj = this.#getRefObject(value.get(i));
                value.set(i, obj);
            };
            return value;
        }

        return condition ? (new DBObject(value.datatype, value.value.id, Object.fromEntries(Object.entries(value.value).filter(([key, value]) => key !== "id"))) as U) : null;
    };

    createObject<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U): Promise<U> {
        return new Promise<U>(async (resolve, reject) => {
            const id = obj.getId();
            if (typeof id !== "string" || id.length == 0)
                return reject("DatabaseError: Cannot Create an object with null id");
            this.#client.query(`INSERT INTO ${obj.getDataType()} VALUES ("${id}", ${obj.getValues(",")})`).then(async () => {
                const properties = obj.getProperties();
                for (const property in properties) {
                    const value = properties[property];
                    const refObject = this.#getRefObject(value);
                    if (!refObject) continue;
                    if (refObject instanceof Data_Structures.List<U>) {
                        refObject.forEach(async (v) => {
                            if (v) await this.createObject((v as U));
                        });
                    } else await this.createObject((refObject as U));
                };
                resolve(obj);
            }).catch((err: unknown) => reject(err));
        });
    };

    deleteObject<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U, columnName?: string): Promise<DBObject<U, V>> {
        return new Promise<U>((resolve, reject) => {
            this.#client.query(`DELETE FROM ${obj.getDataType()} WHERE ${columnName ? columnName : "id"} = "${obj.getId()}"`).then(async () => {
                const references = obj.getReferences();
                for (let i = 0; i < references.size; i++) {
                    const reference = references.get(i);
                    if (reference && reference.dependsOn) {
                        const id = obj.getId();
                        const createFunction = reference.object;
                        if (id == null)
                            continue;
                        await this.deleteObject(createFunction ? createFunction(id) : DBObject.createFrom({ dataType: reference.dataType, id }), reference.columnName);
                    }
                };
                resolve(obj);
            }).catch((err: unknown) => reject(err));
        });
    };

    clearObjects<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U): Promise<DBObject<U, V>> {
        return new Promise<DBObject<U, V>>((resolve, reject) => {
            this.#client.query(`DELETE FROM ${obj.getDataType()}`).then(async () => {
                const references = obj.getReferences();
                for (let i = 0; i < references.size; i++) {
                    const reference = references.get(i);
                    if (reference)
                        await this.clearObjects((DBObject.createFrom({ dataType: reference.dataType, id: null }) as U));
                };
                resolve(obj.createFrom({ state: "success", id: null }));
            }).catch((err: unknown) => reject(err));
        });
    };

    updateObject<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: U, columnName?: string): Promise<DBObject<U, V>> {
        return new Promise<DBObject<U, V>>((resolve, reject) => {
            this.#client.query(`UPDATE ${obj.getDataType()} SET ${Tables.replaceWords(obj.getPropsAndValues("=", ","))} WHERE  ${columnName ? columnName : "id"} = "${obj.getId()}"`).then(async (result: any) => {
                const references = obj.getReferences();
                for (let i = 0; i < references.size; i++) {
                    const reference = references.get(i);
                    if (reference && reference.selfName) {
                        const value = obj.getProperties()[`${reference.selfName}`];
                        const refObject = this.#getRefObject(value);
                        if (!refObject) continue;
                        if (refObject instanceof Data_Structures.List) {
                            if (refObject.size == 0) {
                                await this.clearObjects((DBObject.createFrom({ dataType: reference.dataType, id: null }) as U));
                                continue;
                            };
                            refObject.forEach(async (v) => {
                                if (v) {
                                    await this.updateObject((v as U));
                                }
                            });
                        } else await this.updateObject((refObject as U));
                    }
                };

                if (result && ("affectedRows" in result && result.affectedRows == 0 && result.changedRows == 0)) return resolve(await this.createObject(obj));
                resolve(obj);
            }).catch((err: unknown) => reject(err));
        });
    }
    ;
}
;
//# sourceMappingURL=Database.js.map