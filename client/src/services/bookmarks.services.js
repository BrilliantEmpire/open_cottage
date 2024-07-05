import { message } from "antd";

const apiUrl = `${process.env.API_BASE_URL}bookmark`;

async function bookmarkRecipe(token, id) {
  try {
    const res = await fetch(`${apiUrl}/bookmarkAndUnbookmarkRecipe`, {
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

// bookmark a Post
async function bookmarkPost(token, id) {
  try {
    const res = await fetch(`${apiUrl}/bookmarkAndUnbookmarkPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: id }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

// get bookmarked recipes
async function getBookmarkedRecipes(token) {
  try {
    const res = await fetch(`${apiUrl}/getMyBookmarkRecipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

// get bookmarked posts
async function getBookmarkedPosts(token) {
  try {
    const res = await fetch(`${apiUrl}/getMyBookmarkPosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    message.error(error.error?.toString() || error.message.toString());
  }
}

// check if recipe is bookmarked
const checkRecipeBookmarked = async (recipe, token) => {
  try {
    const res = await fetch(
      `${apiUrl}/checkIfBookmarkedRecipe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipe }),
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

// check if post is bookmarked
const checkPostBookmarked = async (post, token) => {
  try {
    const res = await fetch(
      `${apiUrl}/checkIfBookmarkedPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post }),
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

export {
  bookmarkRecipe,
  bookmarkPost,
  getBookmarkedRecipes,
  getBookmarkedPosts,
  checkRecipeBookmarked,
  checkPostBookmarked,
};
