---
title: "[Practice Kit] 탐욕법(Greedy)"
date: 2022-05-08
categories:
  - "'Algorithm'"
tags:
  - Algorithm
  - Practice Kit
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

### 2.

```js
// 틀린 풀이
// "JAZ"일 때 2번이 아니라 한 번만 이동하는 것 간과!
function solution(name) {
  const alphabet1 = "0BCDEFGHIJKLMN";
  const alphabet2 = "0ZYXWVUTSRQPO";
  let result = name.length - 1;

  name.split("").forEach((char) => {
    if (alphabet1.includes(char)) {
      result += alphabet1.indexOf(char);
    } else if (alphabet2.includes(char)) {
      result += alphabet2.indexOf(char);
    }
  });

  return result;
}
```

```js

```
