---
title: "BC-9w-4 / {FC} React(8) Deploy React App"
date: 2021-10-21
categories:
  - <Bootcamp>
tags:
  - React
---

## Today I learned

<!-- ## Algorithm Test 11 멱집합 ☆☆

```js
const func = function (str) {
  const arr = str.split("").sort();
  const arrSet = [...new Set(arr)];

  // target을 result에 하나씩 집어넣는 함수
  const aux = (target, result) => {
    const copy = [...result];
    for (let i = 0; i < copy.length; i++) {
      copy[i] += target;
      result.push(copy[i]);
    }
  };

  // Ex. "abc" -> ['', a, b,ab, c,ac,bc,abc]
  const result = [""];
  for (let i = 0; i < arrSet.length; i++) {
    aux(arrSet[i], result);
  }

  return result.sort();
};
``` -->

### + React with FastCampus(8) Deploy React App

#### SPA 프로젝트 배포 이해하기

- npm run build
  - long term caching techniques
- SPA Deploy 특징
  - 모든 요청을 서버에 하고 받아오는 형태가 아님
  - 라우팅 경로에 상관없이 리액트 앱을 받아 실행
  - 라우팅은 받아온 리액트 앱을 실행 후 적용
  - static 파일을 제외한 모든 요청을 index.html로 응답해 주도록 작업
- SPA Deploy 방식
  1. serve -s build
     - https://github.com/zeit/serve
  2. AWS S3
  3. NginX
  4. node.js express

#### serve 패키지

```bash
npm i serve -g
serve -s build
# -s 옵션은 어떤 라우팅으로 요청해도 index.html을 응답하도록 함
```

#### AWS S3

1. 버킷 만들고 해당 버킷으로 이동
   1. 모든 파일(build 내부) 추가
   2. static 폴더(build 내부) 추가
   3. 업로드
2. 속성으로 이동
   1. 정적 웹사이트 호스팅 활성화
   2. 인덱스 문서와 오류 문서는 index.html
3. 권한으로 이동
   1. 퍼블릭 엑세스 차단 해제
   2. 버킷 정책 편집
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "PublicReadGetObject",
            "Effect": "allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": ["arn:aws:s3:::버킷이름/*"]
          }
        ]
      }
      ```

\*https와 ssl을 적용하고 싶으면 "cloud front"라는 cdn을 달아야함

#### NginX

#### node.js의 express

```bash
npm i express
```

```js
// server.js
const express = require("express");
const path = require("path");
const app = express();

// express.static() -> static server 셍성
// path.join() -> 경로
// __dirname -> node.js global 변수, 현재 루트 폴더명
// 'build' -> ...의 build를 join
app.use(express.static(path.join(__dirname, "build")));

// app.get('/', function(req, res) {
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(9000);
```

#### 서버사이드 랜더링

- ReactDOMServer
  ```js
  import ReactDOMServer from "react-dom/server";
  ```
- Server Side Rendering
  - 서버에서 응답을 가져올때, 기존 처럼 static file 만을 가져오는 것이 아니고, 먼저 서버에서 응답 값을 만들어서 내려주고, 그 후에 static file 을 내려줍니다.
  - static file 을 다 내려받고, 리액트 앱을 브라우저에서 실행한 뒤에는 SPA 처럼 동작하게 됩니다.
- React Server Side Rendering
  - React Component 를 브라우저가 아니라 Node.js 에서 사용
  - ReactDOMServer.renderToString(\<App />);
    - 결과가 문자열
    - 이것을 응답으로 내려준다.
  - 라우팅, 리덕스 와 같은 처리를 서버에서 진행하고 내려준다.
    - 복잡, 어렵
  - JSX 가 포함된 리액트 코드를 서버에서 읽을 수 있도록 babel 설정을 해야 한다.

```js
// 서버 사이드 랜더링과 클라이언트 사이드 랜더링이 다를때 자동으로 덮어써줌
// server.js
const express = require("express");
const path = require("path");
const app = express();
const ReactDOMServer = require("react-dom/server");
const react = require("React");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "build")));

app.get("/test", (req, res) => {
  // <div data-reactroot"">Hello</div>
  const ssr = ReactDOMServer.renderToString(
    React.createElement("div", null, "Hello")
  );
  const indexHtml = fs
    .readFileSync(path.join(__dirname, "build", "index.html"))
    .toString()
    .replace('<div id="root"></div>', `<div id="root">${ssr}</div>`);
  res.send(indexHtml);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(9000);
```

## Today's takeaway

- 서버를 구현하는 여러 방식이 있다.
- 맛보기로만 대충 배워서, 이런 방식들이 있다는 것만 머리에 넣어두고, 하나하나 직접 검색해서 사용법을 알아볼 것이다.
