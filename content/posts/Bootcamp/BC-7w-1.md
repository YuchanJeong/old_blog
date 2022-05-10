---
title: "BC-7w-1 / [JS/Node] 객체지향 프로그래밍"
date: 2021-10-05
categories:
  - <Bootcamp>
tags:
  - JavaScript
---

## Today I learned

### 클래스를 이용한 모듈화

#### 클로저 모듈 패턴

```js
function makeCounter() {
  return {
    value: 0,
    increase: function () {
      this.value++; // 메소드 호출을 할 경우, this는 makeCounter 함수가 리턴하는 익명의 객체
    },
    decrease: function () {
      this.value--;
    },
    getValue: function () {
      return this.value;
    },
  };
}

let counter1 = makeCounter();
counter1.increase();
counter1.getValue(); // 1

let counter2 = makeCounter();
counter2.decrease();
counter2.decrease();
counter2.getValue(); // -2
```

#### 클래스와 인스턴스

```js
//// 클래스(original form)
class Car {
  // 인스턴스가 초기화될 때 실행하는 생성자 함수
  constructor(brand, name, color) {
    // 속성
    this.brand = brand;
    this.name = name;
    this.color = color;
  }
  // 메소드
  refuel() {}
  drive() {}
}

// 원형 객체(original form)
// 공통적인 정보는 여기 작성하는 것이 효율적
Car.prototype.printName = function () {
  console.log(this.name);
};

//// 인스턴스(instance object)
let mini = new Car("bmw", "mini", "black");
let beetles = new Car("volkswagen", "beetles", "yellow");

mini.brand; // 'bmw'
mini.refuel();

beetles.color; // "yellow"
beatles.drive();
```

```js
// 배열은 Array의 인스턴스를 만드는 것과 동일
let arr = ["a", "b", "c"];
arr.length; // 3
arr.push("d");

let arr = new Array("a", "b", "c");
arr.length; // 3
arr.push("d");
```

### Prototype

#### 객체 지향 프로그래밍

- 객체 지향 프로그래밍(OOP, Object-oriented programming)은, 데이터(속성)와 기능(메소드)을 한곳에 묶어서 처리
- 캡슐화(Encapsulation)
  - 데이터와 기능을 하나의 단위에 묶음
  - 은닉
    - 구현은 숨기고 동작은 노출시킴
    - 엄격한 클래스는 setter와 getter를 사용
- 추상화(Abstraction)
  - 노출되는 부분을 단순하게 만듦
  - 필요하지 않은 것을 노출시키지 않고, 단순한 이름으로 정의
  - 인터페이스
    - 메소드와 속성만 정의한 것
- 상속(Inheritance)
  - 상위 클래스의 속성을 상속받고, 하위 클래스에 속성 추가 가능
  - JS에서는 extends 와 super 키워드를 이용해서 상속을 구현
- 다형성(Polymorphism)
  - 똑같은 메소드라도, 다른 방식으로 구현 가능
  - 동일한 메소드에 대해 if/else if와 같은 조건문 대신 객체의 특성에 맞게 달리 작성

#### 프로토타입과 프로토타입 체인

- prototype
  - 프로토타입 체인을 통해 상속하고자 하는 속성과 메소드를 담아두는 버킷으로 주로 사용되는 객체
- prototype chain
  - 해당 클래스 혹은 인스턴스부터 상위 클래스까지 순서대로 속성과 메소드를 참조

### Sprint-Beesbeesbees

- extends와 super를 이용한 클래스 상속 실습

## Today's takeaway

- 컴퓨터의 사고방식은 절차적이지만, 사람의 사고방식은 객체 지향적이다.
- 재사용성은 유지, 보수에 큰 도움이 된다.
- section2 첫날이라서 그런지 매우 쉽게 구성되어 있었다.
