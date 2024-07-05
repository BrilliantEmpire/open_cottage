import { Row } from "antd";

import Title from "../title/Title";
import RecipeCard from "../recipes/RecipeCard";
import Link from "next/link";
import { getTopRecipes } from "@/services/recipes.services";

const Toppicks = async () => {
  const recipes = await getTopRecipes();

  return (
    <div className="relative z-10 mt-12 sm:mt-6">
      <div className="flex items-end justify-between">
        <Title title={"top picks for you"} />
        <Link
          href="/explore"
          className="view-more text-center cursor-pointer text-base text-[#0F0F0F] underline"
        >
          <p>See all</p>
        </Link>
      </div>
      <div className="pt-3 w-full">
        <Row gutter={[16, 16]} className="overflow-auto">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Toppicks;
