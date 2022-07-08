import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import {
  googleSignInHandler,
  googleSignUpHandler,
  signOutHandler,
  signInHandler,
  signUpHandler,
} from "../services/authServices";
import { getUserDetails } from "../services/userServices";

type AuthType = {
  user: DocumentData | undefined;
  loading: boolean;
};

const initialState: AuthType = {
  user: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignInHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignInHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignInHandler.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(signUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpHandler.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(signOutHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutHandler.fulfilled, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(signOutHandler.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(googleSignUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignUpHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignUpHandler.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(signInHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInHandler.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      });
  },
});

export const { signUp } = authSlice.actions;
export default authSlice.reducer;
