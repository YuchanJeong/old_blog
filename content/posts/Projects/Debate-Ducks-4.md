---
title: "[Debate-Ducks] WebSocket - WebRTC"
date: 2022-05-20
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## 개요

simple-peer를 사용해서 사용자를 1 대 1로 연결하여 서로의 미디어를 주고받을 수 있게 만들었다.

<img width="1440" alt="WebRTC" src="https://user-images.githubusercontent.com/84524514/169651461-ce53935d-9bb4-476f-88bf-dfdcdbcaca94.png">

## 클라이언트 WebRTC 코드

기존에 한 파일에 작성했던 코드를 외부 파일로 이동해 가독성을 높였다. 또한 `useRef()`를 적극 활용해 불필요한 재랜더링을 방지하였다.

```tsx
// Room.tst 일부
socket.on("guestJoin", () => {
  connectHostPeer(
    debateId,
    socket,
    peerRef.current,
    myStreamRef.current,
    peerStreamRef.current,
    peerVideoRef.current
  );
});
```

```ts
// simple-peer.ts 일부
export const connectHostPeer = (
  debateId: string | string[],
  socket: Socket,
  peer: Peer.Instance | undefined,
  myStream: MediaStream | undefined,
  peerStream: MediaStream | undefined,
  peerVideo: HTMLVideoElement | null
) => {
  const simplePeer = new Peer({
    initiator: true,
    trickle: false,
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stun.nextcloud.com:443" },
      ],
    },
    stream: myStream,
  });

  peer = simplePeer;

  simplePeer.on("signal", (signal) => {
    socket.emit("offer", { debateId, signal });
  });

  simplePeer.on("stream", (stream) => {
    peerStream = stream;
    if (peerVideo) {
      peerVideo.srcObject = stream;
    }
  });

  simplePeer.on("error", (err) => {
    console.log("error", err); //*
  });

  socket.on("answer", (signal: Peer.SignalData) => {
    simplePeer.signal(signal);
  });
};
```

## 문제 및 문제 해결

### 문제 1 - WebSocket Issue

[이전에 작성한 코드](/posts/projects/debate-ducks-3)에서 WebRTC를 적용하기 위해 추가로 코드를 작성하였는데 제대로 작동하지 않았다.

이 프로젝트에서 WebRTC의 연결 과정은 다음과 같다. 사용자가 웹 소켓 서버와 연결됨과 동시에 방(`debateId`)에 입장을 요청하고, 인원이 다 차지 않았을 경우 방에 입장한다. 이때 먼저 방에 입장해있는 호스트에게 게스트가 입장했다고 알려주고, 호스트는 연결을 제안한다. 게스트는 제안을 받은 뒤 응답을 보내면 게스트와 호스트는 1 대 1로 연결이 된다.

그러나 실제로 실행했을 때 "게스트가 제안을 받지 못하는 문제"가 발생하였다. 우선 클라이언트에서 이벤트를 수신하지 못하는지 알아보기 위해 서버 측에서 제안 코드를 이동해 보았다. 그러자 클라이언트 측에서는 정상적으로 제안을 받았다. 다음으로는 서버 측에 콘솔을 찍어보았는데, 서버 측에서도 정상적으로 제안을 받았다. 결국 서버 측에서 제안을 보내는 부분에 문제가 있다는 소리였다.

그래서 서버 측 코드를 `handleConnection()` 안으로 옮겨도 보고, `handleOffer()` 코드도 계속해서 수정해 보았다. 이 과정에서 문제를 해결하지는 못하였으나 문제의 원인은 파악하였다. 게스트가 방에 추가로 입장해야 하는데 그러지 않고 이미 있던 호스트를 덮어쓰는 것이 문제였다.

<img width="464" alt="offer problem" src="https://user-images.githubusercontent.com/84524514/169584200-946cc59e-2d58-4b34-a3d3-aa743ec3c465.png">

그제서야 서버 측 코드가 아니라 클라이언트 측 코드가 문제가 있다는 것을 깨닫고 클라이언트 측 코드를 유심히 살펴보기 시작하였다. "join"을 "connect" 내부에서 `emit`한 것이 문제였다. 이 때문에 새로운 연결 후 방에 입장하게 되어 방을 덮어쓰는 것처럼 작동하는 것 같다. 하지만 아직 정확한 이유는 파악하지 못하였다. (이유를 알게 되면 추가로 작성할 예정)

```ts
socket?.on("connect", () => {
  socket.emit("join", debateId);
  console.log("connect", socket.id);
});
```

그래서 외부의 "connect"를 제거해 주니 정상적으로 제안을 주고받았다. 하지만 아직 연결이 여러 번 되는 문제가 남아 있었다.

<img width="241" alt="connect1" src="https://user-images.githubusercontent.com/84524514/169588184-7df52673-9394-43aa-8236-acbba9ebec6f.png">
<img width="242" alt="connect2" src="https://user-images.githubusercontent.com/84524514/169588175-b29388e2-7647-4683-a948-b3f364bb0654.png">

이 문제의 이유는 명확했다. `useEffect()`의 dependency에 들어있는 `debateId`와 `socket`의 값이 변하기 때문에 재랜더링이 일어나 생기는 문제였다. 처음에는 `debateroom/[debateId].tsc` 페이지에서 `Room.tsx` 컴포넌트를 연결할 때 조건을 `debateId`와 `socket` 모두 undefined가 아닐 때로 하였다. 그래도 문제는 해결되지 않았고, `useRef()`를 사용해서 `debateId`를 관리하였을 때도 마찬가지였다. 결국은 `debateId`를 `useRouter()`로 받는 과정에서 재랜더링이 한 번 이상은 발생하기 때문이었다.

<img width="245" alt="connect3" src="https://user-images.githubusercontent.com/84524514/169591943-9910dccc-3765-4f61-94a2-5906b711b5d8.png">
<img width="243" alt="connect4" src="https://user-images.githubusercontent.com/84524514/169591961-9098ed5c-9004-4f75-83ad-21c6299a6efc.png">

그래서 이번에는 `Room.tsc` 컴포넌트의 `useEffect()` 내부에서 `if` 문을 통해 소켓 이벤트 발동 및 추가의 조건을 `debateId`와 `socket` 모두 undefined가 아닐 때로 하였다. 그러자 문제가 말끔히 해결 되었다.

<img width="236" alt="success1" src="https://user-images.githubusercontent.com/84524514/169594975-7bdcea51-325a-4c4d-b34a-fc6b41cbdf2c.png">
<img width="237" alt="success2" src="https://user-images.githubusercontent.com/84524514/169594913-ff0ed3a7-0b94-46e5-89f9-be0c7553335a.png">

### 문제 2 - Type Error

`addTrack` 내부의 `myStreamRef.current`에 타입 에러가 발생하였다.

```ts
const myStreamRef = useRef<MediaStream>();
...
if (myStreamRef.current) {
  myStreamRef.current.getTracks().forEach((track) => {
    peerRef.current?.addTrack(track, myStreamRef.current);
  });
}
```

```bash
Argument of type 'MediaStream | undefined' is not assignable to parameter of type 'MediaStream'.
Type 'undefined' is not assignable to type 'MediaStream'.
```

아래와 같이 `if` 문으로 한 번 더 undefined 일 가능성을 없애주면 더 이상 에러가 나지 않는다. 하지만 이미 제일 바깥에서 `if` 문으로 undefined 일 가능성을 없애주었는데 왜 한 번 더 묶어줘야 하는지 아직 모르겠다. 그래서 Issue를 통해 팀원들과 공유하고, 동시에 Stackoverflow에도 질문을 게시하였다. (~~이유를 알게 되면 추가로 작성할 예정~~ [같은 문제(참조)](/posts/projects/debate-ducks-5/#문제-2---type-error)가 한 번 더 발생하였고 이유를 찾음)

```ts
const myStreamRef = useRef<MediaStream>();
...
if (myStreamRef.current) {
  myStreamRef.current.getTracks().forEach((track) => {
    if (myStreamRef.current) {
      peerRef.current?.addTrack(track, myStreamRef.current);
    }
  });
}
```

## "simple-peer" 사용 이유

```bash
npm i simple-peer
npm i -D @types/simple-peer
```

기본 WebRTC로 코드를 작성하였을 때, 연결될 때까지 "IceCandidate"를 socket을 통해 여러번 주고받아야 했다. (물론 해결 방법이 있겠지만 나는 구현하는데 실패하였다. 😢😢😢) 그래서 조금 더 효율적으로 코드를 작성하기 위해 관련 라이브러리를 찾아보았다. 그중 "simple-peer"를 선택하였는데 그 이유는 우선 가장 많이 설치된 라이브러리라서이고, 또 공식 문서를 확인하였을 때 사용 방법을 가장 쉽게 이해할 수 있었기 때문이다.

<img width="1323" alt="WebRTC Libraries" src="https://user-images.githubusercontent.com/84524514/169651454-5df86c85-47f6-4caf-bdab-681e4156c011.png">

## "TypeScript" 사용 후기

TypeScript를 사용하면서 장점들을 체감하였고 매우 마음에 들었다. 단순히 데이터의 타입을 정해둘 뿐이지만 이 덕분에 코드의 구조와 작동 원리를 더 쉽고 명확하게 파악할 수 있었다.

특히 서버 코드와 클라이언트 코드를 각각 작성할 때 TypeScript의 이점이 두드러졌다. 사실 지금 WebSocket 기능을 혼자서 구현하고 있기 때문에 엄청 큰 이점으로 작용하지는 않지만, 그럼에도 구조를 헷갈리지 않고 서버 코드와 클라이언트 코드를 좀 더 쉽게 연동시킬 수 있었다. 서버와 클라이언트를 각각 작업하게 되는 상황에서는 훨씬 유용할 것이다.

❗️ 추천 이유: 안정성 up, 작업시간 down 👍👍👍
