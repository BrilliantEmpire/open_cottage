"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Totaltime from "@/components/totaltime/Totaltime";
import NutritionFacts from "@/components/nutritionfacts/NutritionFacts";
import IngredientsTab from "@/components/ingredientstab/IngredientsTab";
import DirectionTab from "@/components/directiontab/Directiontab";
import ReviewFormModal from "@/components/modals/ReviewFormModal";
import CommentsComponent from "@/components/recipes/CommentsComponent";
import SimilarRecipe from "@/components/recipes/SimilarRecipe";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import NutritionFactMob from "@/components/recipes/NutritionFactMob";
import RecipeAuthor from "@/components/recipes/RecipeAuthor";
import RecipeRating from "@/components/recipes/RecipeRating";
import SaveRecipe from "@/components/recipes/SaveRecipe";
import CommentFromMob from "@/components/recipes/CommentFromMob";
import BackButton from "@/components/common/BackButton";
import MobToppicks from "@/components/toppicks/MobToppicks";
import { getRecipeBySlug } from "@/services/recipes.services";
import moment from "moment/moment";
import MadSharePrint from "@/components/recipes/MadSharePrint";
import { useSession } from "next-auth/react";

async function RecipeDetails({ params, searchParams }) {
  const { slug } = params;
  const { data: session } = useSession();
  const { review } = searchParams;
  const token = session?.user?.accessToken?.accessToken;
  const recipe = await getRecipeBySlug(slug);

  // this data for the recipe
  // const [recipe, setRecipe] = useState();

  // useEffect(() => {
  //   const fetchRecipe = async () => {
  //     try {
  //       const recipeData = await getRecipeBySlug(slug);
  //       setRecipe(recipeData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (slug) {
  //     fetchRecipe();
  //   }
  // }, [slug, token]);

  return (
    <>
      <div className="block" id="recipe-card">
        <BackButton />
      </div>
      <div className="px-24 mb-12 sm:mb-2 sm:px-4">
        {recipe && (
          <>
            <div className="flex flex-row sm:flex-wrap md:flex-wrap recipe-detail-main">
              <div className="mt-4 rounded-sm width-70 xl:h-5/6 sm:w-full md:w-full">
                <div className="sm:relative">
                  <Carousel autoplay className="rounded-sm">
                    {recipe?.images?.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={recipe?.title}
                          className="w-full h-[420px] sm:h-auto rounded-xl"
                        />
                      </div>
                    ))}
                  </Carousel>
                  {/* save recipe section */}
                  <div className="hidden sm:block sm:absolute sm:top-0 sm:right-4">
                    <SaveRecipe id={recipe?._id} />
                  </div>
                </div>
                {/* removed as per client  */}
                {/* <div className="hidden lg:mt-4 lg:block">
                  <RecipeRating recipe={recipe} />
                </div> */}
                <p className="text-sm tracking-wider text-[#98989A] pt-8 lg:pt-3">
                  Updated on {moment(recipe?.updatedAt).format("MMMM Do YYYY")}
                </p>
                <h2 className="block mt-4 text-3xl">{recipe?.title}</h2>
                <p
                  className="pt-2 text-xl text-secondary"
                  style={{ textOverflow: "ellipsis" }}
                >
                  {recipe?.description}
                </p>
                {recipe?.ingredients && recipe.ingredients.length > 0 && (
                  <IngredientsTab ingredients={recipe.ingredients} />
                )}
                {recipe?.directions && recipe.directions.length > 0 && (
                  <DirectionTab directions={recipe?.directions} />
                )}
                <RecipeDetail />
                <NutritionFactMob />
                {/* for mobile author component */}
                <div className="hidden lg:mt-2 lg:block">
                  <RecipeAuthor recipe={recipe} />
                </div>
                {/* made this section */}
                <div className="flex items-center mt-5 sm:justify-center">
                  <img
                    src="/icons/Vector.png"
                    alt="vectors"
                    className="mr-4 text-xl"
                  />
                  <p className="text-xl text-center text-[#3E3E3E] sm:text-base">
                    {recipe?.mades ?? 0} people made this!
                  </p>
                </div>
                {/* three button section */}

                <MadSharePrint recipe={recipe} token={""} />
              </div>

              {/* Right side - Product Name */}
              <div className="block pl-4 lg:hidden sm:px-0 width-30 sm:w-full md:w-full">
                {/* save recipe section */}
                <SaveRecipe recipe={recipe} />
                {/* author section for desktop */}
                <div className="block lg:hidden">
                  <RecipeAuthor user={recipe?.user} />
                </div>
                {/* rating and comment section for desktop*/}

                {/* removed as per clinet update */}
                {/* <div className="block lg:hidden">
                  <RecipeRating recipe={recipe} />
                </div> */}
                {/* Time section */}
                <Totaltime recipe={recipe} />
                <NutritionFacts />
              </div>
            </div>
            <div className="comment-section lg:mt-4">
              <CommentsComponent recipe={recipe} />
              <div className="hidden lg:block">
                <CommentFromMob recipe={recipe} />
              </div>
            </div>
            <div className="similar-prod block sm:hidden">
              <SimilarRecipe recipe={recipe} />
            </div>
            {/* mobile similar cards slider*/}
            <div className="similar-prod sm:block hidden sm:mt-8">
              <div className="flex items-end justify-between">
                <h2 className="uppercase text-xl">Similar Recipes </h2>
                <a
                  href="/explore"
                  className="view-more text-center cursor-pointer text-base text-[#0F0F0F] underline"
                >
                  <p>See all</p>
                </a>
              </div>
              <MobToppicks />
            </div>
          </>
        )}
      </div>
      <ReviewFormModal review={review} recipe={recipe} />
    </>
  );
}
export default RecipeDetails;
