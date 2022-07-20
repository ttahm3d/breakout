import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../../../types";
import { createPostHandler, getAllPostsHandler } from "./services";

export const createPost = createAsyncThunk(
  "post/create-post",
  async (post: PostType) => await createPostHandler(post)
);

export const getAllPosts = createAsyncThunk(
  "post/get-posts",
  async () => await getAllPostsHandler()
);
