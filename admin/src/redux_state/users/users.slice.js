import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "./users.services";
import { message } from "antd";

const initialState = {
  users: [],
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// get all users
export const getUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const userService = new User(token);
      const response = await userService.getUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get single user
export const getUser = createAsyncThunk(
  "users/getUser",
  async (userId, { getState }) => {
    try {
      const token = getState().auth.token;
      const userService = new User(token);
      const response = await userService.getUser(userId);
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message?.toString());
      return;
    }
  }
);

// block and unblock user
export const blockAndUnblockUser = createAsyncThunk(
  "users/blockAndUnblockUser",
  async (userId, { getState }) => {
    try {
      const token = getState().auth.token;
      const userService = new User(token);
      const response = await userService.blockAndUnblockUser(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
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
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(blockAndUnblockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockAndUnblockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(blockAndUnblockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default usersSlice.reducer;

export const { reset } = usersSlice.actions;
