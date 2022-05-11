---
title: "[Practice Kit] 완전탐색(Exhaustive Search, Brute-force Search)"
date: 2022-05-05
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> 무식해 보여도 사실은 최고의 방법일 때가 있지요.

## 문제

### 1. 모의고사 (Lv.1) [\*](https://programmers.co.kr/learn/courses/30/lessons/42840?language=javascript)

```js
function solution(answers) {
  const one = [1, 2, 3, 4, 5];
  const two = [2, 1, 2, 3, 2, 4, 2, 5];
  const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const func = (arr, num_arr) => {
    return arr.filter((el, idx) => el === num_arr[idx % num_arr.length]).length;
  };

  const arr = [
    [1, func(answers, one)],
    [2, func(answers, two)],
    [3, func(answers, three)],
  ];

  arr.sort((a, b) => b[1] - a[1]);

  return arr.filter((el) => el[1] === arr[0][1]).map((el) => el[0]);
}
```

### 2. 소수 찾기 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42839?language=javascript)

```js
function solution(numbers) {
  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const nums = numbers.split("");

  const getPermutation = (arr) => {
    const result = [];

    arr.forEach((head, idx, arr) => {
      result.push([head]);
      const rest_arr = arr.filter((_, i) => i !== idx);
      const rest_permutation = getPermutation(rest_arr);
      result.push(...rest_permutation.map((tail) => [head, ...tail]));
    });

    return result;
  };

  const arr = getPermutation(nums)
    .map((el) => el.join(""))
    .map((el) => parseInt(el));
  const unique_arr = [...new Set(arr)];

  return unique_arr.filter((el) => isPrime(el)).length;
}
```

### 3. 카펫 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42842?language=javascript)

```js
function solution(brown, yellow) {
  const getDivisors = (num) => {
    const result = [];
    for (let i = 1; i <= Math.floor(Math.sqrt(num)); i++) {
      if (num % i === 0) result.push(i);
    }
    return result.map((el) => [num / el, el]);
  };

  const result = [];

  const divisors = getDivisors(yellow);
  divisors.forEach((divisor) => {
    const width = divisor[0] + 2;
    const height = divisor[1] + 2;
    if (brown === width * 2 + (height - 2) * 2) {
      result.push(width, height);
    }
  });

  return result;
}
```

## My Tips

### 효율적인 소수 판별

```js
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
};
```

### 재귀함수를 활용한 조합 및 순열

- 조합

  ```js
  const getCombination = (arr) => {
    const result = [];

    arr.forEach((head, idx, arr) => {
      // 현재 요소 저장
      result.push(head);
      // 현재 요소 뒤의 나머지 배열
      const rest_arr = arr.slice(idx + 1);
      // 의 조합
      const rest_combination = getCombination(rest_arr);
      // 현재 요소와 합쳐서 저장
      result.push(...rest_combination.map((tail) => [head, ...tail]));
    });

    return result;
  };
  ```

  ```js
  const getCombination = (arr, selected_num) => {
    // 마지막 값이 결정되고 순차적으로 값 결정
    if (selected_num === 1) return arr.map((el) => [el]);

    const result = [];

    arr.forEach((head, idx, arr) => {
      // 현재 요소 뒤의 나머지 배열
      const rest_arr = arr.slice(idx + 1);
      // 의 조합
      const rest_combination = getCombination(rest_arr, selected_num - 1);
      // 현재 요소와 합쳐서 저장
      result.push(...rest_combination.map((tail) => [head, ...tail]));
    });

    return result;
  };
  ```

- 순열

  ```js
  const getPermutation = (arr) => {
    const result = [];

    arr.forEach((head, idx, arr) => {
      // 현재 요소 저장
      result.push([head]);
      // 현재 요소를 뺀 나머지 배열
      const rest_arr = arr.filter((_, i) => i !== idx);
      // 의 순열
      const rest_permutation = getPermutation(rest_arr);
      // 현재 요소와 합쳐서 저장
      result.push(...rest_permutation.map((tail) => [head, ...tail]));
    });

    return result;
  };
  ```

  ```js
  const getPermutation = (arr, selected_num) => {
    const result = [];

    // 마지막 값이 결정되고 순차적으로 값 결정
    if (selected_num === 1) return arr.map((el) => [el]);

    arr.forEach((head, idx, arr) => {
      // 현재 요소를 뺀 나머지 배열
      const rest_arr = arr.filter((_, i) => i !== idx);
      // 의 순열
      const rest_permutation = getPermutation(rest_arr, selected_num - 1);
      // 현재 요소와 합쳐서 저장
      result.push(...rest_permutation.map((tail) => [head, ...tail]));
    });

    return result;
  };
  ```

\*forEach에 rest_arr가 하나씩 줄어서 따로 탈출 조건은 필요 없음.

### 효율적인 약수 쌍 구하기

```js
const getDivisors = (num) => {
  const result = [];
  for (let i = 1; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) result.push(i);
  }
  return result.map((el) => [el, num / el]);
};
```

---

\*Ref. [프로그래머스 고득점 Kit - 완전탐색](https://programmers.co.kr/learn/courses/30/parts/12230)
