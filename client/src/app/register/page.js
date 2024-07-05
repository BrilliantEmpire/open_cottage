"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons"; // Import faTimes
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Image, Input, message } from "antd";
import Link from "next/link";
import { CloseCircleOutlined } from "@ant-design/icons";

const register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const signInWithGoogle = () => {
    // Implement your Google sign-in logic here
    console.log("Signing in with Google...");
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Implement your registration logic here
    message.success("Registration successful!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Registration failed!");
  };

  return (
    <div className="container relative">
      <div className="pl-5 pr-[10px] pt-5 pb-[100px]">
        <h1>Register</h1>
        <p className="text-gray-600 mb-4 mt-4">
          Already have an account?
          <Link
            href={"/login"}
            className="text-dark cursor-pointer font-bold ml-1"
          >
            Login
          </Link>
        </p>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              prefix={
                <img
                  src="assets/svgs/sms.svg"
                  className="w-7 h-7"
                  alt="Lock Icon"
                />
              }
            />
          </Form.Item>

          <Form.Item
            name="user"
            rules={[
              { required: true, message: "Please input your Username!" },
            ]}
          >
            <Input
              placeholder="Enter Your Username"
              prefix={
                <img
                  src="assets/svgs/person.svg"
                  className="w-7 h-7"
                  alt="Person Icon"
                />
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter Password"
              prefix={
                <img
                  src="assets/svgs/lock.svg"
                  className="w-7 h-7"
                  alt="Lock Icon"
                />
              }
            />
          </Form.Item>

          <Form.Item
            type="password"
            //  dependencies={["password"]}
            //  rules={[
            //    { required: true, message: "Please confirm your password!" },
            //    ({ getFieldValue }) => ({
            //      validator(_, value) {
            //        if (!value || getFieldValue("password") === value) {
            //          return Promise.resolve();
            //        }
            //        return Promise.reject(new Error("The two passwords that you entered do not match!"));
            //      },
            //    }),
            //  ]}
          >
            <Input.Password
              placeholder="Repeat Password"
              name="confirmPassword"
              prefix={
                <img
                  src="assets/svgs/lock.svg"
                  className="w-7 h-7"
                  alt="Lock Icon"
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please accept the terms and conditions!",
              },
            ]}
          >
            <div className="block items-center gap-4">
              <span className="text-gray-500 mt-1">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 rounded border-gray-300 mr-2"
                />
              </span>
              <span className="text-gray-500">
                I confirm that I've read and accept the
              </span>
              <strong className="cursor-pointer ml-1 text-black">
                <Link href="/terms-conditions">
                  <span className="text-black">Terms of Use</span>
                </Link>
              </strong>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              className="bg-primary text-white p-2 rounded-md mt-4 hover:bg-green-700 focus:outline-none focus:ring focus:border-green-400 w-full"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="flex items-center gap-4 my-8">
            <hr className="hr-w w-full" />
            <div className="text-gray-400 text-base">OR</div>
            <hr className="hr-w w-full" />
          </div>
          <Button
            className="google-btn pl-12 z-999 overflow-visible"
            block
            icon={
              <img
                className="mx-auto my-auto"
                width={38}
                height={38}
                src={"./assets/svgs/google.svg"}
              />
            }
          >
            Continue with Google
          </Button>
        </Form>
        <div className="absolute left-0 bottom-0">
          <img src={"./mask-logo.png"} />
        </div>
      </div>
    </div>
  );
};

export default register;
