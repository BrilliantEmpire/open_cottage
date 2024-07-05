"use client";
import CommunityProfile from "@/components/community-posts/CommunityProfile";
import SuggestForYou from "@/components/community-posts/SuggestForYou";
import ProfileLeftSideBar from "@/components/profile/right_left_bars/LeftSideBar";
import MobProfileLeftSideBar from "@/components/profile/right_left_bars/MobLeftSideBar";
import RightSideBar from "@/components/profile/right_left_bars/RightSIdeBar";
import { getAllUsers } from "@/services/recipes.services";
import React from "react";

export default async function layout({ children }) {
  // const users = await getAllUsers();

  return (
    <main className="w-full">
      <div className="flex justify-between w-full gap-6 sm:flex-wrap md:gap-2">
        <div className="sm:w-full bg-white pt-6 w-[20%] md:w-1/4">
          <ProfileLeftSideBar />
          <MobProfileLeftSideBar />
        </div>
        <div
          style={{
            backgroundImage: "url(/assets/svgs/profile-svg.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center ",
          }}
          className="w-full setting-bgimage"
        >
          {children}
        </div>
        {/* <RightSideBar users={users} /> */}
      </div>
    </main>
  );
}
