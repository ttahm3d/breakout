import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import {
  createPost,
  getAllPosts,
  getPostsByUserName,
  getPostsOfFollowing,
} from "./thunk";

type PostStateType = {
  posts: DocumentData[] | undefined;
  postsOfCurrentUser: DocumentData[] | undefined;
  postsOfFollowingUsers: DocumentData[] | undefined;
  loading: boolean;
};

const initialState: PostStateType = {
  posts: [],
  postsOfCurrentUser: [],
  postsOfFollowingUsers: [],
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
        state.posts = action.payload;
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
      .addCase(getPostsByUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsByUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.postsOfCurrentUser = action.payload;
      })
      .addCase(getPostsByUserName.rejected, (state) => {
        state.loading = false;
        state.postsOfCurrentUser = undefined;
      })
      .addCase(getPostsOfFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsOfFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.postsOfFollowingUsers = action.payload;
      })
      .addCase(getPostsOfFollowing.rejected, (state) => {
        state.loading = false;
        state.postsOfFollowingUsers = undefined;
      });
  },
});

export default postsSlice.reducer;
