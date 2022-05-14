---
title: "[Practice Kit] 깊이/너비 우선 탐색(DFS/BFS)"
date: 2022-05-06
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> 깊이/너비 우선 탐색을 사용해 원하는 답을 찾아보세요.

| 출제 빈도 | 난이도 |
| --------- | ------ |
| 높음      | 어려움 |

## 문제

### 1. 타겟 넘버(Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/43165)

```js
// DFS(재귀)
function solution(numbers, target) {
  let cnt = 0;

  const dfs = (depth, sum) => {
    if (depth === numbers.length) {
      if (sum === target) {
        cnt++;
      }
      return;
    }

    // 타겟을 발견할떄까지 깊이를 더하며 탐색.
    dfs(depth + 1, sum + numbers[depth]);
    dfs(depth + 1, sum - numbers[depth]);
  };

  dfs(0, 0);
  return cnt;
}
```

```js
// DFS(스택)
// lower performance
function solution(numbers, target) {
  const stack = [[0, 0]];
  let cnt = 0;

  while (stack.length > 0) {
    const [prevNum, curIdx] = stack.pop();

    if (curIdx === numbers.length - 1) {
      if (prevNum === target) cnt += 1;
      continue;
    }

    stack.push([prevNum + numbers[curIdx], curIdx + 1]);
    stack.push([prevNum - numbers[curIdx], curIdx + 1]);
  }

  return cnt;
}
```

### 2. 네트워크(Lv.3)[^](https://programmers.co.kr/learn/courses/30/lessons/43162)

```js
// DFS(재귀)
function solution(n, computers) {
  let cnt = 0;
  const isVisited = new Array(n).fill(false);

  // 연결된 모든 네트워크를 방문하는 재귀함수.
  const dfs = (i) => {
    isVisited[i] = true;
    computers[i].forEach((computer, idx) => {
      if (computer === 1 && !isVisited[idx]) {
        dfs(idx);
      }
    });
  };

  // 연결된 모든 네트워크를 방문하면 카운트 후 넘어감.
  computers.forEach((_, idx) => {
    if (!isVisited[idx]) {
      dfs(idx);
      cnt++;
    }
  });

  return cnt;
}
```

### 3. 단어 변환(Lv.3)[^](https://programmers.co.kr/learn/courses/30/lessons/43163?language=javascript)

```js
// BFS(큐)
function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const queue = [[begin, 0]];
  const isVisited = words.map((word) => false);

  const isSameOne = (str1, str2) => {
    let cnt = 0;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) cnt++;
    }
    return cnt === 1;
  };

  while (queue.length > 0) {
    const [curWord, curCnt] = queue.shift();

    if (curWord === target) return curCnt;

    words.forEach((word, idx) => {
      if (isVisited[idx]) return;

      if (isSameOne(curWord, word)) {
        queue.push([word, curCnt + 1]);
        isVisited[idx] = true;
      }
    });
  }

  return 0;
}

/*
let equal = 0;
curWord.split("").forEach((char) => {
  if (word.includes(char)) equal++;
});

if (equal === word.length - 1) {
  ...
}
로 처음에 풀었는데 중복 char를 처리해주지 못해서 에러.
*/
```

### 4. 여행경로(Lv.3)[^](https://programmers.co.kr/learn/courses/30/lessons/43164?language=javascript)

```js
// DFS(재귀)
function solution(tickets) {
  // 문자는 `.sort()`로 오름차순 정렬 가능.
  tickets.sort();

  // 1) 결과 저장소
  const result = [];
  // 2) 중복 체크
  const isVisited = tickets.map((ticket) => false);
  const len = tickets.length;

  // 3) 재귀 함수
  const dfs = (node, depth) => {
    // ㄱ. 결과 저장!!!
    result.push(node);

    // ★☆★유효 경로 O (마지막 node 도착)★☆★
    if (depth === len) {
      return true;
    }

    // 반복문
    for (let i = 0; i < len; i++) {
      // 중복 체크
      if (isVisited[i]) continue;
      // 및 조건 확인
      if (tickets[i][0] === node) {
        // ㄴ. 중복 저장!!
        isVisited[i] = true;

        // 조건을 만족한다면 다음 node에서 재귀 지속!
        // 조건을 만족하지 못하면 false를 반환하고 재귀 종료!
        // ★☆★탈출 조건에서 true를 반환하는 순간 순차적으로 true 반환★☆★
        if (dfs(tickets[i][1], depth + 1)) {
          return true;
        }

        // ㄴ. 중복 취소!!
        isVisited[i] = false;
      }
    }

    // ㄱ. 결과 취소!!!
    result.pop();
    // 유효 경로 X
    return false;
  };

  dfs("ICN", 0);
  return result;
}
```

## My Tips

### DFS/BFS 구분 👍

| DFS                                 | BFS              |
| ----------------------------------- | ---------------- |
| 스택, 재귀 함수                     | 큐               |
| 탐색 시 가중치 혹은 제약, 완전 탐색 | 최단 탐색만 고려 |

### 시간 복잡도

| Big- O    |                 |
| --------- | --------------- |
| O(*log*n) | 정렬, 이진 탐색 |
| O(n)      | 반복문          |
| O(n²)     | 재귀            |
| O(2ⁿ)     | 이중 반복문     |

---

Ref. [프로그래머스 고득점 Kit - 깊이/너비 우선 탐색(DFS/BFS)](https://programmers.co.kr/learn/courses/30/parts/12421)
