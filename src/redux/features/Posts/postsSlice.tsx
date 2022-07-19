import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

type PostStateType = {
  posts: DocumentData[] | undefined;
  loading: boolean;
};

const initialState: PostStateType = {
  posts: [],
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default postsSlice.reducer;
