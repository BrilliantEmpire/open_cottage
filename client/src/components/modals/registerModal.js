"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Image, Input, Spin, message } from "antd";
import Link from "next/link";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSession, signIn } from "next-auth/react";

export default function LoginModal() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("auth");

  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (session) {
  //     router.push("/");
  //   }
  // }, [session]);

  const handleSave = async (values) => {
    const { email, full_name, password } = values;

    // Validate password
    if (!password || typeof password !== "string" || !password.trim()) {
      message.error("Please enter a valid password");
      return;
    }

    try {
      setLoading(true);

      await signIn("register", {
        redirect: false,
        email,
        full_name,
        password,
        callbackUrl: `${window.location.origin}`,
      }).then(({ ok, error, ...others }) => {
        if (ok && others.status === 200 && others.url !== null) {
          message.success("New user registered successfully");
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

  if (search !== "register" || session) return null;

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto flex items-center justify-center">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      {/* Modal panel */}
      <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:h-screen  w-[560px] h-auto">
        <div className="bg-white rounded-md">
          <div className="flex justify-between items-center px-8 py-4">
            {/* Login header */}
            <h1>Register</h1>

            <div onClick={() => router.back()} className=" cursor-pointer">
              <CloseCircleOutlined style={{ fontSize: "28px" }} />
            </div>
          </div>
          <hr className="hr-w w-full" />

          {/* Additional space */}
          <div className="p-8">
            {/* Text below the Login section */}
            <p className="text-gray-600 mb-4">
              Already have an account?{" "}
              <Link
                href={"/?auth=login"}
                className="text-dark cursor-pointer font-bold ml-1"
              >
                Login
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
                type="text"
                name="full_name"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  placeholder="Enter Your Username"
                  name="full_name"
                  visibilityToggle={false}
                  prefix={
                    <img
                      src="assets/svgs/person.svg"
                      className="w-5 h-5"
                      alt="Person Icon"
                    />
                  }
                />
              </Form.Item>
              <Form.Item
                name="password"
                type="password"
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
                      className="w-4 h-4"
                      alt="Lock Icon"
                    />
                  }
                />
              </Form.Item>
              <Form.Item
                name="repeat_password"
                type="password"
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
              </Form.Item>{" "}
              <div className="flex items-center mt-2">
                <span className="text-gray-500">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-gray-600 rounded border-gray-300 mr-2"
                  />
                </span>
                <span className="text-gray-500">
                  I confirm that I've read and accept the{" "}
                </span>
                <strong className="cursor-pointer">Terms of Use.</strong>
              </div>
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
                  Sign Up
                </Button>
              )}
              {/* Line below the Log In button */}
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
                Continue with Google
              </Button>
            </Form>
            <form></form>
          </div>
        </div>
      </div>
    </div>
  );
}
