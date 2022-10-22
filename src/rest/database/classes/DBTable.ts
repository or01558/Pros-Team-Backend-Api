import { Varchar } from "../types/Varchar.js";
import DBColumn from "./DBColumn.js";

export interface ColumnsData {
    [name: string]: DBColumn;
};


export interface ConstraintsData {
    [name: string]: string;
};

export const VarcharType = function varchar(len: number) : DBColumn{
    return {
        type: Varchar,
        _sql_type_name: `varchar(${len})`,
    };
}

export const BigIntType: DBColumn = {
    type: BigInt,
    _sql_type_name: "bigint",
};

export const BooleanType: DBColumn = {
    type: Boolean,
    _sql_type_name: "boolean",
};


export const DateTimeType: DBColumn = {
    type: Date,
    _sql_type_name: "datetime",
};

export default class DBTable {

    private name: string;
    private types: ColumnsData;
    private constraints: any;

    constructor(name: string, types: ColumnsData, constraints: ConstraintsData) {
        this.name = name;
        this.types = types;
        this.constraints = constraints;
        this.getName.bind(this);
        this.getTypes.bind(this);
        this.getConstraints.bind(this);
        this.getColumns.bind(this);
    }

    getName(): string {
        return this.name;
    };


    getTypes(): ColumnsData {
        return this.types;
    };

    getConstraints(): any {
        return this.constraints;
    };

    getColumns(): string {
        const types = this.types;
        const constraints = this.constraints;
        let columns = "";
        for (const name in types) {
            const dbColumn = types[name];
            
            let column = `${name.includes("\"") ? `"${name}"` : name} ${dbColumn._sql_type_name} ${constraints[name] || ""}`;
            if (columns === "") columns += column;
            else columns += `, ${column}`;
        };

        return columns;
    };
};

