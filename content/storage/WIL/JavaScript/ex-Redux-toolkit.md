---
title: "Redux-toolkit Example"
showDate: false
showTableOfContents: true
showPagination: false
showAuthor: false
---

### Provider

```js
import React from "react";
import ReactDOM from "react-dom";
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

### store

```js
/* redux/store.js */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // middleware: [...getDefaultMiddleware()]
  // devTools: process.env.NODE_ENV !== "production",
});
```

### rootReducer

```js
/* redux/modules/rootReducer.js */
import { combineReducers } from "redux";
import todos from "./todos";
import userList from "./userList";

const rootReducer = combineReducers({
  todos,
  userList,
});

export default rootReducer;
```

### Reducer

```js
/* redux/modules/todos.js */
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        text: action.payload.text,
        key: action.payload.key,
      });
    },
    deleteTodo: (state, action) => {
      const nextState = state.filter((todo) => todo.key !== action.payload);
      return nextState;
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo } = todosSlice.actions;
```

```js
/* redux/modules/userList.js */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserList = createAsyncThunk(
  "users/fetchUserList",
  async () => {
    const response = await axios.get("https://api.github.com/users");
    return response.data;
  }
);

const userListSlice = createSlice({
  name: "userList",
  initialState: { loading: true, error: null, data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default userListSlice.reducer;
```

### Component

```js
/* components/Todos.jsx */
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/modules/todos";
import { nanoid } from "nanoid";

export default function TodoForm() {
  const inputRef = useRef();

  const dispatch = useDispatch();

  const add = (todo) => {
    dispatch(addTodo(todo));
  };

  return (
    <div>
      <input ref={inputRef} />
      <button
        onClick={() =>
          add({
            text: inputRef.current.value,
            key: nanoid(),
          })
        }
      >
        add
      </button>
    </div>
  );
}
```

```js
/* components/TodoList.jsx */
import { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo as deleteTodoAction } from "../redux/modules/todos";

export default memo(function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const deleteTodo = (key) => {
    dispatch(deleteTodoAction(key));
  };

  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.key} onClick={() => deleteTodo(todo.key)}>
            {todo.text}
          </li>
        );
      })}
    </ul>
  );
});
```

```js
/* components/UserList.jsx */
import { useCallback, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/modules/users";

export default memo(function UserList() {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (users.length === 0) {
    return <p>현재 유저 정보 없음</p>;
  }

  return (
    <ol>
      {users.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ol>
  );
});
```
