---
title: "BC-7w-2 / [자료구조/알고리즘] 재귀(1)"
date: 2021-10-06
categories:
  - "'Bootcamp'"
tags:
  - Algorithm
---

## Today I learned

### Algorithm Test 01 팩토리얼 인덱스 찾기

<!-- ```js
function func(N, K) {
  let indexOfK = 0;
  const isUsed = new Array(N).fill(false);

  const fac = (n) => {
    // N(1)-1-i(0) === 0
    if (n <= 1) {
      return n;
    }
    // [(fac(1) * 2) === fac(2)] * ... * n - 1 * n
    return fac(n - 1) * n;
  };

  // 마지막 하나는 고려 x(N - 1)
  for (let i = 0; i < N - 1; i++) {
    // item(K[i])의 오름차순 정렬 인덱스는 K[i] - 1
    const indexOfIt = K[i] - 1;
    // item(K[i]) 사용
    isUsed[indexOfIt] = true;

    // 유효한 위치(남은 거 중에 몇 번째인지)를 찾기 위해서,
    // 더 작은 수들 중 False(사용 x)인 수의 개수가 유효한 인덱스(zero based number)
    const lowerNumbers = isUsed.slice(0, indexOfIt);
    const validIndex = lowerNumbers.filter((it) => it === false).length;
    indexOfK += validIndex * fac(N - 1 - i);
  }

  return indexOfK;
}
/*
Ex.
[4,3,1,2]
[F,F,F,T]
  3 * (4 - 1 - 0)!
[F,F,T,T]
  + 2 * (4 - 1 - 1)!
[T,F,T,T]
  + 0 * (4 - 1 - 2)!
*/
``` -->

1.  팩토리얼은 수가 조금만 늘어도 기하급수적으로 증가. 따라서, 인덱스만을 찾는 방법을 고안
2.  배열(N 개)의 첫 번째(i = 0) 수가 x 일 때, (N - 1)! \* x의 인덱스(x - 1)가 x로 시작하는 가장 작은 배열의 인덱스
3.  배열의 두 번째 수가 y 일 때, 앞에서 계산한 수에 ... 하려고 하니까 첫 번째 수에 따라서 다른 수가 남아서 처리가 힘듬
4.  그래서 isUsed = [false, false, ...]로 숫자를 구분
5.  배열의 i 인덱스가 x 일 때, (N - 1 - i)!에 x보다 작은 수 중에 false인 수의 개수만큼 곱해주면 해당 인덱스를 찾을 수 있음(남은 수 중에서 제일 작은 수 일 때는 0, 그다음 일 때는 1을 곱해주는 것)
6.  이렇게 구한 i 인덱스를 마지막 한개가 남기 전까지 더해주면 K의 인덱스

### 재귀 함수

#### 재귀의 이해

- 재귀
  - 동일한 구조의 더 작은 문제를 해결함으로써 주어진 문제를 해결하는 방법
- 재귀 호출
  - 실행 과정 중 자기 자신을 호출
- 재귀 사용법
  1. 기존의 문제에서 출발하여 더 작은 경우를 생각
  2. 같은 방식으로, 문제가 더는 작아지지 않을 때까지 더 작은 경우를 생각
  3. 문제가 간단해져서 바로 풀 수 있게 되는 순간부터 앞서 생성한 문제를 차근차근 해결

#### 재귀는 언제 사용할까?

1. 주어진 문제를 비슷한 구조의 더 작은 문제로 나눌 수 있는 경우
2. 중첩된 반복문이 많거나 반복문의 중첩 횟수(number of loops)를 예측하기 어려운 경우

#### 재귀적 사고 연습하기

1. 재귀 함수의 입력값과 출력값 정의하기
   - arrSum: [number] => number
2. 문제를 쪼개고 경우의 수를 나누기
   - 입력값의 순서와 크기로 구분
     - arrSum([1, 2, 3, 4]), arrSum([2, 3, 4]), arrSum([3, 4])
   - arrSum: [number] => number  
     arrSum([])  
     arrSum([e1, e2, ... , en])
3. 단순한 문제 해결하기
   - 재귀의 기초(base case)
     - 재귀의 탈출 조건(재귀 호출이 멈추는 조건)을 구성
   - arrSum: [number] => number  
     arrSum([]) = 0  
     arrSum([e1, e2, ... , en])
4. 복잡한 문제 해결하기
   - head와 tail로 구분
   - arrSum: [number] => number  
     arrSum([]) = 0  
     arrSum([e1, e2, ... , en]) = e1 + arrSum([e2, ..., en])
5. 코드 구현하기
   ```js
   function arrSum(arr) {
    if (arr의 길이가 0인 경우) {
      return 0;
    }
    return head + arrSum(tail);
   }
   ```

#### factorial로 알아보는 재귀

```js
function fac(n) {
  if (n <= 1) {
    return n;
  }
  return n * fac(n - 1);
}
```

