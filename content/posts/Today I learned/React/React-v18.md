---
title: "[React] React v18.0"
date: 2022-04-18
categories:
  - "'Today I learned'"
tags:
  - React
---

# React v18.0

## Intro

React 18 버전에 대해 "노마드 코더"의 "[완전 새로운 리액트가 온다? 핵심정리 10분컷](https://www.youtube.com/watch?v=7mkQi0TlJQo)" 영상을 보고 처음 관심을 가지게 되었다. 그 뒤로 "React 공식 블로그"의 "[React Conf 2021 Recap](https://reactjs.org/blog/2021/12/17/react-conf-2021-recap.html)" 게시물도 찾아보며 언제 나오나 뼈빠지게 기다렸다. 사실 이제 막 개발을 시작한 나로써는 특정 기능이 너무 써보고 싶어서라기 보다는 큰 기술의 변화 현장에 있는 경험을 해보고 싶어서이다.? 아니면 기술 공부 후 이유 찾아서 적을까? 여튼 관심 가지고 나올날 만을 기다린건 사실이니

[https://reactjs.org/blog/2022/03/29/react-v18.html](https://reactjs.org/blog/2022/03/29/react-v18.html)
[https://www.youtube.com/watch?v=lDukIAymutM](https://www.youtube.com/watch?v=lDukIAymutM)

- Automatic Batching
- new APIs like startTransition
- streaming server-side rendering with support for Suspense.

## What is Concurrent React?

## What’s New in React 18

### 1. Automatic Batching [\*](https://github.com/reactwg/react-18/discussions/21)

{{< alert "lightbulb" >}}
this is an in-depth feature that we don’t expect most users to need to think about. However, it may be relevant to educators and library developers.
{{< /alert >}}

- 일괄 처리는 더 나은 성능을 위해 React가 여러 상태 업데이트를 **단일 리렌더링**으로 그룹화하는 것.
- React 18 미만에서는 이벤트 헨들러 내부의 업데이트만 일괄 처리.
- React 18 부터는 promises, setTimeout, 이벤트 헨들러 또는 기타 이벤트 내부의 업데이트도 모두 자동 일괄 처리.
- `ReactDOM.flushSync()`를 사용해 일괄 처리 취소 가능.
- Example:
  ```js
  // Before: only React events were batched.
  // After: updates inside of timeouts, promises, native event handlers or any other event are batched.
  setTimeout(() => {
    setCount((c) => c + 1);
    setFlag((f) => !f);
    // Before: React will render twice, once for each state update (no batching)
    // After: React will only re-render once at the end (that's batching!)
  }, 1000);
  ```

### 2. Transitions [\*](https://reactjs.org/docs/react-api.html#transitions)

- 전환은 **긴급한 업데이트**와 **긴급하지 않은 업데이트**를 구분하기 위한 React의 새로운 개념.
- 긴급하지 않은 업데이트 중에 긴급한 업데이트가 일어나면 긴급하지 않은 업데이트 중지 후 긴급한 업데이트 우선 처리. (후에 중지 되었던 업데이트는 최신 업데이트만 렌더링)
- 예를 들어 목록에서 필터를 클릭할 때 클릭된 필터의 변경은 긴급한 업데이트, 필터가 적용된 목록의 변경 긴급하지 않은 업데이트. 필터를 연속 클릭하면 목록의 변경은 중지되고 마지막 필터가 적용된 최신 목록만 렌더링.

- `React.startTransition`

  ```js
  React.startTransition(callback);
  ```

- `React.useTransition`

  ```js
  const [isPending, startTransition] = useTransition();
  ```

  - Example:

    ```jsx
    function App() {
      const [isPending, startTransition] = useTransition();
      const [count, setCount] = useState(0);

      function handleClick() {
        startTransition(() => {
          setCount((c) => c + 1);
        });
      }

      return (
        <div>
          {isPending && <Spinner />}
          <button onClick={handleClick}>{count}</button>
        </div>
      );
    }
    ```

### 3. Suspense [\*](https://github.com/reactjs/rfcs/blob/main/text/0213-suspense-in-react-18.md)

- Suspense는 React 프로그래밍 모델에서 **UI 로딩 상태**를 **일급 선언적 개념**으로 만듦.
- React 18에서는 Suspense에 대한 서버의 지원을 추가하고 동시 렌더링(Concurrent rendering)을 사용하여 기능을 확장.
- React 18의 Suspense는 Transition API와 결합 시 가장 잘 작동. 업데이트 일시 중단 시 콘텐츠가 대체 항목으로 대체되는 것을 방지하고 충분한 데이터가 로드될 때까지 렌더링을 지연.
- Example:

  ```jsx
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      setTab("comments");
    });
  }

  <Suspense fallback={<Spinner />}>
    <div style={{ opacity: isPending ? 0.8 : 1 }}>{tab === "photos" ? <Photos /> : <Comments />}</div>
  </Suspense>;
  ```

### 4. Rendering APIs

#### React DOM Client [\*](https://reactjs.org/docs/react-dom-client.html)

- react-dom/client:

  - `createRoot`: 루트를 만드는 새로운 방법. `ReactDOM.render` 대신 사용.
  - `hydrateRoot`: 서버 렌더링 응용 프로그램을 hydrate 하는 새로운 방법. 새로운 React DOM Server API와 함께 `ReactDOM.hydrate` 대신 사용.

  \*hydrate란? Server에서 렌더링 된 HTML 코드를 Client에서 JS 코드와 매칭 시키는 것.  
  \*createRoot와 hydrateRoot 모두 "렌더링 중 오류에서 복구" 또는 "로깅을 위한 수화" 시 알림을 받기를 원하는 경우 `onRecoverableError`라는 새로운 옵션을 허용.

#### React DOM Server [\*](https://reactjs.org/docs/react-dom-server.html)

- react-dom/server:

  - `renderToPipeableStream`: Node 환경용.
  - `renderToReadableStream`: Deno와 Cloudflare workers 같은 최신 Edge runtime 환경용.

  \*기존 `renderToString`은 작동하지만 권장하지 않음.

### 5. Strict Mode [\*](https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state)

- React 18 미만:
  - 구성 요소를 마운트하고 효과를 생성.
- React 18:
  - 구성 요소를 마운트하고 효과를 생성한 뒤 구성 요소의 마운트 해제 및 리마운트를 시뮬레이션.

### 6. Hooks

#### useId [\*](https://reactjs.org/docs/hooks-reference.html#useid)

```js
const id = useId();
```

- useId로 수화 불일치를 피하면서 서버와 클라이언트에서 안정적인 고유 ID를 생성.
- Example:
  ```jsx
  function NameFields() {
    const id = useId();
    return (
      <div>
        <label htmlFor={id}>Do you like React?</label>
        <input id={id} type="checkbox" name="react" />
        <label htmlFor={id + "-firstName"}>First Name</label>
        <div>
          <input id={id + "-firstName"} type="text" />
        </div>
        <label htmlFor={id + "-lastName"}>Last Name</label>
        <div>
          <input id={id + "-lastName"} type="text" />
        </div>
      </div>
    );
  }
  ```

#### useTransition [\*](https://reactjs.org/docs/hooks-reference.html#usetransition)

```js
const [isPending, startTransition] = useTransition();
```

\*앞선 [Transitions](#2-transitions-httpsreactjsorgdocsreact-apihtmltransitions)에서 설명.

#### useDeferredValue [\*](https://reactjs.org/docs/hooks-reference.html#usedeferredvalue)

```js
const deferredValue = useDeferredValue(value);
```

- useDeferredValue로 트리의 긴급하지 않은 부분 렌더링 연기 가능.
- Debouncing 또는 Throttling을 사용하여 업데이트를 연기하는 user-space hooks와 유사하나 몇 가지 장점이 있음.
  - 고정된 시간 지연이 없어 우선되는 렌더링이 반영된 직후 지연된 렌더링 시도.
  - 지연된 렌더링은 중단 가능하며 사용자 입력을 차단하지 않음.
- 값을 `setState`로 제어할 수 없을 때 유용. (다른 경우는 [Transitions](#2-transitions-httpsreactjsorgdocsreact-apihtmltransitions) 권장)
- useDeferredValue는 전달한 값만 연기. 즉, 긴급 업데이트 중 자식 구성 요소의 리렌더링을 방지하려면 해당 구성 요소를 React.memo 또는 React.useMemo로 메모해야 함.
- Example:

  ```jsx
  function Typeahead() {
    const query = useSearchQuery("");
    const deferredQuery = useDeferredValue(query);

    // Memoizing tells React to only re-render when deferredQuery changes,
    // not when query changes.
    const suggestions = useMemo(() => <SearchSuggestions query={deferredQuery} />, [deferredQuery]);

    return (
      <>
        <SearchInput query={query} />
        <Suspense fallback="Loading results...">{suggestions}</Suspense>
      </>
    );
  }
  ```

#### useSyncExternalStore [\*](https://reactjs.org/docs/hooks-reference.html#usesyncexternalstore)

- useSyncExternalStore는 외부 저장소가 업데이트를 동기적으로 강제하여 동시 읽기를 지원하는 새로운 Hook.

{{< alert "lightbulb" >}}
useSyncExternalStore is intended to be used by libraries, not application code.
{{< /alert >}}

#### useInsertionEffect [\*](https://reactjs.org/docs/hooks-reference.html#useinsertioneffect)

- useInsertionEffect는 CSS-in-JS 라이브러리가 렌더링 중에 스타일을 삽입할 때 생기는 성능 문제를 해결하는 새로운 Hook.
- DOM이 변경된 후에 실행되지만 기존 레이아웃이 영향을 미치기 전에 새 레이아웃을 읽음.

{{< alert "lightbulb" >}}
useInsertionEffect is intended to be used by libraries, not application code.
{{< /alert >}}

---

\*Ps. [React Blog: How to Upgrade to React 18](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)  
\*Ps. [React Blog: React Conf 2021 Recap](https://reactjs.org/blog/2021/12/17/react-conf-2021-recap.html)  
\*Ps. [Youtube: useTransition vs useDeferredValue | React 18](https://www.youtube.com/watch?v=lDukIAymutM)

\*Ref. [React Blog: React v18.0](https://reactjs.org/blog/2022/03/29/react-v18.html)
