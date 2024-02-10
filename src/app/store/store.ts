import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postSlice";
import usersReducer from "../features/posts/userSlice";
import postAsyncReducer from "../features/postsAsync/postAsyncSlice";
import userAsyncReducer from "../features/usersAsync/userAsyncSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    postsAsync: postAsyncReducer,
    usersAsync: userAsyncReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
