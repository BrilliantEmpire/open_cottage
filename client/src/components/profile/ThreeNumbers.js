import React from "react";
import { user } from "@/data/users";

function ThreeNumbers({ user }) {
  return (
    <div className="flex justify-around mb-8 text-center">
      <div>
        <p className="text-2xl font-bold text-[#333333]">{user?.postCount}</p>
        <p className="text-sm text-secondary">Posts</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#333333]">
          {user?.followerCount ?? 0}
        </p>
        <p className="text-sm text-secondary">Followers</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#333333]">
          {user?.followingCount ?? 0}
        </p>
        <p className="text-sm text-secondary">Following</p>
      </div>
    </div>
  );
}

export default ThreeNumbers;
