"use client";
import { Avatar, Button, Divider, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  followAndUnfollower,
  suggestFollowers,
} from "@/services/followers.services";
import { useSession } from "next-auth/react";
import { useCounter } from "@/state/counter.state";
import UserFollower from "../common/skeletonloading/UserFollower";

export default function SuggestForYou({ users: propsUsers }) {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [skeletonUsers, setSkeletonUsers] = useState(new Array(7).fill({}));
  const { followingCount, setFollowingCount } = useCounter();

  const fetchInitialUsers = async () => {
    const initialUsers = await suggestFollowers(
      session?.user?.accessToken?.accessToken,
      0,
      5
    );
    setUsers(initialUsers);
  };

  const fetchRemainingUsers = async () => {
    const remainingUsers = await suggestFollowers(
      session?.user?.accessToken?.accessToken,
      5
    );
    setUsers((prevUsers) => [...prevUsers, ...remainingUsers]);
    setSkeletonUsers([]);
  };

  useEffect(() => {
    if (session) {
      setIsPending(true);
      fetchInitialUsers().then(() => {
        setIsPending(false);
        fetchRemainingUsers();
      });
    }
  }, [session]);

  const followAndUnfollowAuthor = async (id) => {
    try {
      const res = await followAndUnfollower(
        id,
        session?.user?.accessToken?.accessToken
      );
      if (res?.success) {
        fetchInitialUsers().then(() => fetchRemainingUsers());
        setFollowingCount(followingCount + 1);
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-[20%] bg-white p-4 sm:hidden">
      <Input
        type="search"
        prefix={<img src="/assets/svgs/search.svg" />}
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h3 className="my-6">Suggested for you!</h3>
      {isPending ? (
        <>
          {skeletonUsers.map((_, index) => (
            <>
              <UserFollower key={index} />
              <Divider />
            </>
          ))}
        </>
      ) : (
        <>
          {filteredUsers?.map((user) => (
            <React.Fragment key={user?._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar
                    size="small"
                    src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
                  />
                  <div>
                    <Link href="/users-profile" className="text-black">
                      <p className="text-[14px] text-nowrap pb-1">
                        {user?.full_name}
                      </p>
                    </Link>
                    <small className="text-grey">
                      {user?.followers ?? 0} followers
                    </small>
                  </div>
                </div>
                <Button
                  type="text"
                  onClick={() => followAndUnfollowAuthor(user._id)}
                >
                  Follow
                </Button>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </>
      )}
    </aside>
  );
}
