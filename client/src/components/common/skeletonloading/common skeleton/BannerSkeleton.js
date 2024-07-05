import React from "react";

function BannerSkeleton() {
  return (
    <div className=" w-full sm:p-0">
      <div
        className="relative flex items-center h-64  mt-6 text-white sm:p-0 sm:h-42 sm:mt-0 sm:rounded-none sm:justify-center rounded-3xl"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-64 mb-4 border border-solid rounded-md border-transparent bg-slate-200 shimmer" />
      </div>
    </div>
  );
}

export default BannerSkeleton;
