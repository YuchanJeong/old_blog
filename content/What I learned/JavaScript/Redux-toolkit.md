---
title: "Redux-toolkit"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - Redux
---

\*Ref. [Redux-toolkit Usage Guide
](https://redux-toolkit.js.org/usage/usage-guide)

## 1. Initial Setting

```bash
npm i redux @reduxjs/toolkit react-redux
```

### 1) rootReducer

```js
/* redux/modules/rootReducer.js */
import { combineReducers } from "redux";

const rootReducer = combineReducers({});

export default rootReducer;
```

### 2) store

```js
/* redux/store.js */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // middleware: [...getDefaultMiddleware()]
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
```

### 3) Provider

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

## 2. Reducer

### 1) createSlice()

```js
/* redux/modules/example.js */
import { createSlice } from "@reduxjs/toolkit";

const 리듀서_슬라이스 = createSlice({
  name: "prefix로 사용됨",
  initialState: 초기_상태,
  reducers: {
    액션_생성자: (state, action) => {
      // 상태 변경은 mutable, immutable 둘 다 가능
      // action.payload는 액션_생성자의 params
      // *state=...(x)
    },
  },
});

export default 리듀서_슬라이스.reducer;
export const { 액션_생성자 } = 리듀서_슬라이스.actions;
```

### 2) createAsyncThunk() [\*](https://redux-toolkit.js.org/api/createAsyncThunk#examples)

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const 비동기_액션_생성자 = createAsyncThunk(
  "리듀서/비동기_액션_생성자",
  async () => {
    const response = await axios.get("");
    return response.data;
  }
);

const 리듀서_슬라이스 = createSlice({
  name: "prefix로 사용됨",
  initialState: 초기_상태,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExample.pending, (state, action) => {});
    builder.addCase(fetchExample.fulfilled, (state, action) => {});
    builder.addCase(fetchExample.rejected, (state, action) => {});
  },
});

export default 리듀서_슬라이스.reducer;
```

## 3. Component

### 1) useSelect

```js
import { useSelector } from "react-redux";

const 리듀서_상태 = useSelector((store) => store.리듀서);
```

### 2) useDispatch

```js
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

dispatch(액션_생성자(params));
```
