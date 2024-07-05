"use client";
import React, { useState } from "react";
import { Collapse, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { FireFilled, CaretDownFilled, Clock } from "@ant-design/icons";
const { Panel } = Collapse;

const NutritionFactMob = () => {
  const [showAll, setShowAll] = useState(false);

  const data = [
    {
      id: 1,
      name: "Calories",
      value: "315",
      icon: <img src="/icons/cal.png" alt="calories" />,
    },
    {
      id: 2,
      name: "Fat",
      value: "24g",
      icon: <img src="/icons/fat.png" alt="fat" />,
    },
    {
      id: 3,
      name: "Carbs",
      value: "30g",
      icon: <img src="/icons/carbs.png" alt="carbs" />,
    },
    {
      id: 4,
      name: "Protein",
      value: "10g",
      icon: <img src="/icons/protein.png" alt="protein" />,
    },
    {
      id: 5,
      name: "Total fat",
      value: "23g (29%)",
    },
    {
      id: 6,
      name: "Saturated Fat",
      value: "23g (29%)",
    },
  ];

  return (
    <div className="hidden lg:mt-2 recipe-detail-sec lg:block">
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
        defaultActiveKey={["1"]}
        onChange={() => setShowAll(!showAll)}
      >
        <Panel
          header="Nutrition Facts"
          key="1"
          className="px-6 py-3 text-2xl bg-white rounded-lg"
        >
          <div className="mt-3 text-base">
            <ul>
              {data.slice(0, 4).map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 py-3"
                >
                  <div className="flex">
                    <div className="pr-3">{item.icon}</div>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <p>{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            {!showAll && (
              <div className="text-center my-3">
                <a className="text-base show-more-btn text-[#0F0F0F] hover:text-[#288B22]" onClick={() => setShowAll(true)}>
                  Show Full Nutrition
                </a>
              </div>
            )}
            {showAll && (
              <ul>
                {data.slice(4).map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-[#DEDEDE] border-solid border-b-1 border-0 py-3"
                  >
                    <div className="flex">
                    <div className="pr-3">{item.icon}</div>
                      <p>{item.name}</p>
                    </div>
                    <div>
                      <p>{item.value}</p>
                    </div>
                  </li>
                ))}
                <div className="text-center my-3">
                  <a className="text-base show-more-btn text-[#0F0F0F] hover:text-[#288B22]" onClick={() => setShowAll(false)}>
                    Hide Full Nutrition
                  </a>
                </div>
              </ul>
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default NutritionFactMob;
