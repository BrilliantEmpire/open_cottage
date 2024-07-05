"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Avatar } from "antd";
import { user } from "@/data/users";
import { EditOutlined, CameraOutlined } from "@ant-design/icons";
import FollowMe from "./FollowMe";
import { Camera } from "@phosphor-icons/react/dist/ssr";
import ThreeNumbers from "./ThreeNumbers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LeftColumProfile from "../common/skeletonloading/LeftColumProfile";

function LeftColumn({ user }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const router = usePathname();

  return (
    <div className="px-4 pt-10 pb-5 bg-white border-solid rounded-lg sm:px-0 sm:pt-0 sm:pb-0 border-[#EEEEEE] border-[1px] sm:relative sm:rounded-0">
      {/* Profile Image */}

      {loading ? (
        <LeftColumProfile />
      ) : (
        <>
          <div className="sm:px-3">
            <div className="w-full mb-4 overflow-hidden text-center sm:w-[95%] rounded-full sm:absolute sm:top-[-15%]">
              <img
                src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
                alt="Profile"
                className="sm:w-[90px] sm:h-[90px] w-[142px] h-[142px]] border-solid border-white border-3 rounded-full"
              />
              {/* <div className="absolute bottom-[10%] right-[26%] p-1 pb-[1px] bg-primary rounded-full cursor-pointer">
          <Camera size={18} color="#FFFFFF" weight="fill" />
        </div> */}
            </div>

            {/* User Name */}
            <h2 className="mb-8 sm:mt-[13%] text-2xl font-bold text-center sm:mb-2">{`${user?.full_name}`}</h2>
            <p className="hidden mb-4 text-base text-secondary sm:block sm:text-center">
              {user?.about}
            </p>
            {/* Edit Profile Button */}
            <div className="mx-auto mb-8 user-btn flex flex-col gap-2">
              <Button icon={<EditOutlined />} href="/settings">
                Edit Profile
              </Button>
              <Link
                /* href={session ? "/create-recipe" : "/?auth=login"}*/
                href="/create-recipe"
                className={`flex items-center justify-center gap-2 no-underline border rounded-4 ${
                  router.includes("/create-recipe")
                    ? "bg-primary text-white"
                    : " bg-[#F3F3F3]  text-secondary"
                } `}
                size="large"
                type="primary"
                title="Home"
              >
                <Image
                  src={
                    router.includes("/create-recipe")
                      ? "/icons/create-recipe.png"
                      : "/assets/svgs/reserve.svg"
                  }
                  height={20}
                  width={20}
                />
                <span>Create Recipe</span>
              </Link>
            </div>
            {/* Posts, Followers, Following Section */}
            <ThreeNumbers user={user} />

            {/* About Text */}
            <p className="block mb-3 text-base font-bold sm:hidden">About</p>
            <p className="block mb-4 text-base text-secondary sm:hidden sm:text-center">
              {user?.about}
            </p>
          </div>
          <div className="sm:block hidden sm:bg-[#F7F7F7] p-3"></div>
          {/* Follow Me */}
          <div className="sm:p-3">
            <FollowMe />
          </div>
          <div className="sm:block hidden sm:bg-[#F7F7F7] p-3"></div>
        </>
      )}
    </div>
  );
}

export default LeftColumn;
