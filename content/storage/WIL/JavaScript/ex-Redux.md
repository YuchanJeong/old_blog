---
title: "Redux Example"
showDate: false
showTableOfContents: true
showPagination: false
showAuthor: false
---

### Redux Basic

#### 1) Action

```js
// 1) Action Type 정의
export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const SHOW_ALL = "SHOW_ALL";
export const SHOW_COMPLETE = "SHOW_COMPLETE";

// 2) Action Creator(Action 객체 반환) 작성
export function addTodo(text) {
  return { type: ADD_TODO, text };
  // { type: ADD_TODO, text: "todo" }
}
export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
  // { type: COMPLETE_TODO, index: num }
}
export function showAll() {
  return { type: SHOW_ALL };
  // { type: SHOW_ALL }
}
export function showComplete() {
  return { type: SHOW_COMPLETE };
  // { type: SHOW_COMPLETE }
```

#### 2) Reducer

```js
// 3) reducers 작성
// redux/modules/reducers.js
import { combineReducers } from "redux";
import todos from "./modules/todos";
import filter from "./modules/filter";

const reducers = combineReducers({
  todos,
  filter,
});

export default reducers;
```

```js
// 4-1) 개별 Reducer 작성
const initState1 = [];
export default function todos(state = initState1, action) {
  if (action.type === ADD_TODO) {
    return [...state, { text: action.text, completed: false }];
  }

  if (action.type === COMPLETE_TODO) {
    return state.map((todo, index) => {
      if (index === action.index) {
        return { ...todo, completed: true };
      }
      return todo;
    });
  }

  return state;
}
```

```js
// 4-2) 개별 Reducer 작성
const initState2 = "ALL";
export default function filter(state = initState2, action) {
  if (action.type === SHOW_ALL) {
    return "ALL";
  }

  if (action.type === SHOW_COMPLETE) {
    return "COMPLETE";
  }

  return state;
}
```

#### 3) Store

```js
// 5) reducers로 store 생성
// redux/store.js
import { createStore } from "redux";
import reducers from "./modules/reducers";

const store = createStore(reducers);

export default store;
```

#### 4) Provider

```js
// 6) Provider로 App 전체에 전달
// index.js
...
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### 5) Usage

Container

```js
// containers/TodoListContainer.jsx
import TodoList from "../components/TodoList";
import { useSelector } from "react-redux";

export default function TodoListContainer() {
  const todos = useSelector((state) => state.todos);

  return <TodoList todos={todos} />;
}
```

```js
// containers/TodoFormContainer.jsx
import TodoForm from "../components/TodoForm";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addTodo } from "../redux/modules/todos";

export default function TodoFormContainer() {
  const dispatch = useDispatch();

  const add = useCallback(
    (text) => {
      dispatch(addTodo(text));
    },
    [dispatch]
  );

  return <TodoForm add={add} />;
}
```

Component

```jsx
// components/TodoList.jsx
export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => {
        return <li>{todo.text}</li>;
      })}
    </ul>
  );
}
```

```js
// components/TodoForm.jsx
import { useRef } from "react";

export default function TodoForm({ add }) {
  const inputRef = useRef();

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={click}>add</button>
    </div>
  );

  function click() {
    add(inputRef.current.value);
  }
}
```

### Redux-thunk

```js
// redux/store.js
import reducer from "./reducer/reducer";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
```

```js
// redux/actions.js
import axios from "axios";

...

export function getUsersStart() {
  return {
    type: GET_USERS_START,
  };
}
export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}
export function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}

export function getUsersThunk() {
  return async (dispatch) => {
    try {
      dispatch(getUsersStart());
      const res = await axios.get("https://api.github.com/users");
      dispatch(getUsersSuccess(res.data));
    } catch (err) {
      dispatch(getUsersFail(err));
    }
  };
}
```

```js
// components/UserListContainer.jsx
import UserList from "../components/UserList";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { getUsersThunk } from "../redux/actions";

export default function UserListContainer() {
  const users = useSelector((store) => store.users.data);
  const dispatch = useDispatch();

  const getUsers = useCallback(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return <UserList users={users} getUsers={getUsers} />;
}
```

### connected-react-router

#### 1) Setting

```js
// 1) history.js
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default history;
```

```js
// 2) redux/store.js
import reducers from "./modules/reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import history from "../history";
import { routerMiddleware } from "connected-react-router";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMiddleware(history)))
);

export default store;
```

```js
// 3) redux/modules/reducers.js
import { combineReducers } from "redux";
import history from "../../history";
import { connectRouter } from "connected-react-router";
...

const reducers = combineReducers({
  router: connectRouter(history),
  ...
});

export default reducers;
```

```js
// 4) index.js
...
import store from "./redux/store";
import { Provider } from "react-redux";
import history from "./history";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### 2) Usage

```js
// pages/home.jsx
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <button onClick={click}>todos로 이동</button>
    </div>
  );

  function click() {
    dispatch(push("/todos"));
  }
}
```
