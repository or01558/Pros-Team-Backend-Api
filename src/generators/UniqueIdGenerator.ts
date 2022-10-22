export interface GeneratorOptions {
    unique?: boolean;
}


export default class UniqueIdGenerator {

    constructor(){
        this.generate.bind(this);
    };
    
    generate(options: GeneratorOptions = {}): string {
        return "";
    };
}