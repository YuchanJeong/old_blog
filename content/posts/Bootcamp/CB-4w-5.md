---
title: "BC-4w-5 / [React] props, state"
date: 2021-09-17
categories:
  - "'Bootcamp'"
tags:
  - React
---

# Today I learned

### React props & state

- props

  - 외부에서 전달받은 값
  - 객체 형태
  - 읽기 전용

  ```js
  function Parent() {
    return (
      <div className="parent">
        <h1>I'm the parent</h1>
        <Child text={"I'm the eldest child"} />  // props 입력
        <Child text={"I'm the youngest child"} />
      </div>
    )
  }

  function Child(props) {   // props 전달
    return (
      <div className="child">
        <p>{props.text}<p>  // props 랜더링
      </div>
    )
  }
  ```

- state

  - 내부에서 변화하는 값
  - Ex.
    - On/Off -> { isOn: true|false }
    - Counter -> { count: n }

  ```js
  // useState 불러옴
  import React, { useState } from "react";

  function CheckboxExample() {
    // const [state 저장 변수, state 갱신 함수] = useState(상태 초기 값)
    // state 변수는 React 함수가 끝나도 남아있음
    const [isChecked, setIsChecked] = useState(false);
    // same with
    // const stateHookArray = useState(false)
    // const isChecked = stateHookArray[0]
    // const setIsChecked = stateHookArray[1]
  }

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="App">
      <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      <span>{isChecked ? "Checked!!" : "Unchecked"}</span>
    </div>
  );

  // state는 상태 변경 함수 호출로 변경해야 함(강제로 변경을 시도하면 안됨)
  ```

- 이벤트 처리

  - React에서 이벤트는 소문자 대신 카멜 케이스(camelCase)를 사용
  - JSX를 사용하여 문자열이 아닌 함수로 이벤트 처리 함수(Event handler)를 전달

  ```js
  function NameForm() {
    const [name, setName] = useState("");

    const handleChange = (event) => {
      setName(event.target.value);
    };

    return (
      <div>
        <input type="text" value={name} onChange={handleChange}></input>
        <button onClick={alert(name)}>Button</button>
        <h1>{name}</h1>
      </div>
    );
  }
  ```

  ```js
  function App() {
    const [showPopup, setShowPopup] = useState(false);

    // !로 boolean on/off
    const togglePopup = (event) => {
      setShowPopup(!showPopup);
    };

    return (
      <div className="App">
        <h1>Fix me to open Pop Up</h1>
        <button onClick={togglePopup} className="open">
          Open me
        </button>
        {showPopup ? (
          <div className="popup">
            <div className="popup_inner">
              <h2>Success!</h2>
              <button className="close" onClick={togglePopup}>
                Close me
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  ```

- Controlled Component

  - React가 state를 통제할 수 있는 컴포넌트

  ```js
  export default function App() {
    const [username, setUsername] = useState("");
    const [msg, setMsg] = useState("");

    return (
      <div className="App">
        <div>{username}</div>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="여기는 인풋입니다." className="tweetForm__input--username"></input>
        <div>{msg}</div>
        <textarea placeholder="여기는 텍스트 영역입니다." className="tweetForm__input--message" onChange={(event) => setMsg(event.target.value)} value={msg}></textarea>
      </div>
    );
  }
  ```

- React 데이터 흐름
  - 컴포넌트를 만들고, 조립해서 페이지를 만듦(상향식)
  - 컴포넌트는 단일 책임 원칙(하나의 컴포넌트는 하나의 일만 담당)
  - 데이터는 위에서 아래로 흐름(props)(하향식) -> 단방향 데이터 흐름(one-way data flow)
  - 상태(state)는 최소화하는 것이 좋음
    - 부모로부터 props를 통해 전달됨
    - 시간이 지나도 변하지 않음
    - 컴포넌트 안의 다른 state나 props를 가지고 계산 가능함
  - 하나의 상태를 기반으로 두 컴포넌트가 영향을 받는다면 이때는 공통 소유 컴포넌트를 찾아 그곳에 상태를 위치해야 함

### React Twittler State & Props

- 데이터는 하향식 전달, props는 상위의 데이터를 하위에 전달할 때 사용
- state는 시용자의 입력에 따라 변하는 값을 처리할 때, 이벤트 함수와 함께 useState로 훅을 걸어서 사용
- React.Fragment
  - React는 하나의 컴포넌트 만을 리턴할 수 있기 때문에 오픈, 클로즈 태그가 반드시 필요. 이때, React.Fragment로 감싸주면 쓸데없는 태그가 안 생긴다. 또한 map()을 사용할 때, key 값을 여기에 넣어줄 수 있다. <></>로 단축 사용도 가능하다.
