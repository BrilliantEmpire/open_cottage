"use client";
import SkeletonSearch from "@/components/common/skeletonloading/SkeletonSearch";
import PostSkeleton from "@/components/common/skeletonloading/common skeleton/PostSkeleton";
import CommunityPostCard from "@/components/community-posts/CommunityPostCard";
import CreatePost from "@/components/modals/CreatePost";
import { bookmarkPost } from "@/services/bookmarks.services";
import { addPostComment } from "@/services/comments.services";
import {
  createPostFeed,
  getPosts,
  likeAndUnlike,
  sharePost,
} from "@/services/feeds-posts.services";
import { uploadService } from "@/services/upload.services";

import { getUserProfile } from "@/services/users.services";
import { useCounter } from "@/state/counter.state";

import { Spin, message } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CommunityPage({ searchParams }) {
  const { data: session } = useSession();

  const { createPost, commentsId } = searchParams;

  const { postCount, setPostCount } = useCounter();

  const router = useRouter();
  const [skeletonPosts, setSkeletonPosts] = useState(new Array(5).fill({}));
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchMySavedPosts = async () => {
    const posts = await getPosts(session?.user?.accessToken?.accessToken, 0, 5); 
    setPosts(posts);
  };

  const fetchRemainingPosts = async () => {
    const posts = await getPosts(session?.user?.accessToken?.accessToken, 5); 
    setPosts((prevPosts) => [...prevPosts, ...posts]);
    setSkeletonPosts([]); 
  };

  useEffect(() => {
    setIsPending(true);
    fetchMySavedPosts().then(() => {
      setIsPending(false);
      fetchRemainingPosts();
    });

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

  // add a new post
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
        setPostCount(postCount + 1);
        await fetchMySavedPosts();
      } else {
        message.error("Failed to create post/feed. Please try again.");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // if (isPending)
  //   return (
  //     <div className="flex justify-center my-10">
  //       <Spin />
  //     </div>
  //   );

  return (
    <>
      <div>
        {isPending ? (
          <div className="p-2 mt-6 mb-5">
            <SkeletonSearch />
          </div>
        ) : (
          <Link
            href={"?createPost=true"}
            scroll={false}
            className="block sm:hidden"
          >
            <div className="flex justify-between p-2 mt-6 mb-5 bg-white border border-solid w- border-primary rounded-10">
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
        )}

        <Link href="/create-post" scroll={false} className="hidden sm:block">
          <div className="flex justify-between p-2 mt-6 mb-5 bg-white border border-solid w- border-primary rounded-10">
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

        {posts.length === 0 &&
          skeletonPosts.map((_, index) => <PostSkeleton key={index} />)}

        {posts.map((post, index) => (
          <CommunityPostCard
            user={user}
            post={post}
            isPending={isPending}
            handleBookmarkAndUnbookmark={bookmarkAndUnbookmarkPost}
            handleLikeAndUnlike={likeAndUnlikePost}
            handleSharePost={shareAPost}
            handleComment={addComment}
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

export default CommunityPage;
