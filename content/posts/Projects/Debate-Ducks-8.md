---
title: "[Debate-Ducks] Debateroom - Debate"
date: 2022-05-27
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## Summary

추가 작성 예정

## Details

### 토론 시작 및 유지

준비 버튼을 누르면 해당 정보가 서버의 `roomDebates` 객체에 저장되고, 찬반 양측이 모두 준비 상태가 되면 토론이 시작된다. (`isProsReady`와 `isConsReady`로 구분) 토론 중에는 차례와 남은 시간이 상단에 표시되며 찬성 측 차례인지 반대 측 차례인지에 따라 색으로 구분된다.

이전에는 한쪽의 연결이 끊기면 토론을 종료 시켰으나 이번에는 토론이 한번 시작되면 재연결을 해도 토론이 계속 진행되게 하고 싶었기 때문에 토론이 시작되는 시점에 서버에 토론의 시작 여부를 저장해서 재연결을 해도 토론이 계속 진행될 수 있게 했다.

처음에는 한쪽이 나갈 경우에 토론을 중지 시키는 방식을 생각했으나, 토론이 불리하게 진행되었다고 악의적으로 나가버리는 경우를 고려하여 한쪽이 남아있을 경우 토론이 계속 유지되게 했다.

일시 정지는 실수로 새로 고침이나 뒤로 가기를 누르는 등의 상황에서 최소한의 방어책으로 작동하는 기능이다. 그래서 "토론은 네트워크가 안정된 환경에서 진행해 주시고, 네트워크 문제로 인해 생기는 불이익은 사용자가 책임 저야 한다"고 사전 공지할 것이다.

Ps. 상대측이 나갔을 경우 토론이 끝날 때까지 혼자 진행을 하게 할지, 일정 시간 이내에 상대측이 재접속 하지 않으면 토론을 종료 시킬지 고민 필요.

