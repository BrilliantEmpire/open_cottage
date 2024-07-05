/* eslint-disable no-unused-vars */
import { Button, Card, Input, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { feedsColumns } from "../../data/constants/table.columns";
import DeleteModal from "../../components/common/DeleteModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  blockAndUnblockPost,
  getPosts,
  reset,
} from "../../redux_state/posts-feeds/posts.slice";
import Loader from "../../components/common/Loader";

function FeedsList() {
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { posts, isLoading, isSuccess } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());

    if (isSuccess) {
      message.success("Post status updated successfully");
      setIsDelete(false);
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const handleBlock = () => {
    // selectedPostIds.forEach((postId) => {
    dispatch(blockAndUnblockPost(selectedPostIds[0]));
    // });
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const selectedIds = selectedRows.map((row) => row._id);
    setSelectedPostIds(selectedIds);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter((post) =>
    post?.description?.toLowerCase().includes(searchText)
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <div>
        <header className="flex justify-between items-center w-full mb-6">
          <div>
            <p className="title text-[24px]">Feeds</p>
            <p className="text-gray-400">
              List of Feeds created by users on open-cottage
            </p>
          </div>
          <div className="w-80">
            <Input.Search
              size="large"
              placeholder="Search by description"
              onChange={handleSearch}
              value={searchText}
            />
          </div>
        </header>
        <section className="w-full flex">
          <div className="flex items-center gap-4 mb-6 w-full">
            <div>
              {hasSelected && (
                <div className="space-x-3">
                  <Button
                    type="primary"
                    ghost
                    icon={<i className="ri-delete-bin-6-line"></i>}
                    size="small"
                    onClick={() => setIsDelete(true)}
                  >
                    Block
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    icon={<i className="ri-edit-2-line"></i>}
                    size="small"
                    onClick={() =>
                      navigate(`/dashboard/feeds/${selectedPostIds[0]}`)
                    }
                  >
                    View Details
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        <Card className="relative">
          <div className="overflow-auto">
            <Table
              size="large"
              rowSelection={rowSelection}
              columns={feedsColumns}
              dataSource={filteredPosts.map((feed, index) => ({
                key: index,
                _id: feed._id,
                id: feed?._id?.slice(0, 8) + "...",
                ...feed,
                user: (
                  <Link
                    className="text-primary underline"
                    to={`/dashboard/users/${feed.user._id}`}
                  >
                    {feed?.user?.full_name}
                  </Link>
                ),
                create_at: new Date(feed?.createdAt).toLocaleString(),
                status: feed?.is_active ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Blocked</Tag>
                ),
                image: (
                  <img
                    src={
                      feed?.images[0] ?? "/assets/pngs/no_image_placeholder.png"
                    }
                    height={60}
                    className="rounded-10"
                  />
                ),
              }))}
            />
          </div>
        </Card>
      </div>

      <DeleteModal
        isOpen={isDelete}
        onToggle={() => setIsDelete(!isDelete)}
        handleSend={handleBlock}
        title={"Are you sure you want to block this feed(s)?"}
      />
    </>
  );
}

export default FeedsList;
