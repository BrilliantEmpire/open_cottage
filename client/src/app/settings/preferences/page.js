"use client";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Switch,
  message,
  Tag,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  createFoodAllergic,
  createFoodPrefences,
  getUserPreferences,
  removeAllergicFood,
  removeFoodPreferences,
  updateUserPreferences,
} from "@/services/users.prefrences";

function PreferencesPage({ searchParams }) {
  const session = useSession();
  const [isShow, setIsShow] = useState(true);
  const [foodLiked, setFoodLiked] = useState([]);
  const [foodAllergies, setFoodAllergies] = useState([]);
  const [newFoodLiked, setNewFoodLiked] = useState("");
  const [newFoodAllergies, setNewFoodAllergies] = useState("");
  const token = session?.data?.user?.accessToken?.accessToken;

  // Fetch data for the notification preferences
  useEffect(() => {
    if (token) {
      getUserPreferences(token)
        .then((data) => {
          setIsShow(data.notificationsEnabled);
          setFoodAllergies(data.foodAllergies);
          setFoodLiked(data.foodPreferences);
        })
        .catch((error) => {
          message.error("Failed to fetch preferences:", error);
        });
    }
  }, [token]);

  // Update data on notification preferences
  const onFinish = (data) => {
    const preferences = {
      notificationsEnabled: isShow,
      foodPreferences: foodLiked,
      foodAllergies: foodAllergies,
    };

    updateUserPreferences(token, preferences)
      .then(() => {
        message.success("Preferences updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update preferences:", error);
      });
  };

  const handleNotificationChange = (checked) => {
    setIsShow(checked);
  };

  // Remove food-like function
  const handleCloseFoodLiked = (removedTag) => {
    removeFoodPreferences(token, removedTag).catch((error) => {
      message.error("Failed to remove food preference:", error);
    });
  };

  // Remove food allergic function
  const handleCloseFoodAllergic = (removedTag) => {
    removeAllergicFood(token, removedTag).catch((error) => {
      message.error("Failed to remove food preference:", error);
    });
  };

  // Create food liked
  const handleAddFoodLiked = async (e) => {
    e.preventDefault();
    if (newFoodLiked && !foodLiked.includes(newFoodLiked)) {
      try {
        const updatedFoodLiked = await createFoodPrefences(token, newFoodLiked);
        setFoodLiked(updatedFoodLiked);
        setNewFoodLiked("");
      } catch (error) {
        message.error("Failed to add food preference:", error);
      }
    }
  };

  // Create food allergies
  const handleAddFoodAllergies = async (e) => {
    e.preventDefault();
    if (newFoodAllergies && !foodAllergies.includes(newFoodAllergies)) {
      try {
        const updatedFoodLiked = await createFoodAllergic(
          token,
          newFoodAllergies
        );
        setFoodAllergies(updatedFoodLiked);
        setNewFoodAllergies("");
      } catch (error) {
        message.error("Failed to add food preference:", error);
      }
    }
  };

  return (
    <main className="min-h-[90vh] grid place-content-center w-[820px] md:w-full mx-auto md:min-h-full md:block md:m-0">
      <section className="w-[820px] md:w-full mx-auto md:mt-0 md:m-0">
        <Card className="mobile-transparent-card md:w-full">
          <div className="p-4">
            <h3 className="font-extrabold">Notifications</h3>
            <small className="text-secondary">
              Lorem ipsum dolor sit amet consectetur.
            </small>

            <Form layout="vertical" onFinish={onFinish}>
              <div className="flex justify-between my-6 md:p-3 md:bg-white rounded-4 md:my-3">
                <p className="text-secondary">General Notifications</p>
                <div>
                  <Switch
                    checked={isShow}
                    onChange={handleNotificationChange}
                  />
                </div>
              </div>
              <Divider />
              <h3 className="font-extrabold">Types of food liked</h3>
              <Form.Item
                label={
                  <span className="text-[#666666]">
                    Lorem ipsum dolor sit amet consectetur.
                  </span>
                }
              >
                <Input
                  type="text"
                  placeholder="Enter name and press enter to add a new one"
                  value={newFoodLiked}
                  onChange={(e) => setNewFoodLiked(e.target.value)}
                  onPressEnter={handleAddFoodLiked}
                />
              </Form.Item>
              <Space className="flex justify-start items-start flex-wrap py-3">
                {foodLiked &&
                  foodLiked.map((tag, index) => (
                    <Tag
                      color="#F7F7F7"
                      style={{ padding: "6px", border: "none", color: "#000" }}
                      key={index}
                      closable
                      closeIcon={
                        <button className="border border-none text-red-500 bg-transparent">
                          x
                        </button>
                      }
                      onClose={() => handleCloseFoodLiked(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
              </Space>
              <Divider />
              <h3 className="font-extrabold">Foods you dont like</h3>
              <Form.Item
                label={
                  <span className="text-[#666666]">
                    Enter food allergies if you have any.{" "}
                  </span>
                }
              >
                <Input
                  type="text"
                  placeholder="Enter name and press enter to add a new one"
                  value={newFoodAllergies}
                  onChange={(e) => setNewFoodAllergies(e.target.value)}
                  onPressEnter={handleAddFoodAllergies}
                />
              </Form.Item>
              <Space className="flex justify-start items-start flex-wrap py-3">
                {foodAllergies &&
                  foodAllergies.map((tag, index) => (
                    <Tag
                      color="#F7F7F7"
                      style={{ padding: "6px", border: "none", color: "#000" }}
                      key={index}
                      closable
                      closeIcon={
                        <button className="border border-none text-red-500 bg-transparent">
                          x
                        </button>
                      }
                      onClose={() => handleCloseFoodAllergic(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
              </Space>
              <div>
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
    </main>
  );
}

export default PreferencesPage;
