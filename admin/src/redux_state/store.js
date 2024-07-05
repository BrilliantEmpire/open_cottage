import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import dashboardSlice from "./dashboard/dashboard.slice";
import usersSlice from "./users/users.slice";
import recipesSlice from "./recipes/recipes.slice";
import postsSlice from "./posts-feeds/posts.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
    user: usersSlice,
    recipe: recipesSlice,
    post: postsSlice,
  },
});
