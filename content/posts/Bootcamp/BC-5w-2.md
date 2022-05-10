---
title: "BC-5w-추석(2) / {FC} React(5)"
date: 2021-09-25
categories:
  - <Bootcamp>
tags:
  - React
---

# React with FastCampus(5) 실전 활용

#### HOC(Higher-Order Component)

- HOC = function(컴포넌트) { return 새로운 컴포넌트 }
- Ex. withRouter() <--- React with FastCampus(3)
- 사용 시 주의 사항
  - 랜더 메소드 안에 쓰지 말라
  - 인자로 들어가는 컴포넌트를 변경하지 말라
  - 인자로 들어가는 컴포넌트의 Static Methods는 자동으로 복사되지 않음
    - 따로 적어주거나, hoist-non-react-statics 라이브러리 사용
  - Refs는 바로 통과되지 않음
    - React.forwardRef로 통과시켜야 함

#### Controlled Component & Uncontrolled Component

- Controlled

  - 엘리먼트의 상태를 엘리먼트를 가지고 있는 컴포넌트가 관리
  - Ex. 이메일 형식과 맞지 않으면 빨간색이다가 맞으면 초록색으로 변함

  ```js
  import React from "react";
  class ControlledComponent extends React.Component {
    state = {
      value: "",
    };

    render() {
      const { value } = this.state;
      return (
        <div>
          <input value={value} onChange={this.change} />
          <button onClick={this.click}>전송</button>
        </div>
      );
    }

    change = (event) => {
      this.setState({ value: event.target.value });
    };

    click = (event) => {
      console.log(this.state.value);
    };
  }
  export default ControlledComponent;
  ```

- Uncontrolled

  - 엘리먼트의 상태를 관리하지 않고, 엘리먼트의 참조만 컴포넌트가 소유
  - Ex. 마우스를 올리면 포커스 되게 함(실제 엘리먼트에 포커스)

    ```js
    import React from "react";
    class UncontrolledComponent extends React.Component {
      inputRef = React.createRef();

      render() {
        console.log("initial render", this.inputRef);
        return (
          <div>
            <input ref={this.inputRef} />
            <button onClick={this.click}>전송</button>
          </div>
        );
      }

      componentDidMount() {
        console.log("componentDidMount", this.inputRef);
      }

      click = (event) => {
        // input 엘리먼트의 value를 꺼내서 전송
        console.log(this.inputRef.current.value);
      };
    }
    export default UncontrolledComponent;
    ```

## Hooks & Context

#### Basic Hooks

- useState

  ```js
  // class component
  import React from "react";
  export default class Example1 extends React.Component {
    state = { count: 0 };

    render() {
      const { count } = this.state;
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={this.click}>click</button>
        </div>
      );
    }

    click = () => {
      this.setState({ count: this.state.count + 1 });
    };
  }
  ```

  ```js
  // function component
  import React from "react";
  export default function Example2() {
    const [state, setState] = React.useState({ count: 0 });

    return (
      <div>
        <p>You clicked {state.count} times</p>
        <button onClick={click}>click</button>
      </div>
    );

    function click() {
      setState((state) => ({ count: state.count + 1 }));
    }
  }
  ```

#### useEffect

```js
// class component
import React from "react";

export default class Example3 extends React.Component {
  state = { count: 0 };

  render() {
    const { count } = this.state;
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={this.click}>click</button>
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount", this.state.count);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate", this.state.count);
  }

  click = () => {
    this.setState({ count: this.state.count + 1 });
  };
}
```

```js
// function component
import React from "react";

export default function Example4() {
  const [state, setState] = React.useState({ count: 0 });

  React.useEffect(() => {
    console.log("componentDidMount");
    return () => {
      // cleanup
      // componentWillUmount
      // 닫혀있어서 마지막에만 작동
    };
  }, []);

  React.useEffect(() => {
    console.log(
      "componentDidMount & componentDidUpdate by state.count",
      state.count
    );
    return () => {
      // cleanup
      // 이전 값으로 미리 실행하고 넘어감
      console.log("cleanup by state.count", state.count);
    };
  }, [state.count]);
  // 두 번째 인자는 처음을 제외하고 해당 목록이 변했을 때 useEffect 실행

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={click}>click</button>
    </div>
  );

  function click() {
    setState((state) => ({ count: state.count + 1 }));
  }
}
```

- 추가 공부! 클린업과 디펜던시 in useEffect

#### Custom Hooks(useSomething)

```js
// Hooks
import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  // 최초일 때만 처리됨

  return width;
}
```

```js
// HOC
import React from "react";

export default function withHasMounted(Component) {
  class NewComponent extends React.Component {
    state = {
      hasMounted: false,
    };

    render() {
      const { hasMounted } = this.state;
      return <Component {...this.props} hasMounted={hasMounted} />;
    }

    componentDidMount() {
      this.setState({ hasMounted: true });
    }
  }

  // fot Debugging
  NewComponent.displayName = `withHasMounted(${Component.name})`;

  return NewComponent;
}
```

```js
// Hooks
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  });

  return hasMounted;
}
```

```js
// App.js
import useWindowWidth from "./hooks/useWindowWidth";
import withHasMounted from "./hoc/withHasMounted";
import useHasMounted from "./hooks/useHasMounted";

function App({ hasMounted }) {
  const width = useWindowWidth();

  const hasMountedFromHooks = useHasMounted();

  console.log(hasMounted, hasMountedFromHooks);

  return <div className="App">{width}</div>;
}

export default withHasMounted(App);
```

#### useReducer

- 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우
- 다음 state가 이전 state에 의존적인 경우
- Redux를 배운뒤 쉽게 사용 가능

