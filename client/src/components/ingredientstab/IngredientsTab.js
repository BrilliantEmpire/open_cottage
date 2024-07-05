"use client";
import React from "react";
import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const IngredientsTab = ({ ingredients }) => {
  return (
    <div className="mt-8 lg:mt-4">
      <Collapse
        expandIconPosition="end"
        className="rounded-lg collapse-container"
        expandIcon={({ isActive }) =>
          isActive ? (
            <MinusOutlined size={32} color="#D0001E" />
          ) : (
            <PlusOutlined size={32} color="#D0001E" />
          )
        }
      >
        <Panel
          header="Ingredients"
          key="1"
          className="px-6 py-3 text-2xl font-bold bg-white rounded-lg"
        >
          <ul className="mt-4 list-inside">
            {ingredients?.map((ingredient, index) => (
              <li className="text-base font-normal list-disc mb-2" key={index}>
                {ingredient?.ingredient?.trim()}
              </li>
            ))}
          </ul>
        </Panel>
      </Collapse>
    </div>
  );
};
export default IngredientsTab;
