import { Card } from "antd";
import React from "react";

function SkeletonCard() {
  return (
    <div className="w-full flex justify-center items-center  bg-gray-100 shimmer">
      <Card className="h-96 overflow-hidden bg-transparent p-4 shadow-lg w-full border border-solid border-gray-300 shimmer">
        <div className="w-auto h-44 bg-gray-200 animate-pulse rounded-md mb-2 shimmer"></div>
        <div className=" h-6 bg-gray-200 animate-pulse rounded-md my-4 shimmer"></div>
        <div className=" h-4 bg-gray-200 animate-pulse rounded-md my-4 shimmer"></div>
        <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded-md mb-2 shimmer"></div>
        <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded-md mb-2 shimmer"></div>
        <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded-md mb-4 shimmer"></div>
      </Card>
    </div>
  );
}

export default SkeletonCard;
