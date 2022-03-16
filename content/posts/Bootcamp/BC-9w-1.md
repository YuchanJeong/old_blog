---
title: "BC-9w-1 / [HTTP/네트워크] 네트워크-기초"
date: 2021-10-18
categories:
  - "'Bootcamp'"
tags:
  - Network
---

## Today I learned

<!-- ## Algorithm Test 08 배열의 요소 곱하기 최댓값 ☆

```js
const func = function (arr) {
  arr.sort((a, b) => a - b);
  lastIdx = arr.length - 1;
  result1 = arr[0] * arr[1] * arr[lastIdx];
  result2 = arr[lastIdx - 2] * arr[lastIdx - 1] * arr[lastIdx];
  return Math.max(result1, result2);
};
``` -->

### 클라이언트-서버 아키텍처(2티어 아키텍처)

- Client
  - 리소스를 사용하는 앱
- Server
  - 리소스가 존재하는 곳
- [HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)
  - 프로토콜(통신 규약)
  - OSI 7 Layers
    - 물리-데이터 링크-네트워크 계층-전송 계층-세션 계층-표현 계층-응용 계층
    - 응용 계층(7)
      |프로토콜 이름|설명|
      |---|---|
      |HTTP|웹에서 HTML, JSON 등의 정보를 주고받는 프로토콜|
      |HTTPS|HTTP에서 보안이 강화된 프로토콜|
      |FTP|파일 전송 프로토콜|
      |SMTP|메일을 전송하기 위한 프로토콜|
      |SSH|CLI 환경의 원격 컴퓨터에 접속하기 위한 프로토콜|
      |RDP|Windows 계열의 원격 컴퓨터에 접속하기 위한 프로토콜|
      |WebSocket|실시간 통신, Push 등을 지원하는 프로토콜|
    - 전송 계층(4)
      |프로토콜 이름|설명|
      |---|---|
      |TCP|HTTP, FTP 통신의 등의 근간이 되는 인터넷 프로토콜|
      |UDP|(양방향의 TCP와는 다르게)단방향으로 작동하는 훨씬 더 단순하고 빠르지만, 신뢰성이 낮은 인터넷 프로토콜|
