import { message } from "antd";

const apiUrl = `${process.env.API_BASE_URL}preference`;

export const getUserPreferences = async (token) => {
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error("Unauthorized access. Please log in again.");
    } else {
      message.error("An error occurred while fetching preferences.");
    }
    throw error;
  }
};

//update toogle notfication 
export const updateUserPreferences = async (token, preferences) => {
  try {
    const res = await fetch(`${apiUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferences),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error("Unauthorized access. Please log in again.");
    } else {
      message.error("An error occurred while updating preferences.");
    }
    throw error;
  }
};

//food preferences services

//delete food preferences
export const removeFoodPreferences = async (token, tag) => {
  try {
    const res = await fetch(`${apiUrl}/food`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tag }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete food preference");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    message.error(`Error on deleting: ${error.message}`);
    throw error;
  }
};
//delete food allergic
export const removeAllergicFood = async (token, allergic) => {
  try {
    const res = await fetch(`${apiUrl}/allergies`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ allergic }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete food preference");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    message.error(`Error on deleting: ${error.message}`);
    throw error;
  }
};

//create food prefrences
export const createFoodPrefences = async (token, likedFood) => {
  try {
    const res = await fetch(`${apiUrl}/food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ likedFood }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    message.error(`Error on deleting: ${error.message}`);
    throw error;
  }
};

//create food allergic
export const createFoodAllergic = async (token, allergies) => {
  try {
    const res = await fetch(`${apiUrl}/allergies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ allergies }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    message.error(`Error on deleting: ${error.message}`);
    throw error;
  }
};
