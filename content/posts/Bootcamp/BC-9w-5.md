---
title: "BC-9w-5 / [Web Server] 기초(1)"
date: 2021-10-22
categories:
  - "'Bootcamp'"
tags:
  - Network
---

## Today I learned

### Algorithm Test 12 treeBFS

```js
let func = function (node) {
  // 반복문 밖의 변수에 누적
  const queue = [node];
  const result = [];

  while (queue.length > 0) {
    // queue라서 순서데로
    const node = queue.shift();

    // node의 값을 먼저 넣고
    result.push(node.value);

    // 자식 노드들을 큐에 넣음
    node.children.forEach((childNode) => {
      queue.push(childNode);
    });
  }

  return result;
};

let Node = function (value) {
  this.value = value;
  this.children = [];
};
```

### CORS(Cross Origin Resource Sharing)

1. 보안 상의 이유로, 브라우저들은 스크립트 내에서 초기화되는 cross-origin HTTP 요청을 제한
2. 개발자들은 브라우저 벤더사들에세 XMLHttpRequest가 cross-origin을 요청할 수 있도록 요청
3. 서버가 Allow 한 범위내에서 cross-origin 요청 허용

```js
const defaultCorsHeader = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTION",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};
/*
모든 도메인(*) 허용
메소드는 GET, POST, PUT, DELETE, OPTION만 허용
헤더에는 control-type과 accept만 허용
preflight request는 10초까지 허용
*/
```

- OPTIONS
  - preflight request
  - 클라이언트가 서버에서 Allow 하는 조건들을 다 맞추고 있는가 사전에 서버에 확인하는 요청

### Sprint - Mini Node Server

- Web Server
  - HTTP 요청을 처리하고 응답을 보내 주는 프로그램
- Node.js의 [http 모듈](https://nodejs.org/dist/latest-v14.x/docs/api/http.html)로 Web Server 제작
  - [HTTP 트랜잭션 해부](https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/)
- 서버 실행
  ```bash
  node server/basic-server.js
  ```

1. 서버 생성

   ```js
   const http = require("http");
   const PORT = ...

   const server = http
     .createServer((request, response) => {
       // 여기서 작업이 진행됩니다!
     })
     .listen(PORT);
   ```

   - HTTP 요청이 서버에 오면 ".createServer()" 메소드로 request와 response 객체를 전달하며 요청 핸들러 함수를 호출
   - 요청을 처리하려면 ".listen()" 메소드가 server 객체에서 호출되어야 하는데, 대부분 서버가 사용하고자 하는 포트 번호를 listen에 전달하기만 하면 됨

2. method, URL, header

   ```js
   const { method, url, headers } = request;
   const userAgent = headers["user-agent"];
   ```

   - method는 일반적인 HTTP 메소드/동사
   - url은 전체 URL에서 서버, 프로토콜, 포트를 제외한 것으로, 세 번째 슬래시 이후의 나머지 전부
   - 모든 header는 소문자로만 표현

3. 요청 바디

   ```js
   let body = [];
   request
     .on("data", (chunk) => {
       body.push(chunk);
     })
     .on("end", () => {
       body = Buffer.concat(body).toString();
     });
   ```

   - request 객체는 "data"와 "end" 이벤트로 데이터를 받을 수 있음
   - 각 "data" 이벤트에서 발생시킨 "chunk"는 Buffer
   - "chunk"가 문자열 데이터일 때, 이 데이터를 배열에 담고, "end" 이벤트에서 이어 붙인 다음 문자열로 만드는 것이 가장 좋음
   - 메소드 정리
     - request.on("data", (chunk) => {})  
       request.on("end", () => {})
     - response.writeHead(응답 넘버, 응답 헤더)  
       response.end(전달하고 싶은 데이터)

```js
/* Mini Node Server(1) */
const http = require("http");
const PORT = 5000;
const ip = "localhost";

const server = http.createServer((req, res) => {
  // 요청이 OPTIONS일 때, 클라이언트의 preflight request에 대한 응답을 돌려줌
  if (req.method === "OPTIONS") {
    // 명시적으로 응답 스트림에 헤더를 작성
    res.writeHead(200, defaultCorsHeader);
    res.end();
  }

  if (req.method === "POST") {
    let body = [];
    req
      // 요청의 data chunk를 body에 넣음
      .on("data", (chunk) => {
        body.push(chunk);
      })
      // 요청이 끝날 때 body를 문자열로 변환 후 응답
      .on("end", () => {
        body = Buffer.concat(body).toString();
        res.writeHead(201, defaultCorsHeader);
        if (req.url === "/lower") {
          // 응답이 끝날 때 body를 대문자로 내보냄
          res.end(body.toLowerCase());
        } else if (req.url === "/upper") {
          // 응답이 끝날 때 body를 소문자로 내보냄
          res.end(body.toUpperCase());
        } else {
          // 에러 전달
          res.writeHead(404, defaultCorsHeader);
          res.end();
        }
      });
  }
});

// 요청 처리
server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

// 응답 헤더
const defaultCorsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": 10,
};
```

```js
/* Mini Node Server(2) */
const http = require("http");
const PORT = 5000;

const server = http
  .createServer((req, res) => {
    if (req.method === "OPTIONS") {
      res.writeHead(200, defaultCorsHeader);
      res.end();
    }

    if (req.method === "POST") {
      let body = "";
      req
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          res.writeHead(201, defaultCorsHeader);
          if (req.url === "/upper") {
            res.end(body.toUpperCase());
          } else if (req.url === "/lower") {
            res.end(body.toLowerCase());
          } else {
            res.writeHead(404, defaultCorsHeader);
            res.end();
          }
        });
    }
  })
  .listen(PORT);

const defaultCorsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": 10,
};
```

## Today's takeaway

- 기본적인 서버 설계에 대해서 배웠다.
- 서버를 만드는 것은 처음이라 아직 어렵다.
- 주소를 통해서 request를 보내고, 서버에서 처리를 한 다음 response를 보낸다.
- 데이터는 body를 통해서 보내고, 조회는 query와 params를 이용한다.
