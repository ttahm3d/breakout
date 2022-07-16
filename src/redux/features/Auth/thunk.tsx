import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInType, SignUpType, EditUserType } from "../../../types";
import {
  getUserById,
  googleSignIn,
  googleSignUp,
  emailPasswordSignUp,
  emailPasswordSignIn,
  userLogout,
  updateUser,
} from "./services";

export const signInHandler = createAsyncThunk(
  "auth/user-signin",
  async (signinData: SignInType) => await emailPasswordSignIn(signinData)
);

export const signUpHandler = createAsyncThunk(
  "auth/user-signup",
  async (signupData: SignUpType) => await emailPasswordSignUp(signupData)
);

export const googleSignUpHandler = createAsyncThunk(
  "auth/user-google-signup",
  async () => await googleSignUp()
);

export const googleSignInHandler = createAsyncThunk(
  "auth/user-google-signin",
  async () => await googleSignIn()
);

export const signOutHandler = createAsyncThunk(
  "auth/user-logout",
  async () => await userLogout()
);

export const loggedInUserInfo = createAsyncThunk(
  "auth/user-info",
  async (userId: string) => {
    try {
      return await getUserById(userId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/user-update",
  async (editUserData: EditUserType) => {
    try {
      return await updateUser(editUserData);
    } catch (error) {}
  }
);
