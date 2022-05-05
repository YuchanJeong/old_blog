---
title: "[Practice Kit] 정렬(Sort)"
date: 2022-05-04
categories:
  - "'Algorithm'"
tags:
  - Algorithm
  - Practice Kit
---

> 정렬을 이용해서 문제를 효율적으로 풀어보세요.

## 문제

### 1. K번째수 (Lv.1) [\*](https://programmers.co.kr/learn/courses/30/lessons/42748)

```js
function solution(array, commands) {
  const func = (arr, i, j, k) => {
    const _arr = arr.slice(i - 1, j);
    _arr.sort((a, b) => a - b);
    return _arr[k - 1];
  };

  return commands.map((command) => func(array, ...command));
}
```

### 2. 가장 큰 수 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42746)

```js
function solution(numbers) {
  const nums = numbers
    .map((num) => String(num))
    .sort((a, b) => Number(b + a) - Number(a + b))
    .join("");
  // 0으로만 구성 되었을 경우 edge case!
  return nums[0] === "0" ? "0" : nums;
}
```

### 3. H-Index (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42747?language=javascript)

```js
function solution(citations) {
  citations.sort((a, b) => b - a);
  let i = 0;
  // h 편 이상 인용된 논문이 h편 이상!
  while (citations[i] >= i + 1) {
    i++;
  }
  return i;
}
```

```js
const solution = (citations) =>
  // h 편 이상 인용된 논문 수가 length.
  citations.sort((a, b) => b - a).filter((citation, idx) => citation >= idx + 1)
    .length;
```

---

\*Ref. [프로그래머스 고득점 Kit - 정렬](https://programmers.co.kr/learn/courses/30/parts/12198)
