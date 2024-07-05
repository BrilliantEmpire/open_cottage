import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "@/state/auth.state";
import Link from "next/link";

const LoginMobile = () => {
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      await loginUser(values);
      message.success("Login successful");
      // Redirect the user or perform other actions after successful login
    } catch (error) {
      message.error("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onFinish={handleLogin} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Link href="/forgot-password">
            Forgot password?
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginMobile;
