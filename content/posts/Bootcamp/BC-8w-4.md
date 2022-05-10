---
title: "BC-8w-4 / [JS/Node] 비동기-fetch API"
date: 2021-10-15
categories:
  - <Bootcamp>
tags:
  - JavaScript
---

## Today I learned

<!-- ## Algorithm Test 07 treeDFS ☆

```js
let dfs = function (node) {
  let tree = [node.value];
  node.children.forEach((childNode) => {
    tree = [...tree, ...dfs(childNode)];
  });
  return tree;
};

let Node = function (value) {
  this.value = value;
  this.children = [];
};
```

## fetch API

```js
fetch(url)
  .then((response) => response.json()) // 응답을 Promise 객체(JSON 형태)로 변환시켜서 반환
  .then((data) => console.log(data)) // 콘솔에 json을 출력
  .catch((error) => console.log(error)); // 에러가 발생한 경우, 에러를 띄움
``` -->

### Sprint - 비동기 예제 (3) 네트워크 요청

#### 01_PromiseChaining

```js
function getNewsAndWeather() {
  const result = {};

  return fetch(newsURL)
    .then((response) => response.json())
    .then((data) => {
      result["news"] = data;
      return fetch(weatherURL)
        .then((response) => response.json())
        .then((data) => {
          result["weather"] = data;
          return result;
        });
    });
}
```

#### 02_Promise.all

```js
function getNewsAndWeatherAll() {
  return Promise.all([
    fetch(newsURL).then((response) => response.json()),
    fetch(weatherURL).then((response) => response.json()),
  ]).then((datSet) => {
    return { news: dataSet[0], weather: dataSet[1] };
  });
}
```

#### 03_async & await

```js
async function getNewsAndWeatherAsync() {
  let news = await fetch(newsURL).then((response) => response.json());
  let weather = await fetch(weatherURL).then((response) => response.json());
  return { news: news, weather: weather };
}
```

## Today's takeaway

- fetch()로 url을 받아와서 response.json()으로 객체 데이터(JSON 형태)를 사용
- fetch()는 Promise를 반환하는 함수이다.
- 어제는 적응되지 않아서 어려웠지만 어제 복습도 하고 오늘 한 번 더 실습을 하면서 사용법을 익혔다.
- 이제 데이터를 직접 적어 넣는 하드코딩뿐만 아니라, 서버에서 데이터를 받아오는 진짜 코딩도 할 수 있게 되었다.
