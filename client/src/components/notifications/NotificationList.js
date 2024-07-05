"use client"; // NotificationList.js
import React, { useEffect, useState } from "react";
import { List, Avatar, Skeleton } from "antd";
import { notifications } from "@/data/notification.js";
import Link from "next/link";
import { CaretLeft, Heart, Square } from "@phosphor-icons/react";
import { SquaresFour } from "@phosphor-icons/react/dist/ssr";

const NotificationList = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-7 lg:my-0 notify-sec">
      <div className="flex items-center justify-between lg:bg-white lg:p-2">
        <h2 className="flex items-center text-[32px] font-semibold text-center lg:text-base">
          <CaretLeft size={20} className="hidden lg:block" />
          Notifications
        </h2>

        <Link
          href="/all-read"
          className="block text-right cursor-pointer text-base lg:text-sm text-[#666666] underline"
        >
          Mark all as read
        </Link>
      </div>
      <div className="py-3 mt-4 bg-white rounded-t-lg sm:mt-2 lg:bg-transparent">
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          // loading={loading} // Set loading state for the List component
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className="relative transition duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
            >
              {/* Render Skeleton when loading */}
              <Skeleton loading={loading} avatar active>
                <div className="relative mr-3">
                  {item.online ? (
                    <span className="inline-block w-2.5 h-4 mr-5 sm:mr-3 bg-[#288B22] rounded-r-full"></span>
                  ) : (
                    <span className="inline-block w-2.5 h-4 mr-5 sm:mr-3"></span>
                  )}
                  {item.liked && ( // Conditionally render the heart icon
                    <Heart
                      weight="fill"
                      size={12}
                      color="#ffffff"
                      className="absolute bottom-0 right-0 z-40 p-1 bg-red-500 border border-white border-solid rounded-full"
                    />
                  )}
                  <Avatar src={item.pic} />
                </div>
                <List.Item.Meta
                  title={
                    <div>
                      <span className="mr-2 text-base font-bold lg:text-xs">
                        {item.name}
                      </span>
                      <span className="text-base font-normal text-gray-500 lg:text-xs">
                        {item.commented && "commented on your post"}
                        {item.liked && "liked your post"}
                        {item.follow && "followed you"}
                      </span>
                    </div>
                  }
                  description={
                    <span className="text-sm text-gray-500 lg:text-xs">
                      {item.time}
                    </span>
                  }
                />
                <div className="pr-5">
                  {item.recipeimage && (
                    <img
                      src={item.recipeimage}
                      alt="Recipe"
                      className="w-12 h-12 ml-4"
                    />
                  )}
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default NotificationList;
