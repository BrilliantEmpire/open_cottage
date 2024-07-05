import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}admin`;

export class Post {
  constructor(token) {
    this.token = token;
  }

  // get all posts
  getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getPostsByAdmin`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  // get single post
  getPost = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/getPostByIdByAdmin/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  // block and unblock post
  blockAndUnblockPost = async (postId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/blockAndUnblockPostByAdmin`,
        {
          postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
}
