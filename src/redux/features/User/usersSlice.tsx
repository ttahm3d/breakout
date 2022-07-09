import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { getUserInfo } from "./thunk";

type UsersType = {
  user: DocumentData | undefined;
  loading: boolean;
};

const initialState: UsersType = {
  user: undefined,
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      });
  },
});

export default usersSlice.reducer;
