import React from "react";
import { List } from "antd";
import { User, Bookmarks, Gear, SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const UserPopup = ({ user }) => {
  return (
    <div className="p-3 bg-white rounded-lg UserPopup-sec">
      <div>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={[
            {
              title: `${user?.full_name}`,
              icon: (
                <img
                  src={user?.profile_image}
                  className="w-8 h-8 rounded-full"
                />
              ),
              email: user?.email,
            },
            {
              title: "Go to Profile",
              icon: <User size={24} weight="fill" color="#666666" />,
              link: "/my-account",
            },
            // {
            //   title: "Saved Recipes",
            //   icon: <Bookmarks size={24} weight="fill" color="#666666" />,
            //   link: "/community/saved",
            // },
            {
              title: "Settings",
              icon: <Gear size={24} weight="fill" color="#666666" />,
              link: "/settings",
            },
            {
              title: "Logout",
              icon: <SignOut size={24} weight="fill" color="#666666" />,
              link: "/",
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item.link ? (
                    <Link
                      onClick={() => {
                        if (item.title === "Logout") {
                          signOut();
                        }
                      }}
                      href={item.link}
                    >
                      <div className="iconLink">{item.icon}</div>
                    </Link>
                  ) : (
                    item.icon
                  )
                }
                title={
                  item.link ? (
                    <Link
                      onClick={() => {
                        if (item.title === "Logout") {
                          signOut();
                        }
                      }}
                      href={item.link}
                      className="font-normal text-secondary"
                    >
                      <p className="text-sm group-hover:text-white">
                        {item.title}
                      </p>
                    </Link>
                  ) : (
                    <span className="font-normal text-secondary">
                      {item.title}
                    </span>
                  )
                }
                description={item.email && item.email}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default UserPopup;
