/* eslint-disable react/prop-types */
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const MainTabs = ({ activeKey }) => {
  const navigate = useNavigate();

  const onChange = (key) => {
    const goTo = items.find((item) => item.key === key);
    navigate(goTo?.link);
  };
  const items = [
    {
      key: "1",
      label: "Report",
      link: "/dashboard/daily-follows/",
    },
    {
      key: "2",
      label: "Patient response",
      link: "/dashboard/daily-follows/reports?status=response",
    },
  ];
  return (
    <Tabs
      defaultActiveKey={activeKey}
      items={items}
      onChange={onChange}
      tabBarStyle={{
        borderBottom: "1px solid #E1E1E1",
      }}
    />
  );
};
export default MainTabs;
