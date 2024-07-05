"use client";

import { Avatar, Button, Card, Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CommentsList from "../comments/CommentsList";
import {
  BookmarkSimple,
  ShareNetwork,
  UserCircleGear,
  XCircle,
} from "@phosphor-icons/react";
import moment from "moment";
import { RWebShare } from "react-web-share";
import { getPostComments } from "@/services/comments.services";
import { useSession } from "next-auth/react";

function CommunityPostCard({
  post,
  user,
  isPending,
  handleSharePost,
  handleBookmarkAndUnbookmark,
  handleLikeAndUnlike,
  handleComment,
}) {
  const [currentRoute, setCurrentRoute] = useState("");
  const [isMadeClicked, setIsMadeClicked] = useState(false);
  const [isSavedClicked, setIsSavedClicked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsId, setCommentsId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { data: session } = useSession();

  const getPostCommentsById = async (id) => {
    if (!id) return;

    if (commentsId !== id) {
      setCommentsId(id);
      const comments = await getPostComments(
        session?.user?.accessToken?.accessToken,
        id
      );
      setComments(comments);
    } else {
      setCommentsId(null);
    }
  };

  useEffect(() => {
    setCurrentRoute(window.location.pathname);
  }, []);

  // Function to render remove button or dots based on route
  const renderAction = () => {
    if (currentRoute === "/community/saved") {
      return (
        <div className="remove-btn">
          {isPending ? (
            <>
              <Spin size="small" />
            </>
          ) : (
            <Button
              onClick={() => handleBookmarkAndUnbookmark(post?._id)}
              type="text"
              className="border rounded-4"
            >
              Remove
            </Button>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const handleCommentSend = async () => {
    await handleComment({ post: post?._id, comment, rating: 0 });
    setComment("");
  };

  const handleImageClick = (image) => {
    setPreviewImage(image);
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="mt-6 community-post sm:mt-3 sm:mx-0">
      <Card>
        <div className="flex items-center justify-between sm:px-3">
          <div className="flex items-center gap-2">
            <Avatar
              size="small"
              src={post?.user?.profile_image ?? "/assets/users/avatar.jpeg"}
            />
            <div>
              <Link
                href={"/users-profile"}
                className="text-black hover:text-primary"
              >
                <h4 className="text-[14px]">{post?.user?.full_name}</h4>
              </Link>
              <small className="text-grey">
                {moment(post?.createdAt).fromNow()}
              </small>
            </div>
          </div>
          {renderAction()}
        </div>
        <div className="max-h-[400px]">
          {post?.description && (
            <p className="text-[16px] text-grey my-4 sm:px-3">
              {post?.description}
            </p>
          )}

          {post?.images && post?.images.length > 0 && (
            <div className="sm:px-3">
              <Image
                src={post?.images[0]}
                alt={post?.description}
                height={100}
                width={200}
                className="w-auto h-auto max-w-full max-h-[300px] object-cover rounded-10 sm:w-[100%] cursor-pointer"
                onClick={() => handleImageClick(post?.images[0])}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between sm:border-b-1 sm:border-[#F4F4F4] sm:border-solid sm:border-t-1 sm:border-l-0 sm:border-r-0 sm:my-3 sm:px-3">
          <div
            onClick={() => handleLikeAndUnlike(post?._id)}
            className="flex items-center gap-2 mt-4 cursor-pointer sm:my-2"
          >
            <UserCircleGear
              size={25}
              color={
                isMadeClicked || post?.likes?.includes(user?._id)
                  ? "#288B22"
                  : "#0F0F0F"
              }
              onClick={() => setIsMadeClicked(!isMadeClicked)}
            />
            <span
              className={
                isMadeClicked || post?.likes?.includes(user?._id)
                  ? "text-primary"
                  : ""
              }
              onClick={() => setIsMadeClicked(!isMadeClicked)}
            >
              {post?.number_of_likes ?? 0}{" "}
              <span className="sm:hidden">Tasty</span>
            </span>
          </div>

          <div
            role="button"
            onClick={() => getPostCommentsById(post?._id)}
            className="flex items-center gap-2 mt-4 text-black cursor-pointer sm:my-2"
          >
            <img src="/assets/svgs/comment.svg" alt="" />
            <span>
              {post?.number_of_comments ?? 0}{" "}
              <span className="sm:hidden">Comments</span>
            </span>
          </div>
          <RWebShare
            onClick={() => handleSharePost(post?._id)}
            data={{
              text: post?.description,
              url: post?.url,
            }}
          >
            <div
              role="button"
              className="flex items-center gap-2 mt-4 cursor-pointer sm:my-2 sm:hidden"
            >
              <ShareNetwork size={24} />
              <span>
                {post?.number_of_shares ?? 0}{" "}
                <span className="sm:hidden">share</span>
              </span>
            </div>
          </RWebShare>
          <div
            role="button"
            onClick={() => handleBookmarkAndUnbookmark(post?._id)}
            className="flex gap-2 mt-4 cursor-pointer sm:my-2 "
          >
            <BookmarkSimple
              size={25}
              color={isSavedClicked ? "#288B22" : "#0F0F0F"}
              onClick={() => setIsSavedClicked(!isSavedClicked)}
            />
            <span
              className={isSavedClicked ? "text-primary" : ""}
              onClick={() => setIsSavedClicked(!isSavedClicked)}
            >
              {post?.number_of_saves ?? 0}{" "}
              <span className="sm:hidden">Saved</span>
            </span>
          </div>
        </div>
        {commentsId === post?._id && <CommentsList comments={comments} />}
        <div className="my-4 sm:px-3">
          <Input
            prefix={
              <Avatar
                size="small"
                src={user?.profile_image ?? "/assets/users/avatar.jpeg"}
              />
            }
            value={comment}
            onPressEnter={handleCommentSend}
            onChange={(e) => setComment(e.target.value)}
            suffix={
              <img
                src="/assets/svgs/send.svg"
                alt=""
                role="button"
                onClick={handleCommentSend}
              />
            }
            size="large"
            placeholder="Write your comment"
            className="bg-grey"
            style={{
              backgroundColor: "#F7F7F7",
              border: "none",
            }}
          />
        </div>
      </Card>

      {previewImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 overflow-auto sm:hidden">
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={previewImage}
              alt="Preview"
              className="object-contain"
              loading="lazy"
            />
            <button
              className="absolute top-4 right-4 text-red-500 border-none bg-transparent text-2xl"
              onClick={closeImagePreview}
            >
              <XCircle size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPostCard;
