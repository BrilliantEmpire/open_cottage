import { message } from "antd";
import axios from "axios";

export const createRecipe = async (recipeData, token) => {
  const apiUrl = `${process.env.API_BASE_URL}recipe/createRecipe`;

  try {
    const response = await axios.post(apiUrl, recipeData, {
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

export const getTopRecipes = async () => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}recipe/toppicks`;
    const res = await fetch(
      apiUrl,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

export const getAllRecipes = async () => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}recipe/all`;
    const res = await fetch(
      apiUrl,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

//herer are the methods for my recipes
export const getMyCreatedRecipes = async (token) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}recipe/getMyCreatedRecipes`;
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
    throw error;
  }
};

export const removeMyCreatedRecipe = async (token, recipeId) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}recipe/removeMyRecipe/${recipeId}`;
    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllRecipesBySearch = async (search) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}recipe/search/?q=${search}`;
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//this method was not working so have to modify it as per backend api
export const getRecipeBySlug = async ( slug) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}recipe/singleRecipe/${slug}`;
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // if (!res.ok) {
    //   throw new Error(`HTTP error! Status: ${res.status}`);
    // }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// get similar recipes by category
export const getSimilarRecipesByCategory = async (category) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}recipe/category/${category}`;
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
