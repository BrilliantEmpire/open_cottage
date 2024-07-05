import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}admin`;

class Dashboard {
  constructor(token) {
    this.token = token;
  }

  getStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/dashboard`, {
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
}

export { Dashboard };
