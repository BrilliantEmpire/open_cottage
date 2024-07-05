"use client";
import React, { useEffect, useState } from "react";
import { Input, Row, Spin, message } from "antd";
import { MagnifyingGlass } from "@phosphor-icons/react";
import SavedRecipeCards from "../recipes/SavedRecipeCard";
import {
  bookmarkRecipe,
  getBookmarkedRecipes,
} from "@/services/bookmarks.services";
import { useSession } from "next-auth/react";

const { Search } = Input;

const SavedRecipe = () => {
  const { data: session } = useSession();

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const fetchSavedRecipes = async () => {
    const res = await getBookmarkedRecipes(
      session?.user?.accessToken?.accessToken
    );
    setSavedRecipes(res);
  };

  useEffect(() => {
    setIsPending(true);
    fetchSavedRecipes().then(() => setIsPending(false));
  }, []);

  const removeSavedRecipe = async (postId) => {
    try {
      const res = await bookmarkRecipe(
        session?.user?.accessToken?.accessToken,
        postId
      );

      if (res?.success == false) {
        message.error(res?.message);
      } else {
        message.success(res?.message);
        await fetchSavedRecipes();
      }
    } catch (err) {
      message.error(err.error?.toString() || err.message.toString());
    }
  };

  if (isPending) return <Spin />;

  return (
    <div>
      <Search
        placeholder="Search"
        allowClear
        size="small"
        prefix={<MagnifyingGlass size={22} color="#828282" />}
      />
      <div className="mt-4">
        <Row gutter={[16, 16]}>
          {savedRecipes.length === 0 && (
            <div className="text-center my-10 w-full">
              <h3>No Saved Recipes</h3>
              <p className="text-secondary">Save recipes to view them here</p>
            </div>
          )}
          {savedRecipes.map((recipe) => (
            <SavedRecipeCards
              key={recipe._id}
              onRemove={removeSavedRecipe}
              isPending={isPending}
              recipe={{ ...recipe, ...recipe.recipe }}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default SavedRecipe;
