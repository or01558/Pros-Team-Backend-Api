import Data_Structures from "../../Data-Structures/src/index.js";
import getRandomInt from "../functions/getRandomInt.js";

const { List } = Data_Structures;

const signs: Data_Structures.List<string> = new List<string>();
const numbers: Data_Structures.List<string> = new List<string>();
const letters: Data_Structures.List<string> = new List<string>();
signs.add("$");
signs.add("#");
signs.add("%");
signs.add("@");
signs.add("^");
signs.add("&");
signs.add("*");
signs.add("(");
signs.add(")");
for (let i: number = 0; i <= 9; i++) {
    numbers.add(i.toString());
};
for (let i: number = 65; i <= 90; i++) {
    letters.add(String.fromCharCode(i));
};
for (let i: number = 97; i <= 122; i++) {
    letters.add(String.fromCharCode(i));
};


export default class KeyGenerator {

    constructor(){
        this.generate.bind(this);
        this.genarateChars.bind(this);
    };
    
    generate(): string {
        let keys: Data_Structures.List<Data_Structures.List<string>> = new List<Data_Structures.List<string>>();
        for (let i: number = 0; i < 16; i++) {
            const count: number = getRandomInt(1, 2);

            for (let j = 0; j < count; j++) {
                const chance: number = getRandomInt(1, 3);
                if (chance == 1) {
                    keys.add(this.genarateChars(signs, true));
                } else if (chance == 2) {
                    keys.add(this.genarateChars(numbers, true));
                } else if (chance == 3) {
                    keys.add(this.genarateChars(letters, true));
                }
            }

        }

        return keys.toString();
    }

    private genarateChars(chars: Data_Structures.List<string>, randomCount?: boolean): Data_Structures.List<string> {
        const generated: Data_Structures.List<string> = new List<string>();

        const chance = randomCount ? getRandomInt(1, 2) : 1;

        for (let j: number = 0; j < chance; j++) {
            let charIndex: number = Math.floor(Math.random() * chars.size);
            let char: string = chars.get(charIndex) || "";
            while (!char) {
                charIndex = Math.floor(Math.random() * chars.size);
                char = chars.get(charIndex) || "";
            };
            generated.add(char);
        };

        return generated;
    };
}

