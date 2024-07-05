"use client";
import React, { useState } from "react";
import { Button, Divider, Form, Image, Input, message } from "antd";
import Link from "next/link";
import { useAuth } from "@/state/auth.state";
export default function LoginMobile() {
  const { loginUser } = useAuth();

  const handleLogin = (data) => {
    loginUser(data);
    message.success("Login successfully");
  };

  return (
    <div className="bg-white rounded-md">
      <div className="bg-white rounded-md">
        <div className="flex justify-between items-center px-5 pt-5 pb-2">
          <h1>Login</h1>
        </div>
        <div className="px-5">
          {/* Text below the Login section */}
          <p className="text-gray-600 mb-4 text-opacity-70">
            Don't have an account?
            <Link
              href={"/register"}
              className="text-dark cursor-pointer font-bold ml-1"
            >
              Register
            </Link>
          </p>
          {/* Remaining form content */}
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item type="email">
              <Input
                placeholder="Enter your email"
                name="email"
                prefix={
                  <img
                    src="assets/svgs/sms.svg"
                    className="w-7 h-7"
                    alt="Lock Icon"
                  />
                }
              />
            </Form.Item>
            <Form.Item type="password">
              <Input.Password
                placeholder="Enter Password"
                name="password"
                prefix={
                  <img
                    src="assets/svgs/lock.svg"
                    className="w-7 h-7"
                    alt="Lock Icon"
                  />
                }
              />
            </Form.Item>
            <p className="text-right text-sm">
              <Link
                href={"/forgot-pwd"}
                className="cursor-pointer text-dark font-bold"
              >
                Forgot Password?
              </Link>
            </p>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              className="bg-primary text-white p-2 rounded-md mt-4 hover:bg-green-700 focus:outline-none focus:ring focus:border-green-400 w-full"
            >
              Login
            </Button>

            <div className="flex items-center gap-4 my-8">
              <hr className="hr-w w-full" />
              <div className="text-gray-400 text-base">OR</div>
              <hr className="hr-w w-full" />
            </div>

            <Button
              className="google-btn mb-12"
              block
              icon={
                <img className="h-8 w-8" src={"./assets/svgs/google.svg"} />
              }
            >
              Continue With Google
            </Button>
          </Form>
        </div>
        <div>
          <img src={"./mask-logo.png"} />
        </div>
      </div>
    </div>
  );
}
