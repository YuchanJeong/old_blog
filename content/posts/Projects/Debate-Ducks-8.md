---
title: "[Debate-Ducks] WebSocket - Debate"
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

### 토론 시작

준비 버튼을 누르면 해당 정보가 서버의 `roomDebates` 객체에 저장되고, 찬반 양측이 모두 준비 상태가 되면 토론이 시작된다. 이전에는 한쪽의 연결이 끊기면 토론을 종료 시켰으나 이번에는 토론이 한번 시작되면 재연결을 해도 토론이 계속 진행되게 하고 싶었기 때문에 토론이 시작되는 시점에 서버에 토론의 시작 여부를 저장해서 재연결을 해도 토론과 녹화가 계속 진행될 수 있게 했다.

![debate-start](https://user-images.githubusercontent.com/84524514/170584346-b2296711-7778-433f-81c1-1abba46f8fb6.gif)

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
