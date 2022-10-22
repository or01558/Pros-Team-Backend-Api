import sha256 from "sha256";
import Database from "./database/Database.js";
import express from "express";
import crypto from "crypto";

export default class RESTApi {
    private _genKey: number[];
    private database: Database;

    constructor(_genKey: string) {
        this._genKey = sha256(_genKey, { asBytes: true });
        console.log(_genKey, "api key");
        this.database = new Database(new Database.Client());
        this.hasAccess.bind(this);
        this.verify.bind(this);
        this.decrypt.bind(this);
    }

    decrypt = (data : string) => {
        const iv = Buffer.from([
            137, 69, 171, 8, 102, 75,
            142, 106, 211, 142, 113, 48,
            239, 56, 38, 26
        ]);
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this._genKey), iv);
        let decryptedData = decipher.update(data, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        return decryptedData;
    };

    public hasAccess(key: string): boolean {
        return key === this._genKey.toString();
    }

    public verify(req: express.Request): boolean {
        //verify request data..
        return true;
    };
}