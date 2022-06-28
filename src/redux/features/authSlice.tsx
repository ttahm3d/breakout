import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../types";
import { signUpHandler } from "../services/authServices";

type AuthType = {
  user: IAuth | undefined;
  loggedIn: boolean;
  loading: boolean;
};

const initialState: AuthType = {
  user: undefined,
  loggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export const { signUp } = authSlice.actions;
export default authSlice.reducer;
