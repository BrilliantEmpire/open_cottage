import React from "react";
import { Card } from "antd";
import Link from "next/link";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { CommentOutlined } from "@ant-design/icons";

const RecipeCardList = ({ recipe }) => {
  return (
    <div key={recipe.id}>
      <Link className="w-full" href={`/recipes/${recipe.slug}`}>
        <Card
          hoverable
          className="w-full h-full overflow-hidden bg-transparent"
        >
          <div className="flex flex-row gap-4">
            {/* First Column - Image */}
            <div className="w-[270px]">
              {/* Adjust the width as per your requirement */}
              <img
                alt={recipe.title}
                width={270}
                src={recipe.images[0] ?? ""}
                className="h-[190px] rounded-lg"
              />
            </div>

            <div
              style={{ width: "calc(100% - 270px)" }}
              className="relative border-r-2 border-solid border-[#D0D0D0] border-l-0 border-y-0"
            >
              <div>
                <strong className="block mt-4 text-xl">{recipe.title}</strong>
                <p
                  className="mt-2 overflow-hidden text-base tracking-wide text-secondary"
                  style={{ textOverflow: "ellipsis" }}
                >
                  {recipe.description.length > 97
                    ? recipe.description.substring(0, 97) + "..."
                    : recipe.description}
                </p>
              </div>

              <p className="text-[#98989A] absolute bottom-2 ">
                Recipe by:
                <br className="mt-1" />
                <span className="text-sm tracking-wider text-black">
                  <img
                    src={recipe?.user?.picture ?? "./assets/users/avatar.jpeg"}
                    className="inline w-5 h-5 mr-1 align-middle rounded-full"
                    alt="User Icon"
                  />
                  {recipe?.user?.full_name}
                </span>
              </p>
            </div>

            {/* Third Column - Rating */}
            <div className="w-[205px] flex flex-col justify-evenly">
              {/* Adjust the width as per your requirement */}
              <div className="flex items-center">
                <Star size={24} className="pr-1 text-danger" weight="fill" />
                {recipe?.ratings?.toFixed(1) || 0}{" "}
                <span className="text-[#98989A] ml-1">
                  ({recipe?.number_of_rating}{" "}
                  {recipe?.number_of_rating === 1 ? "rating" : "ratings"})
                </span>
              </div>
              <div className="flex items-center">
                <img
                  width={20}
                  height={20}
                  className="w-5 h-5"
                  src="./assets/svgs/messages.svg"
                  alt="Message Logo"
                />
                <p className="pl-2 text-sm tracking-wider text-black">
                  {recipe.comments}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  width={20}
                  height={20}
                  className="w-5 h-5"
                  src="./assets/svgs/winner.svg"
                  alt="Message Logo"
                />
                <p className="pl-2 text-sm tracking-wider text-black">
                  {recipe.people} made this!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default RecipeCardList;
