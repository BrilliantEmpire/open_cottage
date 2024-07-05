"use client";
import React from "react";
import { useState } from "react";
import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const DirectionTab = ({ directions }) => {
  return (
    <div className="mt-4 lg:mt-2">
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
          header="Directions"
          key="1"
          className="px-6 py-3 text-2xl font-bold bg-white rounded-lg"
        >
          <div className="mt-4 list-inside">
            {directions?.map((direction, index) => (
              <div key={index}>
                <h6>Step {index}</h6>
                <p className="text-base font-normal mb-4">
                  {direction?.content.trim()}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
export default DirectionTab;
