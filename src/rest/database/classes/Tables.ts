import Database, { Client } from "../Database.js";
import DBTable from "./DBTable.js";

export default class Tables {

    public static Client: Client | null = null;

    
    static replaceWords(value : string) : string{
        const words = ["key"];
        for (const word of words) {
            value = value.replace(word, `\`${word}\``);
        };

        return value;
    };

    public static create(table: DBTable): Promise<DBTable | null> {
        return new Promise<DBTable | null>((resolve, reject) => {
            const client = this.Client;
            if (!client) return reject("Tables Creation Error: Database client is null");
            client.query(`CREATE TABLE ${table.getName()} (${this.replaceWords(table.getColumns().trim())})`).then(() => {
                resolve(table);
            }).catch((err: unknown) => reject(err));
        });
    };

    public static delete(table: DBTable): Promise<DBTable | null> {
        return new Promise<DBTable | null>((resolve, reject) => {
            const client = this.Client;
            if (!client) return reject("Tables Deletion Error: Database client is null");
            client.query(`DROP TABLE ${table.getName()};`).then(() => {
                resolve(table);
            }).catch((err: unknown) => reject(err));
        });
    };

}

