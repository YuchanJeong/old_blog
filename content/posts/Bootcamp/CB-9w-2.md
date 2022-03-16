---
title: "BC-9w-2 / [HTTP/네트워크] REST API"
date: 2021-10-19
categories:
  - "'Bootcamp'"
tags:
  - Network
---

# Today I learned

## Algorithm Test 09 나머지의 분배 ☆☆

<!-- ```js
function func1(base, exponent) {
  if (exponent === 0) return 1;

  // Ex. 2^4 = 2^2 * 2^2
  // 반씩 재귀 반복
  let half = func1(base, Math.floor(exponent / 2));
  let full = half * half;

  if (exponent % 2 === 0) {
    return full % 94906249;
  } else {
    // 홀 수 일때는 하나 더 곱해줌
    return (full * base) % 94906249;
  }
}
```

```js
function func2(base, exponent) {
  if (exponent === 0) return 1;

  let half = func2(base, Math.floor(exponent / 2));
  // 결과를 바로 저장
  let result = (half * half) % 94906249;

  if (exponent % 2 === 0) {
    return result;
  } else {
    // ((half * half) * base) % 94906249;
    // ((half * half) % 94906249) * (base % 94906249) % 94906249;
    // (result * (base % 94906249)) % 94906249;
    // (result * base) % 94906249 % 94906249;
    // (result * base) % 94906249;
    return (result * base) % 94906249;
  }
}
``` -->

- 나머지의 분배
  - (A + B) % C === ((A % C) + (B % C)) % C
  - (A _ B) % C === ((A _ C) _ (B _ C)) % C
  - (A - B) % C === ((A % C) - (B % C) + C) % C

## Rest API

> REST(Representational State Transfer) API는 웹에서 사용되는 데이터나 자원(Resource)을 HTTP URI로 표현하고, HTTP 프로토콜을 통해 요청과 응답을 정의하는 방식

#### Rest 성숙도 모델 (RMM)

- 0단계: 단순히 HTTP 프로토콜을 사용

  ```js
  /* 예약 가능 시간 확인 */

  // Request
  POST /appointment HTTP/1.1
  [해더 생략]

  {
    "date": "2021-10-19",
    "doctor": "Yu"
  }

  // Responses
  HTTP/1.1 200 OK
  [헤더 생략]

  {
    "slots": [
      { "doctor": "Yu", "start": "09:00", "end": "12:00"},
      { "doctor": "Yu", "start": "14:00", "end": "16:00"}
    ]
  }
  ```

  ```js
  /* 특정 시간대 예약 */

  // Request
  POST /appointment HTTP/1.1
  [해더 생략]

  {
    "doctor": "Yu",
    "start": "14:00",
    "end": "15:00",
    "patient": "chan"
  }

  // Responses
  HTTP/1.1 200 OK
  [헤더 생략]
  ```

- 1단계: 개별 리소스와의 통신을 준수

  - 모든 자원은 개별 리소스에 맞는 엔드포인트(Endpoint)를 사용해야 함  
    \*엔드포인트는 리소스에 집중해 명사 형태의 단어로 작성(동사x)

    ```js
    /* 예약 가능 시간 확인 */

    // Request
    POST /doctors/Yu HTTP/1.1
    [해더 생략]

    {
      "date": "2021-10-19",
      "doctor": "Yu"
    }

    // Responses
    HTTP/1.1 200 OK
    [헤더 생략]

    {
      "slots": [
        { "id": 123, "doctor": "Yu", "start": "09:00", "end": "12:00"},
        { "id": 124, "doctor": "Yu", "start": "14:00", "end": "16:00"}
      ]
    }
    ```

    ```js
    /* 특정 시간대 예약 */

    // Request
    POST /slots/123 HTTP/1.1
    [해더 생략]

    {
      "patient": "chan"
    }

    // Responses
    HTTP/1.1 200 OK
    [헤더 생략]

    {
      "appointment": {
        "slot": { "id":123, "doctor": "Yu", ...},
        "patient": "chan"
      }
    }
    ```

  - 요청하고 받은 자원에 대한 정보를 응답으로 전달해야 함  
    (리소스 사용에 대한 실패 여부를 포함한 응답)

    ```js
    /* 예약 가능 시간 확인 */

    // Request
    POST /doctors/Yu HTTP/1.1
    [해더 생략]

    {
      "date": "2021-10-19",
      "doctor": "Yu"
    }

    // Responses
    HTTP/1.1 200 OK
    [헤더 생략]

    {
      "slots": [
        { "id": 123, "doctor": "Yu", "start": "09:00", "end": "12:00"},
        { "id": 124, "doctor": "Yu", "start": "14:00", "end": "16:00"}
      ]
    }
    ```

    ```js
    /* 특정 시간대 예약 */

    // Request
    POST /slots/123 HTTP/1.1
    [해더 생략]

    {
      "patient": "chan"
    }

    // Responses
    HTTP/1.1 200 OK
    [헤더 생략]

    {
      "appointmentFailure": {
        "slot": { "id":123, "doctor": "Yu", ...},
        "patient": "chan",
        "reason": "해당 시간은 이미 예약되어 있습니다."
      }
    }
    ```

