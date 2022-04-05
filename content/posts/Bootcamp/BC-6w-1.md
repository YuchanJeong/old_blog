---
title: "BC-6w-1 / {FC} React(7)"
date: 2021-09-27
categories:
  - "'Bootcamp'"
tags:
  - React
---

## Today I learned

### + React with FastCampus(7) Advanced

#### Optimizing Performance

- 필요할 때만 랜더 한다.
- Reconciliation

  - 랜더 전후의 일치 여부를 판단하는 규칙
  - 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
  - 개발자가 key prop 을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

  1.  DOM 엘리먼트의 타입이 다른 경우

      ```js
      class Foo extends React.Component {
        componentDidMount() {
          console.log("Foo componentDidMount");
        }

        componentWillUnmount() {
          console.log("Foo componentWillUnmount");
        }

        render() {
          return <p>Foo</p>;
        }
      }

      class App extends React.Component {
        state = {
          count: 0,
        };
        componentDidMount() {
          setInterval(() => {
            this.setState({
              count: this.state.count + 1,
            });
          }, 1000);
        }
        render() {
          if (this.state.count % 2 === 0) {
            return (
              <div>
                <Foo />
              </div>
            );
          }
          return (
            <span>
              <Foo />
            </span>
          );
        }
      }
      ```

      - 계속 unmount 했다, mount 했다 반복
      - Foo componentDidMount  
        Foo componentWillUnmount  
        Foo componentDidMount
        Foo componentWillUnmount  
        Foo componentDidMount
        Foo componentWillUnmount  
        Foo componentDidMount  
        ...

  2.  DOM 엘리먼트의 타입이 같은 경우

      ```js
      class App extends React.Component {
        state = {
          count: 0,
        };
        componentDidMount() {
          setInterval(() => {
            this.setState({
              count: this.state.count + 1,
            });
          }, 1000);
        }
        render() {
          if (this.state.count % 2 === 0) {
            return <div className="before" title="stuff" />;
          }
          return <div className="after" title="stuff" />;
        }
      }
      ```

      ```js
      class App extends React.Component {
        state = {
          count: 0,
        };
        componentDidMount() {
          setInterval(() => {
            this.setState({
              count: this.state.count + 1,
            });
          }, 1000);
        }
        render() {
          if (this.state.count % 2 === 0) {
            return <div style={{ color: "red", fontWeight: "bold" }} />;
          }
          return <div style={{ color: "green", fontWeight: "bold" }} />;
        }
      }
      ```

      - 달라진 attribute 값만 변함

  3.  같은 타입의 컴포넌트 엘리먼트

      ```js
      class Foo extends React.Component {
        state = {};

        componentDidMount() {
          console.log("Foo componentDidMount");
        }

        componentWillUnmount() {
          console.log("Foo componentWillUnmount");
        }

        static getDerivedStateFromProps(nextProps, prevState) {
          console.log("Foo getDerivedStateFromProps", nextProps, prevState);
          return {};
        }

        render() {
          console.log("Foo render");
          return <p>Foo</p>;
        }
      }

      class App extends React.Component {
        state = {
          count: 0,
        };
        componentDidMount() {
          setInterval(() => {
            this.setState({
              count: this.state.count + 1,
            });
          }, 1000);
        }
        render() {
          if (this.state.count % 2 === 0) {
            return <Foo name="Mark" />;
          }
          return <Foo name="Anna" />;
        }
      }
      ```

      - 컴포넌트에서 props가 바뀐 라이프사이클 훅이 실현되고, 맞춰서 랜더 실행
      - mount, unmount가 아니라 컴포넌트가 업데이트됨
      - Foo getDerivedStateFromProps {name: "Mark"} {}  
        Foo render  
        Foo componentDidMount  
        Foo getDerivedStateFromProps {name: "Anna"} {}  
        Foo render  
        Foo getDerivedStateFromProps {name: "Mark"} {}  
        Foo render
        Foo getDerivedStateFromProps {name: "Anna"} {}  
        Foo render  
        ...

  4.  자식에 대한 재귀적 처리

      ```js
      class Foo extends React.Component {
        state = {};

        componentDidMount() {
          console.log("Foo componentDidMount", this.props.children);
        }

        componentWillUnmount() {
          console.log("Foo componentWillUnmount");
        }

        static getDerivedStateFromProps(nextProps, prevState) {
          console.log("Foo getDerivedStateFromProps", nextProps, prevState);
          return {};
        }

        render() {
          console.log("Foo render", this.props.children);
          return <p>{this.props.children}</p>;
        }
      }
      ```

      ```js
      class App extends React.Component {
        state = {
          count: 0,
        };
        componentDidMount() {
          setInterval(() => {
            this.setState({
              count: this.state.count + 1,
            });
          }, 3000);
        }
        render() {
          if (this.state.count % 2 === 0) {
            return (
              <ul>
                <Foo>first</Foo>
                <Foo>second</Foo>
              </ul>
            );
          }
          return (
            <ul>
              <Foo>first</Foo>
              <Foo>second</Foo>
              <Foo>third</Foo>
            </ul>
          );
        }
      }
      ```

      - Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo componentDidMount first  
        Foo componentDidMount second  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount third  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo componentWillUnmount  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount third  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo componentWillUnmount  
        ...

      ```js
      class App extends React.Component {
        state = {
          count: 0,
        };
        componentDidMount() {
          setInterval(() => {
            this.setState({
              count: this.state.count + 1,
            });
          }, 3000);
        }
        render() {
          if (this.state.count % 2 === 0) {
            return (
              <ul>
                <Foo>second</Foo>
                <Foo>third</Foo>
              </ul>
            );
          }
          return (
            <ul>
              <Foo>first</Foo>
              <Foo>second</Foo>
              <Foo>third</Foo>
            </ul>
          );
        }
      }
      ```

      - Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount second  
        Foo componentDidMount third  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount third  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentWillUnmount  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount third  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentWillUnmount  
        ...

      ```js
      class App extends React.Component {
        state = {
          count: 0,
        };
        componentDidMount() {
          setInterval(() => {
            this.setState({
              count: this.state.count + 1,
            });
          }, 3000);
        }
        render() {
          if (this.state.count % 2 === 0) {
            return (
              <ul>
                <Foo key="2">second</Foo>
                <Foo key="3">third</Foo>
              </ul>
            );
          }
          return (
            <ul>
              <Foo key="1">first</Foo>
              <Foo key="2">second</Foo>
              <Foo key="3">third</Foo>
            </ul>
          );
        }
      }
      ```

      - Foo getDerivedStateFormProps {children: "second"} {}
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount second  
        Foo componentDidMount first  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentWillUnmount  
        Foo getDerivedStateFormProps {children: "first"} {}  
        Foo render first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentDidMount first  
        Foo getDerivedStateFormProps {children: "second"} {}  
        Foo render second  
        Foo getDerivedStateFormProps {children: "third"} {}  
        Foo render third  
        Foo componentWillUnmount
        ...

        - key는 해당 컴포넌트의 랜더 사이의 값을 유지하기 위한 식별자

  \*Component Lifecycle
  ![스크린샷 2021-09-27 오후 3 33 35](https://user-images.githubusercontent.com/84524514/134856292-b5fd8f78-181f-4b49-8919-ba19e0ae5d1e.png)

- setState와 함께 일어나는 일

  - 아무런 대책을 세우지 않았을 때

    ```js
    class Person extends React.Component {
      render() {
        console.log("Person render");

        const { name, age } = this.props;
        return (
          <ul>
            {name} / {age}
          </ul>
        );
      }
    }

    class App extends React.Component {
      state = {
        text: "",
        persons: [
          { id: 1, name: "Mark", age: 37 },
          { id: 2, name: "Anna", age: 26 },
        ],
      };
      render() {
        console.log("App render");
        const { text, persons } = this.state;
        return (
          <div>
            <input type="text" value={text} onChange={this._change} />
            <button onClick={this._click}>click</button>
            <ul>
              {persons.map((p) => (
                <Person {...p} key={p.id} />
              ))}
            </ul>
          </div>
        );
      }

      _change = (e) => {
        this.setState({
          ...this.state,
          text: e.target.value,
        });
      };

      _click = () => {
        console.log(this.state.text);
      };
    }
    ```

    - App render  
      Person render  
      Person render  
      // 키 입력 시, 모든 과정이 반복

  1. shouldComponentUpdate

     ```js
     class Person extends React.Component {
       shouldComponentUpdate(previousProps) {
         for (const key in this.props) {
           if (previousProps[key] !== this.props[key]) {
             return true;
           }
         }
         return false;
       }
       render() {
         console.log("Person render");

         const { name, age } = this.props;
         return (
           <ul>
             {name} / {age}
           </ul>
         );
       }
     }

     class App extends React.Component {
       state = {
         text: "",
         persons: [
           { id: 1, name: "Mark", age: 37 },
           { id: 2, name: "Anna", age: 26 },
         ],
       };
       render() {
         console.log("App render");
         const { text, persons } = this.state;
         return (
           <div>
             <input type="text" value={text} onChange={this._change} />
             <button onClick={this._click}>click</button>
             <ul>
               {persons.map((p) => (
                 <Person {...p} key={p.id} />
               ))}
             </ul>
           </div>
         );
       }

       _change = (e) => {
         this.setState({
           ...this.state,
           text: e.target.value,
         });
       };

       _click = () => {
         console.log(this.state.text);
       };
     }
     ```

     - App render  
       Person render  
       Person render  
       // 키 입력 시, App render만 반복

  2. PureComponent

     ```js
     class Person extends React.PureComponent {
       render() {
         console.log("Person render");

         const { name, age } = this.props;
         return (
           <ul>
             {name} / {age}
           </ul>
         );
       }
     }

     ...
     ```

     - App render  
       Person render  
       Person render  
       // 키 입력 시, App render만 반복

  - 주의 사항({() => {}})

    ```js
    ...

    class App extends React.Component {
      state = {
        text: "",
        persons: [
          { id: 1, name: "Mark", age: 37 },
          { id: 2, name: "Anna", age: 26 },
        ],
      };
      render() {
        console.log("App render");
        const { text, persons } = this.state;
        return (
          <div>
            <input type="text" value={text} onChange={this._change} />
            <button onClick={this._click}>click</button>
            <ul>
              {persons.map((p) => (
                <Person {...p} key={p.id} onClick={() => {}} />
              ))}
            </ul>
          </div>
        );
      }

      _change = (e) => {
        this.setState({
          ...this.state,
          text: e.target.value,
        });
      };

      _click = () => {
        console.log(this.state.text);
      };
    }
    ```

    - App render  
      Person render  
      Person render  
      // 키 입력 시, 모든 과정이 반복  
      // onClick 함수가 props에 매번 새로 만들어서 들어감

    ```js
      ...

      class App extends React.Component {
        state = {
          text: "",
          persons: [
            { id: 1, name: "Mark", age: 37 },
            { id: 2, name: "Anna", age: 26 },
          ],
        };
        render() {
          console.log("App render");
          const { text, persons } = this.state;
          return (
            <div>
              <input type="text" value={text} onChange={this._change} />
              <button onClick={this._click}>click</button>
              <ul>
                {persons.map((p) => (
                  <Person {...p} key={p.id} onClick={this.toPersonClick} />
                ))}
              </ul>
            </div>
          );
        }

        _change = (e) => {
          this.setState({
            ...this.state,
            text: e.target.value,
          });
        };

        _click = () => {
          console.log(this.state.text);
        };

        toPersonClick = () => {};
      }
    ```

    - App render  
      Person render  
      Person render  
      // 키 입력 시, App render만 반복

  3. Function Component

     ```js
     const Person = React.memo((props) => {
       console.log("Person render");

       const { name, age } = props;
       return (
         <ul>
           {name} / {age}
         </ul>
       );
     });

     function App() {
       const [state, setState] = React.useState({
         text: "",
         persons: [
           { id: 1, name: "Mark", age: 37 },
           { id: 2, name: "Anna", age: 26 },
         ],
       });

       const toPersonClick = React.useCallback(() => {}, []);

       const { text, persons } = state;

       return (
         <div>
           <input type="text" value={text} onChange={change} />
           <button onClick={click}>click</button>
           <ul>
             {persons.map((p) => (
               <Person {...p} key={p.id} onClick={toPersonClick} />
             ))}
           </ul>
         </div>
       );

       function change(e) {
         setState({
           ...state,
           text: e.target.value,
         });
       }

       function click() {
         console.log(state.text);
       }
     }
     ```

     - App render  
       Person render  
       Person render  
       // 다시 랜더가 일어나지 않음  
       // React.memo는 PureComponent처럼 사용  
       // React.useCallback은 함수의 반복을 막아줌

#### React.createPortal

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div id="modal"></div>
  </body>
</html>
```

```css
/* src/index.css */
body {
  ...;
}

#modal {
  position: absolute;
  top: 0;
  left: 0;
}
```

```js
// src/components/Modal.jsx
import ReactDOM from "react-dom";

