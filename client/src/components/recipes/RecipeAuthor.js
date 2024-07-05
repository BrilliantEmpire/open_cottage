// components/RecipeAuthor.js
"use client";
import {
  checkFollow,
  followAndUnfollower,
} from "@/services/followers.services";
import { message } from "antd";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function RecipeAuthor({ user }) {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [isPending, setIsPending] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    checkFollow(user?._id, session?.user?.accessToken?.accessToken).then(
      (res) => {
        if (res?.isFollowing == true) {
          setBgColor("#288B22");
          setIsFollowing(true);
        } else {
          setBgColor("#FFFFFF");
          setIsFollowing(false);
        }
      }
    );
  }, [session, user?._id]);

  const followAndUnfollowAuthor = async () => {
    try {
      setIsPending(true);
      const res = await followAndUnfollower(
        user?._id,
        session?.user?.accessToken?.accessToken
      );
      if (res?.success == false) {
        message.success(res?.message);
      } else {
        setIsFollowing(!isFollowing);
        if (bgColor === "#FFFFFF") {
          setBgColor("#288B22");
        } else {
          setBgColor("#FFFFFF");
        }
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-5 mt-4 bg-white rounded-xl border-separate border-spacing-2 border border-[#DEDEDE] border-solid">
      <p className="text-base block sm:hidden">Recipe by</p>
      <div className="flex items-center pt-3 sm:pt-0">
        <div className="flex-shrink-0">
          <img
            className="rounded-full h-16 w-16"
            src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-xl font-semibold text-gray-900 truncate">
            {user?.full_name ?? "Anonymous User"}
          </p>
          <p className="text-base text-secondary">{0} Followers</p>
        </div>
        <div className="hidden sm:block">
          <a
            className="flex items-center justify-center text-black p-1 font-Lato border-[#DEDEDE] rounded-4 text-sm cursor-pointer border-solid border-1"
            style={{
              backgroundColor: bgColor,
              color: bgColor === "#FFFFFF" ? "#000" : "#FFFFFF",
            }}
            onClick={followAndUnfollowAuthor}
          >
            {isFollowing ? "Following" : "Follow"}
          </a>
        </div>
      </div>
      <div className="block sm:hidden">
        <button
          type="button"
          className="flex items-center justify-center w-full gap-2 py-2 mt-4 border-solid border-1 border-success rounded-4 text-base cursor-pointer"
          style={{
            backgroundColor: bgColor,
            color: bgColor === "#FFFFFF" ? "#288B22" : "#FFFFFF",
          }}
          onClick={followAndUnfollowAuthor}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default RecipeAuthor;
