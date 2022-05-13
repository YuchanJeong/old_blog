---
title: "[Practice Kit] 탐욕법(Greedy)"
date: 2022-05-08
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> 부분적인 최적해가 전체적인 최적해가 되는 마법.

## 개념 정리

- 순간마다 최적의 답을 선택해 적합한 결과 도출
- 부분의 최적해 집합이 곧 전체 문제의 해답이 될 때 사용

## 문제

### 1. 체육복 (Lv.1)[^](https://programmers.co.kr/learn/courses/30/lessons/42862)

```js
function solution(n, lost, reserve) {
  const clothes = new Array(n).fill(1);
  const lostArr = lost.map((el) => el - 1);
  const reserveArr = reserve.map((el) => el - 1);

  for (let i = 0; i < n; i++) {
    if (lostArr.includes(i)) clothes[i] -= 1;
    if (reserveArr.includes(i)) clothes[i] += 1;
  }

  for (let i = 0; i < n - 1; i++) {
    if (clothes[i] === 0 && clothes[i + 1] === 2) {
      clothes[i] += 1;
      clothes[i + 1] -= 1;
    }
    if (clothes[i] === 2 && clothes[i + 1] === 0) {
      clothes[i] -= 1;
      clothes[i + 1] += 1;
    }
  }

  return clothes.filter((el) => el > 0).length;
}
```

### 2. 조이스틱 (Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42860)

```js
// 처음에는 연속되는 A 중 가장 긴 것을 찾아서 되돌아갈지 말지 결정하려 했음.
// A로 끝나거나 끝에서 가까운 거리에 있는 경우 등 예외가 있었음.
// Idea: A를 마주칠 때 마다 돌아가는게 나은지 쭉 가는게 나은지 다 비교해서 해결!!!
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
    // 1) 다음 값이 A 인지 아닌지 확인
    if (name[idx + 1] === "A") {
      let aIdx = idx + 1;
      // 2) 다음 값이 A가 아닐 때까지 반복!! (마지막 aIdx는 A가 아님!)
      while (name[aIdx] === "A") aIdx += 1;

      const right = len - aIdx; // 끝에서 마지막 A까지 이동 수
      leftRightArr.push(idx * 2 + right); // A를 만나면 뒤돌아 감!
      leftRightArr.push(right * 2 + idx); // 처음부터 뒤돌아감!!
    }
  });

  return upDownCnt + Math.min(...leftRightArr);
}
```
