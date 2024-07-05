import { Row } from "antd";
import Title from "../title/Title";
import RecipeCard from "./RecipeCard";
import Link from "next/link";
import { getAllRecipes } from "@/services/recipes.services";

const NewRecipes = async () => {
  const heading = "New Recipes";
  const recipes = await getAllRecipes();

  const showMoreLink = () => {
    return (
      <Link
        href="#"
        className="view-more block text-center cursor-pointer text-base text-[#0F0F0F] underline my-12 sm:my-3"
      >
        <p>View More</p>
      </Link>
    );
  };

  const showLessLink = () => {
    return (
      <Link
        href="#"
        className="view-more block text-center cursor-pointer text-base text-[#0F0F0F] underline my-12 sm:my-3"
      >
        <p>Show Less</p>
      </Link>
    );
  };

  return (
    <div className="my-12 sm:mt-6">
      <Title title={heading} />
      <div className="pt-3">
        <Row gutter={[16, 16]}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Row>
      </div>

      {showMoreLink()}
      {showLessLink()}
    </div>
  );
};

export default NewRecipes;
