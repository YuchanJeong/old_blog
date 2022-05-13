---
title: "React"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - React
---

{{< alert "circle-info" >}}
[React v18.0](/posts/studies/react/react-v18.0/) 업데이트 미반영
{{< /alert >}}

> 선언형, 컴포넌트 기반, 범용성이 특징인 JavaScript 라이브러리

## React Basic

**1\) JSX 문법**

1. `Close Tag` 필수 (Ex. <></> (Fragment))
2. `{JS 표현식}`
3. 조건문 대신 `삼항 연산자`나 `논리 연산자(||)`만 사용 가능
4. className, onClick (class, onclick in JS)

**2\) Component**

Class Component

```jsx
import React from "react";

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Function Component

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// Arrow Function Component is Bad with Type Script.
// "Using props directly on parameters allow you to more correctly type components and avoid false positives while also being more flexible."
```

**3\) Props**

> 상위 컴포넌트에서 전달받은 값 (read only)

```jsx
import SubComponent1 from "./SubComponent1";
import SubComponent2 from "./SubComponent2";

// props 발신
const SupComponent = () => {
  return (
    <div className="sup">
      <SubComponent1 propsName={propsValue} />
      <SubComponent2 propsName={propsValue} />
    </div>
  );
};

export default SupComponent;
```

```jsx
// props 수신 (1)
export default function SubComponent1(props) => {
  return (
    <div className="sub">
      <p>{props.propsName}<p>
    </div>
  );
}
```

```jsx
// props 수신 (2) (recommended)
export default function SubComponent2({propsName}) => {
  return (
    <div className="sub">
      <p>{propsName}<p>
    </div>
  )
}
```

\*[Props Composition](https://ko.reactjs.org/docs/context.html#before-you-use-context): Component를 Props로 넘겨줌

**4\) State with useState()**[^](https://ko.reactjs.org/docs/hooks-reference.html#usestate)

> 컴포넌트 내부에서 변화하는 값

```jsx
import { useState } from "react";

export default function Component() {
  /* useState */
  const [state, setState] = useState(initialState);

  // setState로만 state 변경 가능
  const setStateFunc = (event) => {
    setState(event.target.value);
  };

  return (
    <div>
      <input type="text" value={state} onChange={setStateFunc} />
      <p>text: {state}</p>
    </div>
  );
}
```

```jsx
// setState는 비동기적으로 작동해서 `함수형`으로 동기적으로 처리 해야함
const [state, setState] = useState({});

setState((prevState) => ({ ...prevState, ...updatedValues }));
```

\*참조형 데이터의 요소는 변경해도 재랜더링이 일어나지 않음

## React Hooks

### 1. useEffect()[^](https://ko.reactjs.org/docs/hooks-reference.html#useeffect) [⋯](/storage/wil/javascript/ex-react/#useeffect)

```jsx
/* useEffect */
useEffect(() => {
  effect
  [return clean-up
}[, [dependency]]])
```

- Side Effect를 다룸
- 최초 수행 후 컴포넌트 재랜더링 마다 수행  
  \*_부모 컴포넌트 재랜더링, props 및 state 변경_
- useEffect의 effect를 정리하는 함수 반환 가능 (clean-up)
- 최초 수행 후 dependency 요소 변화 시만 수행  
  \*_dependency가 []일 때는 최초에만 수행_

### 2. useRef()[^](https://ko.reactjs.org/docs/hooks-reference.html#useref) [⋯](https://github.com/YuchanJeong/_WIL/blob/master/JavaScript/ex/ex-React-UseRef.md)

```jsx
/* 1) useRef */
const containerRef = useRef(initialValue);

return (
  <>
    {/* 2) ref */}
    <element ref={containerRef} />
  </>
);

// 3) .current
const currentDom = ContainerRef.current;
```

- 리액트에서 DOM에 접근 가능
- ref.current는 값이 변해도 재랜더링이 일어나지 않아, 변화가 일어나면 안 되는 값을 저장할 때도 사용

### 3) [useCallback](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)() & [useMemo](https://ko.reactjs.org/docs/hooks-reference.html#usememo)() [⋯](https://github.com/YuchanJeong/_WIL/blob/master/JavaScript/ex/ex-React-useCallbackMemo.md)

> 특정 함수나 결과값을 재사용  
> \*profile 진행 후 사용 추천

```jsx
/* useCallback */
// 자주 사용될 함수를 props로 넘겨줄 때만 사용
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

/* useMemo */
// 고비용의 계산이 필요할 때만 사용
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### 4) [useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)() [⋯](https://github.com/YuchanJeong/_WIL/blob/master/JavaScript/ex/ex-React-useContext1.md) [⋯](https://github.com/YuchanJeong/_WIL/blob/master/JavaScript/ex/ex-React-useContext2.md)

> 하위 컴포넌트 트리 전체에 데이터 제공

```jsx
/* 1) React.createContext */
const MyContext = React.createContext(defaultValue);

/* 2) .Provider */
<MyContext.Provider value={data}></MyContext.Provider>;
```

```jsx
/* 3) useContext */
const value = useContext(MyContext);
```

### 5) [사용자 정의 Hook](https://ko.reactjs.org/docs/hooks-custom.html)

## Etc

### 1) CRA

```bash
npx create-react-app 프로젝트_이름 --template typescript
```

### 2) React.memo()

- 이전과 같은 props가 들어올 때 렌더링 스킵
- 컴포넌트가 많이 반복되는 렌더링 요소(Ex. arr.map())를 가지고 있을 때 React.memo()로 감싸서 export
