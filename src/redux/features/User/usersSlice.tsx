import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { getUserDetails } from "./userServices";

type UsersType = {
  currentUser: DocumentData | undefined;
  loading: boolean;
};

const initialState: UsersType = {
  currentUser: undefined,
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
