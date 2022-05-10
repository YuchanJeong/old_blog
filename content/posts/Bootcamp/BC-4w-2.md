---
title: "BC-4w-2 / [JS/Node] 고차 함수"
date: 2021-09-14
categories:
  - <Bootcamp>
tags:
  - JavaScript
---

## Today I learned

### 고차함수

- 일급 객체(first-class citizen) -> Ex. 함수
  1. 변수에 할당(assignment) 가능 -> 함수 표현식
  2. 다른 함수의 인자(argument)로 전달 가능 -> 콜백 함수
  3. 다른 함수의 결과로 리턴(return) 가능 -> 커리 함수
- 고차 함수(higher-order function)
  - 함수를 인자로 받는 함수 + 함수를 리턴하는 함수

### 고차 함수 문제

- 05

  ```js
  function func(func1, func2) {
    return (num) => func1(func2(num));
  }
  // func(func1, func2)은 함수를 리턴
  // func(func1, func2)(num)은 값을 리턴
  ```

- 06

  ```js
  function func(...funcs) {
    // ...funcs는 나머지 인자들, funcs는 인자들의 배열
    return (num) => {
      let result = num;
      // 계속 누적해서 둘러쌈
      // item은 함수
      for (item of funcs) {
        result = item(result);
      }
      return result;
    };
  }
  ```

- 08

  ```js
  function func(func, arr) {
    let result = [];
    for (let item of arr) {
      result.push(func(item));
    }
    return result;
  }
  ```

- 13

  ```js
  function func_r(arr, num) {
    return arr.filter((item) => item < num).length;
  }
  // 배열을 추가한다고 가정이었는데 배열의 추가에 너무 집착!
  ```

- 14

  ```js
  function firstFunc(num) {
    return num < 100;
  }

  function func(obj, key) {
    if (Array.isArray(obj[key])) {
      return obj[key]
        .filter((item) => typeof item === "number")
        .filter((item) => innerFunc(item));
    }
    return [];
  }

  function func_r(obj, key) {
    if (Array.isArray(obj[key])) {
      return obj[key].filter(
        // &&로 간단히, firstFunc는 boolean을 return
        (item) => typeof item === "number" && firstFunc(item)
      );
    }
    return [];
  }
  ```

- 21

  ```js
  function func(arr) {
    const result = [];
    arr.forEach((item) => {
      // map으로 바로 배열로 만들면 원본 길이만큼 무조건 만들어짐
      // 그래서 PUSH로 새로운 배열을 만듬
      if (item.age >= 18) {
        result.push(item.name);
      }
    });
    return result;
  }

  function func_r(arr) {
    // 메소드 체이닝, 필터로 먼저 거르고 맵으로 배열로 만듦
    return arr.filter((item) => item.age >= 18).map((item) => item.name);
  }
  ```

- 26

  ```js
  function func_r(records, value) {
    return records.reduce((acc, cur) => {
      if (cur.animal === value) {
        // 특정 조건일 때,
        return acc + cur.score; // return 값이 acc에 대입
      } else {
        return acc; // 변화X
      }
    }, 0); // 앞에 0을 두고 쌓음!
  }
  ```

- 27

  ```js
  function func(arr) {
    return arr.reduce((acc, cur) => {
      if (acc.length >= cur.length) {
        return acc;
      } else {
        return cur;
      }
    }, ""); // ''을 시작으로 더 큰 값이 있으면 바꿈!
  }
  ```

- 29

  ```js
  function func(arr) {
    const result = [];
    arr.forEach((item) => result.push(...item));
    return result;
  }

  function func_r(arr) {
    return arr.reduce((acc, cur) => {
      return acc.concat(cur);
    });
  }
  ```

- 30

  ```js
  function mine_1(arr) {
    const onlyStr = arr.filter((item) => typeof item === "string");
    const newArr = onlyStr.map((item) => item.length).sort((a, b) => a - b); // 오름차순 정리
    const minLength = newArr[0];
    const result = onlyStr.find((item) => item.length === minLength);
    return result ? result : "";
  }

  function mine_2(arr) {
    const onlySrt = arr.filter((item) => typeof item === "string");
    if (onlySrt.length !== 0) {
      return onlySrt.reduce((acc, cur) => {
        if (acc.length <= cur.length) {
          return acc;
        } else {
          return cur;
        }
      });
    }
    return "";
  }
  ```

- 31

  ```js
  function func(arr) {
    return arr
      .filter((item) => item.gender === "female")
      .map((item) => {
        // 재할당
        item.grades =
          item.grades.reduce((acc, cur) => acc + cur) / item.grades.length;
        return item;
      });
  }
  ```

- 32

  ```js
  function func(arr) {
    const newArr = [];
    arr.forEach((item) => newArr.push(...item));
    const onlyNum = newArr.filter((item) => typeof item === "number");
    return onlyNum.reduce((acc, cur) => acc + cur, 0);
  }
  ```

- 기존 요소를 변경하지 않고, 다른 길이의 배열을 리턴할 때는 filter()
- 기존 요소를 변경하면서, 같은 길이의 배열을 리턴할 때는 map()
- 하나의 응축된 값을 리턴할 때는 reduce()

## Today's takeaway

- 고차 함수는 내 예상보다 훨씬 어려웠다. 문제는 어찌어찌 풀었으나 완전히 이해하지 못하였고, 완벽한 이해를 위해 문제를 다시 한번 풀어보며 메소드들을 익혔다.
- 메소드의 특징을 이해하고 나니 어떤 목적을 위해 어떤 메소드를 써야 하는지 쉽게 알 수 있었다. 기능의 사용법 못지않게 사용 이유도 중요하다는 것을 깨달았다.
- 고차 함수를 정리하는데 많은 시간을 소모해서 SCSS를 공부하지 못했다. 다행히 다음 주가 추석이라 추석 때 혼자서 FastCampus의 react와 scss를 공부할 것이다. 추가로 이때까지 코드 스테이츠에서 공부한 것도 모두 복습할 것이다.

## Tomorrow I'll learn

- 드디어 리액트를 배운다. 처음으로 조금도 공부하지 않은 부분이라 많은 기대가 된다.
- 리액트는 싱글 페이지 애플리케이션이나 모바일 애플리케이션 개발에 사용될 수 있다.
