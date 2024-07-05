/* eslint-disable no-unused-vars */
import { Avatar, Button, Card, Input, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { usersColumns } from "../../data/constants/table.columns";
import DeleteModal from "../../components/common/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  blockAndUnblockUser,
  getUsers,
  reset,
} from "../../redux_state/users/users.slice";
import Loader from "../../components/common/Loader";

function UsersList() {
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, isLoading, isSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());

    if (isSuccess) {
      message.success("User status updated successfully");
      setIsDelete(false);
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  const handleBlock = () => {
    dispatch(blockAndUnblockUser(userId));
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    // Get the _id of the selected user(s)
    const selectedUsers = newSelectedRowKeys.map(
      (key) => filteredUsers[key]._id
    );

    setUserId(selectedUsers[0]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleSearch = (e) => {
    setSearchText(e.target.value?.toLowerCase());
  };

  if (isLoading) return <Loader />;

  const filteredUsers = users?.filter(
    (user) =>
      user?.full_name?.toLowerCase().includes(searchText) ||
      user?.email?.toLowerCase().includes(searchText)
  );
  return (
    <>
      <div>
        <header className="flex justify-between items-center w-full mb-6">
          <div>
            <p className="title text-[24px]">Users</p>
            <p className="text-gray-400">
              List of users register on open-cottage
            </p>
          </div>
          <div className="w-80">
            <Input.Search
              size="large"
              placeholder="Search by Name/email"
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
                    onClick={() => navigate(`/dashboard/users/${userId}`)}
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
              columns={usersColumns}
              dataSource={filteredUsers.map((user, index) => ({
                key: index,
                id: index + 1,
                ...user,
                status: user.is_active ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                ),
                userType:
                  user.userType === "admin" ? (
                    <Tag color="green">Admin</Tag>
                  ) : (
                    <Tag color="black">End User</Tag>
                  ),
                profile_image: (
                  <Avatar
                    size={32}
                    className="bg-[gray] p-1 m-0"
                    src={user?.profile_image || "/assets/pngs/imageError.png"}
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
        title={"Are you sure you want to block this user(s)?"}
      />
    </>
  );
}

export default UsersList;
