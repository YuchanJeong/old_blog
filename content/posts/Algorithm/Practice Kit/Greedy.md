---
title: "[Practice Kit] 탐욕법(Greedy)"
date: 2022-05-12
categories:
  - <Algorithm>
tags:
  - Algorithm
---

> 부분적인 최적해가 전체적인 최적해가 되는 마법.

| 출제 빈도 | 난이도 |
| --------- | ------ |
| 낮음      | 어려움 |

## 개념 정리

- 순간마다 최적의 답을 선택해 적합한 결과 도출
- 부분의 최적해 집합이 곧 전체 문제의 해답이 될 때 사용

## 문제

### 1. 체육복(Lv.1)[^](https://programmers.co.kr/learn/courses/30/lessons/42862)

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

### 2. 조이스틱(Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42860)

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

### 3. 큰 수 만들기(Lv.2) [^](https://programmers.co.kr/learn/courses/30/lessons/42883?language=javascript)

```js
function solution(number, k) {
  const nums = [...number].map((num) => parseInt(num));
  let stack = [0];
  let deleteCount = -1;

  for (let num of nums) {
    // Idea: deleteCount 조정!
    while (deleteCount < k && num > stack[stack.length - 1]) {
      stack.pop();
      deleteCount += 1;
    }

    // Edge: deleteCount가 k보다 작게 남았을 경우!!!
    if (stack.length < number.length - k) stack.push(num);
  }

  return stack.join("");
}
```

Ex. "98675", 2

- Edge Case를 처리했을 경우

  | Variable    |     |     |        |           |           |           |
  | ----------- | --- | --- | ------ | --------- | --------- | --------- |
  | num         | 0   | 9   | 8      | 6         | 7         | 5         |
  | stack       | [0] | [9] | [9, 8] | [9, 8, 6] | [9, 8, 7] | [9, 8, 7] |
  | deleteCount | -1  | 0   | 0      | 0         | 1         | 1         |

- Edge Case를 처리하지 않았을 경우

  | Variable    |     |     |        |           |           |              |
  | ----------- | --- | --- | ------ | --------- | --------- | ------------ |
  | num         | 0   | 9   | 8      | 6         | 7         | 5            |
  | stack       | [0] | [9] | [9, 8] | [9, 8, 6] | [9, 8, 7] | [9, 8, 7, 5] |
  | deleteCount | -1  | 0   | 0      | 0         | 1         | 1            |

### 4. 구명보트(Lv.2)[^](https://programmers.co.kr/learn/courses/30/lessons/42885)

```js
function solution(people, limit) {
  people.sort((a, b) => a - b);
  let cnt = 0;

  while (people.length > 0) {
    /*
    if (people[0] + people[people.length - 1] <= limit) {
      people.pop();
      people.shift();
    } else {
      people.pop();
    }
    cnt += 1;
    */
    let person = people.pop();
    person += people[0];
    if (person <= limit) people.shift();
    cnt += 1;
  }

  return cnt;
}
```

### 5. 섬 연결하기(Lv.3)[^](https://programmers.co.kr/learn/courses/30/lessons/42861?language=javascript)

```js
// # 최소 비용 신장 트리(MST)
// # Union-Find in 그루스칼(Kruskal) 알고리즘
// Ps. 간선(Edge; E)의 수는 노드(Node; N)의 수 - 1
function solution(n, costs) {
  // 1. x의 최상위 노드(기원)를 찾는 함수
  // 재귀 함수로 최상위 노드를 찾을 때까지 부모 노드 탐색
  const getOrigin = (parent, x) => {
    if (parent[x] === x) return x;
    return (parent[x] = getOrigin(parent, parent[x]));
  };

  // 2. 최상위 노드를 같은 값으로 병합하는 함수
  // 최상위 노드가 다를 경우 더 낮은 값으로 최상위 노드 병합
  const unionParent = (parent, a, b) => {
    const n1 = getOrigin(parent, a);
    const n2 = getOrigin(parent, b);
    if (n1 < n2) return (parent[n2] = n1);
    else return (parent[n1] = n2);
  };

  // 3. 최상위 노드가 같은지 판단하는 함수
  const findParent = (parent, a, b) => {
    const n1 = getOrigin(parent, a);
    const n2 = getOrigin(parent, b);
    if (n1 === n2) return true;
    else return false;
  };

  let result = 0;
  // 1) 자기 자신을 부모로 가지는 최상위 노드 생성
  const parent = [];
  for (let i = 0; i < n; i += 1) {
    parent.push(i);
  }

  // 2) 최소 비용이라 가중치가 낮은 순으로 정렬
  costs.sort((a, b) => a[2] - b[2]);

  // 3) 가중치가 낮은 순으로 연결 후 가중치 저장
  // 전부 연결되는 순간 더이상 if문 작동 안함
  for (const cost of costs) {
    if (!findParent(parent, cost[0], cost[1])) {
      result += cost[2];
      unionParent(parent, cost[0], cost[1]);
    }
  }

  return result;
}
```

### 6. 단속카메라(Lv.3)[^](https://programmers.co.kr/learn/courses/30/lessons/42884)

```js
function solution(routes) {
  // 진입 시점을 기준으로 오름차순 정렬
  routes.sort((a, b) => a[0] - b[0]);

  // 첫 카메라는 무조건 설치
  let camera = 1;

  // 첫 진출 시점
  let out = routes[0][1];

  for (let route of routes) {
    // Idea:
    // 현재의 진입 시점이 마지막 진출 시점 이후라면
    // 카메라 추가 설치 및 마지막 진출 시점 갱신
    if (out < route[0]) {
      camera += 1;
      out = route[1];
    }

    // Edge:
    // 마지막 진출 시점이 현재의 진출 시점 이후라면
    // 마지막 진출 시점 갱신
    // 그래야 앞의 경로가 뒤의 경로를 덮어도
    // 내부에서 카운팅 가능
    if (route[1] < out>) {
      out = route[1];
    }
  }

  return camera;
}
```

```js
function solution(routes) {
  let cnt = 0;
  // Idea: 카메라가 설치되어 있지 않을 때
  let camera = -30001;

  // 진출 시점을 기준으로 오름차순 정렬
  routes.sort((a, b) => a[1] - b[1]);

  for (let route of routes) {
    // 현재의 진입 시점이 마지막 카메라 이후라면
    // 카메라 추가 설치 및 마지막 카메라 갱신
    if (camera < route[0]) {
      cnt++;
      camera = route[1];
    }
  }

  return cnt;
}
```

---

Ref. [프로그래머스 고득점 Kit - 탐욕법(Greedy)](https://programmers.co.kr/learn/courses/30/parts/12244)
