import React, { Suspense } from "react";
import NewRecipes from "@/components/recipes/NewRecipe";
import Toppicks from "@/components/toppicks/Toppicks";
import Banner from "@/components/banner/Banner";
import MobToppicks from "@/components/toppicks/MobToppicks";
import { getAllRecipesBySearch } from "@/services/recipes.services";
import { Row } from "antd";
import RecipeCard from "@/components/recipes/RecipeCard";

export const dynamic = "force-dynamic";

async function home({ searchParams }) {
  const { search } = searchParams;

  const recipes = search ? await getAllRecipesBySearch(search) : [];

  return (
    <div className="px-24 sm:p-0">
      <Suspense fallback={<p>loading...</p>}>
        <Banner />
      </Suspense>
      <div className="p-0 sm:p-4">
        <div className="pt-3 w-full py-6">
          {(search !== undefined || search !== null) && (
            <Row gutter={[16, 16]} className="overflow-auto">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </Row>
          )}
        </div>
        <div className="block sm:hidden">
          {(search === undefined || search === null) && <Toppicks />}
        </div>
        <div className="hidden sm:block">
          <MobToppicks />
        </div>
        {(search === undefined || search === null) && <NewRecipes />}
      </div>
    </div>
  );
}
export default home;
