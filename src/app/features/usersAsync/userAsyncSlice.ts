import { createSlice, createAsyncThunk, isAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UserResponse } from "../../../models/User";
import axios from "axios";

const USER_URL = "https://jsonplaceholder.typicode.com/users";

const initialState: UserResponse = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USER_URL);
    return [...response.data];
  } catch (error: any) {
    return error?.message;
  }
});

export const usersAsyncSlice = createSlice({
  name: "usersAsync",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // this completely replaces the action state
    // now we dont have to worry about having replicated users
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // return action.payload; --> not working
      state.status = "suceeded";
      state.users = action.payload;
    });
  },
});

export const selectAllAsyncUsers = (state: RootState) => state.usersAsync.users;

export default usersAsyncSlice.reducer;
