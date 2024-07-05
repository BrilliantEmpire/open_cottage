import { Avatar, Button, Divider, Input } from "antd";
import React from "react";
import Link from "next/link";

export default function MobSuggestForYou({ users }) {
  return (
    <aside className="ml-5">
      <h3 className="mb-3 mt-6 uppercase">Suggested for you</h3>
      <div className="flex overflow-scroll">
        {users?.map((user) => (
          <>
            <div className="bg-white w-[128px] mr-2 rounded-6">
              <div className="w-[128px] flex items-center flex-col py-3">
                <Avatar
                  size="small"
                  src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
                />
                <div className="mt-2">
                  <Link href="/users-profile" className="text-black pb-1">
                    <p className="text-[14px] text-nowrap text-center font-medium">
                      {user?.full_name}
                    </p>
                  </Link>
                  <small className="text-grey text-center flex mt-1">
                    {user?.followers ?? 0} followers
                  </small>
                  <div className="px-2 py-1 border-solid border-[1px] mt-2 rounded-6 border-[#DEDEDE]">
                    <Button type="text" className="text-center font-medium">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </aside>
  );
}
