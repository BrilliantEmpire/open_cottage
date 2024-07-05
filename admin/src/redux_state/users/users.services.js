import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}admin`;

class User {
  constructor(token) {
    this.token = token;
  }

  // get all users
  getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getUsersByAdmin`, {
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

  // get single user
  getUser = async (userId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/getUserByIdByAdmin/${userId}`,
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

  // block and unblock user
  blockAndUnblockUser = async (userId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/blockAndUnblockUserByAdmin`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export { User };
