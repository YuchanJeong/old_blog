---
title: "BC-4w-4 / [React] Router + <FC> React(2)"
date: 2021-09-16
categories:
  - "'Bootcamp'"
tags:
  - React
---

## Today I learned

### SPA

- 전통적인 웹사이트는 페이지 전체를 로딩
- SPA는 Menu와 Footer와 같이 페이지 전환 전후에 중복되는 부분은 새로 불러오지 않음
- SPA는 무거운 JS 파일을 기다리는 시간으로 인해 첫 화면의 로딩 시간이 길어짐
- SPA는 검색 엔진 최적화(SEO)가 좋지 않음(구글 등이 HTML을 기반으로 자료 수집)

### React Router

- npm i react-router-dom
- 라우팅(Routing)
  - 경로(주소)에 따라 다른 뷰를 보여줌
- \<BrowserRouter>
  - \<App />을 감쌈
- \<Switch>
  - Route를 감쌈
- \<Route>
  - exact 속성은 정확한 주소 매칭
  - path 속성에 경로
- \<Link>
  - to 속성에 path의 경로
- Ex.  
  import { BrowserRouter } from "react-router-dom"  
  import { Switch, Route, Link } from "react-router-dom"

### React Twittler SPA

- index.js

  ```js
  import React from "react";
  import ReactDOM from "react-dom";
  import { BrowserRouter } from "react-router-dom"; // React Router
  import App from "./App";

  ReactDOM.render(
    // 라우터 역할
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
  ```

- App.js

  ```js
  import React from "react";
  import "./App.css";
  import { Switch, Route } from "react-router-dom"; // React Router
  import Navbar from "./Navbar";
  import Tweets from "./Pages/Tweets";
  import MyPage from "./Pages/MyPage";
  import About from "./Pages/About";

  const App = () => {
    return (
      <div className="App">
        <main>
          <Navbar />
          <section className="features">
            // Route를 묶는 Switch
            <Switch>
              {" "}
              // 주소별 경로는 Route
              <Route exact path="/">
                {" "}
                <Tweets />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/mypage">
                <MyPage />
              </Route>
            </Switch>
          </section>
        </main>
      </div>
    );
  };

  export default App;
  ```

- Navbar.js

  ```js
  import React from "react";
  import { Link, NavLink } from "react-router-dom";

  const Navbar = () => {
    return (
      <section className="Navbar">
        {" "}
        // Link는 그냥 연결, NavLink는 특별한 기능 가능
        <Link to="/">
          <i className="far fa-comment-dots"></i>
        </Link>
        <NavLink exact to="/about" activeClassName="selectedPage selectedPage--about">
          <i className="far fa-question-circle"></i>
        </NavLink>
        <NavLink exact to="/mypage" activeClassName="selectedPage selectedPage--mypage">
          <i className="far fa-user"></i>
        </NavLink>
        <i onClick={() => history.back()} className="far fa-arrow-left"></i> // history
      </section>
    );
  };

  export default Navbar;
  ```

- Advanced
  - [History API](https://developer.mozilla.org/ko/docs/Web/API/History_API)
  - [NavLink](https://reactrouter.com/web/api/NavLink)

### + React with FastCampus(2)

- class 컴포넌트

  ```js
  class ClassComponent extends React.Component {
    render() {
      return <div>Hello</div>;
    }
  }
  ```

- function 컴포넌트

  ```js
  // (1)
  function FunctionComponent() {
    return <div>Hello</div>;
  }

  // (2)
  const FunctionComponent = () => <div>Hello</div>;
  ```

- React.createElement

  ```js
  React.CreateElement(
    type, // 태그 이름 문자열 | 리액트 컴포넌트 | React.Fragment
    [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
    [...children] // 자식으로 넣어주는 요소들
  )

  // 1. 태그 이름 문자열 type
  ReactDOM.render(
    React.createElement('h1', null, `type이 "태그 이름 문자열" 입니다.`),
    document.querySelector('#root')
  )

  // 2. 리액트 컴포넌트 type
  const Component = () => (
    React.createElement(
      'p',
      null,
      `type이 "리액트 컴포넌트" 입니다.`
    )
  )
  ReactDOM.render(
    React.createElement(Component, null, null),
    document.querySelector('#root')
  )

  // 3. React.Fragment type
  // 태그가 없이 그냥 children에 요소 넣어줌
  ReactDOM.render(
    React.createElement(
      React.Fragment,
      null,
      `type이 "React Fragment" 입니다.`),
    document.querySelector('#root')
  )

  // 4. 복잡한 리액트 엘리먼트 모임
  ReactDOM.render(
    React.createElement(
      'div',
      null,
      React.createElement(...)), // 여기에 계속 넣어줘야함
    document.querySelector('#root')
  )
  ```

## Today's takeaway

- 오늘은 리액트의 라우터에 대해 배웠다. 어제는 리액트가 낯설어서 매우 힘들었는데 하루 봤다고 오늘은 많이 친해졌다.
- 지난주에 Vanilla JS만 배우고 혼자서 웹페이지를 만들려다 실패한 적이 있다. 해결법을 찾아서 검색했을 때, 대부분이 리액트로 해결하였고, 나는 리액트를 배우는 날을 기다렸다. 오늘 라우터를 배우고 나니 그때 실패하였던 웹페이지를 만들 수 있게 되었다.
- 오늘 리액트를 배우면서 느낀 점은 매우 잘 만들어진 라이브러리라는 것이다. 기능과 구조를 한눈에 파악할 수 있다니, 절친이 될 수 있을 거 같다. 특히 컴포넌트를 하나씩 구성해서 내가 원하는 데로 배치하고, 재활용할 수 있는 점이 매력적이었다.

## Tomorrow I'll learn

- React State & Props
  - 두 객체 모두 렌더링 결과물에 영향을 주는 정보를 갖고 있음
  - props는 함수 매개변수처럼 컴포넌트에 전달
  - state는 함수 내에 선언된 변수처럼 컴포넌트 안에서 관리됨
