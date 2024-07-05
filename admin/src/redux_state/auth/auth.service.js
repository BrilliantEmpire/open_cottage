import Cookie from "js-cookie";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}admin`;

class AuthService {
  constructor(token) {
    this.token = token;
  }

  // admin login service
  login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      const { data } = response.data;

      if (userData.remember) {
        localStorage.setItem(
          "open-cottage-user",
          JSON.stringify({
            full_name: data.full_name,
            email: data.email,
          })
        );

        Cookie.set("open-cottage-token", data.token.accessToken, {
          expires: 1,
        });
      }

      this.accessToken = data.token.accessToken;
      return {
        user: {
          full_name: data.full_name,
          email: data.email,
        },
        token: data.token.accessToken,
      };
    } catch (error) {
      throw error;
    }
  };

  // admin logout service
  logout = () => {
    Cookie.remove("open-cottage-token");
    this.token = null;
  };

  // set new password
  setNewPassword = async (data) => {
    try {
      const response = await axios.put(`${API_URL}/setNewPassword`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export { AuthService };
