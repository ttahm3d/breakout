import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider, db, app } from "../../configs/firebase";
import { SignUpType, UserType } from "../../types";
import { createUser, createGoogleUser } from "./userServices";

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
  async (signupData: SignUpType) => {
    try {
      const { email, password } = signupData;
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("breakout/user-id", response?.user?.uid);
      const result = await createUser(signupData, response?.user?.uid);
      console.log(result);
      return response?.user;
    } catch (error) {}
  }
);

export const googleSignUpHandler = createAsyncThunk(
  "auth/user-google-signup",
  async () => {
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem("breakout/user-id", response?.user?.uid);
      const result = await createGoogleUser(response?.user);
      return response?.user;
    } catch (error) {}
  }
);

export const logoutHandler = createAsyncThunk("auth/user-logout", async () => {
  try {
    await signOut(auth);
  } catch (error) {}
});
