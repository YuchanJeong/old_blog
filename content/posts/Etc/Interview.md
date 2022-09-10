---
title: "면접 대비 - 기술"
date: 2022-09-08
categories:
  - <Etc>
  - Interview
---

## 웹

### 웹 브라우저에 URL을 입력하면 어떤 일이 생기나요?

[[참조]](https://aws.amazon.com/ko/blogs/korea/what-happens-when-you-type-a-url-into-your-browser/)

1. 웹 브라우저가 도메인 명으로 **IP 주소 조회**. 이때 먼저 *캐시*를 찾고, 그다음 *DNS*를 검색
2. 웹 브라우저가 찾은 IP 주소를 기반으로 서버와의 **TCP 연결**을 시작
3. 웹 브라우저가 _HTTP_ 혹은 _HTTPs_ **요청**을 서버로 전송
4. 웹 서버가 요청을 처리하고 **응답**을 다시 웹 브라우저로 전송
5. 웹 브라우저가 전송 받은 콘텐츠를 **렌더링**

Ps. URI(Uniform Resource Identifier)는 자원의 **고유 식별자**이고, URL(Uniform Resource Locator)은 자원의 **실제 위치**를 가리키는 URI의 서브셋

- www.example.com/index.html ← URI(O), URL(O)
- www.example.com/index ← URI(O), URL(X)

Ps. 캐시(Cache) - 자주 사용하는 데이터나 값을 미리 복사해 놓는 임시 장소

Ps. DNS(Domain Name System) - 도메인 명과 IP 주소를 상호 변경해주는 기능

Ps. HTTP(Hyper Text Transfer Protocol) - 서버와 클라이언트간에 데이터를 주고 받는 프로토콜

Ps. HTTPs - 보안을 위해 SSL/TLS 사용. 공개키로 암호화 후 비밀키로 복호화

### TCP vs UDP

- 컴퓨터가 다른 컴퓨터와 데이터 통신 하기 위한 프로토콜
- *3 Way Handshake*로 연결되며 *4 Way Handshake*로 연결 해제

#### TCP(Transmission Control Protocol)

- **확인 응답** 덕분에 신뢰성이 높음
- 보내는 양을 늘리고 줄이는 방법으로 **혼잡 제어** 가능

#### UDP(User Datagram Protocol)

- TCP에서 신뢰성 기능이 빠진 것으로 실시간 스트리밍을 하는 곳에서 주로 사용

Ps. 3 Way Handshake - 접속 요청 전달 → 확인 응답 및 준비 완료 전달 → 확인 응답 전달

Ps. 4 Way Handshake - 연결 종료 요청 전달 → 확인 응답 전달 및 자신의 통신이 끝날 때까지 대기(TIME_WAIT) -> 통신이 끝난 후 종료 요청 전달 -> 확인 응답 전달

### OSI(Open Systems Interconnection)

- **표준 프로토콜**을 사용하여 통신할 수 있도록 국제 표준화 기구(ISO)가 만든 모델
- 통신 과정을 단계별로 파악할 수 있게 만들어 문제 해결에 도움을 줌

{{< alert "circle-info" >}}
7 계층 단계 추가 필요
{{< /alert >}}

## JS

- Non-blocking I/O 및 Single thread로 동작

### 호이스팅

- 유효 범위 내부의 선언들을 모두 끌어올려서 유효 범위 최상단에 선언하는 것

---

[참조] - [프론트엔드 개발자 기술면접 인터뷰 질문 모음(업데이트)](https://realmojo.tistory.com/300)
