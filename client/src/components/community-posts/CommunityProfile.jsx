"use client";
import { useCounter } from "@/state/counter.state";
import { Bookmark, ChartPolar, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommunityProfileSkeleton from "../common/skeletonloading/CommunityProfileSkeleton";

export default function CommunityProfile({ user }) {
  const [activeLink, setActiveLink] = useState("/community");
  const router = usePathname();

  const {
    postCount,
    setPostCount,
    followingCount,
    setFollowingCount,
    followersCount,
    setFollowersCount,
  } = useCounter();

  const [loading, setLoading] = useState(true);

  // Function to handle link click and set active link
  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  // Set default active link when component mounts
  useEffect(() => {
    try {
      setLoading(true);
      setActiveLink(router);
      setPostCount(user?.postCount ?? 0);
      setFollowersCount(user?.followerCount ?? 0);
      setFollowingCount(user?.followingCount ?? 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <aside className="w-[20%] bg-white flex flex-col items-center pt-6 sm:hidden sticky-sidebar">
      {loading ? (
        <CommunityProfileSkeleton />
      ) : (
        <div className="sticky flex flex-col items-center justify-center w-full top-3">
          <img
            height={100}
            width={100}
            className="object-cover border-4 border-black border-solid rounded-full"
            src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
          />
          <h3 className="my-4">{user?.full_name}</h3>

          <div className="flex w-[80%] justify-between m-4">
            <div>
              <h4 className="pb-2 text-center">{postCount}</h4>
              <small className="text-grey">Posts</small>
            </div>
            <div>
              <h4 className="pb-2 text-center">{followersCount}</h4>
              <small className="text-grey">Followers</small>
            </div>
            <div>
              <h4 className="pb-2 text-center">{followingCount}</h4>
              <small className="font-light text-grey">Following</small>
            </div>
          </div>
          <div className="w-full">
            <Link
              href={"/community"}
              className={activeLink === "/community" ? "active-link" : ""}
              onClick={() => handleLinkClick("/community")}
            >
              <div className="flex items-center gap-4 p-4 cust-border">
                <div className="profile-icons">
                  <ChartPolar size={24} color="#828282" weight="fill" />
                </div>
                <span className="text-secondary">My Feed</span>
              </div>
            </Link>
            <Link
              href={"/community/followings"}
              className={
                activeLink === "/community/followings" ? "active-link" : ""
              }
              onClick={() => handleLinkClick("/community/followings")}
            >
              <div className="flex items-center gap-4 p-4 cust-border">
                <div className="profile-icons">
                  <Users size={24} color="#828282" weight="fill" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-secondary">Following</span>{" "}
                  <div className="px-2 py-1 bg-gray-200 rounded-full text-grey ">
                    {followingCount}
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href={"/community/saved"}
              className={activeLink === "/community/saved" ? "active-link" : ""}
              onClick={() => handleLinkClick("/community/saved")}
            >
              <div className="flex items-center gap-4 p-4 cust-border">
                <div className="profile-icons">
                  <Bookmark size={24} color="#828282" weight="fill" />
                </div>
                <span className="text-secondary">Saved</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
