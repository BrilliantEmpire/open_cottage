/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import Cookie from "js-cookie";
import { AuthService } from "./auth.service";

const token = Cookie.get("open-cottage-token");
const user = JSON.parse(localStorage.getItem("open-cottage-user") || null);

const authService = new AuthService(token);

const initialState = {
  isLoading: false,
  errorMessage: "",
  user: user || null,
  token: token || null,
};

// -> Sign in a user slice
export const loginAdmin = createAsyncThunk(
  "auth/signIn",
  async (data, { __ }) => {
    try {
      const res = await authService.login(data);

      message.success(`Hi there, welcome to Open-cottage CMS`);
      return res;
    } catch (error) {
      message.error(error?.response?.data?.message?.toString());
    }
  }
);

export const signOutAdmin = createAsyncThunk("auth/signOut", async () => {
  try {
    const res = await authService.logout();
    return res;
  } catch (error) {
    message.error(error.toString());
  }
});

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (data, { getState }) => {
    try {
      const token = getState().auth.token;
      const _authService = new AuthService(token);
      const res = await _authService.setNewPassword(data);
      message.success(res?.data?.message?.toString());
      return res;
    } catch (error) {
      message.error(error?.response?.data?.message?.toString());
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [loginAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [loginAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [loginAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    [signOutAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [signOutAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
    },
    [signOutAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    [setNewPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [setNewPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [setNewPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
