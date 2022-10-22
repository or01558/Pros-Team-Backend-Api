import DBType from "../classes/DBType.js";

export class Varchar extends DBType<String>{
    private chars: String[];
    private count: number;
    constructor(len: number) {
        super("");
        this.chars = new Array(len);
        this.count = 0;
    };

    getValue(): String {
        const chars = this.chars;
        let value = "";

        chars.forEach(char => {
            if (char.length > 1) throw new Error("VarChar Error: Char must be one length");
            value += char;
        });

        return value;
    };

    setValue(value: string): void {
        if (value.length !== this.chars.length) throw new Error("VarChar Error: Cannot create value that is bigger then the varchar length");
        for (const char of value) {
            this.add(char);
        };
        super.setValue(value);
    };

    add(char: string): Varchar {
        if (char.length > 1) throw new Error("VarChar Error: Char must be one length");
        if ((this.count + 1) > this.chars.length) throw new Error("VarChar Error: Cannot create value that is bigger then the varchar length");
        this.chars[this.count] = char;
        this.count++;
        return this;
    };

};

export default function varchar(len: number): Varchar {
    return new Varchar(len);
}

//const myVarChar = varchar(3).add("a").add("b").add("c"); // value is abc
//const otherVarChar = varchar(2).add("a").add("b").add("c"); //throws an error varchar length is 2
