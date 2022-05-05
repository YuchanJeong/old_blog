---
title: "BC-8w-1 / [자료구조/알고리즘] Graph, Tree, BST"
date: 2021-10-12
categories:
  - "'Bootcamp'"
tags:
  - Algorithm
---

## Today I learned

<!-- ## Algorithm Test 04 버블 정렬 최적화 ☆☆

```js
const func = function (arr) {
  let flag = true;
  // 스왑이 안 일어나면 외부 반복문 종료
  for (let i = 0; i < arr.length && flag; i++) {
    flag = false;
    // 스왑 후 제일 끝은 제일 크니까 비교 안 해도 됨(- i)
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        flag = true;
      }
    }
  }
  return arr;
};
``` -->

### Graph / Tree / BST

#### Graph

- 여러개의 점들이 서로 복잡하게 연결되어 있는 관계를 표현한 자료구조
- 그래프에서는 하나의 점은 정점(vertex), 하나의 선은 간선(edge)
- 그래프의 실사용 예제

  - 비가중치 그래프(추가 정보 x)
    - 정점: 서울, 대전, 부산
    - 간선: 서울—대전, 대전—부산, 부산—서울

  ```js
  let isConnected = {
    seoul: {
      busan: true,
      daejeon: true,
    },
    daejeon: {
      seoul: true,
      busan: true,
    },
    busan: {
      seoul: true,
      daejeon: true,
    },
  };

  console.log(isConnected.seoul.daejeon); // true
  console.log(isConnected.daejeon.busan); // true
  ```

  - 가중치 그래프(추가 정보 o)
    - 정점: 서울, 대전, 부산
    - 간선: 서울—140km—대전, 대전—200km—부산, 부산—325km—서울

- 용어

  - 무방향그래프(undirected graph) <-> 단방향(directed) 그래프
  - 진입차수(in-degree) / 진출차수(out-degree)
  - 인접(adjacency)
    - 두 정점간에 간선이 직접 이어져 있다면 이 두 정점은 인접한 정점
  - 자기 루프(self loop)
    - 정점에서 진출하는 간선이 곧바로 자기 자신에게 진입하는 경우
  - 사이클(cycle)
    - 한 정점에서 출발하여 다시 해당 정점으로 돌아갈 수 있다면 사이클이 있다고 표현

