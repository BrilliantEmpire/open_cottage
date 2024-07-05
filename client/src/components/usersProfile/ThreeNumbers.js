import React from "react";
import { user } from "@/data/users";

function ThreeNumbersUses() {
  return (
    <div className="flex justify-around mb-8 text-center sm:bg-[#F7F7F7] sm:p-3">
      <div>
        <p className="text-2xl font-bold text-[#333333]">{user.posts.length}</p>
        <p className="text-sm text-secondary">Posts</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#333333]">{user.followers}</p>
        <p className="text-sm text-secondary">Followers</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#333333]">{user.following}</p>
        <p className="text-sm text-secondary">Following</p>
      </div>
    </div>
  );
}

export default ThreeNumbersUses;
