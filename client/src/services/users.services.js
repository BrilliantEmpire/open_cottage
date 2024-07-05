import { message } from "antd";
import axios from "axios";

const apiUrl = `${process.env.API_BASE_URL}user`;

// get user profile
export const getUserProfile = async (token) => {
  try {
    const res = await fetch(
      `${apiUrl}/getUserProfile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data.user;
  } catch (error) {
    message.error(error.message);
  }
};

// update user profile
export const updateUserProfile = async (token, data) => {
  try {
    const res = await fetch(
      `${apiUrl}/updateUserProfile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
      {
        cache: "no-store",
      }
    );
    const dataRes = await res.json();
    return dataRes;
  } catch (error) {
    message.error(error.message);
  }
};
