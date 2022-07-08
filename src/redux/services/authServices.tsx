import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Toast } from "../../components";
import { auth, googleAuthProvider } from "../../configs/firebase";
import { SignInType, SignUpType } from "../../types";
import { createUser, createGoogleUser, getUserById } from "./userServices";

export const signInHandler = createAsyncThunk(
  "auth/user-signin",
  async (signInData: SignInType) => {
    try {
      const { email, password } = signInData;
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("breakout/user-id", response?.user?.uid);
      Toast({ message: "Sign In Successful", type: "success" });
      return await getUserById(response?.user?.uid);
    } catch (error: any) {
      Toast({
        message: error.message,
        type: "error",
      });
    }
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
      const createdUser = await createUser(signupData, response?.user?.uid);
      Toast({ message: "Account creation successful", type: "success" });
      return createdUser;
    } catch (error: any) {
      Toast({
        message: error.message,
        type: "error",
      });
    }
  }
);

export const googleSignUpHandler = createAsyncThunk(
  "auth/user-google-signup",
  async () => {
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem("breakout/user-id", response?.user?.uid);
      const createdGoogleUser = await createGoogleUser(response?.user);
      Toast({ message: "Google Signup Successful", type: "success" });
      return createdGoogleUser;
    } catch (error: any) {
      Toast({
        message: error.message,
        type: "error",
      });
    }
  }
);

export const googleSignInHandler = createAsyncThunk(
  "auth/user-google-signin",
  async () => {
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem("breakout/user-id", response?.user?.uid);
      Toast({ message: "Sign in Successful", type: "success" });
      return await getUserById(response?.user?.uid);
    } catch (error: any) {
      Toast({
        message: error.message,
        type: "error",
      });
      return undefined;
    }
  }
);

export const signOutHandler = createAsyncThunk("auth/user-logout", async () => {
  try {
    localStorage.removeItem("breakout/user-id");
    await signOut(auth);
    Toast({ message: "Sign out Successful", type: "success" });
  } catch (error: any) {
    Toast({
      message: error.message,
      type: "error",
    });
  }
});
