import React from "react";
import { Star, ChatsCircle } from "@phosphor-icons/react/dist/ssr";
function RecipeRating({ recipe }) {
  return (
    <div>
      {/* for desktop */}
      <div className="block lg:hidden p-5 mt-4 bg-white rounded-xl border-separate border-spacing-2 border border-[#DEDEDE] border-solid">
        <div className="flex items-center">
          <Star weight="fill" size={22} color="#D0001E" />
          <p className="pl-3 text-base text-dark">
            {recipe?.number_of_rating}{" "}
            <span className="text-secondary">
              ({recipe.number_of_rating} Ratings)
            </span>
          </p>
        </div>
        <div className="flex items-center pt-2">
          <img src="/chat.png" alt="ChatsCircle" />
          <p className="pl-3 text-base text-dark">
            {recipe?.number_of_reviews} Comments
          </p>
        </div>
      </div>
      {/* for mobile */}
      <div className="hidden lg:block">
        {/* removed as per client  */}
        {/* <div className="flex items-center">
          <Star weight="fill" size={22} color="#D0001E" />
          <p className="pl-3 text-base text-dark">
            {recipe.star}{" "}
            <span className="text-secondary">{recipe.rating}</span>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default RecipeRating;
