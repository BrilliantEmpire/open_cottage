/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../redux_state/auth/auth.slice";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { Button, Checkbox, Form, Input } from "antd";

/* eslint-disable react/no-unknown-property */
function LoginPage() {
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const { user, token, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const logGoogleUser = (data) => {
    dispatch(loginAdmin({ ...data, remember: rememberMe }));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center overflow-hidden">
      <div className="flex justify-center items-center flex-col border border-solid border-[#E1E1E1] h-[477px] sm:w-full w-[500px] p-6 rounded">
        <img
          src="/assets/brands/logo.png"
          preview={false}
          height={60}
          className="mb-6"
        />
        <Form layout="vertical" className="w-80" onFinish={logGoogleUser}>
          <Form.Item
            label="Username"
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please enter username",
              },
            ]}
          >
            <Input type="email" placeholder="Username" bordered size="large" />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please provide password",
                min: 6,
                max: 20,
                type: "string",
              },
            ]}
            label="Password"
          >
            <Input.Password
              placeholder="********"
              bordered
              size="large"
              type="password"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox
              onChange={() => setRememberMe(!rememberMe)}
              value={rememberMe}
            >
              Remember me
            </Checkbox>
          </Form.Item>
          <Button htmlType="submit" type="primary" block size="large">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
