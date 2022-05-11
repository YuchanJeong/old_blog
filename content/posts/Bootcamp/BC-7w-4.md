---
title: "BC-7w-4 / [자료구조/알고리즘] Stack, Queue"
date: 2021-10-08
categories:
  - <Bootcamp>
tags:
  - Algorithm
---

## Today I learned

<!-- ## Algorithm Test 03 부분집합 ☆☆

```js
const func = function (base, sample) {
  base.sort((a, b) => a - b);
  sample.sort((a, b) => a - b);

  let count = 0;
  let lastIndex = 0;

  for (item of sample) {
    // 초기값을 변화시켜서 중복을 피함
    for (let i = lastIndex; i < base.length; i++) {
      // sample의 요소와 base의 요소가 일치할 때,
      if (item === base[i]) {
        count++;
        // 이 인덱스 이전꺼는 비교할 필요 없음
        lastIndex = i;
        break;
      }
    }
  }

  // sample의 모든 요소가 일치하는 수를 찾으면 부분집합
  return count === sample.length;
};
``` -->

### Stack / Queue

#### Stack

- LIFO(Last In First Out) 혹은 FILO(First In Last Out)
- 브라우저의 뒤로 가기, 앞으로 가기 기능을 구현할 때 자료구조 Stack 활용
  1. 새로운 페이지로 접속할 때, 현재 페이지를 Prev Stack에 보관
  2. 뒤로 가기 버튼을 눌러 이전 페이지로 돌아갈 때에는, 현재 페이지를 Next Stack에 보관하고 Prev Stack에 가장 나중에 보관된 페이지를 현재 페이지로 가져옴
  3. 앞으로 가기 버튼을 눌러 앞서 방문한 페이지로 이동을 원할 때에는, Next Stack의 가장 마지막으로 보관된 페이지를 가져옴
  4. 마지막으로 현재 페이지를 Prev Stack에 보관

```js
class Stack {
  constructor() {
    this.storage = {};
    this.top = 0; // 스택의 가장 상단을 가리키는 포인터 변수를 초기화
  }

  size() {
    return this.top;
  }

  // 스택에 데이터를 추가 할 수 있어야 함
  push(element) {
    this.storage[this.top] = element;
    this.top += 1;
  }

  // 가장 나중에 추가된 데이터가 가장 먼저 추출되어야 함
  pop() {
    // 빈 스택에 pop 연산을 적용해도 에러가 발생하지 않아야 함
    if (this.top <= 0) {
      return;
    }

    const result = this.storage[this.top - 1];
    delete this.storage[this.top - 1];
    this.top -= 1;

    return result;
  }
}
```

#### Queue

- FIFO(First In First Out) 혹은 LILO(Last In Last Out)
- 컴퓨터와 연결된 프린터에서 여러 문서를 순서대로 인쇄할 때 자료구조 Queue 활용
  1. 우리가 문서를 작성하고 출력 버튼을 누르면 해당 문서는 인쇄 작업 (임시 기억 장치의) Queue에 들어갑니다.
  2. 프린터는 인쇄 작업 Queue에 들어온 문서를 순서대로 인쇄합니다.
- 버퍼(buffer)
  - 컴퓨터 장치들 사이에서 데이터를 주고 받을 때, 각 장치 사이에 존재하는 속도의 차이나 시간 차이를 극복하기 위해 임시 기억 장치의 자료구조로 Queue를 사용
  1. 일반적으로 프린터는 속도가 느림
  2. CPU는 프린터와 비교하여, 데이터를 처리하는 속도가 빠름
  3. CPU는 빠른 속도로 인쇄에 필요한 데이터를 만든 다음, 인쇄 작업 Queue에 저장하고 다른 작업을 수행
  4. 프린터는 인쇄 작업 Queue에서 데이터를 받아 일정한 속도로 인쇄

```js
class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  // 큐에 데이터를 추가 할 수 있어야 함
  enqueue(element) {
    this.storage[this.rear] = element;
    this.rear += 1;
  }

  // 가장 먼저 추가된 데이터가 가장 먼저 추출되어야 함
  dequeue() {
    // 빈 큐에 dequeue 연산을 적용해도 에러가 발생하지 않아야 함
    if (this.rear - this.front <= 0) {
      return;
    }

    const result = this.storage[this.front];
    delete this.storage[this.front];
    this.front += 1;

    return result;
  }
}
```

### Stack / Queue 문제

#### 03 앞으로 가기, 뒤로 가기

```js
function func(actions, start) {
  const prevPage = [];
  const nextPage = [];
  let curPage = start;

  for (const action of actions) {
    if (typeof action === "string") {
      prevPage.push(curPage);
      curPage = action;
      nextPage.splice(0);
    } else if (action === -1 && prevPage.length > 0) {
      nextPage.push(curPage);
      curPage = prevPage.pop();
    } else if (action === 1 && nextPage.length > 0) {
      prevPage.push(curPage);
      curPage = nextPage.pop();
    }
  }
  return [prevPage, curPage, nextPage];
}
```

#### 04 동시 추출

```js
function func(boxes) {
  let result = [];

  // 반복 조건
  while (boxes.length > 0) {
    // 더 큰 수가 뒤에 있으면 그 수의 인덱스 정보 저장
    let nextPivotIndex = boxes.findIndex((item) => boxes[0] < item);

    // 더 큰 수가 뒤에 없으면 한번에 나감
    if (nextPivotIndex === -1) {
      result.push(boxes.length);
      break;
    }

    // 한번에 나가는 개수를 result에 저장하면서 인덱스 전까지 삭제
    result.push(boxes.splice(0, nextPivotIndex).length);
  }

  // 최댓값 리턴
  return Math.max(...result);
}
```

#### 05 버퍼

```js
function queuePrinter(bufferSize, capacities, documents) {
  // 버퍼 공간 0으로 채움!!!
  const listOfWork = new Array(bufferSize).fill(0);
  let sec = 0;

  // 반복 전에 처음 요소 넣어줌(밖에서 선언해야 값이 저장되기 때문)
  let curDocument = documents.shift();
  listOfWork.shift();
  listOfWork.push(curDocument);
  sec++;

  let listOfWorkSize = curDocument;

  while (listOfWorkSize > 0) {
    /* 
    0으로 이미 차있는 공간에 제일 앞의 0을 지우고
    제일 뒤에 조건에 맞으면 숫자 넣고, 안 맞으면 0을 넣어서 길이 유지
    */

    // 버퍼 공간 제일 앞의 수를 제거하면서 사이즈도 줄여줌
    listOfWorkSize -= listOfWork.shift();
    // 현제 문서는 문서 리스트의 제일 앞
    curDocument = documents.shift();

    if (listOfWorkSize + curDocument <= capacities) {
      listOfWork.push(curDocument);
      listOfWorkSize += curDocument;
    } else {
      listOfWork.push(0);
      documents.unshift(curDocument);
    }

    sec++;
  }

  return sec;
}
```

## Today's takeaway

- Stack과 Queue는 나오는 순서가 다르다.
- 주로 클래스로 객체를 배열처럼 사용한다.
- 위치 변수를 객체의 key로 value를 넣고, 위치 변수의 값을 변화시킨다.
- 길이가 정해진 경우, 0이나 false로 배열을 채워넣고 다른 수나 true로 변화시키면서 정보를 다룬다.
