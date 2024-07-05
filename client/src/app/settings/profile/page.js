"use client";
import { Button, Card, Form, Input, Modal, Upload, message, Space } from "antd";
import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";

function ProfileMobilePage() {
  const [email, setEmail] = useState("example@gmail.com");
  const [name, setName] = useState("Zeshan Abid");
  const [about, setAbout] = useState(
    "Lorem ipsum dolor sit amet consectetur. Magna netus pellentesque lorem enim dolor elementum mauris diam. Blandit lectus pharetra venenatis gravida amet quis dictumst purus in. Augue a risus fames sem ac ut turpis orci."
  );

  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const beforeUpload = (file) => {
    // Implement your custom logic for file validation, if needed
    console.log("Before Upload:", file);
    return true;
  };

  const customRequest = ({ onSuccess, onError, file }) => {
    // Implement your custom logic for file upload, if needed
    console.log("Custom Request:", file);
    onSuccess();
  };

  const onFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = () => {
    message.success("Profile updated successfully");
  };
  return (
    <div className="mx-auto sm:w-full">
      <section className="w-auto mx-auto sm:w-full">
        <Card style={{ backgroundColor: "transparent" }}>
          <div className="px-4">
            <Form layout="vertical" onFinish={onFinish}>
              <div className="flex justify-center w-full my-1">
                {/* <div className="flex justify-center relative w-[100px] ">
                  <img
                    height={100}
                    width={100}
                    className="object-cover mx-auto border-4 border-solid rounded-full border-primary"
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Your Image"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={onFileChange}
                    beforeUpload={beforeUpload}
                    customRequest={customRequest}
                  />
                  <div className="absolute bottom-0 right-0">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<CameraOutlined />}
                      size="medium"
                      className="absolute bottom-0 right-0"
                      onClick={handleCameraClick}
                      style={{ boxShadow: "unset" }}
                    />
                  </div>
                </div> */}
              </div>

              <Form.Item
                label={<span className="text-[#666666]">Email</span>}
                initialValue={email}
              >
                <Input
                  type="email"
                  defaultValue={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#666666]">Full Name</span>}
                initialValue={email}
              >
                <Input
                  type="text"
                  defaultValue={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#666666]">About</span>}
                initialValue={email}
              >
                <Input.TextArea
                  rows={5}
                  type="text"
                  defaultValue={about}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Form.Item>
              <div>
                <Button htmlType="submit" size="large" type="primary" block>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default ProfileMobilePage;
