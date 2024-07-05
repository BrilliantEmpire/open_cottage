import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Servings = ({ selectedServing, onChange, setSelectedServing }) => {
  const servings = [
    "1 serving",
    "2 servings",
    "3 servings",
    "4 servings",
    "5 servings",
    "6 servings",
    "7 servings",
    "8 servings",
    "9 servings",
    "10 servings",
  ];

  const handleMenuClick = ({ key }) => {
    const selectedServing = servings[key - 1]; // Get the selected serving
    setSelectedServing(selectedServing);
    if (onChange) {
      onChange(selectedServing); // Notify parent component of the selected serving
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {servings.map((serving, index) => (
        <Menu.Item key={index + 1}>{serving}</Menu.Item> // Adjust key here
      ))}
    </Menu>
  );

  return (
    <div className="flex items-center w-full serving-drop">
      <Dropdown overlay={menu} className="w-full">
        <a className="w-full ant-dropdown-link" style={{ color: "#98989A" }}>
          {selectedServing ? selectedServing : "Serving"} <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default Servings;
