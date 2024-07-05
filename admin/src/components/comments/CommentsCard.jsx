import React from "react";
import { ThumbsUp } from "@phosphor-icons/react";
import { Avatar, Button, Card, Carousel, Input, List } from "antd";

function CommentsCard({ comment, index }) {
  return (
    <div className="mt-6">
      <Card
        style={{
          border: "none",
          backgroundColor: "#F7F7F7",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              size="small"
              src={comment?.user?.profile_image ?? "/assets/pngs/avatar.png"}
            />
            <div>
              <p className="text-[14px]">{comment?.user?.full_name}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div>{/* <span className="text-nowrap">3 Likes</span> */}</div>
          </div>
        </div>
        <small className="my-4 text-grey">{comment?.comment}</small>
      </Card>
    </div>
  );
}

export default CommentsCard;
