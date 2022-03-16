---
title: Hooks & Utils
date: 2022-02-05
categories:
  - "'React'"
tags:
  - React
draft: true
---

### 1. useInput

```jsx
export function useInput(initialValue, validator) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    let isValid = true;
    if (typeof validator === "function") {
      isValid = validator(value);
    }

    if (isValid) {
      setValue(value);
    }
  };

  return { value, onChange };
}
```

```jsx
const validator = (value) => !/.{11,}|[^A-z]|_/g.test(value);
const name = useInput("", validator);

return (
  <div className="App">
    <input placeholder="Please enter name" {...name} />
  </div>
);
```

### 2. useTabs

```jsx
import { useState } from "react";
import "./styles.css";

const contents = [
  {
    key: 1,
    tab: "Section 1",
    content: "I'm the content of the Section 1.",
  },
  {
    key: 2,
    tab: "Section 2",
    content: "I'm the content of the Section 2.",
  },
  {
    key: 3,
    tab: "Section 3",
    content: "I'm the content of the Section 3.",
  },
];

function useTaps(initialIndex, allTaps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return {
    currentItem: allTaps[currentIndex],
    changeItem: setCurrentIndex,
  };
}

export default function App() {
  const { currentItem, changeItem } = useTaps(0, contents);

  return (
    <div className="App">
      {contents.map((el, index) => (
        <button onClick={() => changeItem(index)} key={el.key}>
          {el.tab}
        </button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
}
```

```jsx
import "./styles.css";

export function checkConfirm(message, confirmAction, rejectAction) {
  const action = () => {
    if (window.confirm(message)) confirmAction();
    else {
      if (typeof rejectAction === "function") rejectAction();
    }
  };
  return action;
}

export default function App() {
  const sayHi = () => console.log("hi");
  const sayBye = () => console.log("bye");
  const confirm = checkConfirm("Are you sure", sayHi, sayBye);

  return (
    <div className="App">
      <button onClick={confirm}>Hi</button>
    </div>
  );
}
```

```jsx
export function checkPreventLeave() {
  const listner = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listner);
  const disablePrevent = () => window.removeEventListener("beforeunload", listner);

  return { enablePrevent, disablePrevent };
}
export default function App() {
  const { enablePrevent, disablePrevent } = checkPreventLeave();

  return (
    <div className="App">
      <button onClick={enablePrevent}>enablePrevent</button>
      <button onClick={disablePrevent}>disablePrevent</button>
    </div>
  );
}
```

```jsx
import { useState, useRef, useEffect } from "react";
import "./styles.css";

export function fireNotification(title, options) {
  if (!("Notification" in window)) {
    return;
  }

  const triggerNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") new Notification(title, options);
        else return;
      });
    } else {
      new Notification(title, options);
    }
  };

  return triggerNotification;
}

export default function App() {
  const triggerNotification = useNotification("HELLO WORLD", { body: "Hello world!" });

  return (
    <div className="App">
      <button onClick={triggerNotification}>Hello</button>
    </div>
  );
}
```
