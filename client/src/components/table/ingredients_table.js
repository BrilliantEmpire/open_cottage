import React, { useState } from "react";

const IngredientTable = ({ ingredientsData, onChange }) => {
  const [suggestions, setSuggestions] = useState([
    "butter",
    "butternut squash",
    "buttermilk",
    // Add more suggestions as needed
  ]);

  const handleInputChange = (e, index, key) => {
    const { value } = e.target;
    const newData = [...ingredientsData];
    newData[index][key] = value;
    onChange(newData);
  };

  const handleAutoComplete = (index, key, value) => {
    // Find suggestions that match the input value
    const matchedSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    // If there's a matching suggestion, set it as the input value automatically
    if (matchedSuggestions.length > 0) {
      const newData = [...ingredientsData];
      newData[index][key] = matchedSuggestions[0];
      onChange(newData);
    }
  };

  return (
    <div className="mt-2">
      <table className="w-full mt-4 border border-collapse border-gray-300 border-solid rounded-6">
        <thead>
          <tr className="h-[3em] text-white bg-dark">
            <th className="w-[60%] px-4 py-2 text-sm font-semibold text-left border border-gray-300 border-solid">
              INGREDIENT
            </th>
            <th className="px-4 py-2 border border-gray-300 border-solid">
              QTY
            </th>
            <th className="px-4 py-2 border border-gray-300 border-solid">
              UNIT
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredientsData.map((ingredient, index) => (
            <tr
              key={index}
              className="bg-white border border-gray-300 border-solid"
            >
              <td className="relative px-4 border border-gray-300 border-solid">
                <input
                  type="text"
                  value={ingredient.ingredient}
                  onChange={(e) => handleInputChange(e, index, "ingredient")}
                  //this is kind of buggy rigth now will be fixed later..
                  // onBlur={() =>
                  //   handleAutoComplete(
                  //     index,
                  //     "ingredient",
                  //     ingredient.ingredient
                  //   )
                  // }
                />
                {/* Suggestions dropdown */}
                {/* {ingredient.ingredient && ingredient.ingredient.length >= 2 && (
                  <ul className="absolute mt-2 bg-white border border-gray-300 border-solid rounded shadow-md z-99998">
                    {suggestions
                      .filter((suggestion) =>
                        suggestion
                          .toLowerCase()
                          .includes(ingredient.ingredient.toLowerCase())
                      )
                      .map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            handleInputChange(
                              { target: { value: suggestion } },
                              index,
                              "ingredient"
                            )
                          }
                        >
                          {suggestion}
                        </li>
                      ))}
                  </ul>
                )} */}
              </td>
              <td className="px-4 border border-gray-300 border-solid">
                <input
                  type="text"
                  value={ingredient.qty}
                  onChange={(e) => handleInputChange(e, index, "qty")}
                />
              </td>
              <td className="px-4 border border-gray-300 border-solid">
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => handleInputChange(e, index, "unit")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientTable;