"use client";
import CommunityPostCard from "@/components/community-posts/CommunityPostCard";
import CreatePost from "@/components/modals/CreatePost";

import { getAllCommunities } from "@/services/recipes.services";
import { Button, Card, Form, Input } from "antd";
import Avatar from "antd/es/avatar/avatar";
import React, { useState } from "react";

function ChangePasswordPage({ searchParams }) {
  const onFinish = (data) => {
    message.success("Social Accounts updated successfully");
  };

  return (
    <div className="min-h-[90vh] grid place-content-center w-[820px]  sm:w-full mx-auto sm:min-h-full sm:block md:w-[500px]">
      <section className="w-[500px] sm:w-full mx-auto mt-6 sm:mt-0">
        <Card className="mobile-transparent-card">
          <div className="p-4 sm:p-1">
            <Form layout="vertical" onFinish={onFinish}>
              <div className="flex justify-center w-full">
                <img
                  height={200}
                  width={206}
                  className="object-cover mx-auto"
                  src="/assets/svgs/lock-password.svg"
                />
              </div>
              <div className="my-6">
                <h3 className="font-extrabold">Change Password</h3>
                <span className="text-[#666666]">
                  New password must be different from the old one.
                </span>
              </div>
              <Form.Item
                name={"currentPassword"}
                rules={[
                  {
                    required: true,
                    message: "Please input your current Password",
                  },
                ]}
                label={<span className="text-[#666666]">Current Password</span>}
              >
                <Input.Password placeholder="Enter your current password" />
              </Form.Item>
              <Form.Item
                name={"newPassword"}
                rules={[
                  {
                    required: true,
                    message: "Please input your new Password",
                  },
                ]}
                label={<span className="text-[#666666]">New Password</span>}
              >
                <Input.Password placeholder="Create a new password" />
              </Form.Item>
              <Form.Item
                name={"confirmPassword"}
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm Password",
                  },
                ]}
                label={<span className="text-[#666666]">Repeat Password</span>}
              >
                <Input.Password placeholder="Should be same as new password" />
              </Form.Item>

              <div>
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary"
                  className="setting-btn"
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default ChangePasswordPage;
