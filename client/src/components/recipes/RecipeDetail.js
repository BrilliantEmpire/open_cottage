"use client";
import React from "react";
import { useState } from "react";
import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import { Clock, Users, FireFilled } from "@phosphor-icons/react/dist/ssr";

function RecipeDetail() {
  const [activeKey, setActiveKey] = useState("1");

  const callback = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="hidden lg:mt-2 recipe-detail-sec lg:block">
      <Collapse
        onChange={callback}
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
          header="Recipe Detail"
          key="1"
          className="px-6 py-3 text-2xl bg-white rounded-lg"
        >
          <div className="mt-3 text-base">
            <ul>
              <li className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 pb-3">
                <div className="flex">
                  <Clock size={22} color="#0F0F0F" weight="fill" />
                  <p className="pl-3">Prep Time</p>
                </div>
                <div>
                  <p>15 mins</p>
                </div>
              </li>
              <li className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 pb-3 pt-3">
                <div className="flex">
                  <Clock size={22} color="#0F0F0F" weight="fill" />
                  <p className="pl-3">Cook Time</p>
                </div>
                <div>
                  <p>1 hr 30 mins</p>
                </div>
              </li>
              <li className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 pb-3 pt-3">
                <div className="flex">
                  <Clock size={22} color="#0F0F0F" weight="fill" />
                  <p className="pl-3">Total Time</p>
                </div>
                <div>
                  <p>1 hr 45 mins</p>
                </div>
              </li>
              <li className="flex justify-between pt-3">
                <div className="flex">
                  <Users size={22} color="#0F0F0F" weight="fill" />
                  <p className="pl-3">Servings</p>
                </div>
                <div>
                  <p>6</p>
                </div>
              </li>
            </ul>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RecipeDetail;
