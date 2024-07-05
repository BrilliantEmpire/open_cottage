import React from "react";
import { Row } from "antd";
import Title from "../title/Title";
import RecipeCard from "../recipes/RecipeCard";
import Link from "next/link";
import { getSimilarRecipesByCategory } from "@/services/recipes.services";

const SimilarRecipe = async ({ recipe: rec }) => {
  const heading = "Similar Recipes";

  const recipes = await getSimilarRecipesByCategory(rec?.category ?? "all");

  return recipes.success === false ? (
    <></>
  ) : (
    <div className="relative z-10 mt-12  sm:mt-6 similar-recipe">
      <div className="flex items-center mb-4 justify-between">
        <Title title={heading} />
        <Link
          href="/explore"
          className="block text-right cursor-pointer text-base text-[#0F0F0F] underline"
        >
          <p>See all</p>
        </Link>
      </div>

      <Row gutter={[16, 16]}>
        {recipes?.map(
          (recipe) =>
            recipe?._id !== rec?._id && (
              <RecipeCard key={recipe.id} recipe={recipe} />
            )
        )}
      </Row>
    </div>
  );
};

export default SimilarRecipe;
