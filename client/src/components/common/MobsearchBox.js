//import React from "react";
"use client";
import React, { createContext } from "react";
import { DatePicker, Button, Input, Checkbox, Form, Carousel } from "antd";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import FilterButton from "./FilterButton";
import { categories } from "@/data/categories";
import {
  SquaresFour,
  Rows,
  MagnifyingGlass,
  ThumbsDown,
} from "@phosphor-icons/react";
import Link from "next/link";

const MobSearchBox = ({ searchParams, layout }) => {
  const { Search } = Input;
  // Define the settings for the carousel
  const carouselSettings = {
    slidesToShow: 3, // Show 1 slide at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    dots: false, // Hide the dots navigation
    arrows: false, // Show navigation arrows
    autoplay: false,
  };
  return (
    <div className="mob-explore">
      <div className="mt-4 px-24 sm:px-3">
        <h2 className="mt-4" style={{ marginRight: "auto" }}>
          Explore
        </h2>
        <div className="flex justify-between items-center mt-5">
          <div style={{ marginRight: "8px" }} className="w-full">
            <Input
              prefix={<MagnifyingGlass size={28} />}
              placeholder="Search"
              className="mr-2 text-black"
              style={{ color: "#98989A", height: "40px" }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href={layout ? "?layout=list&filter=true" : "?filter=true"}>
              <div>
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#288B22",
                    height: "40px",
                    backgroundColor: "#288B22",
                    paddingLeft: "7px",
                    paddingRight: "7px",
                  }}
                >
                  {/* <img
                    src="/assets/svgs/filter.svg"
                    alt="Filter icon"
                    style={{
                      height: "23px",
                      width: "23px",
                    }}
                  /> */}
                  <ThumbsDown size={26} color="white" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 pl-24 sm:pl-4">
        <Carousel {...carouselSettings}>
          {categories.map((cat) => (
            <div key={cat.id}>
              <FilterButton category={cat} searchParams={searchParams} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MobSearchBox;
