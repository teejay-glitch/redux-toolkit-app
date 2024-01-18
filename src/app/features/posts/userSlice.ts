import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { User } from "../../../models/User";

const initialState: User[] = [
  { id: "1", name: "User 1" },
  { id: "2", name: "User 2" },
];

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
