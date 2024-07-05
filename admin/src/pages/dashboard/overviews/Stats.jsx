/* eslint-disable react/prop-types */
import { Card } from "antd";
import StatisticCard from "./StatisticCard";

function Stats({ totalPosts, totalRecipes, totalUsers, totalFollowers }) {
  return (
    <Card className="w-full">
      <div className="w-full flex sm:flex-col justify-around">
        <StatisticCard
          value={totalPosts}
          image={"./assets/svgs/file.svg"}
          title={"Total Posts"}
        />
        <StatisticCard
          value={totalRecipes}
          image={"./assets/svgs/made.svg"}
          title={"Total Recipes"}
        />
        <StatisticCard
          value={totalUsers}
          image={"./assets/svgs/users.svg"}
          title={"Total Users"}
        />
        <StatisticCard
          value={totalFollowers}
          image={"./assets/svgs/community.svg"}
          title={"Communities"}
        />
      </div>
    </Card>
  );
}

export default Stats;
