---
title: "[Practice Kit] 탐욕법(Greedy)"
date: 2022-05-08
categories:
  - <Algorithm>
tags:
  - (Algorithm)
---

> 부분적인 최적해가 전체적인 최적해가 되는 마법!

## 개념 정리

- 지금 이 순간 당장 최적인 답을 선택하여 적합한 결과를 도출.
- 부분의 최적해들의 집합이 곧 전체 문제의 해답이 될 때 사용.

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
// ###51% 정확도
// A가 시작되는 시점부터 연속되는 A의 갯수가 A앞의 문자열 길이보다 길면 ◀으로 움직이는 것이 이득.
// 그래서 ▶으로만 움직이는 상황(n - 1)에서 이득본 만큼의 횟수를 뺌.
function solution(name) {
  const len = name.length;
  const name_arr = name.split("");

  let upDown_cnt = 0;
  name_arr.forEach((char, idx) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const upDown = alphabet.indexOf(char);
    // upDown_cnt += Math.min(upDown, 26 - upDown)
    upDown < 14 ? (upDown_cnt += upDown) : (upDown_cnt += 26 - upDown);
  });

  const checkACnt = (name, idx) => {
    let cnt = 0;
    for (let i = idx + 1; i < len; i += 1) {
      if (name[i] !== "A") break;
      cnt += 1;
    }
    return cnt;
  };

  let save = 0;
  for (let i = 0; i < len; i += 1) {
    if (name[i + 1] === "A") {
      const cntA = checkACnt(name, i);
      if (i < cntA) {
        save = cntA - i;
        break;
      }
    }
  }

  return cnt + (len - 1) - save;
}
```
