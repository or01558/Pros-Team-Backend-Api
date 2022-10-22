export default class DBType<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
        this.getValue.bind(this);
        this.setValue.bind(this);
    }

    getValue(): T {
        return this.value;
    };

    setValue(value: T): void {
        this.value = value;
    };
}