import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "antd";


export default function checkemail({ isOpen, onClose }) {
  const handleClose = (event) => {
    // Close the modal only if the click target is the overlay
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("auth");
  if (search!=='checkemail') return null;

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center z-20 justify-center" onClick={handleClose}>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      {/* Modal panel */}
      <div
        className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-[80%] sm:h-[80%]  w-[560px] h-auto"
      >
        <div className="bg-white p-8 rounded-md">
          <div className="flex justify-end items-center mb-4">   
            {/* Close button */}
            <div onClick={() => router.back()} className="cursor-pointer  ">
              <CloseCircleOutlined />
            </div>
          </div>

          {/* Display the image */}
          <div className="mb-4 text-center">
            <img src="/image.png" className="h-[250px] w-[260px] mx-auto mb-4 sm:w-[180px] sm:h-[180px]" alt="Forgot Password Icon" />
          </div>

          <p className="text-center text-2xl text-black font-bold mb-2">
            Check your email!
          </p>

          <p className="text-center text-sm text-gray-600 mb-2"> {/* Reduced margin-bottom */}
            Check your email to reset your password.
          </p>
         
            {/* Submit button */}
            <div className="text-center mt-4">
            <Button type="primary w-[200px]">
              Go to mail
            </Button>
            </div>
          
        </div>
      </div>
    </div>
  );
}
