"use client";
import { useComments } from "@/state/comments";
import { Button, Form, Input, Modal, message, Rate } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function CommentFromMob({ review }) {
  const commentState = useComments((state) => state);

  const router = useRouter();
  const handleSubmit = (data) => {
    commentState.addNewComment({ ...data, rating: 5 });

    console.log(commentState.comments);

    message.success("Added comment successfully");
    router.back();
  };

  return (
    <div className="p-4 bg-white rounded-lg comment-model">
      <h2 className="pb-5 text-xl text-center text-bold">Add your comment</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="rating"
          rules={[
            {
              required: true,
              message: "Please provide a Rating",
            },
          ]}
        >
          <Rate defaultValue={3} allowClear={true} />
        </Form.Item>
        <Form.Item
          name="comment"
          label=""
          rules={[
            {
              required: true,
              message: "Please provide a message",
            },
          ]}
        >
          <Input.TextArea
            className="h-[160px]"
            placeholder="Your comment here...."
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
