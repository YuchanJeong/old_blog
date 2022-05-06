---
title: "[Practice Kit] 깊이/너비 우선 탐색(DFS/BFS)"
date: 2022-05-06
categories:
  - "'Algorithm'"
tags:
  - Algorithm
  - Practice Kit
---

> 깊이/너비 우선 탐색을 사용해 원하는 답을 찾아보세요.

## 문제

### 1. 타겟 넘버 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/43165)

```js
// DFS(재귀), 트리
function solution(numbers, target) {
  let cnt = 0;

  const dfs = (depth, sum) => {
    if (depth === numbers.length) {
      if (sum === target) {
        cnt++;
      }
      return;
    }

    dfs(depth + 1, sum + numbers[depth]);
    dfs(depth + 1, sum - numbers[depth]);
  };

  dfs(0, 0);
  return cnt;
}
```

### 2. 네트워크 (Lv.3) [\*](https://programmers.co.kr/learn/courses/30/lessons/43162)

```js
// DFS(재귀), 그래프
function solution(n, computers) {
  let cnt = 0;
  const isVisited = new Array(n).fill(false);

  const dfs = (i) => {
    isVisited[i] = true;
    computers[i].forEach((computer, idx) => {
      if (computer === 1 && !isVisited[idx]) {
        dfs(idx);
      }
    });
  };

  computers.forEach((_, idx) => {
    if (!isVisited[idx]) {
      dfs(idx);
      cnt++;
    }
  });

  return cnt;
}
```

### 3. 단어 변환 (Lv.3) [\*](https://programmers.co.kr/learn/courses/30/lessons/43163?language=javascript)

```js
// BFS(queue)
function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const queue = [[begin, 0]];
  const isVisited = words.map((word) => false);

  const isChecked = (str1, str2) => {
    let cnt = 0;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) cnt++;
    }
    return cnt === 1;
  };

  while (queue.length > 0) {
    console.log(queue);
    const [cur_word, cur_cnt] = queue.shift();

    if (cur_word === target) return cur_cnt;

    words.forEach((word, idx) => {
      if (isVisited[idx]) return;

      if (isChecked(cur_word, word)) {
        queue.push([word, cur_cnt + 1]);
        isVisited[idx] = true;
      }
    });
  }

  return 0;
}

/*
let equal = 0;
cur_word.split("").forEach((char) => {
  if (word.includes(char)) equal++;
});

if (equal === word.length - 1) {
  ...
}
로 처음 풀었었는데 중복 char를 처리해주지 못해서 에러!
*/
```

### 4. 여행경로 (Lv.3) [\*](https://programmers.co.kr/learn/courses/30/lessons/43164?language=javascript)

```js

```
