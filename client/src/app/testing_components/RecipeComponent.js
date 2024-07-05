"use client"
import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../services/recipes.services'; // Import your getAllRecipes function

const RecipeComponent = () => {
  const [latestRecipes, setLatestRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Call the getAllRecipes function
        const recipesData = await getAllRecipes();
        console.log('Recipes Data:', recipesData); // Log the response data

        // Assuming recipesData is an array of recipes
        setLatestRecipes(recipesData); // Update state with fetched recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes(); // Invoke the fetchRecipes function
  }, []); // Empty dependency array means this runs only once on mount

  // Render logic using latestRecipes state
  return (
    <div>
      <h1>Latest Recipes</h1>
      <ul>
        {latestRecipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name} - {recipe.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeComponent;