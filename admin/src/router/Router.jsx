import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import LayoutComponent from "../layout/LayoutComponent";
import Dashboard from "../pages/dashboard";
import UsersList from "../pages/users";
import RecipesList from "../pages/recipes";
import FeedsList from "../pages/feeds";
import NotFound from "../pages/_404/NotFound";
import RecipeDetails from "../pages/recipes/details";
import SettingsPage from "../pages/settings";
import FeedsDetails from "../pages/feeds/details";
import UserDetails from "../pages/users/details";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<LayoutComponent />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/users" element={""}>
          <Route path="/dashboard/users" element={<UsersList />} />
          <Route path="/dashboard/users/:id" element={<UserDetails />} />
        </Route>
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/feeds" element={""}>
          <Route path="/dashboard/feeds" element={<FeedsList />} />
          <Route path="/dashboard/feeds/:id" element={<FeedsDetails />} />
        </Route>
        <Route path="/dashboard/recipes" element={""}>
          <Route path="/dashboard/recipes" element={<RecipesList />} />
          <Route path="/dashboard/recipes/:id" element={<RecipeDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
