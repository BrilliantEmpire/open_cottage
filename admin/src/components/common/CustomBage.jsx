/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function CustomBage({ count }) {
  return (
    <span className="h-6 w-6 bg-primary text-white flex justify-center items-center text-[12px] text-center ml-2  rounded-full">
      {count}
    </span>
  );
}

export default CustomBage;
