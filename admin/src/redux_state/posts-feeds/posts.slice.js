import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Post } from "./post.services";
import { message } from "antd";

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// get all posts
export const getPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const postService = new Post(token);
      const response = await postService.getPosts();
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message?.toString());
    }
  }
);

// get single post
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (slug, { getState }) => {
    try {
      const token = getState().auth.token;
      const postService = new Post(token);
      const response = await postService.getPost(slug);
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message?.toString());
    }
  }
);

// block and unblock post
export const blockAndUnblockPost = createAsyncThunk(
  "posts/blockAndUnblockPost",
  async (postId, { getState }) => {
    try {
      const token = getState().auth.token;
      const postService = new Post(token);
      const response = await postService.blockAndUnblockPost(postId);
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message?.toString());
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(blockAndUnblockPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockAndUnblockPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(blockAndUnblockPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default postsSlice.reducer;

export const { reset } = postsSlice.actions;