- API(Application Programming Interface)
  - Interface
    - 의사소통이 가능하도록 만들어진 접점
  - [HTTP 요청 메소드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
    |요청|적절한 메소드|
    |---|---|
    |추가(Create)|POST|
    |조회(Read)|GET|
    |갱신(Update)|PUT or PATCH|
    |삭제(Delete)|DELETE|

### 보이지 않는 곳의 브라우저 작동 원리

#### URL과 URI

- URL(Uniform Resource Locator)
  - 네트워크 상에서 웹 페이지, 이미지, 동영상 등의 파일이 위치한 정보
  - scheme, hosts, url-path로 구분
- URI(Uniform Resource Identifier)
  - URL의 기본 요소에 더해 query, bookmark를 포함

| 부분                             | 명칭     | 설명                                                                                |
| -------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| file://, http://, https://       | scheme   | 통신 프로토콜                                                                       |
| 127.0.0.1, www.google.com        | hosts    | 웹 페이지, 이미지, 동영상 등의 파일이 위치한 웹 서버, 도메인 또는 IP                |
| :80, :443, :3000                 | port     | 웹 서버에 접속하기 위한 통로                                                        |
| /search, /Users/username/Desktop | url-path | 웹 서버의 루트 디렉토리로부터 웹 페이지, 이미지, 동영상 등의 파일이 위치까지의 경로 |
| q=JavaScript                     | query    | 웹 서버에 전달하는 추가 질문                                                        |

#### IP와 Port

- IP address(Internet Protocol address)
  - localhost, 127.0.0.1
    - 현재 사용 중인 로컬 PC
  - 0.0.0.0, 255.255.255.255
    - broadcast address, 로컬 네트워크에 접속된 모든 장치와 소통하는 주소
  - IPv4
    - 4 bytes each
    - 2^32(약 43억)개 IP 주소 표현
  - IPv6
    - 6 bytes each
    - 2^128개 IP 주소 표현
- PORT
  - 포트 번호는 0 ~ 65,535 까지 사용할 수 있음
  - 그 중에서 0 ~ 1024번 까지의 [포트 번호](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)는 주요 통신을 위한 규약에 따라 이미 정해져 있음
    - :22 - SSH  
      :80 - HTTP  
      :443 - HTTPS

#### 도메인과 DNS

- 도메인
  - 웹 브라우저를 통해 특정 사이트에 진입을 할 때, IP 주소를 대신하여 사용하는 주소
  - 터미널에서 도메인 이름을 통해 IP 주소를 확인하는 명령어 nslookup
- DNS(Domain Name System)
  - 호스트의 도메인 이름을 IP 주소로 변환하거나 반대의 경우를 수행할 수 있도록 개발된 데이터베이스 시스템

### Chrome Network Tab

- https://www.youtube.com/watch?v=e1gAyQuIFQo

### HTTP(HyperText Transfer Protocol)

#### [HTTP Messages](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)

- 클라이언트와 서버 사이에서 데이터가 교환되는 방식
- HTTP messages의 구조
  1. start/status line
     - 요청이나 응답의 상태
  2. HTTP headers
     - 요청을 지정하거나, 메시지에 포함된 본문을 설명하는 헤더의 집합
  3. empty line
     - 헤더와 본문을 구분하는 빈 줄
  4. body
     - 요청과 관련된 데이터나 응답과 관련된 데이터 또는 문서를 포함
     - 요청과 응답의 유형에 따라 선택적으로 사용

#### HTTP Request

- Start line
  1. HTTP method
     - 수행할 작업(GET, PUT, POST 등)이나 방식(HEAD or OPTIONS)을 설명
  2. 요청 대상(일반적으로 URL이나 URI) 또는 프로토콜, 포트, 도메인의 절대 경로
     - origin 형식
       - ?와 쿼리 문자열이 붙는 절대 경로
       - POST, GET, HEAD, OPTIONS 등의 method와 함께 사용
       - POST / HTTP/1.1  
         GET /background.png HTTP/1.0  
         HEAD /test.html?query=alibaba HTTP/1.1  
         OPTIONS /anypage.html HTTP/1.0
     - absolute 형식
       - 완전한 URL 형식으로, 프록시에 연결하는 경우 대부분 GET method와 함께 사용
       - GET http://developer.mozilla.org/en-US/docs/Web/HTTP/Messages HTTP/1.1
     - authority 형식
       - 도메인 이름과 포트 번호로 이루어진 URL의 authority component
       - HTTP 터널을 구축하는 경우, CONNECT와 함께 사용
       - CONNECT developer.mozilla.org:80 HTTP/1.1
     - asterisk 형식
       - OPTIONS 와 함께 별표(\*) 하나로 서버 전체를 표현
       - OPTIONS \* HTTP/1.1
  3. HTTP 버전
- Headers
  - 헤더 이름(대소문자 구분이 없는 문자열), 콜론( : ), 값을 입력
  - General headers
    - 메시지 전체에 적용되는 헤더로, body를 통해 전송되는 데이터와는 관련이 없는 헤더
  - Request headers
    - fetch를 통해 가져올 리소스나 클라이언트 자체에 대한 자세한 정보를 포함하는 헤더
    - User-Agent, Accept-Type, Accept-Language과 같은 헤더는 요청을 보다 구체화
    - Referer처럼 컨텍스트를 제공하거나 If-None과 같이 조건에 따라 제약을 추가할 수 있음
  - Representation headers
    - body에 담긴 리소스의 정보(컨텐츠 길이, MIME 타입 등)를 포함하는 헤더
- Body(Optional)
  - GET, HEAD, DELETE, OPTIONS처럼 서버에 리소스를 요청하는 경우에는 본문이 필요하지 않음
  - POST나 PUT과 같은 일부 요청에서 데이터를 업데이트하기 위해 사용
  - Single-resource bodies(단일-리소스 본문)
    - 헤더 두 개(Content-Type과 Content-Length)로 정의된 단일 파일로 구성
  - Multiple-resource bodies(다중-리소스 본문)
    - 여러 파트로 구성된 본문에서는 각 파트마다 다른 정보를 지님
    - 보통 HTML form과 관련

#### HTTP Responses

- Status line
  1. 현재 프로토콜의 버전(HTTP/1.1 등)
  2. [상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status) - 요청의 결과(200, 302, 404 등)
  3. 상태 텍스트 - 상태 코드에 대한 설명
  - HTTP/1.1 404 Not Found.
- Headers
  - General headers
  - Response headers
    - 위치 또는 서버 자체에 대한 정보(이름, 버전 등)와 같이 응답에 대한 부가적인 정보를 갖는 헤더
    - Vary, Accept-Ranges와 같이 상태 줄에 넣기에는 공간이 부족했던 추가 정보를 제공
  - Representation headers
- Body(Optional)
  - Single-resource bodies(단일-리소스 본문)
    - 길이가 알려진 단일-리소스 본문은 두 개의 헤더(Content-Type, Content-Length)로 정의
    - 길이를 모르는 단일 파일로 구성된 단일-리소스 본문은 Transfer-Encoding이 chunked 로 설정되어 있으며, 파일은 chunk로 나뉘어 인코딩
  - Multiple-resource bodies(다중-리소스 본문)
    - 서로 다른 정보를 담고 있는 body

#### Stateless(무상태성)

- HTTP로 클라이언트와 서버가 통신을 주고 받는 과정에서, HTTP가 클라이언트나 서버의 상태를 확인하지 않음
- 따라서, 필요에 따라 다른 방법(쿠키-세션, API 등)을 통해 상태를 확인
- HTTP의 큰 특징

#### Advanced Concepts

- [MDN: MIME Type](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [브라우저는 어떻게 동작하는가](https://d2.naver.com/helloworld/59361)

### 보이는 곳의 브라우저 작동 원리

#### SPA를 만드는 기술: AJAX

1. AJAX 란?
   - Asynchronous JavaScript And XMLHttpRequest의 약자로, JavaScript, DOM, Fetch, XMLHttpRequest, HTML 등의 다양한 기술을 사용하는 웹 개발 기법
   - 가장 큰 특징은 웹 페이지에 필요한 부분에 필요한 데이터만 비동기적으로 받아와 화면에 그려낼 수 있는 것
2. AJAX의 핵심 기술
   - JavaScript와 DOM, 그리고 Fetch
   - Fetch를 사용하면, 페이지를 이동하지 않아도 서버로부터 필요한 데이터를 받아올 수 있음
   - Fetch는 XHR의 단점을 보완한 새로운 Web API이며, XML보다 가볍고 JavaScript와 호환되는 JSON을 사용
   ```js
   fetch('http://52.78.213.9:3000/messages')
   .then (function(response) {
     return response.json();
   })
   .then(function (json) {
     ...
   });
   ```
3. AJAX의 장점
   - 서버에서 완성된 HTML을 보내주지 않아도 필요한 데이터를 비동기적으로 가져와 브라우저에서 화면의 일부만 업데이트 하여 렌더링 가능
   - XHR이 표준화 되면서부터 브라우저에 상관 없이 AJAX를 사용
   - 유저 중심 어플리케이션 개발 AJAX를 사용하면 필요한 일부분만 렌더링하기 때문에 빠르고 더 많은 상호작용이 가능한 어플리케이션을 만들 수 있음
   - 더 작은 대역폭(네트워크 통신 한 번에 보낼 수 있는 데이터의 크기). AJAX에서는 필요한 데이터를 텍스트 형태(JSON, XML 등) 보내면 되기 때문에 비교적 데이터의 크기가 작음
4. AJAX의 단점
   - Search Engine Optimization(SEO)에 불리함. AJAX 방식의 웹 어플리케이션의 HTML 파일은 뼈대만 있고 데이터는 없기 때문에 사이트의 정보를 긁어가기 어려움
   - AJAX에서는 이전 상태를 기억하지 않기 때문에 뒤로가기 등의 기능을 구현하기 위해서는 별도로 History API를 사용해야 함

\*[지메일이 핫메일을 이긴 진짜 이유 (Ajax가 가져온 유저 인터페이스의 혁신)](https://sungmooncho.com/2012/12/04/gmail-and-ajax/)

#### SSR과 CSR

- SSR은 서버에서 페이지를 렌더링하고, CSR은 브라우저(클라이언트)에서 페이지를 렌더링함. 브라우저는 사용자가 다른 경로를 요청할 때마다 페이지를 새로고침 하지 않고, 동적으로 라우팅을 관리
- SSR(Server Side Rendering)
  - 웹 페이지를 브라우저에서 렌더링하는 대신에, 서버에서 렌더링
  - 브라우저가 서버의 URI로 GET 요청을 보내면, 서버는 정해진 웹 페이지 파일을 브라우저로 전송
  - 그리고 서버의 웹 페이지가 브라우저에 도착하면 완전히 렌더링
  - 브라우저가 다른 경로로 이동할 때마다 서버는 이 작업을 다시 수행
- CSR(Client Side Rendering)
  - 브라우저에서 웹 페이지를 렌더링
  - 브라우저의 요청을 서버로 보내면, 웹 페이지의 골격이 될 단일 페이지를 브라우저로 전송
  - 웹 페이지와 함께 전달된 JavaScript 파일은 브라우저에서 웹 페이지를 완전히 렌더링 된 페이지로 바꿈
  - 브라우저가 다른 경로로 이동하면, 브라우저는 브라우저가 요청한 경로에 따라 페이지를 다시 렌더링
  - 이때 보이는 웹 페이지의 파일은 맨 처음 서버로부터 전달받은 웹 페이지 파일과 동일한 파일
- Use SSR
  - SEO(Search Engine Optimization) 가 우선순위인 경우
  - 웹 페이지의 첫 화면 렌더링이 빠르게 필요한 경우
  - 웹 페이지가 사용자와 상호작용이 적은 경우
- Use CSR
  - SEO 가 우선순위가 아닌 경우
  - 사이트에 풍부한 상호 작용이 있는 경우(빠른 라우팅)
  - 웹 애플리케이션을 제작하는 경우(빠른 동적 렌더링)

#### CORS[(Cross-Origin Resource Sharing)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

- 브라우저의 사용자를 보호하는 브라우저의 자발적인 보안조치
- Cross-origin requests is controlled by CORS

![스크린샷 2021-10-18 오후 5 30 40](https://user-images.githubusercontent.com/84524514/137696218-084be3c3-fc73-44fb-b4cf-599600e5c8e4.png)

## Today's takeaway

- Client, Server, HTTP, API
- URL, URI
- IP, Port
- 도메인, DNS
- HTTP Messages
- AJAX
- SSR, CSR
- 용어들의 의미를 잘 기억하고, 흐름을 이해하자.
- HTTP의 가장 큰 특징은 무상태성(Stateless)이다.
