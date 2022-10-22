var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => src_default
});
var Data_Structures;
(function(Data_Structures2) {
  class List extends Object {
    size;
    lst;
    values;
    constructor() {
      super();
      this.size = 0;
      this.lst = null;
      this.values = [];
    }
    set = (index, value) => {
      this.values[index] = value;
      return this;
    };
    add = (value) => {
      const values = this.values;
      if (values.length == 0)
        values.unshift(value);
      else
        values.push(value);
      this.size++;
      if (this.lst)
        this.lst.add(value);
      return this;
    };
    remove = (index) => {
      const values = this.values;
      const arr = [];
      for (let i = 0; i < values.length; i++) {
        if (i != index) {
          const value = values[i];
          if (arr.length == 0)
            arr.unshift(value);
          else
            arr.push(value);
        }
      }
      this.values = arr;
      if (this.lst)
        this.lst.remove(index);
      this.size--;
      return this;
    };
    indexOf = (value) => {
      const values = this.values;
      for (let i = 0; i < values.length; i++) {
        if (values[i] === value)
          return i;
      }
      ;
      return -1;
    };
    getIndexIf = (condition) => {
      const values = this.values;
      for (let i = 0; i < values.length; i++) {
        if (condition(values[i]))
          return i;
      }
      ;
      return -1;
    };
    forEach = (callback) => {
      for (let i = 0; i < this.size; i++) {
        callback(this.values[i]);
      }
      return this;
    };
    delete = (condition) => {
      const values = this.values;
      for (let i = 0; i < values.length; i++) {
        if (condition(values[i])) {
          this.remove(i);
          if (this.lst)
            this.lst.remove(i);
        }
      }
      ;
      return this;
    };
    first = () => {
      return this.values[0] || null;
    };
    get = (index) => {
      return this.values[index] || null;
    };
    find = (condition) => {
      const values = this.values;
      const results = [];
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (condition(value)) {
          if (results.length == 0) {
            results.unshift(value);
          } else
            results.push(value);
        }
        ;
      }
      ;
      return results;
    };
    findOne = (condition) => {
      const values = this.values;
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (condition(value))
          return value;
      }
      ;
      return null;
    };
    contains = (value) => {
      const values = this.values;
      for (let i = 0; i < values.length; i++) {
        if (value === values[i])
          return true;
      }
      ;
      return false;
    };
    exists = (condition) => {
      const values = this.values;
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (condition(value))
          return true;
      }
      ;
      return false;
    };
    clear = () => {
      this.values = [];
      this.size = 0;
      return this;
    };
    addReference = (source) => {
      const values = this.values;
      for (let i = 0; i < values.length; i++) {
        source.add(values[i]);
      }
    };
    createReference = (lst) => {
      this.addReference(lst);
      this.lst = lst;
    };
    mergeWith = (lst) => {
      lst.createReference(this);
      return this;
    };
    static notNULL = (list) => {
      return this.length == 0;
    };
    equals = (list) => {
      if (this.size !== list.size)
        return false;
      let i = 0;
      this.forEach((v) => {
        if (list.get(i) !== v)
          return false;
        i++;
      });
      return true;
    };
    toString() {
      let str = "";
      for (let i = 0; i < this.values.length; i++) {
        str += this.values[i];
      }
      return str;
    }
    toArray() {
      return this.values;
    }
  }
  Data_Structures2.List = List;
})(Data_Structures || (Data_Structures = {}));
;
var src_default = Data_Structures;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map
