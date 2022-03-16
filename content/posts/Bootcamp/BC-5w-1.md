---
title: "BC-5w-추석(1) / <FC> React(4)"
date: 2021-09-24
categories:
  - "'Bootcamp'"
tags:
  - React
---

# React with FastCampus(4) Style

## Style Loaders

- loader in webpack

## CSS, SASS

- 스타일이 전역적으로 순서만 다르게 들어가서,  
  클래스명이 오염되지 않게 주의해야 함
- import './App.css',
  - 대표적으로 BEM 작명법
- import './App.sass'
  - 상위 요소의 스코프 안에 하위 요소의 스타일 넣음
  - CSS에서 좀 더 문법적인 요소 가미

## CSS module, SASS module

- 스코프 오염을 막기 위해 사용

- import styles from "./App.module.css"

  - {  
     App: "App_App\_\_16ZpL",  
     App-logo: "App_App-logo\_\_25k4o",  
     App-logo-spin: "App_App-logo-spin\_\_1e7sv",  
     App-header: "App_App-header\_\_xLkWl",  
     App-link: "App_App-link\_\_3FsH9"  
    }
  - 오염되지 않게 실제 클래스명은 value로 저장
  - className={styles.App}

- classNames 라이브러리

  - npm i classNames
  - classNames("class1", "class2", ...)
  - classNames({ class1: true }, { class2: false }, ...)

    - falsy 한 값은 적용 X

  ```js
  import styles from "./App.module.css";
  import classNames from "classnames/bind";

  const cx = classNames.bind(styles);

  console.log(cx.App); // -> "App_App__16ZpL"

  class App extends React.Component {
    state = {
      loading: false,
    };
    render() {
      const { loading } = this.state
      return (
        <button
          onClick={this.startLoading}
          className={cx("button", { loading: loading })}
          {...this.props}
        />
      );
    }
    const startLoading = () = {
      ...
    }
  }
  ```

## Styled Components

- npm i styled-components
- 스코프 오염을 막기 위해 사용
- 템플릿 스트링

  - 문자열 안에 쓰는 거라 오류 감지 안됨

  ```js
  //StyledButton.jsx
  import styled, { css } from "styled-components";

  const StyledButton = styled.button`
    background: transparent;
    border: 2px solid palevioletred;
    color: palevioletred;
    ${(props) =>
      props.primary &&
      css`
        background: palevioletred;
        color: white;
      `}
  `;

  export default StyledButton`
  `;
  ```

  ```js
  // StyledA.js
  import styled from "styled-components";

  const StyledA = styled.a.attrs((props) => ({
    target: "_BLANK",
  }))`
    color: ${(props) => props.color};
  `;

  export default StyledA;
  ```

  ```js
  //App.js
  import StyledButton from "./components/StyledButton";
  import styled, { createGlobalStyle } from "styled-components";

  const PrimaryStyledButton = styled(StyledButton)`
    background: palevioletred;
    color: white;
  `;

  const UppercaseButton = (props) => <button {...props} children={props.children.toUpperCase()} />;

  const MyButton = (props) => <button {...props} children={`MyButton ${props.children}`} />;

  const StyledMyButton = styled(MyButton)`
    background: transparent;
    border: 2px solid ${(props) => props.color || "palevioletred"};
    color: palevioletred;

    :hover {
      border: 2px solid red;
    }

    ::before {
      content: "@";
    }
  `;

  const GlobalStyle = createGlobalStyle`
    button {
      border-radius: 10px;
    }
  `;

  function App() {
    return (
      <div className="App">
        <GlobalStyle />
        <StyledButton>버튼</StyledButton>
        <StyledButton primary>버튼</StyledButton>
        <PrimaryStyledButton>버튼</PrimaryStyledButton>
        <StyledButton as="a" href="/">
          버튼
        </StyledButton>
        <StyledButton as={UppercaseButton}>button</StyledButton>
        <StyledMyButton>button</StyledMyButton>
        <StyledMyButton color="green">button</StyledMyButton>
        <StyledA href="https://google.com">태그</StyledA>
      </div>
    );
  }
  export default App;
  ```

  - output  
    ![스크린샷 2021-09-25 오전 11 21 37](https://user-images.githubusercontent.com/84524514/134754762-dd049ed4-9aeb-4f69-a020-5fd7ad685f19.png)

## React Shadow

- npm i react-shadow
- 원래 HTML에 영향을 주지 않는 별도의 HTML
- 스코프 오염을 막기 위해 사용
- 전역 스타일이 불가능함

  ```js
  import root from "react-shadow";

  const styles = `
    .App {
      text-align: center;
    }
  
    .App-header {
      background-color: #282c34;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: white;
    }
  
    .App-link {
      color: #61dafb;
    }
  `;

  function App() {
    return (
      <root.div>
        <div className="App">
          <header className="App-header">
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
          </header>
        </div>
        <style type="text/css">{styles}</style>
      </root.div>
    );
  }

  export default App;
  ```

## [Ant Design](https://ant.design)

- npm i antd
  - import "antd/dist/antd.css
    - 전역 스타일 추가 in index.js
  - import { ... } from 'antd'  
    import 'antd/es/.../style/css
    - 컴포넌트 스타일 추가
- npm install --save @ant-design/icons

  - import { ... } from "@ant-design/icons";  
    <... />

- import { Row, Col } from "antd";

  - \<Col span={24 중에 차지할 비중 정수}>

    ```js
    import { Row, Col } from "antd";

    const colStyle = () => ({
    height: 50,
    backgroundColor: "red",
    opacity: Math.round(Math.random() \* 10) / 10,
    });

    function App() {
    return (
    <div classNAme="App">
      <Row>
        <Col span={24} style={colStyle()} />
      </Row>
      <Row>
        <Col span={12} style={colStyle()} />
        <Col span={12} style={colStyle()} />
      </Row>
      <Row>
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
      </Row>
    </div>
    );
    }

    export default App;
    ```

    - output
      ![스크린샷 2021-09-25 오후 12 34 47](https://user-images.githubusercontent.com/84524514/134756498-d36adedd-8f02-443d-9959-1cd181b24760.png)

  - \<Row gutter={16 + 8n 의 정수}>
  - \<Col offset={24 중 건너띄고 싶은 정수}>

    ```js
    import { Row, Col } from "antd";

    const MyCol = ({ span, offset }) => (
      <Col span={span} offset={offset}>
        <div
          style={{
            height: 50,
            backgroundColor: "red",
            opacity: 0.7,
          }}
        />
      </Col>
    );

    function App() {
      return (
        <div classNAme="App">
          <Row gutter={16}>
            <MyCol span={12} offset={12} />
          </Row>
          <Row gutter={16}>
            <MyCol span={8} />
            <MyCol span={8} offset={8} />
          </Row>
          <Row gutter={16}>
            <MyCol span={6} />
            <MyCol span={6} />
            <MyCol span={6} />
            <MyCol span={6} />
          </Row>
        </div>
      );
    }

    export default App;
    ```

    - output only gutter
      ![스크린샷 2021-09-25 오후 12 56 14](https://user-images.githubusercontent.com/84524514/134757056-8bc3109d-8f34-4539-9c32-3a1fd2b5fec6.png)
    - output
      ![스크린샷 2021-09-25 오후 1 18 08](https://user-images.githubusercontent.com/84524514/134757606-d9a4d3aa-b336-499b-b089-4b0cb933f5b2.png)

  - \<Row justify="좌우정렬" align="위아래정렬">
