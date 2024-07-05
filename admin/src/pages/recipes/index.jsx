/* eslint-disable no-unused-vars */
import { Avatar, Button, Card, Input, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipesColumns } from "../../data/constants/table.columns";
import DeleteModal from "../../components/common/DeleteModal";
import { Link, useNavigate } from "react-router-dom";
import {
  getRecipes,
  blockAndUnblockRecipe,
  reset,
} from "../../redux_state/recipes/recipes.slice";
import Loader from "../../components/common/Loader";

function RecipesList() {
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, isLoading, isSuccess } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    dispatch(getRecipes());

    if (isSuccess) {
      message.success("Recipe status updated successfully");
      setIsDelete(false);
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  const handleBlock = () => {
    if (selectedRecipe) {
      dispatch(blockAndUnblockRecipe(selectedRecipe.id));
    }
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);

    if (selectedRows.length > 0) {
      const { id, slug } = selectedRows[0];
      setSelectedRecipe({ id, slug });
    } else {
      setSelectedRecipe(null);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText)
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <div>
        <header className="flex justify-between items-center w-full mb-6">
          <div>
            <p className="title text-[24px]">Recipes</p>
            <p className="text-gray-400">
              List of recipes uploaded on open-cottage
            </p>
          </div>
          <div className="w-80">
            <Input.Search
              size="large"
              placeholder="Search by title"
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
                      navigate(`/dashboard/recipes/${selectedRecipe.slug}`)
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
              columns={recipesColumns}
              dataSource={filteredRecipes.map((recipe, index) => ({
                key: index,
                id: recipe._id,
                slug: recipe.slug,
                title: recipe.title,
                ratings: (
                  <div className="flex items-center gap-2">
                    <i className="ri-star-fill text-yellow-500"></i>
                    {recipe.ratings}
                  </div>
                ),
                user: (
                  <Link
                    className="text-primary underline"
                    to={`/dashboard/users/${recipe.user._id}`}
                  >
                    {recipe.user.full_name}
                  </Link>
                ),
                status: recipe.is_active ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                ),
                created_at: new Date(recipe.createdAt).toLocaleString("en-US"),
              }))}
            />
          </div>
        </Card>
      </div>

      <DeleteModal
        isOpen={isDelete}
        onToggle={() => setIsDelete(!isDelete)}
        handleSend={handleBlock}
        title={"Are you sure you want to block this recipe(s)?"}
      />
    </>
  );
}

export default RecipesList;
