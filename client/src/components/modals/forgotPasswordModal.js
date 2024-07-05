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
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Form, Message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function LoginModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const search = searchParams.get("auth");

  const handleSubmit = async (values) => {
    const { email } = values; // Destructure form values from the onFinish callback

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        // Handle successful response (e.g., show success message)
        console.log("Password reset email sent successfully!");
      } else {
        // Handle error response (e.g., show error message)
        console.error("Failed to send password reset email");
      }
    } catch (error) {
      console.error("Error occurred while sending request:", error);
    }
  };

  const signInWithGoogle = () => {
    // Implement your Google sign-in logic here
    console.log("Signing in with Google...");
  };

  if (search !== "forgetPassword") return null;

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:h-screen w-[560px] h-auto">
        <div className="bg-white rounded-md">
          <div className="flex justify-between items-center px-8 py-4">
            <h1>Forgot Password</h1>
            <div onClick={() => router.back()} className="cursor-pointer">
              <CloseCircleOutlined />
            </div>
          </div>
          <hr className="hr-w w-full" />
          <div className="p-8">
            <p className="text-gray-600 mb-4">
              Please enter the email associated with your account.
            </p>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input
                  prefix={
                    <FontAwesomeIcon icon={faEnvelope} className="text-black" />
                  }
                  placeholder="Enter your email"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Button className="mt-4" block onClick={() => router.back()}>
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
