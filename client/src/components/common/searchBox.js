//import React from "react";
"use client";
import React, { createContext } from "react";
import { DatePicker, Button, Input, Checkbox, Form } from "antd";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import FilterButton from "./FilterButton";
import { categories } from "@/data/categories";
import { SquaresFour, Rows, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";

const SearchBox = ({ searchParams, layout }) => {
  const { Search } = Input;

  return (
    <div>
      <div
        className="mt-4 px-24 sm:px-3"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2 className="mt-4" style={{ marginRight: "auto" }}>
          Explore
        </h2>
        <div className="flex mt-5">
          <div style={{ marginRight: "8px" }}>
            <Input
              prefix={<MagnifyingGlass size={28} />}
              placeholder="Search"
              className="mr-2 text-black"
              style={{ color: "#98989A", height: "40px" }}
            />
          </div>
          <Link href={layout ? "?layout=list&filter=true" : "?filter=true"}>
            <div style={{ marginRight: "8px" }}>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  color: "#98989A",
                  width: window.innerWidth <= 600 ? "50px" : "100px",
                  backgroundColor:
                    window.innerWidth <= 600 ? "#288B22" : "transparent",
                }}
              >
                <img
                  src="/assets/svgs/filter.svg"
                  alt="Filter icon"
                  className="mr-[8px] h-[23px] w-[23px]"
                />
                {window.innerWidth > 600 && "Filter"}
              </Button>
            </div>
          </Link>
          <div className="ml-1 flex items-center w-[70px] h-[37px] justify-evenly bg-white rounded-4 border border-gray-300 border-solid pb-[1px]">
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
      </div>
      <div className="flex mt-4 pl-24 sm:pl-4">
        {categories?.map((cat) => (
          <FilterButton
            key={cat.id}
            category={cat}
            searchParams={searchParams}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