- 그래프의 표현 방식

  - 인접 행렬

    - 서로 다른 정점들이 인접한 상태인지를 표시한 행렬으로 2차원 배열의 형태로 표현

    | from \\ to | A   | B   | C   |
    | ---------- | --- | --- | --- |
    | A          | 0   | 0   | 1   |
    | B          | 1   | 0   | 1   |
    | C          | 1   | 0   | 0   |

    \*가중치 그래프라면 1 대신 다른 값

    - A의 진출차수는 1개 입니다: A —> C
      - [0][2] === 1
    - B의 진출차수는 2개 입니다: B —> A, B —> C
      - [1][0] === 1
      - [1][2] === 1
    - C의 진출차수는 1개입니다: C —> A
      - [2][0] === 1
    - 인접 행렬은 언제 사용할까?
      - 두 정점 사이에 관계가 있는지, 없는지 확인하기에 용이
      - 가장 빠른 경로(shortest path)를 찾고자 할 때 주로 사용

    ```js
    // directed graph (방향 그래프)
    // unweighted (비가중치)
    // adjacency matrix (인접 행렬)
    class GraphWithAdjacencyMatrix {
      constructor() {
        this.matrix = [];
      }

      addVertex() {
        const currentLength = this.matrix.length;
        // 이미있는 행에 열(0) 추가
        for (let i = 0; i < currentLength; i++) {
          this.matrix[i].push(0);
        }
        // 새로운 행 추가
        this.matrix.push(new Array(currentLength + 1).fill(0));
      }

      contains(vertex) {
        if (this.matrix[vertex]) {
          return true;
        }
        return false;

        /* ref
        return !!this.matrix[vertex]
        */
      }

      addEdge(from, to) {
        const currentLength = this.matrix.length;
        if (from === undefined || to === undefined) {
          console.log("2개의 인자가 있어야 합니다.");
          return;
        }
        // 간선을 추가할 수 없는 상황에서는 추가 x
        // 인덱스와 크기라서 + 1
        if (
          from + 1 > currentLength ||
          to + 1 > currentLength ||
          from < 0 ||
          to < 0
        ) {
          console.log("범위가 매트릭스 밖에 있습니다.");
          return;
        }
        this.matrix[from][to] = 1;
      }

      hasEdge(from, to) {
        return this.matrix[from][to] === 1;
      }

      removeEdge(from, to) {
        const currentLength = this.matrix.length;
        if (from === undefined || to === undefined) {
          console.log("2개의 인자가 있어야 합니다.");
          return;
        }
        // 간선을 제거할 수 없는 상황에서는 제거 x
        if (
          from + 1 > currentLength ||
          to + 1 > currentLength ||
          from < 0 ||
          to < 0
        ) {
          console.log("범위가 매트릭스 밖에 있습니다.");
          return;
        }
        this.matrix[from][to] = 0;
      }
    }
    ```

  - 인접 리스트

    - 각 정점이 어떤 정점과 인접한지를 리스트의 형태로 표현(보통은 순서 중요 x)
    - 인접 리스트는 언제 사용할까?
      - 메모리를 효율적으로 사용하고 싶을 때 사용

    ```js
    // undirected graph (무방향 그래프)
    // adjacency list (인접 리스트)
    class GraphWithAdjacencyList {
      constructor() {
        this.vertices = {};
      }

      addVertex(vertex) {
        // 넘겨받은 인자(정점)은 키가 되며, 빈 배열을 값으로 할당
        // 이미 존재하는 정점이라면, 덮어 씌워지지 않아야 함
        this.vertices[vertex] = this.vertices[vertex] || [];
      }

      contains(vertex) {
        return !!this.vertices[vertex];
      }

      addEdge(fromVertex, toVertex) {
        // - fromVertex의 인접 리스트에 toVertex를 추가
        // - toVertex의 인접 리스트에 fromVertex를 추가
        // 넘겨받은 2개의 정점 모두 존재하는 정점이어야 함
        if (!this.contains(fromVertex) || !this.contains(toVertex)) {
          return;
        }

        if (!this.hasEdge(fromVertex, toVertex)) {
          this.vertices[fromVertex].push(toVertex);
          this.vertices[toVertex].push(fromVertex);
        }
      }

      hasEdge(fromVertex, toVertex) {
        if (!this.contains(fromVertex)) {
          return false;
        }
        return !!this.vertices[fromVertex].includes(toVertex);
      }

      removeEdge(fromVertex, toVertex) {
        // 인자로 넘겨받은 두 정점이 모두 존재한다면
        // - fromVertex의 인접 리스트에 있는 toVertex를 삭제
        // - toVertex의 인접 리스트에 있는 fromVertex를 삭제
        if (!this.contains(fromVertex) || !this.contains(toVertex)) {
          return;
        }

        if (this.hasEdge(fromVertex, toVertex)) {
          const index = this.vertices[fromVertex].indexOf(toVertex);
          this.vertices[fromVertex].splice(index, 1);
        }

        if (this.hasEdge(toVertex, fromVertex)) {
          const index = this.vertices[toVertex].indexOf(fromVertex);
          this.vertices[toVertex].splice(index, 1);
        }
      }

      removeVertex(vertex) {
        // 인자로 넘겨받은 정점(A)이 존재한다면
        // - 이 정점(A)을 삭제
        // - 다른 모든 정점들의 리스트를 순회하며 넘겨받은 정점(A)과 이어져 있는 간선을 제거
        if (this.contains(vertex)) {
          while (this.vertices[vertex].length > 0) {
            this.removeEdge(this.vertices[vertex][0], vertex);
          }
          delete this.vertices[vertex];
        }
      }
    }
    ```

