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

- Automatic Batching
- new APIs like startTransition
- streaming server-side rendering with support for Suspense.

## What’s New in React 18

### Automatic Batching [\*](https://github.com/reactwg/react-18/discussions/21)

> **Note:** this is an in-depth feature that we don’t expect most users to need to think about. However, it may be relevant to educators and library developers.

- 일괄 처리는 더 나은 성능을 위해 React가 여러 상태 업데이트를 **단일 재렌더링**으로 그룹화하는 것.
- React 18 미만의 버전에서는 `native event handlers` 내부의 업데이트만 일괄 처리.
- React 18 버전부터는 `promises`, `setTimeout`, `native event handlers` 또는 `기타 event` 내부의 업데이트도 모두 자동 일괄 처리.
- `ReactDOM.flushSync()`를 사용해 일괄 처리를 취소할 수 있음.
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

- 전환은 **긴급한 업데이트**와 **긴급하지 않은 업데이트**를 구분하기 위한 React 18 버전의 새로운 개념.
- 긴급하지 않은 업데이트 중에 긴급한 업데이트가 일어나면 긴급하지 않은 업데이트 중지 후 긴급한 업데이트 우선 처리. (최신 업데이트만 렌더링)
- 예를 들어 목록에서 필터를 클릭할 때, 클릭된 필터의 변경은 긴급한 업데이트이고 필터가 적용된 목록은 긴급하지 않은 업데이트. 필터를 연속 클릭하면 목록의 변경은 중지되고 마지막 필터가 적용된 최신 목록만 렌더링.

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
