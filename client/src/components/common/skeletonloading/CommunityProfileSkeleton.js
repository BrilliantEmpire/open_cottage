import React from "react";

function CommunityProfileSkeleton() {
  return (
    <div className="sticky flex flex-col items-center justify-center w-full top-3">
      <div className="border border-solid border-transparent bg-slate-300 rounded-full h-36 w-36 shimmer " />
      <div className="border border-solid border-transparent bg-slate-300 h-5 w-1/2 shimmer mt-2 " />
      <div className="flex justify-around mt-3 w-full">
        <div className="border border-solid border-transparent h-12 w-10 bg-slate-300 mt-2  shimmer" />
        <div className="border border-solid border-transparent h-12 w-10 bg-slate-300 mt-2  shimmer" />
        <div className="border border-solid border-transparent h-12 w-10 bg-slate-300 mt-2  shimmer" />
      </div>
      <div className="border border-solid bg-slate-300 border-transparent h-6 w-full mt-2 shimmer " />
      <div className="border border-solid bg-slate-300 border-transparent h-6 w-full mt-2 shimmer " />
      <div className="border border-solid bg-slate-300 border-transparent h-6 w-full mt-2 shimmer " />
    </div>
  );
}

export default CommunityProfileSkeleton;
