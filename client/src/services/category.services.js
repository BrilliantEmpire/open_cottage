import { message } from "antd";

const apiUrl = `${process.env.API_BASE_URL}category`;

export const getAllCategories = async () => {
  try {
    const res = await fetch(apiUrl + "/all");
    const data = await res.json();
    return data;
  } catch (error) {
    message.error(error.message);
  }
};
