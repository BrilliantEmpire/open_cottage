import React from "react";
import { Carousel } from "antd";
import { products } from "@/data/products";
import Title from "../title/Title";
import RecipeCard from "../recipes/RecipeCard";
import Link from "next/link";
import MobRecipeCardList from "../recipes/MobRecipeCardList";
import RecipeCardList from "../recipes/RecipeCardList";

const MobToppicks = () => {
  const heading = "top picks for you";
  const latestProducts = products.slice(0, 4);

  // Define the settings for the carousel
  const carouselSettings = {
    slidesToShow: 1.5, // Show 1 slide at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    infinite: true, // Allow infinite scrolling
    dots: false, // Hide the dots navigation
    arrows: true, // Show navigation arrows
    autoplay: false, // Disable autoplay
  };

  return (
    <div className="relative z-10 hidden mt-12 sm:mt-3 md:block">
      <div className="flex items-end justify-between top-pic-sec">
        <Title title={heading} />
        <Link
          href="/explore"
          className="view-more text-center cursor-pointer text-base text-[#0F0F0F] underline"
        >
          <p>See all</p>
        </Link>
      </div>
      <div className="pt-3 home-carousel-sec sm:pt-0">
        <Carousel {...carouselSettings}>
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between mob-slider-home"
            >
              <div className="mr-2">
                <RecipeCard product={product} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MobToppicks;
