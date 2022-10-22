namespace Data_Structures {

  export interface IObjectKeys {
    [key: string]: any;
  }

  export class List<T> extends Object {
    public size: number;
    private lst: List<T> | null;
    private values: Array<T | null>;

    constructor() {
      super();
      this.size = 0;
      this.lst = null;
      this.values = [];
    };

    public readonly set = (index: number, value: T | null) => {
      this.values[index] = value;
      return this;
    };

    public readonly add = (value: T | null) => {
      const values = this.values;
      if (values.length == 0) values.unshift(value);
      else values.push(value);
      this.size++;
      if (this.lst) this.lst.add(value);
      return this;
    };

    public readonly remove = (index: number) => {
      const values = this.values;
      const arr = [];

      for (let i = 0; i < values.length; i++) {

        if (i != index) {

          const value = values[i];
          if (arr.length == 0) arr.unshift(value);
          else arr.push(value);

        }
      }

      this.values = arr;
      if (this.lst) this.lst.remove(index);
      this.size--;
      return this;
    };

    public readonly indexOf = (value: T) => {
      const values = this.values;

      for (let i = 0; i < values.length; i++) {

        if (values[i] === value)
          return i;

      };

      return -1;
    }

    public readonly getIndexIf = (condition: (value: T | null) => boolean) => {
      const values = this.values;

      for (let i = 0; i < values.length; i++) {

        if (condition(values[i]))
          return i;

      };

      return -1;
    }

    public readonly forEach = (callback: (value: T | null) => void) => {
      for (let i = 0; i < this.size; i++) {
        callback(this.values[i]);
      }
      return this;
    };


    public readonly delete = (condition: (value: T | null) => boolean) => {
      const values = this.values;

      for (let i = 0; i < values.length; i++) {
        if (condition(values[i])) {
          this.remove(i);
          if (this.lst) this.lst.remove(i);
        }
      };
      return this;
    };

    public readonly first = () => {
      return this.values[0] || null;
    };

    public readonly get = (index: number) => {
      return this.values[index] || null;
    };

    public readonly find = (condition: (value: T | null) => boolean) => {
      const values = this.values;
      const results = [];

      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (condition(value)) {
          if (results.length == 0) {
            results.unshift(value);
          } else results.push(value);
        };
      };

      return results;
    };

    public readonly findOne = (condition: (value: T | null) => boolean) => {
      const values = this.values;

      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (condition(value)) return value;
      };

      return null;
    };

    public readonly contains = (value: T | null) => {
      const values = this.values;

      for (let i = 0; i < values.length; i++) {
        if (value === values[i]) return true;
      };

      return false;
    };

    public readonly exists = (condition: (value: T | null) => boolean) => {
      const values = this.values;

      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (condition(value)) return true;
      };

      return false;
    };

    public readonly clear = () => {
      this.values = [];
      this.size = 0;
      return this;
    };

    private readonly addReference = (source: List<T>) => {
      const values = this.values;

      for (let i = 0; i < values.length; i++) {
        source.add(values[i]);
      }
    };

    private readonly createReference = (lst: List<T>) => {
      this.addReference(lst);
      this.lst = lst;
    };

    public readonly mergeWith = (lst: List<T>) => {
      lst.createReference(this);
      return this;
    };

    public static readonly notNULL = (list: List<any>) => {
      return this.length == 0;
    };

    public readonly equals = (list: List<T>) => {
      if (this.size !== list.size) return false;
      let i: number = 0;

      this.forEach((v) => {
        if (list.get(i) !== v) return false;
        i++;
      });

      return true;
    };

    public override toString(): string {
      let str: string = "";
      for (let i = 0; i < this.values.length; i++) {
        str += this.values[i];
      }
      return str;
    }

    public toArray(): (T | null)[] {
      return this.values;
    };

  }

};

export default Data_Structures;