### 재귀함수 문제

#### 02 홀수 여부

```js
function func(num) {
  if (num < 0) {
    num *= -1;
  }

  // 재귀 반복 종료 조건
  if (num === 0) {
    return false;
  } else if (num === 1) {
    return true;
  }

  // 재귀 반복(규칙)
  // 2씩 뺀 수를 넘겨서 확인
  return func(num - 2);
}
```

#### 04 피보나치

```js
function func(num) {
  // if (num === 0) return 0
  // if (num === 1) return 1
  if (num <= 1) {
    return num;
  }

  // 두 자릿수 전과 한 자릿수 전의 피보다 치수를 더함
  return func(num - 2) + func(num - 1);
}
```

#### 05 배열의 요소 합

```js
function func(arr) {
  // 배열이 빌 때까지
  if (arr.length === 0) {
    return 0;
  }

  // 0 인덱스(head)를 남기면서, 배열 맨앞 제거
  return arr[0] + func(arr.slice(1));
}
```

#### 07 배열의 요소 개수

```js
function func(arr) {
  // 배열이 빌 때까지
  if (arr.isEmpty()) {
    return 0;
  }

  // count(1을 남김)하면서, 배열 맨앞 제거
  return 1 + func(arr.splice(1));
}
```

#### 08 배열의 요소 제거

```js
// 숫자를 다 쓰거나 빈 배열이 빌 때까지
// 마지막에 배열 리턴
function func(num, arr) {
  if (num === 0 || arr.length === 0) {
    return arr;
  }

  // 숫자 하나를 지우면서, 배열 맨앞 제거
  return func(num - 1, arr.slice(1));
}
```

#### 09 배열의 요소 남김

```js
// 숫자를 다 쓰거나 빈 배열이 빌 때까지
function func(num, arr) {
  if (num === 0 || arr.length === 0) {
    return [];
  }

  // arr[0](head)을 배열 안에 남기고,
  // 숫자 하나를 지우면서, 배열 맨앞 제거
  return [arr[0], ...func(num - 1, arr.slice(1))];
}
```

#### 10 모든 요소의 논리곱(and)

```js
function func(arr) {
  // false가 나오거나 길이가 1이면 리턴
  if (arr[0] === false) {
    return false;
  }

  if (arr.length <= 1) {
    return true;
  }

  // 배열 맨앞 제거
  return func(arr.slice(1));

  /* ref 
  // arr[0](head)을 남기면서, 배열 맨앞 제거
  // 배열이 비면 true 반환 해서 논리곱으로 비교
  if (arr.length === 0) {
    return true;
  }
  
  return arr[0] && and(arr.slice(1));
  */
}
```

#### 12 배열 뒤집기

```js
function func(arr) {
  if (arr.length === 0) {
    return arr;
  }

  return [arr[arr.length - 1], ...func(arr.slice(0, arr.length - 1))];

  /* ref
  return [...func(arr.slice(1)), arr[0]];
  */
}
```

#### 13 이차원 객체 탐색

```js
function func(matryoshka, size) {
  // 반복 종료 조건
  if (matryoshka.size === size) {
    return true;
    // 반복 조건
  } else if (matryoshka.matryoshka && matryoshka.size > size) {
    // 반복 내용(재귀)
    return func(matryoshka.matryoshka, size);
  }

  // base case
  return false;
}
```

#### 14 이차원 배열 탐색

```js
function func(giftBox, wish) {
  for (gift of giftBox) {
    if (gift === wish) {
      return true;
    }

    // 배열안에 배열
    if (Array.isArray(gift)) {
      // 에 wish가 있어서 true 일 때만 true 반환 아니면 pass
      if (func(gift, wish)) {
        return true;
      }
    }
  }

  // base case
  return false;
}

/*
이중 배열 일 때 if로 안 걸러주면, 
배열 안에 배열에 wish가 없을 때,
false 반환하고 함수 종료되버림
*/
```

#### 15 다차원 배열 => 1차원 배열

```js
function func(arr) {
  const result = [];

  for (item of arr) {
    if (Array.isArray(item)) {
      // 배열일 때, 재귀로 내부 배열의 result를 push
      result.push(...func(item));
      // 배열이 아닐 때, 요소를 그데로 push
    } else {
      result.push(item);
    }
  }

  return result;
}
```

### Today's takeaway

- 반복은 반복되는 규칙을 찾는 것이 중요하다.
- 재귀
  - 반복 종료 조건, 반복 내용(재귀)으로 구분
  - 반복 조건이 있을 때는 base case도 설정
  - 무엇을 남길 때는 헤드 사용
- Algorithm Test도 재귀함 수도 많이 어려웠다. 하지만 원리를 파악하고 차근차근 알고리즘을 생각하다 보니 해결할 수 있었다.
- 문제를 분리해서 생각하자! 한 번에 전체 해결법을 생각하는 것보다 하나씩 해결법을 생각하는 게 더 쉽다.
