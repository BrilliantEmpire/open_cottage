import React, { useState } from "react";

const NutritionTable = ({ nutritionData, setNutritionData }) => {
  const handleNutritionChange = (e, index, key) => {
    const { value } = e.target;
    const newData = [...nutritionData];

    // If the key is 'cal', validate input format using regex
    if (key === "cal") {
      // Allow only numbers or fraction-like inputs
      const isValidInput = /^(\d+(\.\d+)?|\d*\/\d+)?$/.test(value);

      if (!isValidInput) {
        return; // Exit early if input is not valid
      }
    }

    newData[index][key] = value;
    setNutritionData(newData);

    // Add new row if the last row is filled and there are less than 5 rows
    if (index === nutritionData.length - 1 && newData[index][key] !== "") {
      setNutritionData([...newData, { nutrient: "", cal: "", unit: "" }]);
    }
  };

  return (
    <div className="mt-2">
      <table className="w-full mt-4 border border-collapse border-gray-300 border-solid rounded-6">
        <thead>
          <tr className="h-[3em] text-white bg-dark">
            <th className="w-[60%] px-4 py-2 text-sm font-semibold text-left border border-gray-300 border-solid">
              NUTRIENT
            </th>
            <th className="px-4 py-2 border border-gray-300 border-solid">
              CAL
            </th>
            <th className="px-4 py-2 border border-gray-300 border-solid">
              UNIT
            </th>
          </tr>
        </thead>

        <tbody>
          {nutritionData.map((item, index) => (
            <tr
              key={index}
              className="bg-white border border-gray-300 border-solid "
            >
              <td className="px-4 border border-gray-300 border-solid">
                <input
                  type="text"
                  value={item.nutrient}
                  onChange={(e) => handleNutritionChange(e, index, "nutrient")}
                />
              </td>
              <td className="px-4 border border-gray-300 border-solid">
                <input
                  type="text"
                  value={item.cal}
                  onChange={(e) => handleNutritionChange(e, index, "cal")}
                />
              </td>
              <td className="px-4 border border-gray-300 border-solid">
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) => handleNutritionChange(e, index, "unit")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;
