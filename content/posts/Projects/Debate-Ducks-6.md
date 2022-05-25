---
title: "[Debate-Ducks] WebSocket - Canvas"
date: 2022-05-22
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## 개요

캔버스에 여러 비디오 및 공유 화면를 포함한 요소들을 그리고 녹화할 수 있게 만들었다.

<img src="https://user-images.githubusercontent.com/84524514/170090866-8df029df-795f-4632-a3fd-ad033abe965c.gif" alt="test"/>

## 작업 내용

### 캔버스 및 비디오 크기

이전 프로젝트에서 동일한 동영상 퀄리티를 위해서 캔버스에 고정 크기를 사용했었다. 그래서 화면을 줄이거나 모바일에서 보게 되면 캔버스가 잘리는 문제가 있었다. 이번에는 이런 문제를 해결하고 싶었다. 그래서 스타일(임시로 인라인 스타일 사용)로 보여지는 캔버스의 크기를 바꾼 다음 녹화 테스트를 하자 보여지는 캔버스의 크기와는 상관 없이 캔버스의 고정 크기에 맞게 녹화되었다.

```tsx
<canvas
  ref={canvasRef}
  width="1280px"
  height="720px"
  style={{ border: "2px solid red", width: "100vw" }}
></canvas>
```

이전 프로젝트에서 비디오는 캔버스 내부의 `drawImage()`에서 크기를 조정해서 사용했었다. 그래서 사용자 카메라의 종류에 따라 화면이 늘어나는 문제가 있었다. 이번에는 사용자의 비디오를 획득할 때 애초에 고정된 크기에 맞게 받아서 늘어남 문제를 원천 차단하였다.

```ts
.getUserMedia({
          video: { facingMode: "user", width: 500, height: 500 },
          audio: { echoCancellation: true, noiseSuppression: true },
        })
```

이전 프로젝트에서는 화면 가운데 보이지 않는 비디오를 고정하는 방식으로 뷰 바깥의 요소를 캔버스가 그리기 못하는 문제를 해결 하였는데 이번에는 `sticky`를 활용해 좀더 간단히 해결하였다.

```ts
<video
  ref={videoRef}
  muted
  autoPlay
  playsInline
  width={0}
  height={0}
  style={{ position: "sticky", top: 0 }}
></video>
```

### 카메라 연결 상태

이전 프로젝트에서는 사용자의 카메라가 꺼지면 `.enable=false` 상태의 검은 화면만 보였다. 이번에는 소켓을 통해 카메라 on/off 여부와 화면공유 on/off 여부를 전달하고, 현재의 연결 상태 및 진행 상태를 고려하여 각각 다른 화면이 보이게 하였다.

```ts
useEffect(() => {
  if (peer) {
    socket?.emit("peerVideo", { debateId, isVideoOn });
    socket?.emit("peerScreen", { debateId, isPeerScreenOn });
  }
}, [socket, peer, debateId, isVideoOn, isPeerScreenOn]);
```

```ts
// prosText
drawText(
  canvasRef,
  "#F8FBFD",
  "bold 32px san-serif",
  peer ? "Camera Off" : isPros ? "Camera Off" : "Not connected",
  300,
  380
);
```

<img width="700" alt="Not Connected" src="https://user-images.githubusercontent.com/84524514/170036376-5b4fd654-e154-481c-beca-c0acff95b5be.png">
<img width="700" alt="Camera Off" src="https://user-images.githubusercontent.com/84524514/170036312-150b2598-7c4a-47c6-b9b9-e1ac50f1d5a1.png">

### 캔버스에 그리기

이전 프로젝트에서는 사용자의 비디오를 그리는 함수, 찬성 측 화면공유 그리고 반대 측 화면공유로 나눠서 작성하였다. 처음에는 요소별로 그리는 함수를 만들어 조건을 걸었지만 한번 interval이 등록된 함수를 삭제하지 않으면 중첩으로 그려지는 문제가 발생하기 때문이었다.

이번에는 interval을 중지하고 다시 시작하는 부분은 `useEffect()`의 `dependency`로 처리하고, 그리기 함수 내부에서 조건에 따라 다른 화면을 그리게 처리하여 가독성과 유지보수의 편리성을 늘렸다.

```ts
useEffect(() => {
  drawStop();
  drawStart();
}, [
  drawStart,
  drawStop,
  peer,
  isVideoOn,
  isPeerVideoOn,
  isScreenOn,
  isPeerScreenOn,
]);
```

또한 캔버스에 그리는 과정도 종류(사각형, 텍스트, 비디오)별로 함수를 작성한 다음 파라미터를 이용해 원하는 것을 그릴 수 있게 만들어 가독성과 유지 보수의 편리성을 늘렸다.

```ts
const drawSquare = (
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  color: string,
  dx: number,
  dy: number,
  w: number,
  h: number
) => {
  const ctx = canvasRef.current?.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(dx, dy, w, h);
  }
};
```

### 공유 화면 그리기

자신의 차례일 때만 공유 화면이 크게 그려지며, 그려지는 공유 화면은 공유 대상의 비율에 맞춰서 화면에 그려지게 만들었다.

```ts
// prosTurn: "none" | "true" | "false"
if (isScreenOn && String(isPros) === prosTurn) {...}
```

<img src="https://user-images.githubusercontent.com/84524514/170199896-1c5ff99a-16f4-4596-a8db-1cad6027fc40.gif" alt="screen share">

### Props 타입 정리

Props를 넘길 때마다 Props의 타입을 하나하나 작성해 주어야 해서 시간이 조금 소요되었다. Props의 타입을 `interface`로 모두 저장해두고 `Pick`으로 뽑아서 사용하니 편리하고 시간도 절약되었다.

```tsx
export default function Buttons({
  peer,
  streamRef,
  videoRef,
  isAudioOn,
  setIsAudioOn,
  isVideoOn,
  setIsVideoOn,
  setIsScreenOn,
}: Pick<
  IDebateroomProps,
  | "peer"
  | "streamRef"
  | "videoRef"
  | "isAudioOn"
  | "setIsAudioOn"
  | "isVideoOn"
  | "setIsVideoOn"
  | "setIsScreenOn"
>) {...}
```

Ps. 색상도 따로 객체 형태로 만들어 유지 보수의 편리성을 높혔다.

## 문제 및 문제 해결

### 문제 1 - PR의 커밋 중첩

\# 문제

PR이 쌓이게 되면 커밋과 변경된 파일이 중첩되는 문제가 있었다. 바로바로 리뷰 후 Merge를 하면 문제가 발생하지 않지만 현실적으로는 쉽지 않다. (bcs 주말, 새벽 PR 등) 또 중첩이 될 경우 앞의 PR은 반려하고 뒤의 PR만 Merge 하는 방법도 있지만, PR은 변경 사항을 쉽게 파악할 수 있어야 하기 때문에 너무 많아지거나 다양한 기능이 있는 건 지양해야 한다.

<img width="800" alt="PR1" src="https://user-images.githubusercontent.com/84524514/169761520-8fd9e5ca-c01c-4969-8740-ef430427fe5e.png">
<img width="800" alt="PR2" src="https://user-images.githubusercontent.com/84524514/169761498-ffc5d25c-af69-49a6-9ccc-a45db6ae82f9.png">

\# 해결

앞의 PR을 Merge 한 뒤 다음 PR을 Merge 하기 전에 Edit을 통해 브랜치를 재설정 해주면 PR이 중첩되지 않고 해당 PR의 변경 사항만 기록된다.

<img width="800" alt="PR3" src="https://user-images.githubusercontent.com/84524514/169777664-3d19858d-7d0d-48d8-bec9-5aa80f085bb3.png">
<img width="576" alt="PR4" src="https://user-images.githubusercontent.com/84524514/169777698-8d8e8245-f2f7-4886-b1e5-fd3c01762fa0.png">

### 문제 2 - useRef에 할당 불가능

캔버스에 사용자의 미디어와 공유 화면을 각각 그리기 위해 `useInterval Hook` 작성 중 `Cannot assign to 'current' because it is a read-only property.` 에러가 발생하였다. 이유는 초깃값으로 null을 지닐 때 제네릭에 null을 포함하지 않으면 변경할 수 없는 객체를 생성하기 때문이다.

Ref. [(useRef) Cannot assign to 'current' because it is read-only property](https://bobbyhadz.com/blog/react-cannot-assign-to-current-because-read-only-property)

## 발전한 점

아직 많이 부족하지만 중복 작성되는 요소들을 최대한 공통으로 묶어서 빼는 노력을 통해 코드의 가독성과 유지 보수의 편리성이 많이 늘어났다. 또한 만나는 이슈나 개발과정의 기록을 통해 코드를 이전보다 더 확실하게 이해하게 되었다. 특히 이전에는 내가 작성한 코드를 팀원에게 설명해 줄 때 많은 어려움을 겪었는데, 기록을 하면서 코드를 인간의 언어로 설명하는 과정을 연습할 수 있게 되었고 (이전에는 인간의 언어를 코드로 작성하는 부분만 집중적으로 함), 이제는 팀원들에게 내 코드를 설명하는데 큰 어려움이 없다.
