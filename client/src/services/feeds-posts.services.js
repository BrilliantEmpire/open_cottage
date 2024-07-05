import { message } from "antd";
import axios from "axios";

const apiUrl = `${process.env.API_BASE_URL}post`;

export const createPostFeed = async (postData, token) => {
  try {
    const response = await axios.post(`${apiUrl}/createPost`, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (token) => {
  try {
    const res = await fetch(
      `${apiUrl}/getPosts`,
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
    message.error(error.message);
  }
};

export const getMyCreatedPosts = async (token) => {
  try {
    const res = await fetch(
      `${apiUrl}/getMyCreatedPosts`,
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

// like and unlike
export const likeAndUnlike = async (postId, token) => {
  try {
    const res = await fetch(
      `${apiUrl}/likeAndUnlike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
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

// delete post
export const deletePost = async (postId, token) => {
  try {
    const res = await fetch(
      `${apiUrl}/deletePost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
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

// share post
export const sharePost = async (postId, token) => {
  try {
    const res = await fetch(
      `${apiUrl}/sharePost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
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
