"use client";
import CommunityPostCard from "@/components/community-posts/CommunityPostCard";
import CreatePost from "@/components/modals/CreatePost";
import {
  bookmarkPost,
  getBookmarkedPosts,
} from "@/services/bookmarks.services";
import { createPostFeed } from "@/services/feeds-posts.services";
import { uploadService } from "@/services/upload.services";

import { getUserProfile } from "@/services/users.services";
import { ListChecks } from "@phosphor-icons/react";
import { Result, Spin, message } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CommunityPageSaved({ searchParams }) {
  const { data: session } = useSession();

  const router = useRouter();

  const { createPost, commentsId } = searchParams;

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMySavedPosts = async () => {
      try {
        setIsPending(true);
        const posts = await getBookmarkedPosts(
          session?.user?.accessToken?.accessToken
        );
        setPosts(posts);
      } catch (error) {
        return;
      } finally {
        setIsPending(false);
      }
    };

    fetchMySavedPosts();

    const fetchUserProfile = async () => {
      const user = await getUserProfile(
        session?.user?.accessToken?.accessToken
      );
      setUser(user);
    };

    if (!user) {
      fetchUserProfile();
    }
  }, [session?.user?.accessToken?.accessToken]);

  const removeSavedPost = async (postId) => {
    try {
      const res = await bookmarkPost(
        session?.user?.accessToken?.accessToken,
        postId
      );

      if (res?.success == false) {
        message.error(res?.message);
      } else {
        const posts = await getBookmarkedPosts(
          session?.user?.accessToken?.accessToken
        );
        setPosts(posts);
      }
    } catch (err) {
      message.error(err.error?.toString() || err.message.toString());
    }
  };

  const handleSubmitPost = async (values) => {
    const { description, images, isPublic } = values;

    try {
      setLoading(true);

      const imagesUrls = images.length > 0 ? await uploadService(images) : [];

      const res = await createPostFeed(
        {
          description,
          isPublic,
          images: imagesUrls,
        },
        session?.user?.accessToken?.accessToken
      );

      if (res.success) {
        message.success(res.message);
        router.push("?createPost=false");
      } else {
        message.error("Failed to create post/feed. Please try again.");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isPending)
    return (
      <div className="flex justify-center my-10">
        <Spin />
      </div>
    );

  return (
    <>
      <div>
        <Link
          href={"?createPost=true"}
          scroll={false}
          className="block sm:hidden"
        >
          <div className="flex justify-between p-2 mt-6 mb-5 bg-white border border-solid border-primary rounded-10">
            <div>
              <Avatar
                size="small"
                src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
              />
              <small className="ml-4 text-secondary">
                What’s on your mind?
              </small>
            </div>
            <img src="/assets/svgs/image.svg" alt="" />
          </div>
        </Link>

        {posts?.length === 0 && (
          <Result
            icon={<ListChecks size={32} />}
            status="404"
            title="You don't have any saved posts"
            subTitle="Sorry, please start saving some posts to see them here."
          />
        )}

        {posts?.map((post, index) => (
          <CommunityPostCard
            post={{
              ...post,
              ...post.post,
            }}
            handleBookmarkAndUnbookmark={removeSavedPost}
            isPending={isPending}
            key={post._id}
            index={index}
            commentsId={Number(commentsId) === post.pk ? true : false}
          />
        ))}
      </div>
      <CreatePost
        handleSubmitPost={handleSubmitPost}
        isLoading={isLoading}
        isOpen={createPost === "true"}
      />
    </>
  );
}

export default CommunityPageSaved;