```js
import { useReducer } from "react";

// reducer -> state를 변경하는 로직이 담겨있는 함수
const reducer = (prevState, action) => {
  if (action.type === "PLUS") {
    return {
      count: prevState.count + 1,
    };
  }
  return prevState;
};
// dispatch -> action 객체를 넣어서 실행
// action -> 객체이고 필수 프로퍼티로 type을 가짐

export default function Example6() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const click = () => {
    dispatch({ type: "PLUS" });
  };

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={click}>click</button>
    </div>
  );
}
```

#### useMemo, useCallback

```js
import { useState, useMemo, useCallback } from "react";

function sum(persons) {
  console.log("sum...");
  return persons.map((item) => item.age).reduce((acc, cur) => acc + cur);
}

export default function Example7() {
  const [value, setValue] = useState("");
  const persons = useState([
    { name: "Yuchan", age: 27 },
    { name: "Chesley", age: 25 },
  ]);

  // count는 persons에 의존적으로 변해야함
  // for 최적화
  const count = useMemo(() => {
    return sum(persons);
  }, [persons]);

  // 최초에만 생성
  // 디펜던시 리스트
  // for 컴포넌트 최적화(뒤에서 다룸)
  const click = useCallback(() => {
    console.log(value);
  }, []);

  const change = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input value={value} onChange={change} />
      <p>{count}</p>
      <button onClick={click}>click</button>
    </div>
  );
}
```

#### useRef, createRef

```js
import { useState, useRef, createRef } from "react";

  const [value, setValue] = useState("");
  const input1Ref = createRef(); // 랜더마다 새로 넣어줌
  const input2Ref = useRef(); // 랜더 사이에 유지 but 최초에는 undefined

  console.log(input1Ref.current, input2Ref.current);
  // -> null - undefined
  // -> null - input

  const change = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      // controlled component
      <input value={value} onChange={change} />
      // uncontrolled component
      <input ref={input1Ref} />
      <input ref={input2Ref} />
    </div>
  );
}
```

- 추가 공부! 다른 유요한 훅 라이브러리들 알아보기

#### Router Hooks

- useHistory

  ```js
  import { useHistory } from "react-router-dom";

  export default function LoginButton() {
    const history = useHistory();

    function login() {
      history.push("/");
    }

    return <button conClick={login}>로그인<button>
  }
  ```

- useParams

  ```js
  export default function Profile() {
    const params = useParams();
    const id = params.id;

    return (
      <div>
        <h2>프로필 페이지</h2>
        {id && <p>id는 {id}입니다.</p>}
      </div>
    );
  }
  ```

- Router Communication

  - 하위 컴포넌트 변경하기

    ```js
    import { useState } from "react";

    export default function A() {
      const [value, setValue] = useState("아직 안바뀜");

      const click = () => {
        setValue("E의 값을 변경");
      };

      return (
        <div>
          <B value={value} />
          <button onClick={click}>E 변경</button>
        </div>
      );
    }

    function B({ value }) {
      return (
        <div>
          <p>여긴 B</p>
          <C value={value} />
        </div>
      );
    }

    function C({ value }) {
      return (
        <div>
          <p>여긴 C</p>
          <D value={value} />
        </div>
      );
    }

    function D({ value }) {
      return (
        <div>
          <p>여긴 D</p>
          <E value={value} />
        </div>
      );
    }

    function E({ value }) {
      return (
        <div>
          <p>여긴 E</p>
          <h3>{value}</h3>
        </div>
      );
    }
    ```

  - 상위 컴포넌트 변경하기

    ```js
    import { useState } from "react";

    export default function A() {
      const [value, setValue] = useState("아직 안바뀜");

      return (
        <div>
          <p>{value}</p>
          <B setValue={setValue} />
        </div>
      );
    }

    function B({ setValue }) {
      return (
        <div>
          <p>여긴 B</p>
          <C setValue={setValue} />
        </div>
      );
    }

    function C({ setValue }) {
      return (
        <div>
          <p>여긴 C</p>
          <D setValue={setValue} />
        </div>
      );
    }

    function D({ setValue }) {
      return (
        <div>
          <p>여긴 D</p>
          <E setValue={setValue} />
        </div>
      );
    }

    function E({ setValue }) {
      const click = () => {
        setValue("A의 값을 변경");
      };

      return (
        <div>
          <p>여긴 E</p>
          <button onClick={click}>A 변경</button>
        </div>
      );
    }
    ```

#### Context API

- 하위 컴포넌트 전체에 데이터를 공유
- 데이터 set(가장 상위 컴포넌트, provider)

  ```js
  // contexts/PersonContext.js
  import { createContext } from "react";

  const PersonContext = createContext();

  export default PersonContext;
  ```

  ```js
  // index.js
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import reportWebVitals from "./reportWebVitals";
  import PersonContext from "./contexts/PersonContext";

  const persons = [
    { id: 0, name: "yuchan", age: 27 },
    { id: 1, name: "chesley", age: 25 },
  ];

  ReactDOM.render(
    <React.StrictMode>
      <PersonContext.Provider value={persons}>
        <App />
      </PersonContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  ```

  - 데이터 get(1) - 컨슈머

    ```js
    import PersonContext from "../contexts/PersonContext";

    export default function Consumer() {
      return (
        <PersonContext.Consumer>
          {(persons) => (
            <ul>
              {persons.map((persons) => (
                <li>{persons.name}</li>
              ))}
            </ul>
          )}
        </PersonContext.Consumer>
      );
    }
    ```

  - 데이터 get(2) - useContext

    ```js
    import { useContext } from "react";
    import PersonContext from "../contexts/PersonContext";

    export default function UseContext() {
      const persons = useContext(PersonContext);

      return (
        <ul>
          {persons.map((persons) => (
            <li>{persons.name}</li>
          ))}
        </ul>
      );
    }
    ```
