import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { fetchCount } from "./counterAPI";

const initialState = {
  value: 0,
  status: "idle",
  posts: [],
};

export const getPostsAsync = createAsyncThunk("counter/getPosts", async () => {
  let posts = await axios(
    "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5"
  );
  let main = posts.data;
  return main;
});

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        console.log("HYDRATE", action.payload.counter);

        return {
          ...state,
          ...action.payload.counter,
        };
      })
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
        state.posts = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