- 2단계: CRUD에 맞게 적절한 HTTP 메소드 사용(여기까지 해도 좋은 REST API)

  ```js
  /* 예약 가능 시간 확인 */

  // Request
  GET /doctors/Yu/slots?data=2021-10-19 HTTP/1.1
  [해더 생략]

  // Responses
  HTTP/1.1 200 OK
  [헤더 생략]

  {
    "slots": [
      { "id": 123, "doctor": "Yu", "start": "09:00", "end": "12:00"},
      { "id": 124, "doctor": "Yu", "start": "14:00", "end": "16:00"}
    ]
  }
  ```

  ```js
  /* 특정 시간대 예약 */

  // Request
  POST /slots/123 HTTP/1.1
  [해더 생략]

  {
    "patient": "chan"
  }

  // Responses
  HTTP/1.1 201 Created
  Location: slots/123/appointment
  [헤더 생략]

  {
    "appointment": {
      "slot": { "id":123, "doctor": "Yu", ...},
      "patient": "chan",
    }
  }
  ```

  - GET: 서버의 데이터를 변화시키지 않는 요청
  - POST: 요청마다 새로운 리소스를 생성
  - PUT: 요청마다 같은 리소스를 반환(idempotent)  
    \*PUT은 교체, PATCH는 수정의 용도

- 3단계: HATEOAS(Hypertext As The Engine Of Application State)라는 약어로 표현되는 하이퍼미디어 컨트롤을 적용

  ```js
  /* 예약 가능 시간 확인 */

  // Request
  GET /doctors/Yu/slots?data=2021-10-19 HTTP/1.1
  [해더 생략]

  // Responses
  HTTP/1.1 200 OK
  [헤더 생략]

  {
    "slots": [
      { "id": 123, "doctor": "Yu", "start": "09:00", "end": "12:00"},
      { "id": 124, "doctor": "Yu", "start": "14:00", "end": "16:00"}
    ],
    "links" : {
      "appointment": {
        "href": "http://localhost:8080/slots/123",
        "method": "POST"
      }
    }
  }
  ```

  ```js
  /* 특정 시간대 예약 */

  // Request
  POST /slots/123 HTTP/1.1
  [해더 생략]

  {
    "patient": "chan"
  }

  // Responses
  HTTP/1.1 201 Created
  Location: slots/123/appointment
  [헤더 생략]

  {
    "appointment": {
      "slot": { "id":123, "doctor": "Yu", ...},
      "patient": "chan",
    },
    "links" : {
      "self": {
        "href": "http://localhost:8080/slots/123",
        "method": "GET"
      },
      "cancel": {
        "href": "http://localhost:8080/slots/123/cancel",
        "method": "DELETE"
      }
    }
  }
  ```

