---
title: "[Redux] Redux-toolkit in Next.js and TypeScript"
date: 2022-05-23
categories:
  - <Studies>
tags:
  - Redux
---

```bash
npm i @reduxjs/toolkit react-redux next-redux-wrapper
npm i -D @types/react-redux
```

### redux/store.ts

```ts
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import example from "./modules/example";

const store = configureStore({
  reducer: {
    example,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

### redux/modules/example.ts

```ts
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export interface IExample {
  value: string;
}

const initialState: IExample = {
  value: "...",
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    actionCreator: (state, action) => {
      // action.payload는 actionCreator의 params
      // state 변경은 mutable, immutable 둘 다 가능
      // state=value로 직접 변경은 안됨
    },
  },
});

export default example.reducer;
export const selectExample = (state: RootState) => state.example.value;
export const { actionCreator } = reducerSlice.actions;
```

### utils/useReduxToolkit.ts

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### pages/\_app.ts

```ts
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
```

### Usage

```ts
import { useState } from "react";
import { useAppSelector, useAppDispatch  } from "../utils/useReduxToolkit";
import { exampleSelector, actionCreator  } from "../redux/modules/example";

export default function Example() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(exampleSelector);
  const event = () => {
    dispatch(actionCreator)
  }

  return ...
}
```

---

Ref. [Introduction to using Redux Toolkit in Next.js and TypeScript](https://www.merixstudio.com/blog/introduction-using-redux-toolkit-nextjs-and-typescript/)