- My Page

  - 과제를 끝내고 나서 다시 둘러보니 MyPage 부분이 마음에 들지 않았다. MyPage는 내가 작성한 글만 보여주는 것인데, 미리 정보가 입력되어있는 dummyData에서 정보를 끌어왔다. 그래서 내가 Tweet 부분에서 새로 만든 state가 반영되지 않았다. 하향식 단방향 데이터 흐름을 지닌 React에서는 데이터를 형제 요소에게 보내는 것이 힘들었다. 잠시 생각해보니 반대로 부모 요소가 데이터를 가지고 있으면 해결될 문제였다. 그래서 부모 요소인 App에서 Hook(useState)을 걸어, 그 state와 setState를 하위 요소로 props로 보내서 사용하였다.

    ```js
    // App.js
    const [tweets, setTweets] = useState(dummyTweets);
    const [username, setUsername] = useState("parkhacker");
    const [msg, setMsg] = useState("");

    // Tweets.js
    const handleButtonClick = () => {
      const tweet = {
        id: props.tweets.length + 1,
        username: props.username,
        picture: "https://randomuser.me/api/portraits/men/98.jpg",
        content: props.msg,
        createdAt: Date(),
        updatedAt: Date(),
      };
      props.setTweets([tweet, ...props.tweets]);
    };
    const handleChangeUser = (event) => {
      props.setUsername(event.target.value);
    };
    const handleChangeMsg = (event) => {
      props.setMsg(event.target.value);
    };

    // MyPage.js
    const filteredTweets = props.tweets.filter((item) => item.username === props.username);
    ```

  - 추가로 MyPage의 필터를 사용자가 입력한 props.username으로 하였는데 이때, username만 바꾸고 tweet을 보내지 않은 다음에 마이페이지를 누르면 에러가 났다(아직 입력되어있는 username은 정보를 전혀 가지고 있지 않아서). 그래서 초기값을 삼항 연산자를 이용해 정해주었다.

    ```js
    const profile = filteredTweets.length !== 0 ?
        filteredTweets[0].picture
        : 'https://randomuser.me/api/portraits/men/98.jpg'​
    ```

- Advanced

  - 필터 구현하기

    ```js
    const [filter, setFilter] = useState("none")
    const handleChangeFilter = (event) => {
      setFilter(event.target.value)
    }
    // selector에 중복되는 유저 이름이 모두 보여서, lodash의 uniqBy로 중복 요소 제거
    const filterArr = _.uniqBy(props.tweets, "username")

    ...

    <div className="tweet__selectUser">
      <select onChange={handleChangeFilter}>
        <option value="none">-- click to filter tweets by username --</option>
        {filterArr.map(item => (
          <option value={item.username}>{item.username}</option>
        ))}
      </select>
    </div>
    <ul className="tweets">
      {props.tweets.filter(item =>
        filter === "none"
          ? item === item
          : item.username === filter
        ).map(item => (
          <Tweet
            tweet={item}
            key={item.id}
          />
        )
      )}
    </ul>
    ```

  - 트윗 삭제

    ```js
    // Tweet.js
      const  handleButtonRemove = (event) => {
        console.log(props.tweets)
        props.setTweets(props.tweets.filter(item =>
          item.id !== Number(event.target.dataset.id)
        ))
        // 삭제 후 트윗을 작성했을 때, id가 중복되는 문제
        // bcs, 새 트윗을 작성할 때 트윗의 length + 1을 해서
        // 삭제할 때, id를 재설정해서 해결
        for (let i = 0; i < props.tweets.length; i++) {
          props.tweets[i].id = i
        }
      }

      ...

      <i
        // id와 event의 target을 매칭 문제는 data attribute로 해결
        data-id={props.tweet.id}
        onClick={handleButtonRemove}
        className="far fa-trash-alt"
      ></i>​
    ```

# Today's takeaway

- 전체적인 구조와 흐름을 아는 것이 많은 도움이 되었다. 문제가 생겼을 때 흐름을 통해 해결법을 쉽게 찾을 수 있었다.
- props는 상위 컴포넌트에서 하위 컴포넌트로 데이터를 넘겨주고, state는 컴포넌트 내에서 사용자의 입력에 따라 데이터를 변경할 수 있다. 상위 컴포넌트에서 hook(useState)을 사용하고 props를 사용하여 하위 컴포넌트에서 state를 이벤트를 이용해서 사용하면, 상향식 데이터 흐름처럼 보이게 사용할 수 있다.

# Weekend I'll learn

- 이때까지 공부했던 내용들을 총 복습하며 문제도 다시 다 풀어보고, 블로그와 WIL도 정비할 것이다.
- 패스트 캠퍼스 프론트 앤드 강의를 가능한데까지 볼것이다. 최소한 React와 관련된 부분은 다 볼것이다.
