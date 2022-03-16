---
title: "BC-4w-6 / 4주 차 정리 + <FC> React(3)"
date: 2021-09-18
categories:
  - "'Bootcamp'"
tags:
  - React
  - Retrospect
---

## 4주 차 정리

- 월요일에는 DOM의 이벤트에 대해 배우고, 혼자서 TypeScript를 학습하였다. 작성 중 실시간으로 에러에 대한 정보를 알려주니 너무 좋았다. JavaScript는 컴파일 전까지 혹은 컴파일 후에도 에러 상황이 생기기 전까지는 에러에 대해서 알 수가 없어서 뒤늦게 에러를 발견하는 상황이 자주 생겼었다.
- 화요일에는 고차 함수를 배웠는데 어떤 상황에 어떤 배열 메소드를 사용해야 하는지를 익힐 수 있었다. 대표적으로 map()은 새로운 배열을, filter()는 기존 배열의 일부를, reduce()는 하나의 결괏값을 얻기 위해 사용한다.
- 수요일부터는 리액트를 배웠다. 처음에는 낯설어 적응하는 데 시간이 걸렸으나 적응하고 나니 신세계였다. 직관적이고 좀 더 간편하게 기능을 구현할 수 있었다. 전체적인 구조도 학습하면서 익히고 나니 데이터의 흐름이 한눈에 들어왔다. 고차 함수 때도 느꼈지만 각 기능들을 왜 사용하는지 목적을 아는 게 매우 중요했다. state는 사용자의 입력에 따라 변하는 데이터를 다루기 위해, props는 상위 컴포넌트의 데이터를 하위 컴포넌트로 전달하기 위해 사용한다.
- 기능을 이해하는 것 이상으로 사용 이유를 아는 것이 중요했다.

## + React with FastCampus(3)

#### React Component

- JSX

  - 바벨은 우리가 작성한 JSX코드를 순수하게 실행 가능한 자바스크립트로 바꿔줌
  - 가독성이 좋고, 컴파일 과정에서 문법적 오류를 인지하기 쉬워서 사용
  - 컴포넌트 내부 문법
    - 최상위 요소는 하나여야 함. 그래서 openTag와 closedTag 필수
    - 최상위 요소를 리턴하는 경우, ()로 감싸야함
    - 자식들을 바로 랜더링 하고 싶으면, <>자식들</> 사용 <- Fragment
    - {표현식}
    - if문은 사용할 수 없어서, 삼항 연산자나 && 사용
    - class 대신 className
    - 자식 요소가 있으면 꼭 닫아야 하고 없으면 열면서 닫아야 함
      - Ex. \<p>자식들\</p>, \<p />

- props와 state

  - props컴포넌트 외부에서 컴포넌트에 주는 데이터
  - state는 컴포넌트 내부에서 변경할 수 있는 데이터
  - 둘 다 변경이 일어나면, 랜더를 다시 할 수 있음
  - Render 함수는 props와 state를 바탕으로 컴포넌트를 그림

    ```js
    // props
    props === { message: "Hello", name: "Yuchan" }
    const Component = (props) => {
      return (
        <div>
          <h1>{props.message}</h1>
        </div>
      )
    }

    Component.defaultProps = { message="No message" name=":(" }

    const ParentComponent = () => (
      <FunctionComponent
        message="Hello"
        name="Yuchan"
      />
    )​
    ```

  - state는 훅을 걸어야지 함수 컴포넌트에서 사용 가능. 직접 바꾸면 안 되고 set함수의 인자로 변경될 값을 넣어야 함

- Event Handling

  - camelCase로 사용
    - Ex. onClick, onMouseEnter
  - 이벤트={함수} 형태
  - 실제 DOM 요소에만 사용 가능

    ```js
    const Component = () => {
      <div>
        <button
          onClick={() => {
            console.log("clicked");
          }}
        >
          클릭
        </button>
      </div>;
    };
    ```

