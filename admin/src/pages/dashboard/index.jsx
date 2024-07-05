import { Card, Col, Row, Space, Table, Tag } from "antd";
import Stats from "./overviews/Stats";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { useEffect } from "react";
import { getStats } from "../../redux_state/dashboard/dashboard.slice";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats({}));
  }, []);

  const { user, isLoading: isLoadingUser } = useSelector((state) => state.auth);
  const { stats, isLoading } = useSelector((state) => state.dashboard);

  if (isLoading || isLoadingUser) return <Loader />;

  return (
    <div className="w-full">
      <h2 className="mb-4 pl-4">
        Welcome, <span className="text-primary">{user?.full_name}</span>{" "}
      </h2>
      <Stats
        totalPosts={stats?.totalPosts}
        totalRecipes={stats?.totalRecipes}
        totalUsers={stats?.totalUsers}
        totalFollowers={stats?.totalFollower}
      />
      <Row className="mt-6" gutter={[24]}>
        <Col xxl={16} xl={16} lg={16} md={16} sm={24}>
          <Card>
            <div className="flex justify-between mb-6">
              <h3>Recently added recipes</h3>
              <Link
                to={"/dashboard/recipes"}
                className="underline text-primary"
              >
                See all
              </Link>
            </div>
            <div className="w-full">
              {stats?.recentRecipes?.length <= 0 && (
                <h4 className="text-gray-500">No recipes for this week</h4>
              )}
              {stats?.recentRecipes?.map((recipe) => (
                <div className="flex gap-4 mt-6" key={recipe?._id}>
                  <img
                    className="rounded-4"
                    src={recipe?.images[0]}
                    width={200}
                  />
                  <div>
                    <h4>{recipe?.title}</h4>
                    <p className="text-secondary mb-4">{recipe?.description}</p>
                    <Space />
                    <Tag>{recipe?.name}</Tag>
                    <Link
                      className="underline text-primary"
                      to={"/dashboard/recipes/" + recipe?.slug}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={8} sm={24}>
          <Card>
            <div className="flex justify-between">
              <h3>This week feeds</h3>
              <Link to={"/dashboard/feeds"} className="underline text-primary">
                See all
              </Link>
            </div>
            <Row className="w-full">
              {stats?.recentPosts?.length <= 0 && (
                <h4 className="text-gray-500">No feeds added for this week</h4>
              )}
              <Table
                size="large"
                className="w-full"
                columns={[
                  {
                    title: "Image",
                    dataIndex: "image",
                  },
                  {
                    title: "Content",
                    dataIndex: "description",
                  },
                ]}
                dataSource={stats?.recentPosts?.map((feed, index) => ({
                  key: index,
                  ...feed,
                  description: (
                    <Link
                      className="text-primary"
                      to={`/dashboard/feeds/${feed?._id}`}
                    >
                      {feed?.description}
                    </Link>
                  ),

                  image: (
                    <img
                      height={60}
                      src={
                        feed?.images[1] ??
                        "./assets/pngs/no_image_placeholder.png"
                      }
                      className="rounded-10"
                    />
                  ),
                }))}
              />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
