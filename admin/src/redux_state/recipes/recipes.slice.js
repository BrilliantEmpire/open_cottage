import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Recipe } from "./recipes.services";
import { message } from "antd";

const initialState = {
  recipes: [],
  recipe: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// get all recipes
export const getRecipes = createAsyncThunk(
  "recipes/getAllRecipes",
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const recipeService = new Recipe(token);
      const response = await recipeService.getRecipes();
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message?.toString());
    }
  }
);

// get single recipe
export const getRecipe = createAsyncThunk(
  "recipes/getSingleRecipe",
  async (recipeId, { getState }) => {
    try {
      const token = getState().auth.token;
      const recipeService = new Recipe(token);
      const response = await recipeService.getRecipe(recipeId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// block and unblock recipe
export const blockAndUnblockRecipe = createAsyncThunk(
  "recipes/blockAndUnblockRecipe",
  async (recipeId, { getState }) => {
    try {
      const token = getState().auth.token;
      const recipeService = new Recipe(token);
      const response = await recipeService.blockAndUnblockRecipe(recipeId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.recipes = action.payload;
    },
    [getRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error;
    },
    [getRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.recipe = action.payload;
    },
    [getRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error;
    },
    [blockAndUnblockRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [blockAndUnblockRecipe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipe = action.payload;
    },
    [blockAndUnblockRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error;
    },
  },
});

export default recipesSlice.reducer;

export const { reset } = recipesSlice.actions;
