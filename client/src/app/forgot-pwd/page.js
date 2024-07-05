"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const signInWithGoogle = () => {
    // Implement your Google sign-in logic here
    console.log("Signing in with Google...");
  };

  return (
    <div className="my-6 px-5">
      <h1>Forgot Password</h1>

      <p className="text-gray-600 mb-6 mt-2">
        Please enter email associated with your account.
      </p>

      <Form layout="vertical">
        <Form.Item type="email">
          <Input
            placeholder="Enter your email"
            name="email"
            prefix={
              <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "22px" }} />
            }
          />
        </Form.Item>
        <Link
         href={"/?auth=checkemail"} className="cursor-pointer">
          <Button type="primary" className="mt-4 forgot-btn" block>
            Submit
          </Button>
        </Link>

        <Button className="mt-4 forgot-login-btn" block>
          Back to Login
        </Button>
      </Form>
    </div>
  );
}
