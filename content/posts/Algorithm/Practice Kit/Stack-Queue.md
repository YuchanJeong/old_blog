---
title: "[Practice Kit] 스택/큐(Stack/Queue)"
date: 2022-05-07
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> LIFO, FIFO, push & pop! 스택과 큐를 이용해서 문제를 풀어보세요.

## 개념 정리

- 추가 예정

## 문제

### 1. 기능개발 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42586?language=javascript)

```js
function solution(progresses, speeds) {
  let _progresses = [...progresses];
  let cnt = 0;
  const result = {};

  while (_progresses.length > 0) {
    cnt += 1;
    _progresses = _progresses.map((el, idx) => el + speeds[idx]);

    for (let i = 0; i < _progresses.length; i++) {
      if (_progresses[i] < 100) break;
      if (_progresses[i] >= 100) {
        result[cnt] = result[cnt] ? result[cnt] + 1 : 1;
      }
    }

    _progresses.splice(0, result[cnt]);
    speeds.splice(0, result[cnt]);
  }

  return Object.values(result);
}
```

### 2. 프린터 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42587)

```js
// location을 조정하는 idea!
function solution(priorities, location) {
  let cnt = 0;

  while (priorities.length > 0) {
    const max = Math.max(...priorities);
    const num = priorities.shift();

    if (num === max) {
      cnt += 1;
      if (location === 0) return cnt;
    } else {
      priorities.push(num);
    }

    location -= 1;

    if (location === -1) {
      location = priorities.length - 1;
    }
  }
}
```

### 3. 다리를 지나는 트럭 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42583?language=javascript)

- 다른 풀이 추가 필요!!! (시간 건너띄기 for 퍼포먼스)

```js
function solution(bridge_length, weight, truck_weights) {
  let cnt = 0;
  const buffer = new Array(bridge_length).fill(0);
  let buffet_size = 0;
  const passed = [];
  const len = truck_weights.length;

  while (passed.length < len) {
    cnt += 1;

    // buffer 맨앞 빼서, 0이 아닐 경우 passed에 저장
    const passed_truck = buffer.shift();
    buffet_size -= passed_truck;
    if (passed_truck !== 0) {
      passed.push(passed_truck);
    }

    // truck_weights 맨앞 빼서, weight 안넘을 경우 buffer에 저장
    if (buffet_size + truck_weights[0] <= weight) {
      const new_truck = truck_weights.shift();
      buffet_size += new_truck;
      buffer.push(new_truck);
    } else {
      buffer.push(0);
    }
  }

  return cnt;
}
```

---

\*Ref. [프로그래머스 고득점 Kit - 스택/큐](https://programmers.co.kr/learn/courses/30/parts/12081)
