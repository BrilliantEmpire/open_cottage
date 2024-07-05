/* eslint-disable react/prop-types */
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const PackagingShippingTabs = ({ activeKey }) => {
  const navigate = useNavigate();

  const onChange = (key) => {
    const goTo = items.find((item) => item.key === key);
    navigate(goTo?.link);
  };
  const items = [
    {
      key: "1",
      label: "Packaging",
      link: "/dashboard/packagings/",
    },
    {
      key: "2",
      label: "Shipping",
      link: "/dashboard/packagings/shippings",
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
export default PackagingShippingTabs;
