import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}admin`;

class Recipe {
  constructor(token) {
    this.token = token;
  }

  // get all recipes
  getRecipes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getRecipesByAdmin`, {
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

  // get single recipe
  getRecipe = async (slug) => {
    try {
      const response = await axios.get(
        `${apiUrl}/getRecipeBySlugByAdmin/${slug}`,
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

  // block and unblock recipe
  blockAndUnblockRecipe = async (recipeId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/blockAndUnblockRecipeByAdmin`,
        {
          recipeId,
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

export { Recipe };
