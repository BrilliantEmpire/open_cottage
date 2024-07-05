import React from "react";
import { Row, Col } from "antd";
import Link from "next/link";
import SearchBox from "@/components/common/searchBox";
import BackButton from "@/components/common/BackButton";
import { Rows, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import MobSearchBox from "@/components/common/MobsearchBox";
import dynamic from "next/dynamic";
import { getAllRecipes } from "@/services/recipes.services";
import RecipeCard from "@/components/recipes/RecipeCard";
import ExploreRecipesList from "@/components/recipes/ExploreRecipesList";

export const revalidate = 0;

const ExplorePage = async ({ searchParams }) => {
  const { layout, filter } = searchParams;

  const FilterModal = dynamic(
    () => import("../../components/modals/filterModal"),
    { ssr: false }
  );

  const recipes = await getAllRecipes();

  return (
    <>
      <div>
        <div className="block md:hidden">
          <BackButton />
        </div>
        {/* for mobile */}
        <div className="items-center justify-between hidden pr-4 bg-white md:flex ">
          <BackButton />
          <div className="ml-1 flex items-center w-[70px] h-[30px] justify-evenly bg-white">
            <div
              className={` hover:bg-primary flex justify-center items-center rounded-4 ${
                layout !== "list" && "bg-primary text-white"
              }`}
            >
              <Link href="/explore" className="h-[29px]">
                <div
                  className={`text-[#98989A] hover:text-white rounded-4 ${
                    layout !== "list" && "text-white"
                  }`}
                >
                  <SquaresFour size={28} weight="fill" />
                </div>
              </Link>
            </div>

            <div
              className={` hover:bg-primary flex items-center justify-center rounded-4 ${
                layout === "list" && "bg-primary text-white"
              }`}
            >
              <Link href="/explore?layout=list" className="h-[29px]">
                <div
                  className={`text-[#98989A] hover:text-white ${
                    layout === "list" && "text-white"
                  }`}
                >
                  <Rows size={28} weight="fill" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <SearchBox searchParams={searchParams} layout={layout} />
        </div>
        <div className="hidden md:block">
          <MobSearchBox searchParams={searchParams} layout={layout} />
        </div>
        {layout === "list" ? (
          <div>
            <div className="block">
              <ExploreRecipesList recipes={recipes} />
            </div>
            {/* <div className="hidden md:block">
              <MobToppicks />
            </div> */}
          </div>
        ) : (
          <div className="px-24 py-10 md:px-4">
            <Row gutter={16}>
              {recipes.slice(0, 100).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </Row>
          </div>
        )}
      </div>

      <FilterModal isOpen={filter === "true"} />
    </>
  );
};

export default ExplorePage;
