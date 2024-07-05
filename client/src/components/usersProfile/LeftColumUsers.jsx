"use client";
import { Button, Divider, Avatar } from "antd";
import { user } from "@/data/users";
import { EditOutlined, CameraOutlined } from "@ant-design/icons";
import FollowMeUsers from "./FollowMeUsers";
import ThreeNumbersUses from "./ThreeNumbers";
import React, { useState } from "react";
function LeftColumnUsers() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <div className="px-4 pt-10 pb-5 bg-white border-solid rounded-lg sm:px-0 sm:pt-0 sm:pb-0 border-[#EEEEEE] border-[1px] sm:relative sm:rounded-0">
      {/* Profile Image */}
      <div className="sm:px-3">
        <div className="w-full mb-4 overflow-hidden text-center sm:w-[95%] rounded-full sm:absolute sm:top-[-15%]">
          <img
            src={user.image}
            alt="Profile"
            className="sm:w-[90px] sm:h-[90px] w-[142px] h-[142px]] border-solid border-white border-3 rounded-full"
          />
        </div>

        {/* User Name */}
        <h2 className="mb-8 sm:mt-[13%] text-2xl font-bold text-center sm:mb-2">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="hidden mb-4 text-base text-secondary sm:block sm:text-center">
          {user.about}
        </p>

        {/* Posts, Followers, Following Section */}
        <ThreeNumbersUses />
        {/* Edit Profile Button */}
        <div className="mx-auto mb-8 follow-btn sm:mb-4">
          <Button
            href="#"
            onClick={handleFollowClick}
            type={isFollowing ? "primary" : "default"}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* About Text */}
        <p className="block mb-3 text-base font-bold sm:hidden">About</p>
        <p className="block mb-4 text-base text-secondary sm:hidden sm:text-center">
          {user.about}
        </p>
      </div>
      <div className="sm:block hidden sm:bg-[#F7F7F7] p-3"></div>
      {/* Follow Me */}
      <div className="sm:p-3">
        <FollowMeUsers />
      </div>
      <div className="sm:block hidden sm:bg-[#F7F7F7] p-3"></div>
    </div>
  );
}

export default LeftColumnUsers;
