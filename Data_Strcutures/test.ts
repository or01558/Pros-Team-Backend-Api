import Data_Structures from "./src";
const lst : Data_Structures.List<number> = new Data_Structures.List<number>();
lst.add(5); // List{ values: [5]};

console.log(lst.exists(number => number == 4)) // false;

console.log(lst.exists(number => number == 5)) // true;

lst.add(9); // List{ values: [5, 9]};

lst.add(10); // List{ values: [5, 9, 10]};

lst.add(11); // List{ values: [5, 9, 10, 11]};

const results = lst.find(v => v == 1); //null array

const results2 = lst.find(v => v == 11); //[11]

const target = lst.findOne(num => num == 11); // 11

lst.delete(num => num == 11); // List{ values: [5, 9, 10]};

const target2 = lst.findOne(num => num == 11); // null

console.log(lst.size); // 3

lst.remove(0); // List{ values: [9, 10]};

console.log(lst.size); // 2;

console.log(Data_Structures.List.notNULL(lst)); // true

lst.clear();

console.log(Data_Structures.List.notNULL(lst)); // false
