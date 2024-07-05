import React from "react";

function LeftColumProfile() {
  return (
    <div>
      <div className="sm:px-3 flex flex-col items-center w-full">
        <div className="border border-solid border-transparent rounded-full h-36 w-36 bg-slate-300 my-10 shimmer" />

        {/* User Name */}
        <div className="border border-solid border-transparent bg-slate-300 h-10 w-1/2 shimmer " />

        {/* Edit Profile Button */}
        <div className="border border-solid border-transparent h-12 w-full bg-slate-300 mt-2 rounded-lg shimmer" />
        <div className="border border-solid border-transparent h-12 w-full bg-slate-300 mt-2 rounded-lg shimmer" />
        <div className="flex gap-4 w-full">
          {/* Posts, Followers, Following Section */}
          <div className="border border-solid border-transparent h-12 w-full bg-slate-300 mt-2 rounded-lg shimmer" />
          <div className="border border-solid border-transparent h-12 w-full bg-slate-300 mt-2 rounded-lg shimmer" />
          <div className="border border-solid border-transparent h-12 w-full bg-slate-300 mt-2 rounded-lg shimmer" />
        </div>

        {/* About Text */}
        <div className="flex flex-col w-full mt-2">
          <div className="border border-solid bg-slate-300 h-5 w-full border-transparent mt-2 shimmer" />
          <div className="border border-solid bg-slate-300 h-5 w-full border-transparent mt-2 shimmer" />
          <div className="border border-solid bg-slate-300 h-5 w-1/4 border-transparent mt-2 shimmer" />
        </div>
        {/* social media accounts  */}
        <div className="flex w-full gap-2 mt-2">
          <div className="border border-solid border-transparent bg-slate-300 h-7 w-7  shimmer" />
          <div className="border border-solid border-transparent bg-slate-300 h-7 w-7  shimmer" />
          <div className="border border-solid border-transparent bg-slate-300 h-7 w-7  shimmer" />
          <div className="border border-solid border-transparent bg-slate-300 h-7 w-7  shimmer" />
        </div>
      </div>
    </div>
  );
}

export default LeftColumProfile;
