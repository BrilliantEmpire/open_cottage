/* eslint-disable react/prop-types */
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const SubTabs = ({ activeKey }) => {
  const navigate = useNavigate();

  const onChange = (key) => {
    const goTo = items.find((item) => item.key === key);
    navigate(goTo?.link);
  };
  const items = [
    {
      key: "1",
      label: "Not contacted",
      link: "/dashboard/daily-follows?status=not_contacted",
    },
    {
      key: "2",
      label: "Contacted",
      link: "/dashboard/daily-follows?status=contacted",
    },
  ];

  return (
    <Tabs
      defaultActiveKey={activeKey}
      items={items}
      tabBarStyle={{
        borderBottom: "1px solid #E1E1E1",
      }}
      onChange={onChange}
    />
  );
};
export default SubTabs;
