import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByUsername } from "./services";

export const getUserInfo = createAsyncThunk(
  "user/user-details",
  async (userId: string) => {
    try {
      return await getUserByUsername(userId);
    } catch (error) {
      console.log(error);
    }
  }
);
