---
title: "BC-4w-3 / [React] Intro + <FC> React(1)"
date: 2021-09-15
categories:
  - "'Bootcamp'"
tags:
  - React
---

## Today I learned

### React Intro

- React

  - 프런트 엔드 개발을 위한 JS 오픈소스 라이브러리
  - 선언형
    - 하나의 파일에 명시적으로 작성(JSX 활용)
  - 컴포넌트 기반
    - 컴포넌트는 하나의 기능 구현을 위해 여러 코드를 묶어둔 것(독립적, 재사용 가능)
  - 범용성
    - JS 프로젝트 어디든 유연하게 적용 가능(프레임 워크(Ex. angular)는 생태계에 존속)

- JSX

  - JavaScript + XML
  - DOM: HTML+CSS+JS  
    React DOM: CSS+JSX
  - 오프닝 태그와 클로징 태그로 감싸야 함
  - CSS class 속성은 className으로 표기(class는 JS 클래스로 인식)
  - JS 표현식 사용 시, 중괄호({}) 이용
  - React 요소를 JSX로 작성 시, 대문자로 시작(사용자 정의 컴포넌트)
  - 조건부 렌더링은 if 문이 아닌 삼항 연산자 사용
  - React에서 여러 개의 HTML 요소를 표시할 때는, map() 사용(반드시 "key(고유한 id 값)" JSX 속성을 넣어야 함)

  ```js
  const posts = [
    { id: 1, title: "Hello World", content: "Welcome to React!" },
    { id: 2, title: "Installation", content: "Install React" },
    { id: 3, title: "Practice", content: "Practice React" },
  ];

  // JSX 요소(컴포넌트)는 대문자로 시작
  export default function Blog() {
    // {JS 표현식}
    // map으로 요소 나열( .map(() => ()) )
    const blogs = posts.map((post) => (
      // 오프닝 태그, key 값<h3>{post.title}</h3>
      <div key={post.id}>
        <p>{post.content}</p>
      </div>
    ));
    // className
    return <div className="post-wrapper">{blogs}</div>;
  }
  ```

- Create React App

  - SPA를 쉽고 빠르게 만들 수 있도록 만들어진 툴 체인
  - npx create-react-app 폴더명

- Font Awesome

  - npm i @fortawesome/fontawesome-svg-core
  - npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
  - npm i @fortawesome/react-fontawesome

  ```js
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
  import { faCamera } from "@fortawesome/free-solid-svg-icons"

  export default () =>
    <FontAwesomeIcon icon={faCamera} className="fas faCamera" />​
  ```

  \*[props link](https://codesandbox.io/s/react-font-awesome-b6vxt?from-embed=&file=/src/components/AnimatingIcons.js)

### React Twittler Intro

```js
// index.js
import React from "react"; // 리액트 컴포넌트 만들기
import ReactDOM from "react-dom"; // 리액트 컴포넌트 -> HTML
import App from "./App"; // App.js -> index.js

// HTML에 연결
ReactDOM.render(<App />, document.getElementById("root"));
```

```js
// App.js
import React from "react"; // React 컴포넌트 만들기
import "./App.css"; // CSS 연결

import { dummyTweets } from "./static/dummyData";

// Footer 컴포넌트
const Footer = () => {
  return <footer>Copyright 2021</footer>;
};

/ Tweets 컴포넌트
const Tweets = () => {
  return (
    // map()으로 반복 요소 처리
    <ul className="tweets">
      {dummyTweets.map((tweet) => {
        const isParkHacker = tweet.username === "parkhacker";
        const tweetUserNameClass = isParkHacker
          ? "tweet__username tweet__username--purple"
          : "tweet__username";

        return (
          <li className="tweet" key={tweet.id}>
            <div className="tweet__profile">
              <img src={tweet.picture}></img>
            </div>
            <div className="tweet__content">
              <div className="tweet__userInfo">
                <span className={tweetUserNameClass}>{tweet.username}</span>
                <span className="tweet__createdAt">{tweet.createdAt}</span>
              </div>
              <div className="tweet__message">{tweet.content}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// App 컴포넌트
const App = () => {
  return (
    <div className="App">
      <Tweets />
      <Features />
    </div>
  );
};

// 컴포넌트들 한 번 이상 export 해줘야 함
export { App, Tweets, Footer };
```

### + React with FastCampus(1)

- React basic

  - 엥귤러는 프레임 워크, 뷰는 중간, 리엑트는 라이브러리
  - 컴포넌트는 특정 기능을 하는 사용자 정의 태그
  - Virtual DOM으로 이전 상태와 이후 상태를 비교하여, 바뀐 부분을 자동으로 바꿈  
    (State Change -> Compute Diff -> Re-render)
  - Client Side Rendering(CSR)
    - JS 전부 다운되기 전까지 화면 보이지 않음(사용 불가능)
  - Server Side Rendering(SSR)
    - JS 전부 다운되기 전에 일부 화면 볼 수 있음(사용 불가능)

  ```js
  import React from "react"; // 리액트 컴포넌트 만들기
  import ReactDOM from "react-dom"; // 리액트 컴포넌트 -> HTML
  import "./index.css";
  import App from "./App";
  import reportWebVitals from "./reportWebVitals";

  // 시작 함수, 리액트 컴포넌트를 연결
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    // 실제 DOM(HTML)
    document.getElementById("root")
  );

  reportWebVitals();
  ```

## Today's takeaway

- 리엑트를 공부하였다. 아직 많이 낯설다. 하지만 직관적이라 익숙해지면 웹을 훨씬 쉽고 이쁘게 꾸밀 수 있을 거 같다.
- 따로 강의를 추가로 들으면서 따라가고 있다. 어드벤스 과제에서 아직 배우지 않는 내용을 이용해야해서 매우 힘들었다.
- 직접 실습하며 계속해서 구조를 만져보고 있는 중이라 따로 정리할 시간이 부족했다.

## Tomorrow I'll learn

- React Router에 대해 배울 것이다.
- 라우팅은 다른 주소에 다른 화면을 보여주는 것이다.
