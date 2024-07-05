import React from "react";
import { Card } from "antd";
import Link from "next/link";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { CommentOutlined } from "@ant-design/icons";

const MobRecipeCardList = ({ recipe }) => {
  return (
    <div key={recipe.id}>
      <Link href={`/recipes/${recipe.slug}`}>
        <Card
          hoverable
          className="w-full h-full overflow-hidden bg-transparent"
        >
          <div className="flex flex-row w-full gap-4">
            {/* First Column - Image */}
            <div className="w-[35%]">
              {/* Adjust the width as per your requirement */}
              <img
                alt={recipe.name}
                src={recipe.images[0] ?? ""}
                className="w-full h-full"
              />
            </div>

            <div className="w-[65%]">
              <strong className="block text-base">{recipe.name}</strong>
              <p
                className="mt-2 overflow-hidden text-base tracking-wide text-secondary"
                style={{ textOverflow: "ellipsis" }}
              >
                {recipe.description.length > 97
                  ? recipe.description.substring(0, 97) + "..."
                  : recipe.description}
              </p>
            </div>
          </div>
          {/* Third Column - Rating */}
          <div className="flex justify-evenly mt-4 md:border-0 md:border-solid md:border-y-1  py-2 md:border-[#F4F4F4]">
            {/* Adjust the width as per your requirement */}
            <div className="flex items-center">
              <Star size={24} className="pr-1 text-danger" weight="fill" />
              <p className="pr-1 text-sm">{recipe.star}</p>
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
                {recipe.people}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm tracking-wider text-black">
              <img
                src="/assets/users/Ellipse.png"
                className="inline w-5 h-5 mr-1 align-middle"
                alt="User Icon"
              />
              {recipe.username}
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default MobRecipeCardList;
