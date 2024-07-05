"use client";

import { useEffect, useState } from "react";
import { List, Avatar, Rate, message } from "antd";
import ButtonBg from "../buttons/ButtonBg";
import { getRecipeComments } from "@/services/comments.services";
import moment from "moment";
import { useComments } from "@/state/comments";

const CommentsComponent = ({ recipe }) => {
  const [isPending, setIsPending] = useState(false);

  const { comments, setComments } = useComments();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsPending(true);
        const comments = await getRecipeComments(recipe._id);

        if (comments?.success !== false) {
          setComments(comments);
        }
      } catch (error) {
        message.error(error.message.toString());
      } finally {
        setIsPending(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="px-6 py-3 mt-4 bg-white rounded-lg sm:mt-2 comment-sec">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-center sm:text-xl sm:font-bold">
            Comments
            <span className="font-normal text-[#98989A]">
              ({comments?.length})
            </span>
          </h2>
        </div>
        <div className="lg:hidden">
          <ButtonBg link="?review=add" text="Add Comment" />
        </div>
      </div>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={comments ?? []}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={
                      <img
                        className="rounded-full h-16 w-16"
                        src={
                          comment?.user?.profile_image ??
                          "/assets/users/avatar.jpeg"
                        }
                      />
                    }
                  />
                }
                title={comment?.user?.full_name ?? "Anonymous User"}
                description={comment.comment}
                className="flex items-center"
              />
              <div className="block sm:pl-[65px]">
                {/* <div className="text-right sm:text-left">
                  <Rate defaultValue={comment?.rating} disabled />
                </div> */}
                <span className="ml-2">{comment.date}</span>
                <div className="text-right sm:text-left">
                  <span className="ml-2">
                    {moment(comment?.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default CommentsComponent;