- Component Lifecycle

  - 리액트 컴포넌트는 여러 지점에서 메소드를 오버 라이딩할 수 있게 해 줌
  - Declarative(선언적)

    ```js
    // 1. 컴포넌트 생성 및 마운트
    // (1) constructor
    // (2) getDerivedStateFromProps
    // (3) render
    // (3) componentDidMount


    // 2. 컴포넌트 props, state 변경
    // (0) props에 state가 의존할 때 사용(with setState)
    static getDerivedStateFromProps(nextProps, preState) {
      return nextState
    }
    // (1)
    componentDidMount() {}
    // (2)
    shouldComponentUpdate(nextProps, nextState) {
      return true 랜더 진행 | false 랜더 안함
      // default는 true
    }
    // (3) render()
    // (4)
    getSnapshotBeforeUpdate(prevProps, prevState) { return snapShot }
    // (5)
    componentDidUpdate(prevProps, prevState, snapShot) {}


    // 3. 정리할 내용 정리
    // componentWillUnmount() {
    // Ex. clearInterval(this.interval)
    // }
    ```

    ```js
    // getSnapshotBeforeUpdate(prevProps, prevState) { return 저장되는 스냅 샷 }
    let i = 0
    const list = document.querySelector("#liust")

    class App extends React.Component {

      state = { list: [] }

      render() {
        return (
          <div id="list" style={{ height: 100, overflow: "auto" }}>
            {this.state.list.map(i => {
              return <div>{i}
            })}
          </div>
        )
      }

      componentDidMount() {
        setInterval(() => {
          this.setState(state => ({
            list: [...state.list, i++]
          }))
        })
      }

      getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevState.list.length === this.state.list.length) return null
        return list.scrollHeight - list.scrollTop
      }

      componentDidUpdate(prevProps, prevState, snapShot) {
        if (snapshot === null) return
        list.scrollTop = list.sctollHeight - snapShot
      }
    }
    ```

    ```js
    // componentDidCatch() {}
    class App extends React.component {
      state = { hasError: false };

      render() {
        if (this.state.hasError) {
          return <div>에러 발생</div>;
        }
        return <WebService />;
      }

      componentDidCatch(error, info) {
        this.setState({ hasError: true });
      }
    }
    // Error Boundaries(library)를 최상위 부보로 만들어야함​
    ```

#### Create React App

- Create React App
  - npx create-react-app 폴더명
  - npm run start
  - npm run build
  - npx serve -s build
  - npm run test
  - ~~npm run eject~~
- eslint & prettier
  - "eslintConfig": {  
         "extends": \[  
          "react-app",  
          "react-app/jest",  
          // "prettier"  // 충돌을 피하기 위해, prettier 확장 안 쓸 때  
        \]  
      },
- husky
  - npm i husky -D
  - npx husky install
  - "script": {  
      "prepare": "husky install"  // 패키지 재설치 시 install 해주려고  
    },
  - npx husky add .husky/pre-commit "npx lint-staged"
- lint-staged(Run linters on git staged files)
  - npm i lint-staged -D
  - "lint-staged": {  
      "\*\*/\*.js": \[  
        "eslint --fix",  
        "git add"  
      \]  
    },  
    // prettier안쓰면 개발 의존성으로 설치하고, "prettier --write" 추가

#### React Router

- Single Page Application
- React Wep App을 다운 받고, 주소에 따른 컴포넌트를 라우터로 보여줌
- npm i react-router-dom

- Routing

  1.  특정 경로에서 보여줄 각각의 컴포넌트 제작
  2.  \<BrowserRouter>\<App />\</BrowserRouter>
  3.  \<Switch>\<Route exact path="/..." component={...} />\</Switch>  
      \*Switch는 순서 데로라 exact 꼭 필요하지는 않음  
      \*더 넓은 범위를 더 아래에 두고 루트 경로(/)는 exact사용 후 Not Found 컴포넌트 젤 아래에  
      \*경로 없이 Not Found 컴포넌트 제일 아래에 두면 됨
  4.  \<Link to="/...">\</Link>  
      \<NavLink  
          exact to="/..."  
          activeClass="active"  
          activeStyle={ color: "red" }  
          isActive={(match, location) => {  
              return match !== null && location.search === ""  
          }}  
      \>\</NavLink>

- Dynamic Routing

  ```js
  <Route exact path="/profile/:userId" component={Profile} />
  <Route exact path="/about" component={About} />

    export default function Profile(props) {
            const userId = props.match.params.userId
            return (
              <div>
                <h2>Profile 페이지입니다.</h2>
                {userId && <p>userId는 {userId}입니다.</P>}
             </div>
            )
          }
  ```

  ```js
    // (npm i query-string)
    import queryString from "query-string"
          export default function About(props) {
            const searchPar ams = props.location.search
            const query = queryString.parse(searchParams)
            return (
              <div>
                <h2>About 페이지입니다.</h2>
                {query.name && <p>name은 {query.name}입니다.</p>}
              </div>
            )
    // /about?name=Yuchan
  ```

- HOC(Higher-Order Component)

  - 몇 단계 위의 props에 접근

  ```js
  import { withRouter } from "react-router-dom";
  export default withRouter(function LoginButton(props) {
    function login() {
      // 추가 공부: history 객체 안의 속성 보기
      props.history.push("/");
    }
    return <button onClick={login}>로그인</button>;
  });
  ```

- Redirect

  ```js
  import { Route, Redirect } from "react-router-dom";
  const isLogin = true
    <Route
      path="/login"
      render={() => isLogin ? <Redirect to="/" /> : <Login />}
    />
  ```
