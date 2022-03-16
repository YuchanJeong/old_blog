---
title: "BC-3w-3 / [JS/Node] 자료형, 스코프, 클로저"
date: 2021-09-08
categories:
  - "'Bootcamp'"
tags:
  - JavaScript
---

# Toady I learned

### 원시 자료형과 참조 자료형

- 변수는 메모리의 이름표
- 원시형 자료는 하나의 변수에 하나의 값만 저장
- 참조형 자료는 변수에 값이 아닌 주소를 저장  
  (heap에 값을 저장하고 주소로 불러옴)

- 함수 changeValue에 x의 값을 파라미터로 전달하여 실행  
  (변수 x에 직접 할당한 것이 아니라 변수 x에는 여전히 9가 저장)

  ```js
  let x = 9;
  function changeValue(value) {
    value = 99;
  }
  changeValue(x);

  condole.log(x); // -> 9
  ```

- 함수 changeValue에 x의 주소를 파라미터로 전달하여 실행  
  (변수 x에 직접 할당한 것은 아니어도 해당 주소의 값에 할당)

  ```js
  let x = { value: 3 };
  function changeValue(address) {
    address.value = 2;
  }
  changeValue(x);

  console.log(x); // -> {value:2}​
  ```

### 스코프

- 함수 안에서 선언 시 지역 변수로 선언(함수 밖에서 참조 불가능)

  ```js
  let firstName = "Yuchan";
  let lastName = "Jeong";

  function changeName() {
    let firstName = "Chesley";
    lastName = "Mancao";

    console.log(firstName); // -> 'Chesley'
    console.log(lastName); // -> 'Mancao'
  }

  changeName();
  console.log(firstName); // -> 'Yuchan'
  console.log(lastName); // -> 'Mancao'​
  ```

- 선언 없이 변수를 할당하면, var로 선언된 전역 변수처럼 작동(금지 사항)  
  ("use strict"를 JS에 적용하면 선언 없는 변수 할당 금지)
- const로 선언하더라도, 참조 자료형인 배열이나 객체의 요소는 추가 및 삭제 가능

### 클로저

> "함수와 함수가 선언된 어휘적(lexical) 환경의 조합을 말한다. 이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다."

- (1) 클로저 함수는 함수를 리턴하는 함수(스코프를 이용해서, 변수의 접근 범위를 닫음)

  ```js
  const sum = (x) => (y) => x + y;

  // const sum = function(x) {            // 외부함수의 변수 x
  //               return function(y) {   // 내부함수의 변수 y, 외부함수는 y에 접근 불가능
  //                 return x + y
  //               }
  //             }

  sum(5)(7); // -> 12

  typeof sum(5); // -> "function"

  sum(5); // -> y => 5 + y
  sum(5)(7); // -> 7 => 5 + 7
  ```

- (2) 클로저 함수는 외부 함수의 변수를 보존하는 함수

  ```js
  // 외부 함수(sum)의 실행이 끝나도, 외부 함수내 변수(x) 사용 가능
  const sum = function (x) {
    return function (y) {
      return x + y;
    };
  };

  const sum5 = sum(5); // 함수 실행이 끝나도 5라는 값 사용 가능

  sum5(7); // -> 12
  sum5(10); // -> 15
  ```

- Ex. HTML 문자열 생성기

  ```js
  const tagMaker = (tag) => (content) => `<${tag}>${content}</${tag}>`;

  const divMaker = tagMaker("div");
  divMaker("hello"); // -> '<div>hello</div>'
  divMaker("yuchan"); // -> '<div>yuchan</div>'

  const anchorMaker = tagMaker("a");
  anchorMaker("hi"); // -> '<a>hi</a>'
  anchorMaker("yuchan"); // -> '<a>yuchan</a>'

  tagMaker("span")("Hello world"); // -> '<span>Hello world</span>'
  ```

- 클로저 모듈 패턴(정보의 접근 제한)

  ```js
  // 클로저 모듈 패턴(정보의 접근 제한) 예시
  const makeCounter = (x) => {
    let value = x; // 함수 변경 없이 value에 할당 불가능(캡슐화)
    return {
      // 내부함수 여러개 생성 가능
      up: (x) => {
        value += x;
        return value;
      },
      down: (x) => {
        value -= x; // 스코프 체이닝(하위 스코프 우선!)
        return value;
      },
    };
  };
  const counter1 = makeCounter(1); // 함수 재활용 가능!
  const counter2 = makeCounter(2);
  counter1.up(7); // -> 8
  counter2.down(7); // -> -5
  counter2.up(7); // -> 2
  // counter1과 counter2의 value는 서로에게 영향X!
  ```

  \* 모듈화: 함수 하나를 완전히 독립적인 부품 형태로 분리, 함수 재사용화 극대화

### 전개 구문과 구조 분해 할당

- Ex. 함수에서 객체 분해

  ```js
  function whoIs({ id, fullName: { firstName: name } }) {
    console.log(id + " is " + name);
  }

  let user = {
    age: 27,
    id: "werty",
    fullName: {
      firstName: "Yuchan",
      lastName: "Jeong",
    },
  };

  whoIs(user); // -> 'werty is Yuchan'
  ```

# Today's takeaway

- 내가 이전에 정리했던 내용과 조금 달랐다. 오늘 배운 내용이 좀 더 직관적이라 정리한 내용을 수정하였다.  
  (Ex. 원시형 자료는 같은 값은 같은 메모리에 저장된다 -> 원시형 자료는 값을 저장한다)
- 이전에 함수 밖의 변수 이름과 함수의 인수 이름이 똑같을 때 어떻게 처리될까 궁금해서 확인해 보았는데,  
  오늘 스코프 체이닝을 배워서 좀 더 명확하게 작동 원리를 알게 되었다.
- 클로저는 처음 보는 개념이라 낯설었다. 처음에는 콜백 함수와 비슷한 건가 했지만 달랐다. 예제를 통해 어디에 쓰이는지(함수의 재활용)를 보고 나니 이해할 수 있었다.
- 구조 분해 할당을 함수의 인수에도 사용할 수 있다.
- 오늘은 책(개발자의 글쓰기)에서 개발 가이드 쓰기 부분을 읽었는데, 코드스테이츠 프로젝트를 진행할 때 도움이 될 것이다.

# Tomorrow I'll learn

- 오늘 배운 내용을 바탕으로 페어 프로그래밍으로 문제를 풀 것이다.
