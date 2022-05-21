---
title: "[Debate-Ducks] WebSocket - Init"
date: 2022-05-17
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## 개요

socket.io를 사용해 WebSocket 서버를 구축하고 클라이언트에서 접속 가능하게 만들었다.

## WebSocket 서버

\*_["[Socket.io] Nest.js에서 Socket.io 연결 기초"](/posts/studies/socket.io/socket.io-nest.js) 참조_

Nest.js에 대한 지식 없이 Socket.io를 적용시키려고 하니 어려움을 겪었다. 그래서 공식 문서를 통해 Nest.js에 대한 기본적인 학습을 하고, Youtube에 올라와 있는 강의를 바탕으로 WebSocket 서버를 열었다.

아직은 기본적인 형태만 갖추어져있고, Debate-Ducks 프로젝트에 필요 없는 부분들도 작성되어 있어 추후 여러 테스트를 거쳐 프로젝트에 맞게 최적화 시킬 예정이다.

## WebSocket 클라이언트

Next.js를 사용하였지만 이미 충분히 학습하였고, 기본적으로 React에서의 사용법과 크게 다르지 않아 쉽게 적용할 수 있었다. 다만 TypeScript를 실전에서 처음 써봐서 아직은 조금 적응이 덜 되었다.

```ts
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Debateroom() {
  const router = useRouter();
  const { debateId } = router.query;
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    setSocket(io(`${process.env.NEXT_PUBLIC_API_URL}`));
  }, []);

  return (
    <div>
      <h1>Debateroom: {debateId}</h1>
    </div>
  );
}
```

\*_환경 변수로 NEXT_PUBLIC\_... 사용_  
\*_import 순서 컨벤션_  
\- 패키지, 라이브러리 > api, styles, utils > components > Etc  
\- 각 순서마다 개행으로 구분

## 문제 및 문제 해결

처음 Youtube의 강의만 보고 서버를 열었을 때 CORS 에러가 발생하였다. 기본 express에서는 `new Server`에 `{ cors: { origin: "..." } }`을 설정해서 해결했었던 문제였다. Nest.js에서는 `@WebSocketGateway`에 `{ cors: { origin: "..." } }`을 설정해서 해결하였다.

<img width="400" alt="CORS 에러" src="https://user-images.githubusercontent.com/84524514/168922191-7982a7bd-418e-45a3-b390-021ee9e06b91.png">

<img width="400" alt="CORS 에러 해결" src="https://user-images.githubusercontent.com/84524514/168922409-6cc999cd-3592-4402-a5d7-e99aaf5ab40d.png">

## 반성할 점

이전 프로젝트 때 `package-lock.json`이 자주 충돌이 났다. `package-lock.json`이 `package.json`의 보조하는 역할이라고 대충 알고 있던 우리는 둘을 함께 버전 관리에서 제외하였다. 프로젝트는 아무 이상이 없었고, 그래서 이번에도 `package-lock.json`을 버전 관리에서 제외하였다.

하지만 문득 어떤 역할을 하는지 정확히 모르는데 버전 관리에서 제외하는 게 맞는 걸까 싶었고 관련 정보를 찾아보았다. `package-lock.json`은 의존성 트리를 정확히 저장하여 메이저 미만의 업데이트 시 혹시 모를 오류를 대비하는 역할을 하였다. 그래서 급하게 다시 `package-lock.json`을 버전 관리에 추가하였다.

다음부터는 어떤 결정을 내리기 전에 미리 꼼꼼히 확인하고 결정을 내릴 것이다. 또한 한 번 이상이 없었다고 이상이 계속 없을 것이라는 안일한 생각을 버릴 것이다.

Ps. 성급함에 대한 반성 🙏🙏🙏

---

Ref. [package-lock.json은 왜 필요할까?](https://hyunjun19.github.io/2018/03/23/package-lock-why-need/)