- Reference
  - [5가지의 기본적인 REST API 디자인 가이드](https://blog.restcase.com/5-basic-rest-api-design-guidelines/)
  - [구글의 REST API 디자인 가이드](https://cloud.google.com/apis/design?hl=ko)
  - [MS의 REST API 디자인 가이드](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md)

#### Open API와 API Key

- Open API
  - [정부에서 제공하는 공공데이터 포털](https://www.data.go.kr/)
  - [Open Weather Map](https://openweathermap.org/api)
    - 프리 플랜에서는 기본적으로 분당 60번, 달마다 1백 번 호출이 가능
    - 데이터를 JSON 형태로 응답
- API Key
  - 서버의 문을 여는 열쇠
  - 로그인된 이용자에게만 자원에 접근할 수 있는 권한을 API Key의 형태로 제공하면, 데이터를 요청할 때 API key를 같이 전달해야만 원하는 응답을 받을 수 있음

#### Checkpoint - REST API

- GET /restaurants?coordinate=126.9178889,37.5561619&type=korean
- 언어별로 별도의 엔드 포인트를 작성하지 말고, Accept-Language 헤더를 요청에 함께 제공하는 것이 더 좋음
- GET 요청의 경우 body가 존재하지 않기 때문에 이를 Query Parameter를 이용하여 구현해야 함
- DELETE /articles/10, 엔드포인트에 리소스를 명시하는 편이 좋음

## Postman

#### HTTP API 테스트 도구

- CLI
  - curl
  - [wuzz](https://github.com/asciimoo/wuzz)
- GUI
  - [Postman](https://www.postman.com/)
  - [Insomnia](https://insomnia.rest/)

#### Postman 사용하기

- GET 요청하기
  - 메시지 조회
    - Request
      - GET http://3.36.72.17:3000/yuchan/messages
      - 추가적인 파라미터 사용 가능
        | parameter | 형식 | 설명 | 필수 여부 |
        | --------- | --------------- | ---------------- | --------- |
        | roomname | 방 이름(문자열) | 특정 room만 조회 | 필수 아님 |
    - Response
      - 응답은 다음과 같은 JSON 형식
        ```js
        [
          {
            id: 1,
            username: "정유찬",
            text: "안녕하세요",
            roomname: "로비",
            date: "2021-04-02 12:00:00",
          },
        ];
        ```
      - 메시지에서 사용하는 속성
        |parameter|형식|설명|
        |---|---|---|
        |id|숫자|고유한 아이디|
        |username|문자열|사용자 이름|
        |text|문자열|본문 내용|
        |roomname|문자열|방 이름|
        |date|문자열|작성한 시간|
- POST 요청하기
  - POST 요청은 GET 요청과 다르게 본문(body)를 포함하는 경우가 많음
  - 메시지 추가
    - Request
      - POST http://3.36.72.17:3000/yuchan/messages
      - 요청 본문에는 다음의 내용을 반드시 포함해야 함(JSON 형식)
        | parameter | 형식 | 설명 | 필수 여부 |
        | --------- | --------------- | ---------------- | --------- |
        | username | 문자열 | 사용자 이름 | 필수 |
        |text|문자열|본문 내용|필수|
        |roomname|문자열|방 이름|필수|
    - Response
      - 응답은 다음과 같은 JSON 형식
        ```js
        {
          "id": 5
        }
        ```

## Sprint - Message States 요청

![스크린샷 2021-10-19 오후 3 31 53](https://user-images.githubusercontent.com/84524514/137868900-1804178c-232d-4292-b8d2-0912a55d3b63.png)
![스크린샷 2021-10-19 오후 3 34 11](https://user-images.githubusercontent.com/84524514/137868915-902b24b7-6974-4dc2-8308-abf64c13dd8e.png)
![스크린샷 2021-10-19 오후 3 34 37](https://user-images.githubusercontent.com/84524514/137868920-af36a147-b1d8-44dd-985e-d1f093973986.png)

\*https://openweathermap.org/

# Today's takeaway

- 어제 개념만 공부를 했을 때는 감이 잘 안 왔는데 오늘 실습을 하고 나니 감을 잡았다.
- 적절한 메소드를 사용하고,
- 개별 리소스에 맞는 엔드포인트를 사용(동사x, 명사o)
- 쿼리 파라미터를 사용한 조건부 조회 가능
