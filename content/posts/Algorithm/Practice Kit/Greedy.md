---
title: "[Practice Kit] 탐욕법(Greedy)"
date: 2022-05-08
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> 부분적인 최적해가 전체적인 최적해가 되는 마법!

## 개념 정리

- 순간마다 최적의 답을 선택해 적합한 결과 도출.
- 부분의 최적해 집합이 곧 전체 문제의 해답이 될 때 사용.

## 문제

### 1. 체육복 (Lv.1) [\*](https://programmers.co.kr/learn/courses/30/lessons/42862)

```js
function solution(n, lost, reserve) {
  const have_arr = new Array(n).fill(1);
  const lost_arr = lost.map((el) => el - 1);
  const reserve_arr = reserve.map((el) => el - 1);

  for (let i = 0; i < n; i++) {
    if (lost_arr.includes(i)) have_arr[i] -= 1;
    if (reserve_arr.includes(i)) have_arr[i] += 1;
  }

  for (let i = 0; i < n - 1; i++) {
    if (have_arr[i] === 0 && have_arr[i + 1] === 2) {
      have_arr[i] += 1;
      have_arr[i + 1] -= 1;
    }
    if (have_arr[i] === 2 && have_arr[i + 1] === 0) {
      have_arr[i] -= 1;
      have_arr[i + 1] += 1;
    }
  }

  return have_arr.filter((el) => el > 0).length;
}
```

### 2. 조이스틱 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42860)

```js
// 처음에는 제일 길게 연속되는 A를 찾아서 되돌아가는거와 비교 할려고 했는데 예외가 계속 나와서 A를 마주칠 때 마다 돌아가는게 나은지 쭉 가는게 나은지 다 넣어서 해결
function solution(name) {
  const len = name.length;
  const chars = name.split("");

  let upDownCnt = 0;

  chars.forEach((char, idx) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const upDownIdx = alphabet.indexOf(char);
    upDownCnt += Math.min(upDownIdx, 26 - upDownIdx);
  });

  let leftRightArr = [len - 1];

  chars.forEach((char, idx) => {
    if (name[idx + 1] === "A") {
      let aIdx = idx + 1;
      while (name[aIdx] === "A") aIdx += 1;

      const right = len - aIdx;
      leftRightArr.push(idx * 2 + right);
      leftRightArr.push(right * 2 + idx);
    }
  });

  return upDownCnt + Math.min(...leftRightArr);
}
```
