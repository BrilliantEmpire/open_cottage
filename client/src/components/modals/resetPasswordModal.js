import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import faTimes
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Divider, Form, Image, Input, message } from "antd";


export default function resetpassword({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const signInWithGoogle = () => {
    // Implement your Google sign-in logic here
    console.log("Signing in with Google...");
  };

  const handleClose = (event) => {
    // Close the modal only if the click target is the overlay
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const searchParams = useSearchParams();


  const search = searchParams.get("auth");
  if (search!=='resetpassword') return null;

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center z-20 justify-center" onClick={handleClose}>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      {/* Modal panel */}
      <div
                className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:h-screen  w-[560px] h-auto"

      >
        <div className="bg-white rounded-md">
          <div className="flex justify-between items-center px-8 py-4">
            {/* Login header */}
           <h1>
            Reset Password
           </h1>

            {/* Close button */}
            <div onClick={() => router.back()} className=" cursor-pointer">
              <CloseCircleOutlined />
            </div>
          </div>

          {/* Line below the Login header and Close button */}
          <hr className="hr-w w-full" />

          {/* Additional space */}
          <div className="p-8">
          {/* Text below the Login section */}
          <p className="text-gray-600 mb-4">
            Create a new password.
          </p>

          {/* Remaining form content */}
          <Form layout="vertical">
           
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
            
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block
                className="bg-primary text-white p-2 rounded-md mt-4 hover:bg-green-700 focus:outline-none focus:ring focus:border-green-400 w-full"
              >
                Continue
              </Button>
            </Form>
        </div>
      </div>
      </div>
    </div>
   
  );
}
