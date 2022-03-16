---
title: "BC-1w-4 / [JS/Node] 반복문"
date: 2021-08-26
categories:
  - "'Bootcamp'"
tags:
  - JavaScript
---

# Today I learned

### 반복문

- 같거나 비슷한 코드를 여러 번 실행시켜야 할 경우에 씀
- for(초기값; 반복 조건; 증감값) { 반복 내용 }
- 초기값  
  while(반복 조건) { 반복 내용; 증감값;}

### 반복문 문제

- 1-증감 연산자(for 구문에서는 전위, 후위 상관없음)

  - ++/--a는 값을 먼저 1 증가/감소시킨 뒤 연산
  - a++/--는 연산을 먼저 한 뒤 값을 1 증가/감소

- 5-result

  ```js
  function func(str, num) {
    let result = str;
    if (num === 0) {
      return "";
    } else {
      for (n = 1; n < num; n += 1) {
        result += str; // 결과에 값을 누적
      }
      return result;
    }
  }
  ```

- 8-count

  ```js
  function func(num) {
    let result = "";
    let n = 1;

    while (n <= num * 2) {
      // 홀수 num개는 (num * 2 / 2)개임
      // Ex. 홀수 3개는 1~6(3*2)까지 중에 홀수
      if (n % 2 !== 0) {
        result += `${n}`;
      }
      n += 1;
    }
    return result;
  }

  /*
    let result = "";
    let count = 0;
  
    let i = 1;
    while (count < num) {
      result = result + String(i);
      i = i + 2;
      count++;
    }
    
    return result;
  */
  ```

- 17-소수와 효율성!!

  ```js
  function func(num) {
    // 약수는 루트값을 중심으로 대칭
    // Ex. 81의 약수는 1, 3, √81, 27, 81
    const sqrt = Math.sqrt(num);

    // 유일한 짝수인 소수
    if (num === 2) {
      return true;
    }
    // 2를 제외한 짝수와 1은 소수가 될 수 없다
    if (num % 2 === 0 || num === 1) {
      return false;
    }

    // 홀수의 약수는 홀수
    // <= 인 이유는 루트값만 약수로 가지는 수 때문
    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  ```

- 13-이중 반복문

  ```js
  function func(num) {
    let result = "2";

    for (let i = 3; i <= num; i += 2) {
      let isPrime = true;

      for (let j = 3; j <= Math.sqrt(i); j += 2) {
        if (i % j === 0) {
          isPrime = false;
          break; // 효율성을 위해 false를 발견 하는 순간 종료
        }
      }

      if (isPrime) {
        result += `-${i}`;
      }
    }

    return result;
  }
  ```

- 20

  ```js
  function func(str) {
    for (let i = 0; i < str.length - 1; i++) {
      for (let j = i + 1; j < str.length; j++) {
        if (str[i] === str[j]) {
          return true;
        }
      }
    }
    return false;
  }
  ```

# Today's takeaway

- 내가 작성한 코드를 페어에게 설명하는 것이 생각보다 힘들었다. 수도코드와 주석을 통해 항상 왜 이런 식으로 작성했는지를 생각하고 기록해야겠다.
- 다른 사람의 코드를 읽는 능력이 많이 부족하다. 나와 작성 방식이 조금만 달라져도 알아보기 힘들다. 다양한 코드들을 많이 읽고 쓰면서 관련 능력을 기를 것이다.
- 항상 오타를 조심하고 신경쓰자!

# Tomorrow I'll learn

- HTML과 CSS를 배운다. 이미 혼자서 학습했던 부분이라 크게 걱정되지는 않는다.
- HTML은 구조, CSS는 스타일, JS는 기능을 담당한다.
