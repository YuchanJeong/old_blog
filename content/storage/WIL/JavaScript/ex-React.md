---
title: "React Example"
showDate: false
showTableOfContents: false
showPagination: false
showAuthor: false
---

### useEffect

```jsx
import { useState, useEffect } from "react";

export default function Component() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const handleChangeName = (e) => setName(e.target.value);
  const handleCountUp = () => setCount(count + 1);

  /* useEffect */
  useEffect(() => {
    // effect
    setTimeout(() => {
      console.log({ count, name });
    }, 1000);

    // clean-up
    return clearTimeout(setTimeout);
    // dependency
  }, [count]);

  return (
    <>
      <p>Name: {name}</p>
      <input type={"text"} value={name} onChange={handleChangeName} />
      <p>Count : {count}</p>
      <button onClick={handleCountUp}>up</button>
    </>
  );
}
```

### useRef

```jsx
function TextInputWithFocusButton() {
  /* useRef */
  // DOM에 접근할 때 초깃값은 무조건 null!
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // .current
    inputEl.current.focus();
  };
  return (
    <>
      {/* ref */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### useCallback / useMemo

```jsx
import { useState, useCallback, useMemo } from "react";

export default function Component() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  /* useCallback */
  const handleClick = useCallback(
    () => console.log(`Count : ${count}`),
    [count]
  );

  /* useMemo */
  const doubleCount = useMemo(() => count * 2, [count]);

  const handleDouble = () => {
    console.log(`Double Count : ${doubleCount}`);
  };

  return (
    <>
      <button onClick={handleCount}>카운트 올리기!</button>
      <button onClick={handleClick}>보여주기!</button>
      <button onClick={handleDouble}>두배로 보여주기!</button>
    </>
  );
}
```

### useContext - 1

```jsx
// data
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

/* createContext(initial value of data) */
// light를 기본값으로 하는 테마 context를 만듦
const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    {/* Context.Provider */}
    // Provider를 이용해 하위 트리에 테마 값을 보내줌
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  /* useContext */
  // 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme.background,
        color: theme.foreground
      }}
    >
      I am styled by theme context!
    </button>
  )
}
```

### useContext - 2

#### Store.js

```js
import React, {useState} from 'react';

/* createContext */
const StoreContext = React.createContext(null);

const StoreProvider = ({children}) => {
  const [number, setNumber] = useState(0);

  // data
  const store = {
      number, setNumber
  };

  return (
    {/* Context.Provider */}
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
};

export {
    StoreContext
    StoreProvider,
};
```

#### Display.js

```js
import { useContext } from "react";
import { StoreContext } from "../store/Store";

const Display = () => {
  /* useContext */
  const { number } = useContext(StoreContext);

  return <div>number : {number}</div>;
};

export default Display;
```

#### Controller.js

```js
import { useContext } from "react";
import { StoreContext } from "../store/Store";

const Controller = () => {
  /* useContext */
  const { setNumber } = useContext(StoreContext);

  return (
    <div>
      <button onClick={() => setNumber(number + 1)}>increase</button>
      <button onClick={() => setNumber(number - 1)}>decrease</button>
    </div>
  );
};

export default Controller;
```

#### App.js

```js
import { StoreProvider } from "./store/Store";

import Display from "./components/Display";
import Controller from "./components/Controller";

const App = () => {
  return (
    <StoreProvider>
      <Display />
      <Controller />
    </StoreProvider>
  );
};

export default App;
```
