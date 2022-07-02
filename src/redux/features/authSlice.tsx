import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import {
  googleSignInHandler,
  googleSignUpHandler,
  logoutHandler,
  signInHandler,
  signUpHandler,
} from "../services/authServices";
import { getUserDetails } from "../services/userServices";

type AuthType = {
  user: DocumentData | undefined;
  loggedIn: boolean;
  loading: boolean;
};

const initialState: AuthType = {
  user: undefined,
  loggedIn: !!localStorage.getItem("breakout/user-id") || false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(signUpHandler.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
        state.user = undefined;
      })
      .addCase(logoutHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutHandler.fulfilled, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.user = undefined;
      })
      .addCase(logoutHandler.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
        state.user = undefined;
      })
      .addCase(googleSignUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignUpHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(googleSignUpHandler.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
        state.user = undefined;
      })
      .addCase(googleSignInHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignInHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(googleSignInHandler.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
        state.user = undefined;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
        state.user = undefined;
      })
      .addCase(signInHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(signInHandler.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
        state.user = undefined;
      });
  },
});

export const { signUp } = authSlice.actions;
export default authSlice.reducer;
