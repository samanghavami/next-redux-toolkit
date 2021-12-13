import counterReducer from "../features/counter/counterSlice";
import { configureStore, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
    devTools: true,
  });
}

export const wrapper = createWrapper(makeStore);
