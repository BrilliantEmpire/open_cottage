import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Col, Row, Table, Tag, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../../components/common/DeleteModal";
import {
  blockAndUnblockUser,
  getUser,
  reset,
} from "../../../redux_state/users/users.slice";
import Loader from "../../../components/common/Loader";

function UserDetails() {
  const { id } = useParams();

  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(id));

    if (isSuccess) {
      message.success("User status updated successfully");
      setIsDelete(false);
      dispatch(reset());
    }
  }, [isSuccess]);

  const handleBlock = () => {
    dispatch(blockAndUnblockUser(id));
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>User Details</h2>
        <Button
          type={user?.is_active ? "danger" : "primary"}
          className={`${
            user?.is_active ? "bg-red-500" : "bg-green-500"
          } text-white`}
          icon={<i className="ri-delete-bin-6-line"></i>}
          size="small"
          onClick={() => setIsDelete(true)}
        >
          {user?.is_active ? "Block" : "Unblock"}
        </Button>
      </div>

      <div className="px-4">
        {user && (
          <>
            <Card>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={user?.profile_image ?? "/assets/pngs/imageError.png"}
                    size={"large"}
                  />
                  <div>
                    <p className="text-secondary">Full Name</p>
                    <h5>{user?.full_name}</h5>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-secondary">Total Created Feeds</p>
                    <Tag>{user?.postsCount}</Tag>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-secondary">Total created recipes</p>
                    <h5>{user?.recipesCount}</h5>
                  </div>
                </div>
              </div>
            </Card>
            <Row className="mt-6" gutter={[24]}>
              <Col xxl={16} xl={16} lg={16} md={16} sm={24}>
                <Card>
                  <div className="flex justify-between mb-6">
                    <h3>User added recipes</h3>
                  </div>
                  <div className="w-full">
                    {user?.recipes?.length <= 0 && (
                      <h4 className="text-gray-500">
                        No recipes added by this user yet.
                      </h4>
                    )}
                    {user?.recipes?.map((recipe) => (
                      <div className="flex gap-4 mt-6" key={recipe._id}>
                        <img
                          className="rounded-4"
                          src={recipe?.images[0]}
                          height={100}
                        />
                        <div>
                          <h4>{recipe?.title}</h4>
                          <p className="text-secondary mb-4">
                            {recipe?.description}
                          </p>

                          <Tag>{user?.full_name}</Tag>
                          <Link
                            className="underline text-primary"
                            to={"/dashboard/recipes/" + recipe?.id}
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
                    <h3>Feeds created by this user</h3>
                  </div>
                  <Row className="w-full">
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
                          dataIndex: "content",
                        },
                      ]}
                      dataSource={user?.posts?.map((feed, index) => ({
                        key: index,
                        ...feed,
                        content: (
                          <Link
                            className="text-primary"
                            to={`/dashboard/feeds/${12}`}
                          >
                            {feed.description}
                          </Link>
                        ),
                        user: (
                          <Link
                            className="text-primary underline"
                            to={`/dashboard/users/${user?._id}`}
                          >
                            {feed.user?.full_name}
                          </Link>
                        ),
                        image: (
                          <img
                            height={60}
                            src={
                              feed?.images[0] ??
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
          </>
        )}
      </div>

      <DeleteModal
        isOpen={isDelete}
        onToggle={() => setIsDelete(!isDelete)}
        handleSend={handleBlock}
        title={"Are you sure you want to block this user?"}
      />
    </>
  );
}
export default UserDetails;
