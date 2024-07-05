"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"; // Import faTimes
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Divider, Form, Image, Input, message } from "antd";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    message.success("Password reset successfully!");
    router.push("/login");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const router = useRouter();

  return (
    <div>
        <div className="flex flex-col items-center py-6 px-5">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-2">Reset Password</h1>
        <p className="text-gray-600 mb-4">Create a new password.</p>
        <Form
          name="reset_password"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item type="password">
            <Input.Password
              placeholder="Create a New Password"
              name="password"
              prefix={
                <img
                  src="assets/svgs/lock.svg"
                  className="w-4 h-4"
                  alt="Lock Icon"
                />
              }
            />
          </Form.Item>
          <Form.Item type="password">
            <Input.Password
              placeholder="Repeat Password"
              name="password"
              prefix={
                <img
                  src="assets/svgs/lock.svg"
                  className="w-4 h-4"
                  alt="Lock Icon"
                />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full continue-btn">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    <div><img src="./mask-logo.png" /></div>
    </div>
  );
}
