"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Divider, Form, Image, Input, Spin, message } from "antd";
import Link from "next/link";
import { CloseCircleOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
//import { GoogleLogin } from 'react-google-login';

export default function LoginModal() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("auth");

  const { data: session, status } = useSession();

  const handleSave = async (values) => {
    const { email, password } = values;

    // Validate password
    if (!password || typeof password !== "string" || !password.trim()) {
      message.error("Please enter a valid password");
      return;
    }

    try {
      setLoading(true);

      await signIn("signin", {
        redirect: false,
        email,
        password,
        callbackUrl: `${window.location.origin}`,
      }).then(({ ok, error, ...others }) => {
        if (ok && others.status === 200 && others.url !== null) {
          message.success("Logged in successfully");
        } else {
          message.error("Invalid credentials");
        }
      });
    } catch (error) {
      message.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  if (search !== "login" || session) return null;

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto flex items-center justify-center">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      {/* Modal panel */}
      <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[560px] sm:align-middle sm:max-w-lg h-auto sm:h-screen sm:w-full">
        <div className="bg-white rounded-md">
          <div className="flex justify-between items-center px-8 py-4">
            <h1>Login</h1>
            <div onClick={() => router.back()} className=" cursor-pointer">
              <CloseCircleOutlined />
            </div>
          </div>
          <hr className="hr-w w-full" />

          <div className="p-8">
            {/* Text below the Login section */}
            <p className="text-gray-600 mb-4">
              Don't have an account?{" "}
              <Link
                href={"/?auth=register"}
                className="text-dark cursor-pointer font-bold"
              >
                Register
              </Link>
            </p>
            {/* Remaining form content */}
            <Form layout="vertical" onFinish={handleSave}>
              <Form.Item
                type="email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
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
              <Form.Item
                type="password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must be at least 6 characters" },
                  {
                    max: 20,
                    message: "Password must be at most 20 characters",
                  },
                ]}
              >
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
                  href={"/?auth=forgetPassword"}
                  className="cursor-pointer text-dark font-bold"
                >
                  Forgot Password?
                </Link>
              </p>
              {loading ? (
                <div className="flex justify-center">
                  <Spin size="large" />
                </div>
              ) : (
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  disabled={loading}
                  block
                  className="bg-primary text-white p-2 rounded-md mt-4 hover:bg-green-700 focus:outline-none focus:ring focus:border-green-400 w-full"
                >
                  Log In
                </Button>
              )}
              <div className="flex items-center gap-4 my-8">
                <hr className="hr-w w-full" />
                <div className="text-gray-400 text-base">OR</div>
                <hr className="hr-w w-full" />
              </div>

              <Button
                block
                icon={
                  <Image
                    width={20}
                    height={20}
                    className="h-4 2-4"
                    src={"./assets/svgs/google.svg"}
                  />
                }
                onClick={() => signIn("google")}
              >
                Continue With Google
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
