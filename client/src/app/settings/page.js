"use client";

import { Button, Card, Form, Input, Upload, message } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserProfile, updateUserProfile } from "@/services/users.services";
import { uploadSingleService } from "@/services/upload.services";
import ProfileSkeleton from "@/components/common/skeletonloading/common skeleton/ProfileSkeleton";

function ProfilePage() {
  const [email, setEmail] = useState("email@example.com");
  const [name, setName] = useState("Full Name");
  const [about, setAbout] = useState("");
  const [profile_image, setProfileImage] = useState("/assets/svgs/ellipse.svg");
  const [loading, setLoading] = useState(true);

  const session = useSession();
  const token = session?.data?.user?.accessToken?.accessToken;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await getUserProfile(token);
        setEmail(profile.email);
        setName(profile.full_name);
        setAbout(profile.about);
        setProfileImage(profile.profile_image || "/assets/svgs/ellipse.svg");
      } catch (error) {
        message.error("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const customRequest = async ({ onSuccess, onError, file }) => {
    try {
      const imageUrl = await uploadSingleService(file);
      setProfileImage(imageUrl);
      onSuccess("ok");
    } catch (error) {
      onError(error);
    }
  };

  const onFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(
        `${info.file.name} file selected successfully click save `
      );
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} failed to select`);
    }
  };

  const beforeUpload = (file) => {
    setProfileImage(URL.createObjectURL(file));
    return true;
  };

  const onFinish = async () => {
    try {
      await updateUserProfile(token, {
        email,
        full_name: name,
        about,
        profile_image,
      });
      console.log(profile_image);
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  return (
    <main className="min-h-[90vh] grid place-content-center w-[500px] sm:w-full mx-auto">
      <section className="w-[500px] sm:w-full mx-auto mt-6 sm:mt-1 block sm:hidden">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <Card>
            <div className="p-4">
              <Form layout="vertical" onFinish={onFinish}>
                <div className="flex justify-center w-full my-6">
                  <div className="flex justify-center relative w-[100px] ">
                    <img
                      height={100}
                      width={100}
                      className="object-cover mx-auto border-4 border-solid rounded-full border-primary"
                      src={profile_image}
                      alt="Your Image"
                    />
                    <Upload
                      showUploadList={false}
                      accept="image/*"
                      customRequest={customRequest}
                      onChange={onFileChange}
                      beforeUpload={beforeUpload}
                    >
                      <div className="absolute bottom-0 right-0">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<CameraOutlined />}
                          size="medium"
                          className="absolute bottom-0 right-0"
                        />
                      </div>
                    </Upload>
                  </div>
                </div>

                <Form.Item
                  label={<span className="text-[#666666]">Email</span>}
                  initialValue={email}
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={<span className="text-[#666666]">Full Name</span>}
                  initialValue={name}
                >
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={<span className="text-[#666666]">About</span>}
                  initialValue={about}
                >
                  <Input.TextArea
                    rows={5}
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
        )}
      </section>
    </main>
  );
}

export default ProfilePage;
