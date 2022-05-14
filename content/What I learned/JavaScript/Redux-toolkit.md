---
title: "Redux-toolkit"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - Redux
---

Ref. [Redux-toolkit Usage Guide
](https://redux-toolkit.js.org/usage/usage-guide)<br/>\*_[Redux-toolkit 예시](/storage/wil/javascript/ex-redux-toolkit)_

## Init

```bash
npm i redux @reduxjs/toolkit react-redux
```

### 1. Provider

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

### 2. store

```js
/* redux/store.js */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // middleware: [...getDefaultMiddleware()]
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
```

### 3. rootReducer

```js
/* redux/modules/rootReducer.js */
import { combineReducers } from "redux";
import reducer from "./reducer";

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
```

## Reducer

### 1. createSlice

```js
/* redux/modules/example.js */
import { createSlice } from "@reduxjs/toolkit";

const reducer_slice = createSlice({
  name: "reducer",
  initialState: initial_state,
  reducers: {
    action_creator: (state, action) => {
      // action.payload는 action_creator의 params
      // state 변경은 mutable, immutable 둘 다 가능
      // state=value로 직접 변경은 안됨
    },
  },
});

export default reducer_slice.reducer;
export const { action_creator } = reducer_slice.actions;
```

### 2) createAsyncThunk[^](https://redux-toolkit.js.org/api/createAsyncThunk#examples)

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const async_action_creator = createAsyncThunk(
  "reducer/async_action_creator",
  async () => {
    const response = await axios.get("");
    return response.data;
  }
);

const async_reducer_slice = createSlice({
  name: "async_reducer",
  initialState: { loading: true, error: null, data: initial_data }
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(async_action_creator.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(async_action_creator.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(async_action_creator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default async_reducer_slice.reducer;
```

## Component

### 1) useSelect

```js
import { useSelector } from "react-redux";

const reducer_state = useSelector((store) => store.reducer);
```

### 2) useDispatch

```js
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

dispatch(action_creator(params));
```
