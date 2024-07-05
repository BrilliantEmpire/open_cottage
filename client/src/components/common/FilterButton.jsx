import Link from "next/link";
import React from "react";

export default function FilterButton({ category, color, searchParams }) {
  console.log(searchParams);

  // Define a variable to hold the left margin class
  let marginLeftClass = "mx-2";

  // If it's the first button, set marginLeftClass to "ml-0"
  if (!searchParams.category) {
    marginLeftClass = "ml-0 mx-2";
  }

  return (
    <Link
      href={"?category=" + category.name}
      className={`${
        searchParams.category === category?.name
          ? color
          : "bg-white hover:bg-black"
      } hover:text-white mr-2 border-1 border-solid border-[#EEEEEE] px-4 py-2 no-underline text-secondarylight rounded text-sm`}
      hoverStyle={{ backgroundColor: "#EEEEEE", color: "#0F0F0F" }}
    >
      {category.name}
    </Link>
  );
}
