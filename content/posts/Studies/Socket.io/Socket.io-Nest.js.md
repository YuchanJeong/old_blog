---
title: "[Socket.io] Nest.js에서 Socket.io 연결 기초"
date: 2022-05-16
categories:
  - <Studies>
tags:
  - Socket.io
  - Nest.js
---

## 설치

```bash
npm i @nestjs/websockets @nestjs/platform-socket.io
npm i -D @types/socket.io
```

## 기본 설정

```bash
npx nest g module events
npx nest g ga events
```

1. `events.gateway.ts` 및 `events.gateway.spec.ts`를 `events`로 이동
2. `app.module.ts`의 providers에서 EventsGateway 삭제
3. `events.module.ts`의 provider와 exports에 EventsGateway 추가

- Why?  
  EventsGateway를 여러 곳에서 provider 하면 매번 서버가 새로 생성  
  그래서 EventsModule에서 한 번만 provider 하고 exports 한 뒤 여러 곳에서 사용

### 1. EventsModule

```ts
import { EventsGateway } from "./events.gateway";
import { Module } from "@nestjs/common";

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
```

### 2. EventsGateway

```ts
import { channel } from "diagnostics_channel";
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { onlineMap } from "./onlineMap";

// # namespace: 같은 namespace에 있는 socket들만 소통 가능
//   일종의 대기실 개념이며 default는 "/" 이고, 정규 표현식 사용 가능
// # cors: { origin: "*" }은 접근 가능한 url
@WebSocketGateway({ namespace: /\/ws-.+/, cors: { origin: "*" } })

// # implements: 필수 구현요소 검사용
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // # @WebSocketServer: WebSocket의 서버 (io)
  @WebSocketServer() public server: Server;

  // # @SubscribeMessage: WebSocket의 이벤트 리스너 (on 1)
  @SubscribeMessage("test")
  // # handle...: WebSocket의 custom 이벤트 함수 (on 2)
  // # @MessageBody: body로 받는 데이터
  handleTest(@MessageBody() data: string) {
    console.log("test", data);
  }

  @SubscribeMessage("login")
  handleLogin(
    @MessageBody() data: { id: number; channels: number[] },
    // @ConnectedSocket: 연결된 socket
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

Ref. [Nest.js WebSockets Official Document](https://docs.nestjs.com/websockets/gateways)  
Ref. [Nest.js + Socket.io(EventsGateway) 강좌](https://www.youtube.com/watch?v=gkJ1N6PDCEc)
