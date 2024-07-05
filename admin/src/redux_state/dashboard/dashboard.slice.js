import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Dashboard } from "./dashboard.services";

const initialState = {
  isLoading: false,
  errorMessage: "",
  stats: {},
};

export const getStats = createAsyncThunk(
  "dashboard/getStats",
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const dashboardServices = new Dashboard(token);
      const response = await dashboardServices.getStats();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: {
    [getStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getStats.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.stats = action.payload;
    },
    [getStats.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
  },
});

export default dashboardSlice.reducer;
export const { reset } = dashboardSlice.actions;
