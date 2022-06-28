import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleAuthProvider, db, app } from "../../configs/firebase";

export const signInHandler = createAsyncThunk(
  "auth/user-signin",
  async (loginData: any) => {
    try {
      const { email, password } = loginData;
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response?.user;
    } catch (error) {}
  }
);

export const signUpHandler = createAsyncThunk(
  "auth/user-signup",
  async (signupData: any) => {
    try {
      const { email, password } = signupData;
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return response?.user;
    } catch (error) {}
  }
);

export const googleSignUpHandler = createAsyncThunk(
  "auth/user-google-signup",
  async () => {}
);

export const googleSignInHandler = createAsyncThunk(
  "auth/user-google-signin",
  async () => {}
);
