import React from "react";
import { Tabs } from "antd";
import TabRecipes from "./TabRecipes";
const RightColumn = () => {
  return (
    <div className="w-9/12">
      <Tabs
        defaultActiveKey="1"
        items={[
          // {
          //   label: "Posts",
          //   key: "1",
          //   children: "tess",
          // },
          {
            label: "Recipe",
            key: "2",
            children: <TabRecipes />,
          },
          {
            label: "Saved Recipe",
            key: "3",
            children: <TabRecipes />,
          },
        ]}
      />
    </div>
  );
};

export default RightColumn;
