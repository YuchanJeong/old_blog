---
title: "[Practice Kit] 정렬(Sort)"
date: 2022-05-04
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> 정렬을 이용해서 문제를 효율적으로 풀어보세요.

| 출제 빈도 | 난이도 |
| --------- | ------ |
| 높음      | 쉬움   |

Tip. [객체 정렬 및 다중 정렬](https://yuchanjeong.github.io/posts/algorithm/practice-kit/hash/#sort)

## 문제

### 1. K번째수 (Lv.1)[^](https://programmers.co.kr/learn/courses/30/lessons/42748)

```js
function solution(array, commands) {
  const func = (arr, i, j, k) => {
    const cutArr = arr.slice(i - 1, j);
    cutArr.sort((a, b) => a - b);
    return cutArr[k - 1];
  };

  return commands.map((command) => func(array, ...command));
}
```

### 2. 가장 큰 수 (Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42746)

```js
function solution(numbers) {
  const numStr = numbers
    .map((num) => String(num))
    // .sort는 Greedy하게 작동.
    .sort((a, b) => Number(b + a) - Number(a + b))
    .join("");
  // Edge: 0으로만 구성 되었을 경우.
  return numStr[0] === "0" ? "0" : numStr;
}
```

### 3. H-Index (Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42747?language=javascript)

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
  citations.sort((a, b) => b - a).filter((citation, idx) => citation >= idx + 1)
    .length;
```

---

Ref. [프로그래머스 고득점 Kit - 정렬](https://programmers.co.kr/learn/courses/30/parts/12198)
