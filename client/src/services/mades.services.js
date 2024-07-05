import { message } from "antd";

const apiUrl = `${process.env.API_BASE_URL}made`;

async function addMade(token, id) {
  try {
    const res = await fetch(`${apiUrl}/addMade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recipe: id }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

// get a made recipe by a user
async function getMade(token, id) {
  try {
    const res = await fetch(`${apiUrl}/getMadeByUser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

export { addMade, getMade };
