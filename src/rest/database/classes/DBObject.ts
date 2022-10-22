import Data_Structures from "../../../../Data-Structures/src/index.js";
import Generator from "../../../generators/Generator.js";

export type Reference = { dataType: string, object?: (id: string) => DBObject<any, any>, selfName: string, columnName: string, dependsOn?: boolean, list: boolean, defaultValues?: { name: string, values: Data_Structures.IObjectKeys } };

export default class DBObject<T extends DBObject<T, K>, K extends Data_Structures.IObjectKeys> {

    #references: Data_Structures.List<Reference>;
    #dataType: string;
    #id: string | null;
    properties: K | Data_Structures.IObjectKeys;
    #state: string | null;


    static createNull<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(id: string, dataType?: string): DBObject<U, V> {
        return DBObject.createFrom({ id, dataType: dataType || "" });
    };

    static createFrom<U extends DBObject<U, V>, V extends Data_Structures.IObjectKeys>(obj: { dataType?: string, id?: string | null, properties?: Data_Structures.IObjectKeys, state?: string | null }): DBObject<U, V> {
        const { dataType, id, properties, state } = obj;
        const o = new DBObject<U, V>(dataType || "", id || null, properties || {}, state || null);
        return o;
    };

    private createRefObject(datatype: string, values: Data_Structures.IObjectKeys) {
        const obj: { datatype: string, value: Data_Structures.IObjectKeys } = { datatype, value: {} };
        for (const property in values) {
            obj.value[property] = values[property];
        };
        return obj;
    }

    private initValues(id: string, data: K | Data_Structures.IObjectKeys, references?: Data_Structures.List<Reference>): K | Data_Structures.IObjectKeys {
        references?.forEach((reference) => {
            const selfName = reference?.selfName;
            if (reference && selfName) {
                const current = data[selfName] || {};
                let value: any;
                if (reference.object && Object.keys(current).length !== 0) {
                    const obj = reference.object("");
                    value = reference.list ? new Data_Structures.List<typeof obj>() : reference.object(data[selfName] ? data[selfName] : Generator.Ids.generate());
                } else if (reference.defaultValues && !reference.object) {
                    const obj = this.createRefObject(reference.dataType, reference.defaultValues.values);
                    for (const property in current) {
                        if (current[property] !== undefined) obj["value"][property] = current[property];
                    }
                    value = obj;
                };
                //@ts-expect-errors
                data[selfName] = value;
            };
        });
        return data;
    };

    private initProperties(id: string, data: K | Data_Structures.IObjectKeys, references?: Data_Structures.List<Reference>) {
        data = this.initValues(id, data, references);

        references?.forEach(reference => {
            if (reference && !reference.object) {
                const { selfName, dataType } = reference;
                const value = data[selfName];
                //@ts-expect-errors
                if (value && !("datatype" in value)) data[value] = { datatype: dataType, value };
            };
        });

        return data;
    };

    constructor(dataType: string, id: string | null, properties: K | Data_Structures.IObjectKeys = {}, state: string | null = null, references?: Data_Structures.List<Reference>) {
        this.#references = references ? references : new Data_Structures.List<Reference>();
        if (id)
            properties = this.initProperties(id, properties, references);
        this.#dataType = dataType;
        this.#id = id;
        this.properties = properties;
        this.#state = null;
        this.createFrom.bind(this);
        this.getReferences.bind(this);
        this.getDataType.bind(this);
        this.getId.bind(this);
        this.getProperties.bind(this);
        this.getState.bind(this);
        this.getProps.bind(this);
        this.getValues.bind(this);
        this.getPropsAndValues.bind(this);
    };

    createNull(id: string, datatype?: string): DBObject<T, K> {
        return DBObject.createNull(id, datatype);
    };

    createFrom(obj: { dataType?: string, id?: string | null, properties?: Data_Structures.IObjectKeys, state?: string | null }): DBObject<T, K> {
        return DBObject.createFrom(obj);
    };

    getReferences(): Data_Structures.List<Reference> {
        return this.#references;
    };

    getDataType(): string {
        return this.#dataType;
    };

    getId(): string | null {
        return this.#id;
    };

    getProperties(): K | Data_Structures.IObjectKeys {
        return this.properties;
    };

    getState(): string | null {
        return this.#state;
    };

    getProps(sign: string = "$") {
        const properties = this.properties;
        let props = "";
        for (const prop in properties) {
            if (props === "")
                props += `${prop}`;
            else
                props += ` ${sign} ${prop}`;
        }
        ;
        return props;
    };

    getValues(sign: string = "#") {
        const properties = this.properties;
        let values = "";
        for (const prop in properties) {
            let value = properties[prop];
            if (value instanceof DBObject || typeof value === "object") value = value instanceof Data_Structures.List ? this.getId() : (value instanceof DBObject ? value.getId() : value.value.id);
            value = typeof value === "string" ? `"${value}"` : value;
            if (values === "")
                values += value;
            else
                values += ` ${sign} ${value}`;
        }
        ;
        return values;
    };

    getPropsAndValues(propsSign: string = "$", valuesSign: string = "#") {
        const props = this.getProps(propsSign);
        const values = this.getValues(valuesSign).split(valuesSign);
        const results = props.split(propsSign);
        let str = "";
        let i = 0;
        results.forEach((prop) => {

            results[i] = `${prop.trim()} ${propsSign} ${values[i].trim()}${results.indexOf(prop) < results.length - 1 ? valuesSign : ""} `;
            i++;
        });

        results.forEach(result => {
            str += result;
        })

        return str;

    };
}
