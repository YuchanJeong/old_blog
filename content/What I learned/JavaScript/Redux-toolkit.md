---
title: "Redux-toolkit"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - (Summary)
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
/* redux/index */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules";

const store = configureStore({
  reducer: rootReducer,
  // middleware: [],
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
```

### 3. rootReducer

```js
/* redux/modules/index */
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
/* redux/modules/reducer */
import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
  name: "reducer",
  initialState: initial_state,
  reducers: {
    actionCreator: (state, action) => {
      // action.payload는 action_creator의 params
      // state 변경은 mutable, immutable 둘 다 가능
      // state=value로 직접 변경은 안됨
    },
  },
});

export default reducerSlice.reducer;
export const { actionCreator } = reducerSlice.actions;
```

### 2) createAsyncThunk[^](https://redux-toolkit.js.org/api/createAsyncThunk#examples)

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const asyncActionCreator = createAsyncThunk(
  "reducer/asyncActionCreator",
  async () => {
    const response = await axios.get("");
    return response.data;
  }
);

const asyncReducerSlice = createSlice({
  name: "asyncReducer",
  initialState: { loading: true, error: null, data: initial_data }
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncActionCreator.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(asyncActionCreator.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(asyncActionCreator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default asyncReducerSlice.reducer;
```

## Component

### 1) useSelect

```js
import { useSelector } from "react-redux";

const reducerState = useSelector((store) => store.reducer);
```

### 2) useDispatch

```js
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

dispatch(actionCreator(params));
```
