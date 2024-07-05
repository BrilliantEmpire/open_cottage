import { message } from "antd";
import axios from "axios";

const apiUrl = `${process.env.API_BASE_URL}follower`;

export const followAndUnfollower = async (user, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/followAndUnfollower`,
      {
        user,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyFollowings = async (token) => {
  try {
    const res = await fetch(
      `${apiUrl}/getMyFollowings`,
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
    return data.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const suggestFollowers = async (token) => {
  try {
    const res = await fetch(
      `${apiUrl}/suggestUsers`,
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
    return data.data;
  } catch (error) {
    message.error(error.message);
  }
};

// check whether user is following or not
export const checkFollow = async (user, token) => {
  try {
    const res = await fetch(
      `${apiUrl}/checkIfFollowing`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user }),
      },
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
