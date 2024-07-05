"use client";
import { Card, Col } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import SkeletonCard from "../common/skeletonloading/common skeleton/SkeletonCard";
import WordLimit from "@/app/utils/wordLimit";
// Import Star from Phosphor icons if needed, currently commented out
// import { Star } from "@phosphor-icons/react/dist/ssr";

const RecipeCard = ({ recipe }) => {
  const [isPending, setIsPending] = useState(true);
  const { title, description, images } = recipe || {};

  useEffect(() => {
    if (recipe) {
      setIsPending(false);
    }
  }, [recipe]);

  return (
    <Col xs={24} sm={12} md={6} lg={6}>
      <Link className="w-full" href={`/recipes/${recipe?.slug}`}>
        {isPending ? (
          <SkeletonCard />
        ) : (
          <Card className="h-96 overflow-hidden bg-transparent">
            <img
              alt={title || ""}
              src={Array.isArray(images) && images.length > 0 ? images[0] : ""}
              className="w-full h-44 rounded-lg"
            />
            <div className="flex flex-row items-center mt-2 mb-2">
              {/* removed as per client */}
              {/* <Star size={22} className="pr-2 text-danger" weight="fill" />
              {recipe?.ratings?.toFixed(1) || 0}{" "}
              <span className="text-[#98989A] ml-1">
                ({recipe?.number_of_rating}{" "}
                {recipe?.number_of_rating === 1 ? "rating" : "ratings"})
              </span> */}
            </div>
            <strong className="block mt-4 text-xl tracking-[0.4px] sm:text-base">
              {title || "No title available"}
            </strong>

            <p
              className="mt-2 overflow-hidden text-base tracking-wide text-secondary"
              style={{ textOverflow: "ellipsis" }}
            >
              {WordLimit(description, 22) || "No description available"}
              {/* {description || "No description available"} */}
            </p>
          </Card>
        )}
      </Link>
    </Col>
  );
};

export default RecipeCard;
