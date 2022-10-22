import mysql from "mysql";
export default class Client {

    #connection: mysql.Connection;
    connected: boolean;

    constructor() {
        const port = process.env.DATABASE_PORT;
        this.#connection = mysql.createConnection({ database: "PROS_TEAM", host: process.env.DATABASE_HOST, port: port ? parseInt(port) : -1, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD });
        this.connected = false;
        this.connect.bind(this);
        this.query.bind(this);
    };
    
    connect(callback: () => any) {
        this.#connection.connect({}, (err) => {
            if (err)
                throw err;
            this.connected = true;
            callback();
        });
        return true;
    };

    query(command: string) {
        return new Promise((resolve, reject) => {
            this.#connection.query(command, ((err, results, fields) => {
                if (err)
                    reject(err);
                if (results && fields) resolve(results);
                else if (fields) resolve(fields);
                else if (results) resolve(results);
                else resolve(undefined);
            }));
        });
    }
}
//# sourceMappingURL=Client.js.map