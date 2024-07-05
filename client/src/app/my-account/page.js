"use client";
import ProfileBanner from "@/components/profile/ProfileBanner";
import React, { useEffect, useState } from "react";
import LeftColumn from "@/components/profile/LeftColumn";
import { Spin, Tabs, message } from "antd";
import TabRecipes from "@/components/profile/TabRecipes";
import CommunityPostCard from "@/components/community-posts/CommunityPostCard";
import SavedRecipe from "@/components/profile/SavedRecipe";
import BackButton from "@/components/common/BackButton";
import { EditOutlined } from "@ant-design/icons";
import { getUserProfile } from "@/services/users.services";
import { redirect } from "next/navigation";
import {
  getMyCreatedPosts,
  likeAndUnlike,
  sharePost,
} from "@/services/feeds-posts.services";
import { useSession } from "next-auth/react";
import { bookmarkPost } from "@/services/bookmarks.services";
import { addPostComment } from "@/services/comments.services";
import BannerSkeleton from "@/components/common/skeletonloading/common skeleton/BannerSkeleton";
import PostSkeleton from "@/components/common/skeletonloading/common skeleton/PostSkeleton";

const Profile = ({ searchParams }) => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const fetchMySavedPosts = async () => {
    try {
      const posts = await getMyCreatedPosts(
        session?.user?.accessToken?.accessToken
      );
      setPosts(posts);
    } catch (error) {
      setPosts([]);
    }
  };

  if (!session) {
    redirect("/");
  }

  const { commentsId } = searchParams;

  useEffect(() => {
    setIsPending(true);
    fetchMySavedPosts();

    const fetchUserProfile = async () => {
      const user = await getUserProfile(
        session?.user?.accessToken?.accessToken
      );
      setUser(user);
    };

    if (!user) {
      fetchUserProfile().then(() => setIsPending(false));
    }
  }, []);

  const bookmarkAndUnbookmarkPost = async (postId) => {
    try {
      const res = await bookmarkPost(
        session?.user?.accessToken?.accessToken,
        postId
      );

      if (res?.success == false) {
        message.error(res?.message);
      } else {
        await fetchMySavedPosts();
        message.success(res?.message);
      }
    } catch (err) {
      message.error(err.error?.toString() || err.message.toString());
    }
  };

  //like and unlike post
  const likeAndUnlikePost = async (postId) => {
    try {
      const res = await likeAndUnlike(
        postId,
        session?.user?.accessToken?.accessToken
      );
      if (res?.success == false) {
        message.error(res?.message);
      } else {
        await fetchMySavedPosts();
        message.success(res?.message);
      }
    } catch (err) {
      message.error(err.error?.toString() || err.message.toString());
    }
  };

  // share a post
  const shareAPost = async (postId) => {
    try {
      const res = await sharePost(
        postId,
        session?.user?.accessToken?.accessToken
      );
      if (res?.success == false) {
        message.error(res?.message);
      } else {
        await fetchMySavedPosts();
        message.success(res?.message);
      }
    } catch (err) {
      message.error(err.error?.toString() || err.message.toString());
    }
  };

  // add a comment
  const addComment = async (data) => {
    try {
      const { post, comment, rating } = data;

      const res = await addPostComment(
        session?.user?.accessToken?.accessToken,
        {
          post,
          comment,
          rating,
        }
      );
      if (res.success) {
        message.success(res.message);
        await fetchMySavedPosts();
      } else {
        message.error("Failed to create post/feed. Please try again.");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="relative userprofile-age">
        <div>
          <div className="user-banner relative">
            {isPending ? <BannerSkeleton /> : <ProfileBanner />}
          </div>
          <div className="absolute right-[4%] top-[1.1%] px-[24px] py-[14px] bg-black bg-opacity-40 text-white rounded-6 sm:top-[1.9%] sm:right-[15%] sm:p-[6px]">
            <label
              htmlFor="photo-upload"
              className="flex gap-2 items-center cursor-pointer"
            >
              <EditOutlined size={24} color="#fff" />
              <span className="text-white block sm:hidden">Change Cover</span>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end px-24 my-8 sm:px-0 sm:mt-0 sm:flex-wrap">
          {/* Left Column */}
          <div className="absolute w-1/4 top-8 left-24 sm:w-full left-col">
            <LeftColumn user={user} />
          </div>

          {/* Right Column */}
          <div className="w-[69%] sm:w-full right-col sm:mb-4 my-acc-tab">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: "Posts",
                  key: "1",
                  children: isPending ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex flex-col m-2">
                        <PostSkeleton />
                      </div>
                    ))
                  ) : (
                    <div>
                      {posts?.map((post, index) => (
                        <CommunityPostCard
                          post={post}
                          key={post._id}
                          index={index}
                          handleBookmarkAndUnbookmark={
                            bookmarkAndUnbookmarkPost
                          }
                          handleLikeAndUnlike={likeAndUnlikePost}
                          handleSharePost={shareAPost}
                          handleComment={addComment}
                          commentsId={
                            Number(commentsId) === post.pk ? true : false
                          }
                        />
                      ))}
                    </div>
                  ),
                },
                {
                  label: "Recipes",
                  key: "2",
                  children: <TabRecipes session={session} />,
                },
                {
                  label: "Saved Recipes",
                  key: "3",
                  children: <SavedRecipe />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
