---
title: "[Socket.io] Nest.js에서 Socket.io 연결"
date: 2022-05-16
categories:
  - <Studies>
tags:
  - Socket.io
  - Nest.js
draft: true
---

```bash
npm i @nestjs/websockets @nestjs/platform-socket.io
npm i -D @types/socket.io
```

```bash
npx nest g module events
npx nest g ga events
```

EventsGateway 파일들 events 폴더로 이동

`app.module.ts`의 providers에서 EventsGateway 삭제

EventsModule의 provider와 exports에 EventsGateway 추가

이유는 EventsGateway 자체를 다른 곳에서 provider 하면 매번 서버가 새로 생성
그래서 EventsModule에서 한 번만 provider 하고 그 provider를 imports 해서 사용
이때 EventsModule 안의 EventsGateway를 사용하기 위해선 exports도 해줘야 함

namespace는 namespace -> room 게임으로 따지면 전체 대기실 이런 느낌.
정규 표현식 사용한 이유는 어떤 방을 만들지 모르기 떄문에 한거 이건 slack 워크페이스가 네임스페이스라
사실 내가 당장 쓸 때는 필요 없음. 추후 생각 해보자

```ts
// ./src/events/events.module.ts
import { EventsGateway } from "./events.gateway";
import { Module } from "@nestjs/common";

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
```

```ts
// ./src/events/events.gateway.ts
import { channel } from "diagnostics_channel";
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
import { onlineMap } from "./onlineMap";

@WebSocketGateway({ namespace: /\/ws-.+/ })

// 필수 구현요소 검사용으로 implements
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // express socket.io의 io 역할
  @WebSocketServer() public server: Server;

  @SubscribeMessage("test")
  handleTest(@MessageBody() data: string) {
    console.log("test", data);
  }

  @SubscribeMessage("login")
  handleLogin(
    @MessageBody() data: { id: number; channels: number[] },
    @ConnectedSocket() socket: Socket
  ) {
    const newNamespace = socket.nsp;
    console.log("login", newNamespace);
    onlineMap[socket.nsp.name][socket.id] = data.id;
    newNamespace.emit("onlineList", Object.values(onlineMap[socket.nsp.name]));
    data.channels.forEach((channel) => {
      console.log("join", socket.nsp.name, channel);
      socket.join(`${socket.nsp.name}-${channel}`);
    });
  }

  afterInit(server: Server): any {
    console.log("websocket server init", server);
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log("connected", socket.nsp.name);
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    socket.emit("hello", socket.nsp.name);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket): any {
    console.log("disconnected", socket.nsp.name);
    const newNamespace = socket.nsp;
    delete onlineMap[socket.nsp.name][socket.id];
    newNamespace.emit("onlineList", Object.values(onlineMap[socket.nsp.name]));
  }
}
```

```ts
export const onlineMap = {};
```

---

Ref. [Nest.js + Socket.io(EventsGateway) 강좌](https://www.youtube.com/watch?v=gkJ1N6PDCEc)
