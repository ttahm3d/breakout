import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../../../types";
import {
  createPostHandler,
  getAllPostsHandler,
  getPostsByUsernameHandler,
  getPostsOfFollowingHandler,
  likePostHandler,
  unlikePostHandler,
} from "./services";

export const createPost = createAsyncThunk(
  "posts/create-post",
  async (post: PostType) => await createPostHandler(post)
);

export const getAllPosts = createAsyncThunk(
  "posts/get-posts",
  async () => await getAllPostsHandler()
);

export const getPostsByUserName = createAsyncThunk(
  "posts/get-post-username",
  async (userName: string) => await getPostsByUsernameHandler(userName)
);

export const getPostsOfFollowing = createAsyncThunk(
  "posts/posts-of-following",
  async () => await getPostsOfFollowingHandler()
);

export const likePost = createAsyncThunk(
  "posts/like-post",
  async (postId: string) => await likePostHandler(postId)
);

export const unLikePost = createAsyncThunk(
  "posts/unlike-post",
  async (postId: string) => await unlikePostHandler(postId)
);
