---
title: "TS Example"
showDate: false
showTableOfContents: false
showPagination: false
showAuthor: false
---

### Unknown

```ts
declare const maybe: unknown;
if (typeof maybe === "boolean") {
  const aBoolean: boolean = maybe;
}
if (typeof maybe === "string") {
  const aString: string = maybe;
}
```

### Getter & Setter

```ts
class Person {
  constructor(private _name: string, private _age: number) {}

  // 추가로 뭔가 할 수 있음
  /* Getter */
  get name() {
    return `Mr.${this._name}`;
  }

  get age() {
    return `${this._age}세`;
  }

  /* Setter */
  set age(age: number) {
    this._age = age;
  }
}

const yuchan: Person = new Person("Yuchan", 27);

console.log(yuchan.name); // -> Mr.Yuchan
console.log(yuchan.age); // -> 27세

yuchan.name = "Yuchan"; // -> error (Setter가 없어서)
yuchan.age = 28;
console.log(yuchan.age); // -> 28세
```

### Generic

```ts
// 1 - 배열의 요소 타입
function getLen<T>(arr: T[]): number {
  return arr.length;
}

getLen(["a", "b", "c"]);
getLen([1, 2, 3]);
getLen<boolean>([true, true, false]);

// 2 - 객체의 value 타입
interface Mobile<T> {
  company: string;
  price: number;
  option: T;
}

const Iphone: Mobile<object> = {
  company: "Apple",
  price: 123,
  option: {
    color: "red",
  },
};

const Galaxy: Mobile<null> = {
  company: "Samsung",
  price: 123,
  option: null,
};

// 3 상속
interface User {
  name: string;
  age: number;
}

interface Mobile {
  company: string;
  price: number;
}
``;

const user: User = { name: "yuchan", age: 28 };
const phone: Mobile = { company: "Iphone", price: 123 };

function findName<T extends { name: string }>(data: T): string {
  return data.name;
}

interface User {
  name: string;
  age: number;
}

interface Mobile {
  company: string;
  price: number;
}
``;

const user: User = { name: "yuchan", age: 28 };
const phone: Mobile = { company: "Iphone", price: 123 };

function findName<T extends { name: string }>(data: T): string {
  return data.name;
}

findName(user);
findName(phone); // error

//4
/* 일부는 required 일부는 optional로 받도록 설정 */
interface Person {
  name: string;
  age: number;
  gender: string;
}

type PickPerson = Pick<Person, "name" | "age"> &
  Pick<Partial<Person>, "gender">;
const pickPerson: PickPerson = {
  name: "Jade", // required
  age: 29, // required
  gender: "male", // optional
};
```

## as const

```ts
let hello = "world";
// hello: string

const hello = "world";
// hello: "world"

let hello = "world" as const;
// hello: "world"
```
