---
title: "BC-7w-3 / [자료구조/알고리즘] 재귀(2)"
date: 2021-10-07
categories:
  - "'Bootcamp'"
tags:
  - Algorithm
---

# Today I learned

<!-- ## Algorithm Test 02 효율적인 피보나치 ☆☆

 ```js
function func(n) {
  // 배열로 피보나치를 선언(초기값)
  const listOfFib = [0, 1];

  const pushFibonacci = (n) => {
    // n 인덱스가 있으면 그데로 반환
    if (listOfFib[n] !== undefined) {
      return listOfFib[n];
      // n 인덱스가 없으면 n-2 인덱스와 n-1 인덱스를 더해서 생성 할당
      // 이 과정에서 재귀적으로 배열을 채워나감
    } else {
      listOfFib[n] = pushFibonacci(n - 2) + pushFibonacci(n - 1);
      // 배열을 채운 뒤 반환
      return listOfFib[n];
    }
  };

  return pushFibonacci(n);
}
``` -->

#### Big-O notation

- O(1) (Constant)
  - 입력 데이터의 크기에 상관없이 언제나 일정한 시간이 걸리는 알고리즘을 나타낸다. 데이터가 얼마나 증가하든 성능에 영향을 거의 미치지 않는다.
- O(log₂ n) (Logarithmic)
  - 입력 데이터의 크기가 커질 수록 처리 시간이 로그(log: 지수 함수의 역함수) 만큼 짧아지는 알고리즘이다. 예를 들어 데이터가 10배가 되면, 처리 시간은 2배가 된다. 이진 탐색이 대표적이며, 재귀가 순기능으로 이루어지는 경우도 해당된다.
- O(n) (Linear)
  - 입력 데이터의 크기에 비례해 처리 시간이 증가하는 알고리즘이다. 예를 들어 데이터가 10배가 되면, 처리 시간도 10배가 된다. 선형 탐색 알고리즘이 대표적이다.
- O(n log₂ n) (Linear-Logarithmic)
  - 데이터가 많아질수록 처리시간이 로그(log) 배 만큼 더 늘어나는 알고리즘이다. 예를 들어 데이터가 10배가 되면, 처리 시간은 약 20배가 된다. 정렬 알고리즘 Merge sort, Quick sort의 평균 시간 복잡도이다.
- O(n²) (quadratic)
  - 데이터가 많아질수록 처리시간이 급수적으로 늘어나는 알고리즘이다. 예를 들어 데이터가 10배가 되면, 처리 시간은 최대 100배가 된다. 이중 루프(n² matrix)가 대표적이다. 단, m이 n보다 작을 때는 반드시 O(nm)로 표시하는것이 바람직하다.
- O(2ⁿ) (Exponential)
  - 데이터량이 많아질수록 처리시간이 기하급수적으로 늘어나는 알고리즘이다. 대표적으로 피보나치 수열이 있으며, 재귀가 역기능을 할 경우도 해당된다.

## Sprint - StringifyJSON

| API                    | 설명                                     |
| ---------------------- | ---------------------------------------- |
| JSON.stringify(obj)    | obj -> json문자열, 직렬화(serialize)     |
| JSON.parse(json문자열) | json문자열 -> obj, 역직렬화(deserialize) |

- JSON문자열은 \"key\":\"value"로 쌍따옴표만 사용 가능하고 공백 불가

```js
function stringifyJSON(obj) {
  if (typeof obj === "number" || typeof obj === "boolean" || obj === null) {
    return String(obj);
  }

  if (typeof obj === "string") {
    return `"${obj}"`;
  }

  if (Array.isArray(obj)) {
    // 새로운 배열에 넣어야함(그냥 리턴 시 요소가 리턴)
    const newArr = [];

    for (const item of obj) {
      newArr.push(stringifyJSON(item));
    }

    // `{newArr}` or String(newArr)는 "items"로 나옴
    // "[...]"
    return `[${newArr}]`;
  }

  if (typeof obj === "object") {
    // `${{a: 1}}` -> [object object]
    // 문자열 안에 먼저 넣고 {}로 묶어줌
    let innerStr = "";

    for (const key in obj) {
      if (obj[key] === undefined || typeof obj[key] === "function") {
        return "{}";
      }

      innerStr = innerStr + `${stringifyJSON(key)}:${stringifyJSON(obj[key])},`;
    }

    // 마지막 쉼표 제거
    // `{${"'key':'value',...,"}}` -> "{"key":"value",...}"
    return `{${innerStr.slice(0, -1)}}`;
  }
}

/* 개선 사항 */
for (const key in obj) {
  if (obj[key] !== undefined && typeof obj[key] !== "function") {
    innerStr = innerStr + `${stringifyJSON(key)}:${stringifyJSON(obj[key])},`;
  }
}
```

## Tree UI

```js
const root = document.getElementById("root");
function createTreeView(menu, currentNode) {
  for (const item of menu) {
    if (item.type === "group") {
      const liEl = document.createElement("li");
      currentNode.append(liEl);

      const inputEl = document.createElement("input");
      inputEl.type = "checkbox";
      inputEl.checked = "false";

      const spanEl = document.createElement("span");
      spanEl.textContent = item.name;

      const ulEl = document.createElement("ul");

      liEl.append(inputEl, spanEl, ulEl);

      createTreeView(item.children, ulEl);
    } else if (item.type === "item") {
      const liEl = document.createElement("li");
      liEl.textContent = item.name;
      currentNode.append(liEl);
    }
  }
}
/* 개선 사항
1. 공통 요소 밖으로 빼기
2. Element를 생성하는 함수를 만들어서 반복을 줄이기
*/
const createEl = (tag, parentEl, key, value) => {
  const el = document.createElement(tag);
  parentEl.append(el);
  /* 
  여기서 setAttribute가 아닌 리터럴 할당을 해서 에러가 났었음
  el.key를 해도 el에 key라는 attribute가 없어서 setAttribute를 써야함
  */
  key ? el.setAttribute(key, value) : null;
  return el;
};

for (const item of menu) {
  const liEl = createEl("li", currentNode);
  if (item.type === "group") {
    createEl("input", liEl, "type", "checkbox");

    const spanEl = createEl("span", liEl);
    spanEl.textContent = item.name;

    const ulEl = createEl("ul", liEl);

    createTreeView(item.children, ulEl);
  } else if (item.type === "item") {
    liEl.textContent = item.name;
  }
}
```

# Today's takeaway

- 분해해서 생각하기가 많은 도움이 되었다.
- 페어의 코드를 보며 많이 배웠다. 반복되는 기능을 함수로 빼서 재사용이 가능하게 만들고, 삼항연산자로 직관적이고 짧게 조건문을 적었다.
- 재귀는 트리구조에서 많이 유용하다.
