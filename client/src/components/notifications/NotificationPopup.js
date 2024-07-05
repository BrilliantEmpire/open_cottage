"use client";
import React, { useEffect, useState } from "react";
import { List, Avatar, Skeleton } from "antd";
import { notifications } from "../../data/notification.js";
import Link from "next/link";
import { CaretLeft, Heart } from "@phosphor-icons/react";

const NotificationPopup = () => {
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-lg lg:mt-0 notify-sec">
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-0 border-solid border-[#EDEDED] rounded-lg">
        <h2 className="flex items-center text-base font-bold text-center">
          <CaretLeft size={20} className="hidden lg:block" />
          Notifications
        </h2>
        <Link
          href="/all-read"
          className="block text-right cursor-pointer text-base lg:text-sm text-[#666666] underline hover:text-primary"
        >
          Mark Read
        </Link>
      </div>
      <div className="pb-3 bg-white rounded-t-lg lg:bg-transparent">
        <List
          itemLayout="horizontal"
          dataSource={notifications.slice(0, showAll ? undefined : 4)}
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
                    <span className="inline-block border-solid h-8 align-middle mr-2 border-0 border-l-4 border-[#0F0F0F]"></span>
                  ) : (
                    <span className="inline-block w-2.5 h-4 mr-2 "></span>
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
                      <span className="block mr-2 font-bold lg:text-xs">
                        {item.name}
                      </span>
                      <span className="font-normal text-gray-500 lg:text-xs">
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
                <div className="pr-4">
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
        <Link
          href="/notifications"
          className="block text-center hover:text-primary cursor-pointer text-base lg:text-sm text-[#0F0F0F] underline"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default NotificationPopup;
