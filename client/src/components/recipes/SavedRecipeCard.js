import { Star } from "@phosphor-icons/react/dist/ssr";
import { Button, Card, Col, Spin } from "antd";
import Link from "next/link";
import React from "react";

export default function RecipeCard({ recipe, onRemove, isPending }) {
  return (
    <Col key={recipe?.id} xs={24} sm={12} md={6} lg={6}>
      <div className="w-full">
        <Card hoverable className="h-96 overflow-hidden bg-transparent ">
          <img
            alt={recipe?.title}
            src={recipe?.images[0]}
            className="relative w-full h-44"
          />
          {/* remoived as per client */}
          {/* <div className="flex flex-row items-center mt-2 mb-2">
            <Star size={22} className="pr-2 text-danger" weight="fill" />
            <p className="pr-1 text-sm">{recipe?.star}</p>
            <p className="text-sm tracking-wider text-[#98989A]">
              {recipe?.rating}
            </p>
          </div> */}
          <Link
            href={`/recipes/${recipe?.slug}`}
            className="text-black hover:text-primary"
          >
            <strong className="block mt-4 text-xl tracking-[0.4px]">
              {recipe?.title}
            </strong>
          </Link>
          <p
            className="mt-2 overflow-hidden text-base tracking-wide text-secondary"
            style={{ textOverflow: "ellipsis" }}
          >
            {recipe?.description.length > 97
              ? recipe?.description.substring(0, 97) + "..."
              : recipe?.description}
          </p>
          <div className="save-remove-btn absolute top-[5%] right-[8%]">
            {isPending ? (
              <Spin size="small" />
            ) : (
              <Button onClick={() => onRemove(recipe._id)} type="button">
                <span>Remove</span>
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Col>
  );
}
