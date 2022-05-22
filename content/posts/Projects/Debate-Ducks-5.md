---
title: "[Debate-Ducks] WebSocket - Stream"
date: 2022-05-21
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## 개요

오디오 및 비디오의 끄기/켜기 기능과 화면 공유 기능을 추가했다.

<img width="800" alt="details" src="https://user-images.githubusercontent.com/84524514/169694021-488bfbde-4488-4e95-bafa-0b9472e6fc9c.png">

## 문제 및 문제 해결

### 문제 1 - useRef를 하위 요소로 보낼 때

`useRef()`로 `streamRef`에 사용자의 스트림을 저장해서 사용하였다. 그리고 비디오 끄기/켜기 버튼을 하위 컴포넌트로 사용하면서 `stream={streamRef.current}`로 props를 넘겨주었다.

끄기/켜기 기능은 `stream`이 있는 경우에만 작동하게 해두었는데, 이미 사용자의 스트림을 받아서 비디오로 표시하고 있음에도 제대로 작동하지 않았다. 콘솔을 찍어보니 여전히 `stream`이 undefined였다. `useRef()`의 변경은 재랜더링을 일으키지 않기 때문이었다.

그래서 `streamRef={streamRef}`로 직접 넘겨준 뒤 하위 컴포넌트에서 `stream.current`로 사용하자 문제가 말끔히 해결되었다.

Ps. 다른 이유로 재랜더링이 일어날 경우 코드는 정상 작동한다. 그래서 이 기능을 독립적으로 확인해 보기 전까지는 정상적으로 작동한다는 착각을 하게 되었다. 안전성을 위해서 `useRef()`를 하위 요소로 넘길 때는 `ref.current`가 아닌 `ref` 자체를 넘기는 것을 추천한다.

### 문제 2 - Type Error

화면 공유 기능을 개발할 때 `if (peerRef.current && myStreamRef.current && myVideoRef.current) {...}`로 한번 falsy 일 가능성을 제거해 줬음에도 `screenStream.getTracks()[0].onended` 내부의 `... Ref.current`가 falsy 일 가능성이 있다고 타입 에러가 떴다.

```ts
navigator.mediaDevices.getDisplayMedia().then((screenStream) => {
  if (peerRef.current && myStreamRef.current && myVideoRef.current) {
    peerRef.current.replaceTrack(
      myStreamRef.current.getVideoTracks()[0],
      screenStream.getVideoTracks()[0],
      myStreamRef.current
    );
    myVideoRef.current.srcObject = screenStream;
  }

  screenStream.getTracks()[0].onended = () => {
    peerRef.current.replaceTrack(
      screenStream.getVideoTracks()[0],
      myStreamRef.current.getVideoTracks()[0],
      myStreamRef.current
    );
    myVideoRef.current.srcObject = myStreamRef.current;
  };
});
```

[같은 문제](/posts/projects/debate-ducks-4/#문제-2---type-error)가 이전에 발생했었는데 한 번 더 같은 문제가 다른 형태로 발생하니 이유를 알 수 있었다. 이미 `if` 문으로 falsy 일 가능성을 없앴어도 `.onended`에 추가하는 함수는 독립적으로 작동하기 때문이다. 즉, `.onended`에 추가하는 함수 내부에서도 falsy 일 가능성을 다시 없애주어야 한다.

```ts
navigator.mediaDevices.getDisplayMedia().then((screenStream) => {
  if (peerRef.current && myStreamRef.current && myVideoRef.current) {
    peerRef.current.replaceTrack(
      myStreamRef.current.getVideoTracks()[0],
      screenStream.getVideoTracks()[0],
      myStreamRef.current
    );
    myVideoRef.current.srcObject = screenStream;
  }

  screenStream.getTracks()[0].onended = () => {
    if (peerRef.current && myStreamRef.current && myVideoRef.current) {
      peerRef.current.replaceTrack(
        screenStream.getVideoTracks()[0],
        myStreamRef.current.getVideoTracks()[0],
        myStreamRef.current
      );
      myVideoRef.current.srcObject = myStreamRef.current;
    }
  };
});
```

Ps. 위 코드의 경우 WebRTC 연결을 하지 않았을 때 화면 공유를 하지 못한다는 문제가 추가로 발생하였다. 조건문 안의 `peerRef.current`를 따로 조건처리 하여 해결하였다.

### 문제 3 - 화면공유 시스템 거절

[문제 2](/posts/projects/debate-ducks-5/#문제-2---type-error)의 코드로 화면 공유를 실행 하였을 때 Chrome 탭 공유는 정상적으로 실행 되지만 전체 화면과 창 공유는 정상적으로 실행되지 않았다.

<img width="800" alt="screenshot error 1" src="https://user-images.githubusercontent.com/84524514/169689617-7ccddf0a-8580-471a-852d-57efc2d78090.gif">
<img width="515" alt="screenshot error 2" src="https://user-images.githubusercontent.com/84524514/169689263-28a256c2-0aaa-4985-a93f-98ed029245ce.png">

system denied 문제라서 우선은 크롬의 설정을 하나씩 살펴보았다. 하지만 모든 권한은 허가 또는 요청으로 되어 있었고, 인터넷 사용 기록을 삭제해 보아도 문제가 해결되지 않았다.

다음으로는 코드를 살펴보았다. `.getDisplayMedia()`에 옵션도 넣어보고 콘솔도 찍으면서 확인해 보았지만 여전히 해결의 기미가 보이지 않았다.

마지막으로 내 컴퓨터의 문제는 아닐까 생각해서 관련 권한들을 살펴보았다. 화면 기록 권한에 크롬이 체크해제되어 있는 것을 보고 순간 이거다 싶었고 정답이었다. 아마 내가 예전에 권한을 거절한 적이 있었고 그래서 권한 요청 조자 오지 않고 시스템이 알아서 거절한 것이었다. 다른 사용자도 비슷한 경험을 할 수 있기 때문에 이 내용도 안내할 것이다.

<img width="515" alt="screenshot error 3" src="https://user-images.githubusercontent.com/84524514/169690444-8a6265f7-364f-4582-a41f-f856376ff9a0.png">
