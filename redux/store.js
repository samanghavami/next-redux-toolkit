import counterReducer from "../features/counter/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
    devTools: true,
  });
}

export const wrapper = createWrapper(makeStore);
