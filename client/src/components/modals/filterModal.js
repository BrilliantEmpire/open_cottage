"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "antd";
import { CaretDown, CaretUp, XCircle } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/data/categories";
import { StarFilled } from "@ant-design/icons";

export default function FilterModal({ isOpen, onClose }) {
  const [checkedCategories, setCheckedCategories] = useState(
    Array(categories.length).fill(false)
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [cookTime, setCookTime] = useState(50); // Initial value for cook time
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  const modalRef = useRef();

  const handleCheckboxChange = (index) => {
    const updatedCheckedCategories = [...checkedCategories];
    updatedCheckedCategories[index] = !updatedCheckedCategories[index];
    setCheckedCategories(updatedCheckedCategories);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape" && isOpen) {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      isOpen
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 overflow-y-auto flex items-center justify-center sm:top-[12%]">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div
        className="inline-block bg-gray-100 h-full z-20 rounded-lg text-left overflow-auto overflow-x-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:border-none border-solid border-[#e2e8f0] border-2 w-[500px]"
        style={{
          borderRadius: "16px",
        }}
        ref={modalRef}
      >
        <div className="bg-white z-10 px-4 pt-5 sm:bg-[#F3F4F6] sm:py-2">
          <div className="flex justify-between items-center">
            <h2>Filters</h2>
            <div className="cursor-pointer" onClick={onClose}>
              <XCircle size={42} />
            </div>
          </div>
        </div>
        <div
          className="px-4 py-2 text-sm"
          style={{
            color: "#DA4325",
            maxHeight: "calc(100vh - 150px)",
            overflowY: "auto",
          }}
        >
          <Card bordered={false}>
            <p className="font-semibold pb-2">TYPE</p>
            <div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {categories
                  .slice(0, showAllCategories ? categories.length : 4)
                  .map((category, index) => (
                    <label
                      key={category.id}
                      style={{
                        display: "block",
                        padding: "8px  14px",
                        border: !checkedCategories[index]
                          ? "1px solid  #EEEEEE"
                          : "none",
                        backgroundColor: checkedCategories[index]
                          ? "green"
                          : "white",
                        color: checkedCategories[index] ? "white" : "#98989A",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkedCategories[index]}
                        onChange={() => handleCheckboxChange(index)}
                        style={{
                          position: "absolute",
                          opacity: 0,
                          pointerEvents: "none",
                        }}
                      />
                      {category.name}
                    </label>
                  ))}
              </div>
            </div>
            {!showAllCategories && (
              <p
                className="flex items-center underline mt-4"
                onClick={() => setShowAllCategories(true)}
                style={{ cursor: "pointer" }}
              >
                Show more <CaretDown size={20} />
              </p>
            )}
          </Card>
          <div className="mt-4">
            <Card bordered={false}>
              <div className="flex justify-between">
                <p>MINIMUM RATING</p>
                <small>3 and more</small>
              </div>
              <div className="w-full text-danger flex my-6 justify-center">
                {[...Array(5)].map((_, index) => (
                  <StarFilled
                    key={index}
                    style={{ fontSize: "20px", margin: "0 15px" }}
                  />
                ))}
              </div>
            </Card>
          </div>
          <div className="mt-4">
            <Card bordered={false}>
              <div className="flex justify-between">
                <p>COOK TIME</p>
                <small>{cookTime} mins</small>
              </div>
              <div className="w-full text-danger flex my-6 place-content-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  style={{
                    width: "100%",
                    background: `linear-gradient(to right, #000 0%, #000 ${cookTime}%, #E2E8F0 ${cookTime}%, #E2E8F0 100%)`,
                  }}
                />
              </div>
            </Card>
          </div>
          <div className="mt-4">
            <Card bordered={false}>
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => setShowNutritionFacts(!showNutritionFacts)}
              >
                <p className="uppercase">Nutrition Facts</p>
                <small>
                  {showNutritionFacts ? (
                    <CaretUp size={20} />
                  ) : (
                    <CaretDown size={20} />
                  )}
                </small>
              </div>
              {showNutritionFacts && (
                <div>
                  <div className="mt-6">
                    <div className="flex justify-between text-gray-400">
                      <small>Calories</small>
                      <small>300 Kcal - 800 Kcal</small>
                    </div>
                    <div className="w-full text-danger flex mt-4 place-content-center">
                      <input type="range" min="0" max="100" value="50" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-gray-400">
                      <small>Carbs</small>
                      <small>Any</small>
                    </div>
                    <div className="w-full text-danger flex mt-2 place-content-center">
                      <input type="range" min="0" max="100" value="50" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-gray-400">
                      <small>Fats</small>
                      <small>Any</small>
                    </div>
                    <div className="w-full text-danger flex mt-2 place-content-center">
                      <input type="range" min="0" max="100" value="50" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-gray-400">
                      <small>Protein</small>
                      <small>Any</small>
                    </div>
                    <div className="w-full text-danger flex mt-2 place-content-center">
                      <input type="range" min="0" max="100" value="50" />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
        <div className="sm:sticky sm:bottom-0 bg-white z-10 px-4 py-6 sm:py-2 sm:bg-[#F3F4F6] sm:flex-col-reverse">
          <div className="my-6 flex justify-between gap-4">
            <Button size="large" type="primary" block ghost>
              Reset all
            </Button>
            <Button block type="primary" size="large" onClick={onClose}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
