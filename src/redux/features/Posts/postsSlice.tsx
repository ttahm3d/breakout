import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { createPost, getAllPosts, likePost, unLikePost } from "./thunk";

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
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload?.posts;
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(likePost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      })
      .addCase(unLikePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(unLikePost.rejected, (state) => {
        state.loading = false;
        state.posts = undefined;
      });
  },
});

export default postsSlice.reducer;
