import Server from "./src/classes/Server.js";
import DBTable, { VarcharType } from "./src/rest/database/classes/DBTable.js";
import Tables from "./src/rest/database/classes/Tables.js";
import UserObject, { User } from "./src/rest/database/objects/users/UserObject.js";


export default async function testDatabase() {
    const db = Server.Database;
    const user = new UserObject("1k1k1k", {
        username: "Or",
        password: "123456",
        email: "orchoo9@gmail.com", 
    });
    db.createObject(user).then(v => {
        console.log(v);
    }).catch(err => console.log(err));
}
;
//# sourceMappingURL=testDatabase.js.map
//# sourceMappingURL=testDatabase.js.map