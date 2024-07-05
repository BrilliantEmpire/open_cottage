import { message } from "antd";

const apiUrl = `${process.env.API_BASE_URL}comment`;

async function addPostComment(token, data) {
  try {
    const res = await fetch(`${apiUrl}/addPostComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const dataRes = await res.json();

    return dataRes;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

async function addRecipeComment(token, data) {
  try {
    const res = await fetch(`${apiUrl}/addRecipeComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const dataRes = await res.json();

    return dataRes;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

async function getRecipeComments(id) {
  try {
    const res = await fetch(`${apiUrl}/getRecipeComments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataRes = await res.json();

    return dataRes;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

async function getPostComments(token, id) {
  try {
    const res = await fetch(`${apiUrl}/getPostComments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataRes = await res.json();

    return dataRes;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

export { addPostComment, addRecipeComment, getRecipeComments, getPostComments };
