---
title: "JS Example"
showDate: false
showTableOfContents: true
showPagination: false
showAuthor: false
---

### Data Immutability

```js
// 원시 데이터 (불변)
// string, number, boolean, undefined, null
// |a: 1  |b: 3
// |a: 1  |b: 1
// |a: 1  |b: 5
// |a: 1  |b: 5  |c: 1
let a = 1;
let b = 3;
console.log(a, b, a === b); // -> 1 3 false
b = a;
console.log(a, b, a === b); // -> 1 1 true
b = 5;
console.log(a, b, a === b); // -> 1 5 false
let c = 1;
console.log(a, c, a === c); // -> 1 1 true

// 참조형 데이터 (가변)
// object, array, function
// |x: heapX  |y: heapY  // heapX:        heapY:
// |x: heapX  |y: heapY  // heapX: |k: 1  heapY: |k: 1
// |x: heapX  |y: heapY  // heapX: |k: 3  heapY: |k: 3
// |x: heapX  |y: heapX  // heapX: |k: 3
// |x: heapX  |y: heapX  // heapX: |k: 5
let x = {};
let y = {};
console.log(x, y, x === y); // -> {} {} false
x = { k: 1 };
y = { k: 1 };
console.log(x.k, y.k, x.k === y.k); // -> 1 1 true
console.log(x, y, x === y); // -> {k:1} {k:1} false
x.k = 3;
y.k = 3;
console.log(x, y, x === y); // -> {k:3} {k:3} false
y = x;
console.log(x, y, x === y); // -> {k:3} {k:3} true
y.k = 5;
console.log(x, y, x === y); // -> {k:5} {k:5} true
```

### Callback

```js
function timeout(cb) {
  setTimeout(() => {
    console.log("start");
    // 함수의 실행 위치 보장
    cb();
  }, 1000);
}

timeout(() => {
  console.log("done");
});
```

### Closure

```js
const makeCounter = (x) => {
  // 함수 변경 없이 value에 할당 불가능 (캡슐화)
  let value = x;

  // 내부함수 여러개 생성 가능
  return {
    // 스코프 체이닝 (하위 스코프 우선)
    up: (x) => {
      value += x;
      return value;
    },
    down: (y) => {
      value -= y;
      return value;
    },
  };
};

// 함수 재활용 가능
const counter1 = makeCounter(1);
const counter2 = makeCounter(2);
counter1.up(7); // -> 8
counter2.down(7); // -> -5
counter2.up(7); // -> 2
// counter1과 counter2의 value는 서로에게 영향 X
```

### Curry

```js
const greeting = (x) => {
  return (y) => {
    return `${x} ${y}`;
  };
};

// 함수 재활용 가능
const hello = greeting("Hello");
const goodMorning = greeting("goodMorning");
hello("guys"); // -> 'Hello guys'
hello("ladies"); // -> 'Hello ladies'
goodMorning("guys"); // -> 'goodMorning guys'
goodMorning("ladies"); // -> 'goodMorning ladies'
```

### Class

```js
/* 클래스 */
class Vehicle {
  constructor(name, wheel) {
    // 클래스의 파라미터
    this.name = name;
    this.wheel = wheel;
  }
}

/* 클래스 상속 */
class Car extends Vehicle {
  constructor(name, wheel, year) {
    // 상위 클래스의 파라미터
    super(name, wheel);
    // 하위 클래스의 파라미터
    this.year = year;
  }
}

// 공통 메서드
Vehicle.prototype.getInfo = function () {
  console.log(`${this.name}(${this.license})`);
};

// 클래스로 객체 생성
const myCar = new Car("벤츠", 4, "2016");
const yourCar = new Car("BMW", 4, "2020");

myCar.getInfo(); // -> 벤츠(2016)
yourCar.getInfo(); // -> BMW(2020)
```

### This

```js
const obj1 = {
    normal: function() {
        console.log(this)
    },
    arrow: () => {
        console.log(this)
    }
}

obj1.normal() // 메서드 호출, this === obj1
const obj11 = obj1.normal
obj11() // 일반 호출, this === window
obj1.arrow() // this === { }

---

const obj2 = {
    normal: function () {
        setTimeout(function () {
            console.log(this)
        }, 1000)
    },
    arrow: function () {
        setTimeout(() => {
            console.log(this)
        }, 1000)
    }
}

obj2.normal() // this === window
// obj2의 normal을 메서드 호출
// -> normal의 setTimeout함수(내부함수)를 일반 호출
obj2.arrow() // this === obj2

---

const obj3 = {
    name: 'yuchan',
    outer: function () {
      console.log(this); // --- (1)obj3
      const innerFunc = function () {
        console.log(this); // --- (2)window (3)obj4
      };
      innerFunc(); // --- (2)

      const obj4 = {
        name: 'che',
        innerMethod: innerFunc,
      };
      obj4.innerMethod(); // --- (3)
    },
};

obj3.outer(); // --- (1)
// (1)메서드 호출 (2)일반 호출 (3)메서드 호출
```
