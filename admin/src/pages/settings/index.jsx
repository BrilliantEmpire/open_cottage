import { Button, Card, Form, message, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../../redux_state/auth/auth.slice";

function SettingsPage() {
  const [form] = Form.useForm();
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onFinish = async (data) => {
    try {
      if (data.currentPassword === data.password) {
        message.error("New password cannot be the same as the old one");
        return;
      }

      if (data.password !== data.confirmPassword) {
        message.error("Passwords do not match");
        return;
      }

      await dispatch(setNewPassword(data)).unwrap();
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to change password");
    }
  };

  return (
    <main className="min-h-[90vh] grid place-content-center w-[500px] sm:w-full mx-auto">
      <section className="w-[500px] sm:w-full mx-auto">
        <Card>
          <div className="p-4">
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <div className="w-full flex justify-center">
                <img
                  height={100}
                  width={100}
                  className="object-cover mx-auto"
                  src="/assets/svgs/lock-password.svg"
                  alt="Lock Password"
                />
              </div>
              <div className="my-6">
                <h3>Change Password</h3>
                <span className="text-[#666666]">
                  New password must be different from the old one.
                </span>
              </div>
              <Form.Item
                name="currentPassword"
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
                name="password"
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
                name="confirmPassword"
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
                  loading={isLoading}
                  disabled={isLoading}
                  htmlType="submit"
                  size="large"
                  type="primary"
                  block
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default SettingsPage;
