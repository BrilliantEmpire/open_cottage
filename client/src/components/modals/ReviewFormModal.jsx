"use client";
import { Button, Form, Input, Modal, message, Rate } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { addRecipeComment } from "@/services/comments.services";
import { useSession } from "next-auth/react";
import { useComments } from "@/state/comments";

export default function ReviewFormModal({ review, recipe }) {
  const { data: session } = useSession();

  const { addNewComment } = useComments();

  const router = useRouter();
  const handleSubmit = async (data) => {
    const comment = await addRecipeComment(
      session?.user?.accessToken?.accessToken,
      { ...data, recipe: recipe._id }
    );

    if (comment?.success === false) {
      message.error(comment?.message);
    } else {
      addNewComment({ ...data });
      message.success("Comment added successfully");
    }

    router.back();
  };

  return (
    <div className="comment-model">
      <Modal
        centered
        title="Add your comment"
        open={review === "add"}
        onCancel={() => router.back()}
        closeIcon={<CloseCircleOutlined />}
        footer={null}
        className="comment-model"
      >
        <Form onFinish={handleSubmit}>
          {/* <Form.Item
            name="rating"
            rules={[
              {
                required: true,
                message: "Please provide a Rating",
              },
            ]}
          >
            <Rate allowClear={true} />
          </Form.Item> */}
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
              className="h-[236px]"
              placeholder="Your comment here...."
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
