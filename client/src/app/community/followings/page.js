"use client";
import {
  followAndUnfollower,
  getMyFollowings,
} from "@/services/followers.services";
import { useCounter } from "@/state/counter.state";
import { Button, Card, Divider, Spin, message } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function FollowingsPage({ searchParams }) {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const { followingCount, setFollowingCount } = useCounter();

  const fetchUsers = async () => {
    const users = await getMyFollowings(
      session?.user?.accessToken?.accessToken
    );
    setUsers(users);
  };

  useEffect(() => {
    setIsPending(true);
    fetchUsers().then(() => setIsPending(false));
  }, []);

  const followAndUnfollowAuthor = async (user) => {
    try {
      const res = await followAndUnfollower(
        user,
        session?.user?.accessToken?.accessToken
      );
      if (res?.success) {
        fetchUsers();
        setFollowingCount(followingCount - 1);
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  if (isPending)
    return (
      <div className="flex justify-center my-10">
        <Spin />
      </div>
    );

  if (!users || users.length === 0) {
    return (
      <div className="text-center mt-10">
        <h3>No followings</h3>

        <Divider />
        <p>Please follow someone to see their posts</p>
      </div>
    );
  }

  return (
    <>
      {users?.map((user) => (
        <div key={user._id} className="my-4">
          <Card>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Avatar
                  size="small"
                  src={user?.user?.profile_image ?? "/assets/users/avatar.jpeg"}
                />
                <div>
                  <h3 className="text-[16px] text-nowrap">
                    {user?.user?.full_name}
                  </h3>
                  <small className="text-grey">
                    {user?.user?.followers} followers
                  </small>
                </div>
              </div>
              <Button onClick={() => followAndUnfollowAuthor(user?.user?._id)}>
                Unfollow
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}

export default FollowingsPage;
