---
title: "[Practice Kit] 힙(Heap)"
date: 2022-05-19
categories:
  - <Algorithm>
tags:
  - Algorithm
  - Practice Kit
---

> 힙은 특정한 규칙을 가지는 트리로, 힙을 이용해서 우선순위 큐를 구현할 수 있습니다.

| 출제 빈도 | 난이도 |
| --------- | ------ |
| 보통      | 쉬움   |

## 개념 정리

1. Heap 이란?  
   부모 노드의 값이 자식 노드의 값보다 항상 크거나 작은 완전 이진 트리  
    _Ps. 중복된 값 허용_
2. Heap의 종류
   - 최대 힙: 부모 노드의 값이 자식 노드의 값보다 크거나 같은 완전 이진 트리
   - 최소 힙: 부모 노드의 값이 자식 노드의 값보다 작거나 같은 완전 이진 트리
3. Heap의 구현
   - 주로 0번 인덱스를 비운 배열로 구현
   - 부모 인덱스 = parseInt(자식 인덱스 / 2)  
     왼쪽 자식 인덱스 = 부모 인덱스 x 2  
     오른쪽 자식 인덱스 = 부모 인덱스 x 2 + 1
4. Heap의 삽입과 삭제
   - 삽입
     - 마지막 노드 추가
     - 부모 노드와 조건 비교 후 교환
     - 루트 노드에 도달하면 중지
   - 삭제
     - 루트 노드 삭제 후 마지막 노드를 루트 노드로 이동
     - 자식 노드 둘과 조건 비교 후 교환
     - 자식 노드가 없으면 중지

## 문제

### 1. 디스크 컨트롤러(Lv.3)[^](https://programmers.co.kr/learn/courses/30/lessons/42627?language=javascript)

SJF(Shortest Job First) 알고리즘

"하드디스크가 작업을 수행하고 있지 않을 때에는 먼저 요청이 들어온 작업부터 수행"  
-> 현재 수행 중인 작업이 없을 경우 들어온 작업 수행  
-> 현재 수행 중인 작업이 있을 경우 작업 시간이 짧은 순으로 대기목록에 추가  
-> 대기 목록의 순서데로 작업 수행

1. Heap

```js
class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heapPush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = parseInt(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx][1] > this.heap[curIdx][1]) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = parseInt(curIdx / 2);
    }
  }

  heapPop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx][1] < this.heap[curIdx][1]) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    }

    while (
      this.heap[leftIdx][1] < this.heap[curIdx][1] ||
      this.heap[rightIdx][1] < this.heap[curIdx][1]
    ) {
      const minIdx =
        this.heap[leftIdx][1] > this.heap[rightIdx][1] ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;

      if (leftIdx >= this.size()) break;
    }

    return min;
  }
}

function solution(jobs) {
  const cnt = jobs.length;
  const minHeap = new MinHeap();
  jobs.sort((a, b) => a[0] - b[0]);

  let time = 0;
  let complete = 0;
  let total = 0;

  while (jobs.length || minHeap.size()) {
    while (jobs.length) {
      if (jobs[0][0] === time) {
        minHeap.heapPush(jobs.shift());
      } else break;
    }

    if (minHeap.size() && time >= complete) {
      const task = minHeap.heapPop();
      complete = task[1] + time;
      total += complete - task[0];
    }
    time += 1;
  }

  return parseInt(total / cnt);
}
```

2. Sort

```js
function solution(jobs) {
  // 새로운 다중 정렬!!
  jobs.sort(([a, b], [c, d]) => a - c || b - d);
  const waiting = [];
  const total = jobs.length;
  let processedTime = 0;
  let time = 0;

  while (jobs.length || waiting.length) {
    let task;
    // 요청 시간이 현재 이전일 때, 대기에 집어넣음 (한번에 넣는 개념)!!
    while (jobs.length && jobs[0][0] <= time) {
      waiting.push(jobs.shift());
    }

    // 대기가 있을 때, 작업시간이 가장 짧은거 작업!
    // 대기가 없을 때, 다음 작업 시간으로 점프!!!
    if (waiting.length) {
      task = waiting.sort(([a, b], [c, d]) => b - d || a - c).shift();
    } else {
      task = jobs.shift();
      time = task[0];
    }

    // 작업 시간만큼 점프 (bcs, 작업 중에는 어차피 다른 작업 시작 못함)!!!
    time += task[1];
    processedTime += time - task[0];
  }
  return parseInt(processedTime / total);
}
```

---

Ref. [프로그래머스 고득점 Kit - 힙(Heap)](https://programmers.co.kr/learn/courses/30/parts/12117)