![debate](https://user-images.githubusercontent.com/84524514/170883638-7eebea9b-a6c2-44b7-8e39-a337c94fe45e.gif)

### 토론 진행 방식

처음에는 양측에 발언시간을 주고 Push & Talk 방식으로 발언시간을 소모하여 발언하는 방식을 생각했다. 주로 대선 후보 토론에서 사용하는 방식이다. 사회자에게 질문을 받으면 주어진 발언시간 이내에 답변을 해야하며 다른 후보에게 질문도 할 수 있다. 그렇기에 사회자가 없는 1 대 1 온라인 토론 배틀에는 적합하지 않은 방식이었다.

다음은 토론의 단계와 단계별 시간을 토론 생성 시 설정할 수 있게 하려고 했다. 하지만 대부분의 단체나 대회는 각자 정형화된 토론 방식이 존재했고 해당 방식으로만 토론을 진행하고 있었다. 또한 정형화된 방식이 있는 편이 토론자 입장에서 토론을 준비하고 진행할 때, 그리고 시청자 입장에서 토론 결과를 판단할 때 더 적합하다고 결론을 내렸다. (추후 자유토론이나 몇 가지 정형화된 방식을 추가할 수도 있음)

Debate Ducks에서 사용할 정형화된 토론 방식은 CEDA(Cross Examination Debate Association) 토론 방식을 참고하여, 처음 발언하는 사람이 인상에 남는 초두 효과와 마지막에 발언하는 사람이 인상에 남는 최신 효과를 고려하여 다음과 같이 구성했다.

| 토론 단계               | 시간 |
| ----------------------- | ---- |
| 1. 찬성 측 입론         | 4분  |
| 2. 반대 측 교차 조사    | 4분  |
| 3. 반대 측 입론         | 3분  |
| 4. 찬성 측 교차 조사    | 3분  |
| 5. 찬성 측 반론 및 요약 | 3분  |
| 6. 반대 측 반론 및 요약 | 3분  |

입론 단계에서는 논제에 대해 자신의 주장 및 근거를 말한다. 새로운 주장을 펼치는 것은 오직 입론 단계에서만 가능하다.

교차 조사 단계에서는 상대측이 입론 단계에서 주장한 내용의 논리적 허점을 지적하고, 지적을 받은 상대는 이에 대해 답변을 해야한다. 답변이 길어지는 경우 질문자는 중단 후 다음 질문을 계속할 수 있다.

반론 및 요약 단계에서는 상대측의 주장에 대한 반론을 펼치고, 자신의 입론을 보강 및 정리한다. 그리고 자신이 토론에서 승리한 이유를 설명한다. 필요할 경우 상대측이 제기한 문제에 대해 추가적인 답변도 가능하다.

### 토론 진행

토론의 단계를 미리 배열에 넣어둔 다음 timer를 1씩 줄이고, timer가 0이 되었을 때 turn을 1 늘리는 방식으로 토론의 진행을 구현하였다.

```ts
export const DEBATE_DEFAULT: TDebate = [
  ["잠시 후 토론이 시작됩니다.", 3],
  ["찬성 측 입론", 240],
  ["반대 측 교차 조사", 180],
  ["반대 측 입론", 240],
  ["찬성 측 교차 조사", 180],
  ["찬성 측 반론 및 요약", 180],
  ["반대 측 반론 및 요약", 180],
  ["토론이 종료되었습니다.", 3],
];

export const debate = (
  socket: Socket,
  debateId: string,
  roomDebates: IRoomDebates
) => {
  const data = {
    notice: DEBATE_DEFAULT[roomDebates[debateId].turn][0],
    turn: roomDebates[debateId].turn,
    timer: roomDebates[debateId].timer,
  };

  socket.emit("debateProgress", data);
  socket.to(debateId).emit("debateProgress", data);
  roomDebates[debateId].timer -= 1;

  if (roomDebates[debateId].timer < 1) {
    roomDebates[debateId].turn += 1;
    roomDebates[debateId].timer = DEBATE_DEFAULT[roomDebates[debateId].turn][1];
  }
};
```

토론 시작 시 `roomDebates` 객체에 `setInterval`로 토론 함수를 실행시키며 저장하였고, 찬반 양측이 모두 방에서 나간 경우 `clearInterval`로 토론 함수를 중단 시켰다. 그 후 한 명이 재입장 할 경우 다시 같은 방식으로 실행해 주었다.

```ts
roomDebates[data.debateId].debate = setInterval(
  debate,
  1000,
  socket,
  data.debateId,
  roomDebates
);
```

```ts
roomDebates[roomId].isPause = true;
clearInterval(roomDebates[roomId].debate);
```

### 차례에 맞는 마이크 및 화면 공유

기존에는 각자의 차례에만 공유 화면을 전체 화면으로 보여주었다. 하지만 교차 조사 같은 경우 답변하는 측에서도 공유 화면을 전체 화면으로 보여줘야 하는 상황이 생길 수 있었다. 그래서 상대방이 화면 공유를 사용할 경우 자신의 화면 공유가 꺼지게 만들었다.

또한 입론과 반론 및 요약 단계에서의 발언권 보장을 위해 해당 단계에서 상대측의 마이크를 끄고, 마이크 버튼 및 화면 공유 버튼을 비활성화 시켰다. 그리고 각 단계가 전환될 때 화면 공유를 끄고, 차례에 맞게 마이크를 전환시켰다.

처음에는 교차 조사 단계에서 질문자가 마이크를 껐을 경우에만 답변자의 마이크를 켜서 답변이 가능하게 했다. 하지만 질문자가 "답변 감사드립니다. 이제 다음 질문으로 넘어가겠습니다."라고 양해를 구하고 다음 질문으로 넘어가는 것이 마이크를 뚝 하고 끊어버리는 것보다 훨씬 낫다고 판단하여 마이크는 자유롭게 끄고 켜는 것이 가능하게 했다.

![debate-turn](https://user-images.githubusercontent.com/84524514/171024576-1de410a5-9b50-4551-b949-45748871d9af.gif)

## Problems

### 토론 일시 중단 시 clearInterval 문제

토론은 `setInterval`을 활용해 1초마다 토론 함수를 실행하는 것으로 진행된다. 일시 중단의 경우 찬반 양측이 모두 방에서 나간 경우 `roomDebates.isPause`를 true로 변경해 실행한다.

하지만 이전에 WebRTC 재연결 시 발생하는 에러를 해결하기 위해 한 측의 연결이 끊기면 다른 측의 연결도 파괴한 뒤 재연결 되도록 하였었다. 그래서 한 측의 연결만 끊겨도 일시 중단이 잠시 실행되게 된다.

즉, 한 측의 연결만 끊겼을 경우 `isPause = true`로 변경된 뒤 `join` 이벤트가 발생하면서 `setInterval`이 추가로 발생하고, `isPause = false`로 변경된다. 이 때문에 `isPause = true` 일 때만 발생하는 `setInterval` 내부의 `clearInterval`가 실행되지 않았다.

이유를 간단히 설명하자면 JS에서 타이머 함수가 실행되면, 내부 함수는 백그라운드에서 딜레이만큼 기다린 후 Callback Queue로 이동한다. 그 후 Call Stack이 빈 경우에 Callback Queue에 있는 타이머 함수의 내부 함수가 실행된다.

이 경우에는 타이머 함수의 내부 함수인 토론 함수가 실행되기 전 `isPause = false`로 변경되기 때문에 `clearInterval`가 실행되지 않는 것이다.

```ts
// Bad!!
export const debateProgress = (
  socket: Socket,
  debateId: string,
  roomDebates: IRoomDebates,
) => {
  const interval = setInterval(() => {
    if (roomDebates[debateId].isPause) {
      clearInterval(interval);
    } else {
      ...
    }
  }, 1000);
};
```

결국 이 문제를 해결하기 위해서는 `clearInterval`을 `setInterval` 외부에서 실행해 주어야 한다. 그래서 우선 토론 함수를 따로 정의한 다음 `setInterval`로 타이머 함수를 생성한 다음 `roomDebates.debate`에 저장했다.

이제 찬반 양측이 모두 방에서 나간 경우 `roomDebates.isPause`를 true로 변경하며 `clearInterval`을 실행하여 토론을 일시 중단 하였고 문제가 말끔히 해결 되었다.

```ts
// Good!!
roomDebates[roomId].isPause = true;
clearInterval(roomDebates[roomId].debate);
```

### 준비 후 토론 시작 시 발생하는 문제

토론 준비 후 시작 시 서로의 미디어를 연결하지 못하는 문제가 있었다.

<img width="800" alt="isStart Error" src="https://user-images.githubusercontent.com/84524514/171025129-d7369b84-f381-4dfa-a0fd-f791993d5b5e.png">

이유는 아주 간단했다. `isStart` 변수가 `wsConnect`를 실행시키는 `useEffect`의 dependency에 포함되어 있어서였다. 이를 제거해 주자 문제가 말끔히 해결되었다. 대신 `isStart`로 토론의 주제를 보여줄지 "곧 토론이 재시작합니다."를 보여줄지 결정하는 기능을 빼주었다.
