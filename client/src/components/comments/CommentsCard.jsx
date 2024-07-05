import { LikeFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Carousel, Input, List } from "antd";
import React, { useState } from "react";

function CommentsCard({ comment, index }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="mt-6 sm:px-3">
      <Card
        style={{
          border: "none",
          backgroundColor: "#F7F7F7",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              size="small"
              src={comment?.user?.profile_image ?? "/assets/users/avatar.jpeg"}
            />
            <div>
              <p className="text-[14px]">{comment?.user?.full_name}</p>
            </div>
          </div>
          <div
            className={`flex items-center justify-center gap-3 w-8 h-8 rounded-full ${
              isLiked ? "bg-[rgb(40,139,34)]" : "bg-secondary-hover"
            }`}
            onClick={handleLike}
          >
            <LikeFilled style={{ color: isLiked ? "#ffffff" : "" }} />
          </div>
        </div>
        <small className="my-4 text-grey">{comment?.comment}</small>
      </Card>
    </div>
  );
}

export default CommentsCard;
