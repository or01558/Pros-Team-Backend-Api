declare namespace Data_Structures {

    export interface IObjectKeys {
        [key: string]: any;
    }

    export class List<T>{
        public size: number;
        private lst: List<T> | null;
        private values: Array<T | null>;

        public readonly set: (index: number, value: T | null) => List<T>;

        public readonly add: (value: T | null) => List<T>;

        public readonly remove: (index: number) => List<T>;

        public readonly indexOf: (value: T) => number;

        public readonly getIndexIf: (condition: (value: T | null) => boolean) => number;

        public readonly forEach: (callback: (value: T | null) => void) => List<T>;

        public readonly delete: (condition: (value: T | null) => boolean) => List<T>;

        public readonly first: () => T | null;

        public readonly get: (index: number) => T | null;

        public readonly find: (condition: (value: T | null) => boolean) => Array<T | null>;

        public readonly findOne: (condition: (value: T | null) => boolean) => T | null;

        public readonly contains: (value: T | null) => boolean;

        public readonly exists: (condition: (value: T | null) => boolean) => boolean;

        public readonly clear: () => List<T>;

        private readonly addReference: (source: List<T>) => void;

        private readonly createReference: (lst: List<T>) => void;

        public readonly mergeWith: (lst: List<T>) => List<T>;

        private readonly executeFunction: (name: string, value: T | null | number | ((value: T | null) => boolean)) => void;

        public static readonly notNULL: (list: List<any>) => boolean;

        public readonly equals: (list: List<any>) => boolean;

        public readonly toString: () => string;
        public readonly toArray: () => (T | null)[];


    }

}

export default Data_Structures;