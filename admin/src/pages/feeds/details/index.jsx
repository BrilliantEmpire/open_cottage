import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Rate,
  Row,
  Tag,
  message,
} from "antd";
import { ThumbsUp } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import CommentsList from "../../../components/comments/CommentsList";
import DeleteModal from "../../../components/common/DeleteModal";
import moment from "moment";
import {
  blockAndUnblockPost,
  getPost,
  reset,
} from "../../../redux_state/posts-feeds/posts.slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/common/Loader";

function FeedsDetails() {
  const { id } = useParams();

  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useDispatch();

  const {
    post: feed,
    isLoading,
    isSuccess,
  } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(id));

    if (isSuccess) {
      message.success("Post status updated successfully");
      setIsDelete(false);
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const handleBlock = () => {
    // selectedPostIds.forEach((postId) => {
    dispatch(blockAndUnblockPost(id));
    // });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Feed Details</h2>
        <Button
          type="primary"
          ghost
          icon={<i className="ri-delete-bin-6-line"></i>}
          size="small"
          onClick={() => setIsDelete(true)}
        >
          Block
        </Button>
      </div>

      <Card>
        <div className="px-4">
          {feed && (
            <>
              <div>
                <div className="mt-4 rounded-sm width-70">
                  <Row gutter={[24]}>
                    <Col lg={16}>
                      <div className="w-full h-1/2">
                        {feed?.images && feed?.images?.length > 0 ? (
                          <Carousel autoplay>
                            {feed?.images?.map((image, index) => (
                              <div>
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Image ${index + 1}`}
                                  className="h-[420px] w-full rounded-6"
                                />
                              </div>
                            ))}
                          </Carousel>
                        ) : (
                          <img
                            src={"/assets/pngs/no_image_placeholder.png"}
                            alt={feed?.description}
                            className="h-[420px] w-full rounded-6"
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={8}>
                      <div className=" flex justify-between">
                        <div>
                          <p className="text-sm tracking-wider text-[#98989A]">
                            feed ID
                          </p>
                          <h2 className="block text-xl">{id}</h2>
                        </div>
                        <div>
                          <p className="text-sm tracking-wider text-[#98989A]">
                            Status
                          </p>
                          <Tag
                            color={feed?.is_active ? "green" : "red"}
                            className="block text-xl"
                          >
                            {feed?.is_active ? "Active" : "Blocked"}
                          </Tag>
                        </div>
                      </div>
                      <Divider />
                      <p className="text-sm tracking-wider text-[#98989A]">
                        Created By
                      </p>
                      <Link
                        to={"/dashboard/users/" + feed?._id}
                        className="block text-xl text-primary"
                      >
                        {feed?.user?.full_name}
                      </Link>
                      <Divider />
                      <p className="text-sm tracking-wider text-[#98989A]">
                        Created Time/Date
                      </p>
                      <p style={{ textOverflow: "ellipsis" }}>
                        {moment(feed?.create_at).format("DD/MM/YYYY hh:mm A")}
                      </p>
                      <Divider />
                      <div className="flex items-center mt-5">
                        <ThumbsUp
                          size={32}
                          className="mr-4 text-xl text-primary"
                        />
                        <p className="text-xl text-center text-primary">
                          12k people like this!
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <Divider />
              <div>
                <p className="text-sm tracking-wider text-[#98989A]">Content</p>
                <p style={{ textOverflow: "ellipsis" }}>{feed?.description}</p>
              </div>
              <div className="mt-4">
                <h3>Comments</h3>
                <CommentsList comments={feed?.comments} />
              </div>
            </>
          )}
        </div>
      </Card>

      <DeleteModal
        isOpen={isDelete}
        onToggle={() => setIsDelete(!isDelete)}
        handleSend={handleBlock}
        title={"Are you sure you want to block this feed(s)?"}
      />
    </>
  );
}
export default FeedsDetails;
