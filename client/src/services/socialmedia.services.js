import axios from "axios";
import { message } from "antd";

//this metod fetches the social account
export const getSocialMedia = async (token) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}user/getSocialMediaLinks`;
    const res = await fetch(
      apiUrl,
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
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error("Unauthorized access. Please log in again.");
    } else {
      message.error("An error occurred while fetching social media links.");
    }
    throw error;
  }
};

//unlink social media account
export const deleteSocialMediaAccount = async (postId, token) => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}user/deleteSocialMediaLink`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//update social media links
export const updateSocialMedia = async (socialId, token) => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}user/updateSocialMediaLink`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(socialId),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    message.error("Failed to update social media links.");
    throw error;
  }
};

//create social media links
export const createSocialMediaLinks = async (socialMediaData, token) => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}user/createSocialMediaLink`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ socialMediaData }),
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    message.error("Failed to create social media links.");
    throw error;
  }
};
