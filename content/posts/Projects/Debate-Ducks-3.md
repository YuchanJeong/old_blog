---
title: "[Debate-Ducks] WebSocket 방 입장"
date: 2022-05-18
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## 서버 방 입장 코드

```ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;

  // 클라이언트에서 "connect" 후 방(debateId)에 "join" 시도
  @SubscribeMessage("join")
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() debateId: string
  ) {
    // 현제 방에 몇명이 있는지 파악
    const roomSize = this.server.sockets.adapter.rooms.get(debateId)?.size || 0;
    // 2명 (찬성, 반대) 미만일 때 입장
    // 2명 이상이면 입장 거절
    if (roomSize < 2) {
      socket.join(debateId);
      socket.to(debateId).emit("guestJoin");
    } else {
      socket.emit("overcapacity");
    }
  }

  afterInit(): void {
    console.log("WebSocket Server Init");
  }

  handleConnection(@ConnectedSocket() socket: Socket): void {
    console.log("connected", socket.id);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    console.log("disconnected", socket.id);
  }
}
```

## 클라이언트 방 입장 코드

```tsx
// debateroom/[debateId].tsx
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import Room from "../../../components/debateroom/Room";

export default function Debateroom() {
  const router = useRouter();
  const { debateId } = router.query;
  const socketRef = useRef<Socket | undefined>(undefined);

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_API_URL}`);
  }, []);

  return (
    <>
      <Room debateId={debateId} socket={socketRef.current} />
    </>
  );
}
```

```tsx
// Room.tsx
import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface IRoom {
  debateId: string | string[] | undefined;
  socket: Socket | undefined;
}

export default function Room({ debateId, socket }: IRoom) {
  useEffect(() => {
    // "connect" 후 방(debateId)에 "join" 시도
    socket?.on("connect", () => {
      socket.emit("join", debateId);
      console.log("connect", socket.id);
    });

    socket?.on("overcapacity", () => {
      console.log("overcapacity");
    });

    socket?.on("guestJoin", () => {
      console.log("room", debateId);
    });
  }, [debateId, socket]);

  return (
    <div>
      <h1>Room</h1>
    </div>
  );
}
```

## 문제 해결

처음에는 useEffect 내부에서 setState로 socket을 받아서 저장했다. 그러자 한 번의 입장에 여러 번의 연결 시도를 하는 문제가 있었다. _(bcs, 재랜더링)_

<img width="246" alt="useState 1번" src="https://user-images.githubusercontent.com/84524514/169258595-7a513e2f-ae1e-4c94-8eac-e9481ab0a68f.png">
<img width="231" alt="useState 2번" src="https://user-images.githubusercontent.com/84524514/169258523-c649af87-a15e-4f78-8b71-68ebcefe2726.png">

두 번째에는 useEffect 내부에서 바로 const로 socket을 저장한 다음 내부에서 바로 socket의 event를 작성 하였다. 하지만 useState를 사용했을 때와 같은 문제가 여전히 발생 하였고, 두 번째 브라우저에서 입장하자 이미 정원을 초과하였다고 입장을 거절당하는 추가적인 문제도 발생하였다.

<img width="232" alt="const 1번" src="https://user-images.githubusercontent.com/84524514/169260185-921edb9f-0616-46f3-9758-89c8d1d4ce1d.png">
<img width="240" alt="const 2번" src="https://user-images.githubusercontent.com/84524514/169260201-590ee288-4893-48d2-b9bd-7fdd873fe170.png">

그래서 cleanUp으로 연결 해제 처리를 해주었더니 위에서 언급한 문제는 모두 해결되었다. 하지만 연결을 하기 전에 해제된다는 경고가 뜨기 시작하였다.

<img width="245" alt="const 3번" src="https://user-images.githubusercontent.com/84524514/169260664-c8d58982-e2c7-4466-9060-afd7030033a0.png">

마지막으로 useState 대신에 useRef를 사용하였다. _(bcs, useRef는 재랜더링이 일어나지 않음)_ 그러자 모든 문제가 말끔히 해결되었다.

<img width="244" alt="useRef 1번" src="https://user-images.githubusercontent.com/84524514/169261494-559f58d4-e37f-4ec3-af48-7fdc5006824f.png">
<img width="242" alt="useRef 2번" src="https://user-images.githubusercontent.com/84524514/169261521-436df3de-09c4-4e13-8a3d-56c358b60346.png">

## 반성할 점 및 잘한 점

이전에 한번 만든 적 있는 기능이다 보니 이전의 코드를 참조하면서 만들고 있다. 참조만 하고 더 많이 생각하며 발전시킨 코드를 작성해야 하는데 이전의 코드를 답습하며 현재의 스택에 맞게 적용만 하고 있었다.

이제부터는 지난 프로젝트 이후에 배운 내용들을 활용하고 더 많이 생각하며 발전된 코드를 작성할 것이다. 🔥🔥🔥
