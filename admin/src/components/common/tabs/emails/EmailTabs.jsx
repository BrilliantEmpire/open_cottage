/* eslint-disable react/prop-types */
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const EmailTabs = ({ activeKey }) => {
  const navigate = useNavigate();

  const onChange = (key) => {
    const goTo = items.find((item) => item.key === key);
    navigate(goTo?.link);
  };

  const items = [
    {
      key: "1",
      label: "Drafts",
      link: "/dashboard/email-templates/",
    },
    {
      key: "2",
      label: "Email template",
      link: "/dashboard/email-templates/all",
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
export default EmailTabs;
