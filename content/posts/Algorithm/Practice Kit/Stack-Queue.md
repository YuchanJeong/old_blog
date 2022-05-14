---
title: "[Practice Kit] 스택/큐(Stack/Queue)"
date: 2022-05-07
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> LIFO, FIFO, push & pop! 스택과 큐를 이용해서 문제를 풀어보세요.

| 출제 빈도 | 난이도 |
| --------- | ------ |
| 보통      | 쉬움   |

## 개념 정리

| Stack          | Queue          |
| -------------- | -------------- |
| 후입선출(LIFO) | 선입선출(FIFO) |
| push & pop     | push & shift   |

## 문제

### 1. 기능개발 (Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42586?language=javascript)

```js
function solution(progresses, speeds) {
  let day = 0;
  const result = {};

  while (progresses.length > 0) {
    day += 1;
    progresses = progresses.map((el, idx) => el + speeds[idx]);

    for (let i = 0; i < progresses.length; i++) {
      if (progresses[i] < 100) break;
      if (progresses[i] >= 100) {
        // 같은 day(타입)에 추가 해줌.
        result[day] = result[day] ? result[day] + 1 : 1;
      }
    }

    progresses.splice(0, result[day]);
    speeds.splice(0, result[day]);
  }

  return Object.values(result);
}
```

### 2. 프린터 (Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42587)

```js
// Idea: location 조정!!
function solution(priorities, location) {
  let cnt = 0;

  while (priorities.length > 0) {
    const maxPriority = Math.max(...priorities);
    const priority = priorities.shift();

    if (priority === maxPriority) {
      cnt += 1;
      if (location === 0) return cnt;
    } else {
      priorities.push(priority);
    }

    location -= 1;

    // 제일 뒤로 보냄.
    if (location === -1) {
      location = priorities.length - 1;
    }
  }
}
```

### 3. 다리를 지나는 트럭 (Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42583?language=javascript)

```js
// Buffer
function solution(bridge_length, weight, truck_weights) {
  const len = truck_weights.length;
  let time = 0;
  const buffer = new Array(bridge_length).fill(0);
  let bufferWeights = 0;
  const passedTrucks = [];

  while (passedTrucks.length < len) {
    time += 1;

    // buffer 맨앞 빼서, 0이 아닐 경우 passedTrucks에 저장.
    const passedTruck = buffer.shift();
    bufferWeights -= passedTruck;
    if (passedTruck !== 0) {
      passedTrucks.push(passedTruck);
    }

    // truck_weights 맨앞 빼서, weight 안넘을 경우 buffer에 저장.
    if (bufferWeights + truck_weights[0] <= weight) {
      const newTruck = truck_weights.shift();
      bufferWeights += newTruck;
      buffer.push(newTruck);
    } else {
      buffer.push(0);
    }
  }

  return time;
}
```

```js
// better performance
function solution(bridge_length, weight, truck_weights) {
  const queue = [[0, 0]]; // [truckWeight, time]
  let time = 0,
    weightOnBridge = 0;

  while (queue.length > 0 || truck_weights.length > 0) {
    // 현재 시간과 나갈 시간이 같으면 내보냄.
    if (queue[0][1] === time) weightOnBridge -= queue.shift()[0];

    if (weightOnBridge + truck_weights[0] <= weight) {
      weightOnBridge += truck_weights[0];
      // Idea: 나갈 시간을 미리 입력!
      queue.push([truck_weights.shift(), time + bridge_length]);
    } else {
      // Idea: 새로운 트럭이 추가되지 않으면, 시간을 건너뜀!!! (뒤에서 +1이라 여기서 -1)
      if (queue[0]) time = queue[0][1] - 1;
    }

    time += 1;
  }

  return time;
}
```

---

Ref. [프로그래머스 고득점 Kit - 스택/큐](https://programmers.co.kr/learn/courses/30/parts/12081)
