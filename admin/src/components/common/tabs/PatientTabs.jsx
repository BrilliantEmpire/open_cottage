/* eslint-disable no-unused-vars */
import { Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertDate } from "../../../utils/converter.date";
import moment from "moment";

const PatientTabs = () => {
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();

  const keyId = searchParams.get("key");

  const onChange = (key) => {
    const goTo = items.find((item) => item.key === key);
    navigate(`${goTo?.link}`);
  };

  const currentDate = moment();

  // Get the beginning of the current month
  const beginningOfMonth = currentDate
    .clone()
    .startOf("month")
    .format("YYYY-MM-DD");

  // Get the end of the current month
  const endOfMonth = currentDate.clone().endOf("month").format("YYYY-MM-DD");

  const beginningOfWeek = currentDate.clone().startOf("week");

  // Get the end of the current week (Saturday)
  const endOfWeek = currentDate.clone().endOf("week");

  const items = [
    {
      key: "1",
      label: "All Time",
      link: `/dashboard/patients-log`,
    },
    {
      key: "2",
      label: "Today",
      link: `/dashboard/patients-log?startDate=${convertDate(moment())}&key=2`,
    },
    {
      key: "3",
      label: "Week",
      link: `/dashboard/patients-log?startDate=${convertDate(
        beginningOfWeek
      )}&endDate=${convertDate(endOfWeek)}&key=3`,
    },
    {
      key: "4",
      label: "Month",
      link: `/dashboard/patients-log?startDate=${convertDate(
        beginningOfMonth
      )}&endDate=${convertDate(endOfMonth)}&key=4`,
    },
  ];

  return (
    <Tabs
      defaultActiveKey={keyId || "1"}
      items={items}
      tabBarStyle={{
        borderBottom: "1px solid #E1E1E1",
      }}
      onChange={onChange}
    />
  );
};
export default PatientTabs;
