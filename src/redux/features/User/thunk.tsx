import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByUsername } from "./services";

export const getUserInfo = createAsyncThunk(
  "user/user-details",
  async (userName: string) => {
    try {
      return await getUserByUsername(userName);
    } catch (error) {
      console.log(error);
    }
  }
);