#### Tree

- 데이터가 바로 아래에 있는 하나 이상의 데이터에 단방향으로 연결된 계층적 자료구조
- 하나의 데이터 뒤에 여러 개의 데이터가 존재할 수 있는 비선형 구조
- 루트(Root) 라는 하나의 꼭짓점 데이터를 시작으로 여러 개의 데이터를 간선(edge)으로 연결
- 각 데이터를 노드(Node)라고 하며, 두 개의 노드가 상하계층으로 연결되면 부모/자식 관계를 가짐
- 자식이 없는 노드는 리프 노드(leaf Node)
- 루트로부터 하위 계층의 특정 노드까지의 깊이(depth)로 표현
- 같은 깊이를 가지고 있는 노드를 묶어서 레벨(level)로 표현
- 리프 노드를 기준으로 루트까지의 높이(height)를 표현
- 트리 구조를 갖춘 작은 트리는 서브 트리

```js
class Tree {
  constructor(value) {
    // constructor로 만든 객체는 트리의 Node
    this.value = value;
    this.children = [];
  }

  insertNode(value) {
    // 서브 트리 삽입
    const childNode = new Tree(value);
    this.children.push(childNode);
  }

  contains(value) {
    if (this.value === value) {
      return true;
    }

    // 값을 찾을 때까지 children 배열을 순회하며 childNode를 탐색
    else if (this.children.length !== 0) {
      for (let item of this.children) {
        // 반복 내에서 바로 재귀하면
        // 반복 요소에서 못찾으면 false를 리턴 해버림
        if (item.contains(value)) {
          // 반복 요소에서 true면 true 리턴
          return true;
        }
      }
    }

    // 전부 탐색했음에도 불구하고 찾지 못했다면 false를 반환
    return false;
  }
}
```

#### Binary Search Tree

