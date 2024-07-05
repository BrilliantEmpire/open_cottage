import React from "react";
import { Card } from "antd";
import { products } from "@/data/products";
import Title from "../title/Title";
import RecipeCardlist from "./RecipeCardList";
import MobRecipeCardList from "./MobRecipeCardList";

const ExploreRecipesList = ({ recipes }) => {
  // Extract only the first 4 products (latest products)

  return (
    <div className="relative z-10 block px-24 mt-8 sm:mt-6 sm:px-4">
      <div className="block mx-auto md:hidden">
        {/* Adjusted the max-width here */}
        {recipes.map((recipe, index) => (
          <div key={recipe.id} className="mb-4 ">
            <RecipeCardlist recipe={recipe} className="w-80" />
          </div>
        ))}
      </div>
      {/* for mobile view*/}
      <div className="hidden mx-auto md:block">
        {recipes.map((recipe, index) => (
          <div key={recipe.id} className="mb-4 ">
            <MobRecipeCardList recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRecipesList;