const Modal = ({ children }) => ReactDOM.createPortal(children, document.querySelector("#modal"));

export default Modal;
```

```js
// src/App.js
import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [visible, setVisible] = useState(false);

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={open}>open</button>
      {visible && (
        <Modal>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,.5)",
            }}
            onClick={close}
          >
            Hello
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
```

#### React.forwardRef

- DOM 에 refs 전달하기

```js
// MyInput.jsx
import React from "react";

export default React.forwardRef(function MyInput(props, ref) {
  return (
    <div>
      <p>My input</p>
      <input ref={ref} />
    </div>
  );
});
```

```js
// App.js
import { useRef } from "react";
import MyInput from "./MyInput";

function App() {
  const myInputRef = useRef();

  const click = () => {
    console.log(myInputRef.current.value);
  };

  return (
    <div>
      <MyInput ref={myInputRef} />
      <button onClick={click}>send</button>
    </div>
  );
}

export default App;
```

## Today's takeaway

- 오전에는 페어에게 React Twittler Advanced 코드를 설명하는 시간을 가졌다. 이제 코드를 설명하는 능력도 많이 향상되었다.
- 오후에는 Fastcampus 강의를 들고, HA를 대비하여 지금까지 배웠던 React를 WIL에 총정리하였다.
- 리액트를 배우면서 리액트뿐만 아니라 최적화나 중복 데이터의 관리 등 기본적인 프로그래밍 방식들도 배울 수 있었다.

## Tomorrow I'll learn

- 내일 오전에는 solo review를 진행하고, 오후에는 Hiring Assessments(React)를 진행한다. 사전에 보았던 예시로는 기본적인 라우팅 문제여서 크게 긴장되지는 않는다.