- 이진트리(Binary tree)
  |이진 트리|설명|
  |---|---|
  |정 이진 트리(Full binary tree|각 노드가 0 개 혹은 2 개의 자식 노드를 가짐|
  |완전 이진 트리(Complete binary tree)|마지막 레벨을 제외한 모든 노드가 가득 차 있어야 하고, 마지막 레벨의 노드는 전부 차 있지 않아도 되지만 왼쪽이 채워져야 함
  |포화 이진 트리(Perfect binary tree)|정 이진 트리이면서 완전 이진 트리인 경우. 모든 리프 노드의 레벨이 동일하고, 모든 레벨이 가득 채워져 있는 트리|
  |
- 이진 탐색 트리(Binary Search Tree)
  - 모든 왼쪽 자식의 값이 루트나 부모보다 작고, 모든 오른쪽 자식의 값이 루트나 부모보다 큰 값을 가짐
  - 균형 잡힌 트리가 아닐 때, 입력되는 값의 순서에 따라 한쪽으로 노드들이 몰리게 될 수 있음
  - 균형이 잡히지 않은 트리는 탐색하는 데 시간이 더 걸리는 경우도 있기 때문에 해결해야함

```JS
class BinarySearchTree {
  constructor(value) {
    this.value = value;
    // 자식노드 초기값
    this.left = null;
    this.right = null;
  }

  insert(value) {
    // 작으면서
    if (value < this.value) {
      // 비었을 때, 서브 트리 삽입
      if (this.left === null) {
        this.left = new BinarySearchTree(value)
        // 안비면 아래로 내려감(재귀)
      } else {
        this.left.insert(value)
      }
    }
    // 크면서
    if (value > this.value) {
      // 비었을 때, 서브 트리 삽입
      if (this.right === null) {
        this.right = new BinarySearchTree(value)
        // 안비면 아래로 내려감(재귀)
      } else {
        this.right.insert(value)
      }
    }
    //그것도 아니라면, 입력값이 트리에 들어 있는 경우
    return;
  }

  contains(value) {
    if (this.value === value) {
      return true;
    }
    if (value < this.value) {
      /* ref
      return !!(this.left && this.left.contains(value));
      */
      if (this.left === null) {
        return false
      } else {
        return this.left.contains(value)
      }
    }
    if (value > this.value) {
      /* ref
      return !!(this.right && this.right.contains(value));
      */
      if (this.right === null) {
        return false
      } else {
        return this.right.contains(value)
      }
    }
    return false
  }

  // 전위 순회
  preorder(callback) {
    callback(this.value);
    if (this.left) {
      this.left.preorder(callback)
    };
    if (this.right) {
      this.right.preorder(callback)
    };
  }

  // 중위 순회
  inorder(callback) {
    if (this.left) {
      this.left.inorder(callback)
    };
    callback(this.value);
    if (this.right) {
      this.right.inorder(callback)
    };
  }

  // 후위 순회
  postorder(callback) {
    if (this.left) {
      this.left.postorder(callback)
    };
    if (this.right) {
      this.right.postorder(callback)
    };
    callback(this.value);
  }

}
```

### BFS / DFS

- 그래프의 탐색
  - 하나의 정점에서 시작하여 그래프의 모든 정점들을 한 번씩 방문(탐색) 하는 것이 목적
- BFS(Breadth-First Search)
  - 가까운 정점부터 탐색
  - 더는 탐색할 정점이 없을 때, 그다음 떨어져 있는 정점을 순서대로 방문
  - 주로 두 정점 사이의 최단 경로를 찾을 때 사용
  - 주로 그래프가 굉장히 클 때 사용
- DFS(Depth-First Search)
  - 하나의 경로를 끝까지 탐색한 후, 도착이 아니라면 다음 경로로 넘어가 탐색
  - BFS보다 탐색 시간은 조금 오래 걸릴지라도 모든 노드를 완전히 탐색
  - 주로 그래프의 규모가 작고, depth가 얕을 때 사용

### Graph / Tree / BST 문제

#### 10 인접 행렬 생성

```js
function func(edges) {
  // 마지막 vertex의 index + 1
  const matrixSize =
    Math.max(...edges.flat().filter((item) => typeof item === "number")) + 1;

  const matrix = [];

  // matrix를 0의 배열로 채우기
  for (let i = 0; i < matrixSize; i++) {
    matrix.push(new Array(matrixSize).fill(0));
  }

  // edge있으면 1로 바꿔주기
  for (let edge of edges) {
    matrix[edge[0]][edge[1]] = 1;
    if (edge[2] === "undirected") {
      matrix[edge[1]][edge[0]] = 1;
    }
  }

  return matrix;
}
```

#### 11 인접 행열 길찾기

```js
function func(matrix, from, to) {
  // visit한 vertex를 저장해서 최적화
  const visitedVertex = [from];

  const innerGetDirection = (matrix, from, to) => {
    if (matrix[from][to] === 1) {
      return true;
    }

    for (let i = 0; i < matrix[from].length; i++) {
      // 길이 있고(1), 반문한 정점이 아닐 때,
      if (matrix[from][i] === 1 && !visitedVertex.includes(i)) {
        // 방문 표시
        visitedVertex.push(i);

        // 바로 함수 선언하면 중간에 false가 반환되어버림
        if (innerGetDirection(matrix, i, to)) {
          return true;
        }
      }
    }
    return false;
  };

  return innerGetDirection(matrix, from, to);
}
```

#### 12 [BFS / DFS] 연결된 정점 그룹!!

```js
function func(edges) {
  const matrixSize = Math.max(...edges.flat()) + 1;

  const adjList = {};

  for (let i = 0; i < matrixSize; i++) {
    adjList[i] = [];
  }

  for (edge of edges) {
    adjList[edge[0]].push(edge[1]);
    adjList[edge[1]].push(edge[0]);
  }

  /* 여기까지 인접 리스트 작성 */

  const visitedVertex = {};
  let count = 0;

  // 해당 vertex의 모든 인접 vertex를 방문하는 함수
  const bfs = (adjList, vertex) => {
    // 해당 vertex 방문(초기값)
    visitedVertex[vertex] = true;
    // 반복문 전에 큐를 선언하면서 vertex 넣음(초기값)
    const queue = [vertex];

    // 큐가 빌 때까지
    while (queue.length > 0) {
      // curVertex는 큐의 첫 번째 요소에서 빼냄
      const curVertex = queue.shift();

      // curVertex의 인접 vertex의 개수만큼 반복
      for (let i = 0; i < adjList[curVertex].length; i++) {
        // curVertex의 인접 vertex에 방문한 적이 없을 때,
        if (!visitedVertex[adjList[curVertex][i]]) {
          // 큐에 curVertex의 인접 vertex 저장
          queue.push(adjList[curVertex][i]);
          // 방문 정보에에 curVertex의 인접 vertex 저장
          visitedVertex[adjList[curVertex][i]] = true;
        }
      }
    }
  };

  // 해당 vertex의 모든 인접 vertex를 방문하는 함수
  const dfs = (adjList, vertex) => {
    // 해당 vertex 방문(초기값)
    visitedVertex[vertex] = true;

    // 해당 vertex의 인접 vertex의 개수만큼 반복
    for (let i = 0; i < adjList[vertex].length; i++) {
      // vertex의 인접 vertex에 방문한 적이 없을 때,
      if (!visitedVertex[adjList[vertex][i]]) {
        // 인접 vertex를 방문하는 재귀 반복
        dfs(adjList, adjList[vertex][i]);
      }
    }
  };

  for (let i = 0; i < matrixSize; i++) {
    // 해당 vertex를 방문한 적이 없을 때,
    if (!visitedVertex[i]) {
      // 해당 vertex의 모든 인접 vertex를 방문하는 함수
      dfs(adjList, i);

      count++;
    }
  }

  return count;
}
```

#### 13 [DFS] 바코드

```js
function func(len) {
  const isValid = (str) => {
    // 순서데로 추가하면 앞만 검사
    // 1                1
    // 1|2              2|1
    // 1|21             1|21
    // 1|2|11 -> true   1|1|21 -> false
    // 따라서 뒤집어주면 새로 추가되는 숫자를 검사
    const reversedStr = str.split("").reverse().join("");
    for (let i = 1; i <= str.length / 2; i++) {
      if (reversedStr.slice(0, i) === reversedStr.slice(i, i * 2)) {
        return false;
      }
    }

    return true;
  };

  const code = "123";

  const makeBarcode = (str) => {
    // len과 str의 길이가 같을 때 재귀 반복 종료
    if (str.length === len) return str;

    for (let i = 0; i < 3; i++) {
      // 작은 수 순서데로 검사
      if (isValid(str + code[i])) {
        // 재귀 반복(유효성 검사를 통과하는 code를 더해서 str에 넣어줌)
        const validCode = makeBarcode(str + code[i]);
        // 바로 리턴하면 validCode 없을 때,
        // 재귀가 아니라 undefined가 바로 리턴됨
        if (validCode) {
          // 변수를 쓰는 이유는 재연산을 안하기 위해!!
          return validCode;
        }
      }
    }
  };

  return makeBarcode("");
}
```

## Today's takeaway

- 같은 값을 두 번 이상 사용할 때 변수 사용(최적화, 유지 보수 용이, 재사용성)
- 추가 정보를 따로 저장해서 조건으로 사용
- BFS는 queue 사용, DFS는 재귀 사용
- 그래프
  - 인접 리스트
    - 객체/배열 안의 배열
  - 인접 행렬
    - 2차원 배열
    - vertex를 삭제할 때는 안쓰는게 좋다.
- 이때까지와는 비교가 안되게 어려웠다. 철저한 복습이 필요하다.
- 자료구조를 눈으로 보고 익힐 수 있는 시각자료
  - [Data Structure Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
  - [Visualgo](https://visualgo.net/en)
