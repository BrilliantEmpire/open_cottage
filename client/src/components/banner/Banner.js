"use client";
import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function Banner() {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue) {
      router.push("?search=" + newValue);
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className="relative flex items-center h-64 p-8 mt-6 text-white sm:p-0 sm:h-42 sm:mt-0 sm:rounded-none sm:justify-center rounded-3xl"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(0 0 0 / 83%), rgb(0 0 0 / 4%)), url(/banner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10 text-left w-full flex flex-col items-start sm:items-center">
        <h1 className="text-[32px] lg:text-[28px] mb-4 sm:text-center text-left font-bold">
          Cooking Simplified!
          <br /> Recipes and Grocery Lists Made Easy.
        </h1>
        <div className="flex items-center">
          <Input
            placeholder="Search for a recipe"
            addonAfter={
              <Link href={{ query: searchParams.toString() }}>
                <SearchOutlined />{" "}
              </Link>
            }
            size="medium"
            className="p-2 w-80 banner-search"
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="text-left"></div>
    </div>
  );
}

export default Banner;
