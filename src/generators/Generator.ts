import KeyGenerator from "./KeyGenerator.js";
import UniqueIdGenerator from "./UniqueIdGenerator.js";

export default class Generator {
    public static KeyGen = new KeyGenerator();
    public static Ids = new UniqueIdGenerator();
}