"use client";
import {
  createSocialMediaLinks,
  deleteSocialMediaAccount,
  getSocialMedia,
  updateSocialMedia,
} from "@/services/socialmedia.services";
import { Button, Card, Divider, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SocialMediaInput from "@/components/common/SocialMediaInput";

function PreferencesPage({ searchParams }) {
  const session = useSession();
  const [socialAccount, setSocialAccount] = useState([]);
  const [form] = Form.useForm();

  const token = session?.data?.user?.accessToken?.accessToken;

  const { createPost, commentsId } = searchParams;

  //get user data
  useEffect(() => {
    if (token) {
      getSocialMedia(token)
        .then((data) => {
          setSocialAccount(data.social_links);
        })
        .catch((error) => {
          message.error("Error fetching social media links:", error);
        });
    }
  }, [token]);

  //handle delete 
  const handleDelete = async (postId) => {
    try {
      await deleteSocialMediaAccount(postId, token);
      setSocialAccount(
        socialAccount.filter((account) => account._id !== postId)
      );
      message.success("Social account unlinked successfully");
    } catch (error) {
      message.error("Failed to unlink social account");
    }
  };

  //update social links 
  const handleUpdate = async (updatedAccount) => {
    if (!updatedAccount.link.trim()) {
      message.warning("Link cannot be empty.");
      return;
    }

    try {
      await updateSocialMedia([updatedAccount], token);
      setSocialAccount(
        socialAccount.map((account) =>
          account._id === updatedAccount._id ? updatedAccount : account
        )
      );
      message.success("Social account updated successfully");
    } catch (error) {
      message.error("Failed to update social account");
    }
  };

  //create social links 
  const onFinish = async (data) => {
    try {
      const socialMediaArray = Object.keys(data)
        .filter((key) => data[key] && data[key].trim() !== "")
        .map((key) => ({
          platform: key,
          link: data[key].trim(),
        }));
    
      if (socialMediaArray.length === 0) {
        message.warning("Please provide at least one social media link.");
        return;
      }
  
      const response = await createSocialMediaLinks(socialMediaArray, token);
    
      setSocialAccount((prevAccounts) => [
        ...prevAccounts,
        ...response.social_links.filter(
          (newLink) =>
            !prevAccounts.some(
              (existingLink) => existingLink._id === newLink._id
            )
        ),
      ]);

      message.success("Social Accounts created successfully");
      form.resetFields();
    } catch (error) {  
      message.error("Failed to create social accounts.");
    }
  };

  const platforms = ["facebook", "instagram", "tiktok", "youtube"];

  //commpon input field 
  const renderInputFields = () => {
    return platforms.map((platform) => {
      const account = socialAccount.find((acc) => acc.platform === platform);
      if (!account) {
        return (
          <SocialMediaInput
            key={platform}
            name={platform}
            rules={[
              {
                required: false,
                message: `Please input your ${platform} url`,
              },
            ]}
            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
            placeholder={`Enter ${platform} URL`}
            suffix={<img src={`/assets/svgs/${platform}.svg`} alt="url" />}
          />
        );
      }
      return null;
    });
  };  

  return (
    <div className="min-h-[90vh] grid place-content-center w-[820px] sm:w-full mx-auto sm:min-h-full sm:block md:w-[500px]">
      <section className="w-[820px] sm:w-full mx-auto mt-6 sm:mt-0 md:w-full">
        <Card className="mobile-transparent-card">
          <div className="p-4">
            <h3 className="font-extrabold">Link Your Social Accounts</h3>
            <small className="text-secondary">
              Lorem ipsum dolor sit amet consectetur.
            </small>

            <Form layout="vertical" onFinish={onFinish} form={form}>
              {socialAccount &&
                socialAccount.map((data, i) => (
                  <div
                    key={i}
                    className="flex justify-between my-6 items-center bg-[#F7F7F7] rounded-lg p-3 sm:bg-white"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <img
                        src={`/assets/svgs/${data.platform}.svg`}
                        alt={data.platform}
                      />
                      <input
                        className="w-full border-0 focus:outline-none bg-transparent"
                        value={data.link}
                        onChange={(e) => {
                          const updatedAccount = {
                            ...data,
                            link: e.target.value,
                          };
                          setSocialAccount(
                            socialAccount.map((account) =>
                              account._id === data._id
                                ? updatedAccount
                                : account
                            )
                          );
                        }}
                        onBlur={() =>
                          handleUpdate({
                            ...data,
                            link: data.link,
                          })
                        }
                      />
                    </div>
                    <Button
                      icon={<img src="/assets/svgs/unlink.svg" alt="unlink" />}
                      type="primary"
                      size="large"
                      onClick={() => handleDelete(data._id)}
                    >
                      Unlink
                    </Button>
                  </div>
                ))}
              <Divider />
              {renderInputFields()}
              <div className="flex justify-center">
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary"
                  className="setting-btn"
                >
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

export default PreferencesPage;
