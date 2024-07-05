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
import moment from "moment";
import { UserCircleGear } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import CommentsList from "../../../components/comments/CommentsList";
import DeleteModal from "../../../components/common/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  blockAndUnblockRecipe,
  getRecipe,
  reset,
} from "../../../redux_state/recipes/recipes.slice";
import Loader from "../../../components/common/Loader";

function RecipeDetails() {
  const { id } = useParams();

  const [isDelete, setIsDelete] = useState(false);
  const [recipeId, setRecipeId] = useState(null);

  const dispatch = useDispatch();

  const { recipe, isLoading, isSuccess } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRecipe(id));

    if (isSuccess) {
      message.success("Recipe status updated successfully");
      setIsDelete(false);
      dispatch(reset());
    }
  }, [isSuccess]);

  const handleBlock = () => {
    dispatch(blockAndUnblockRecipe(recipeId));
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Recipe Details</h2>
        <Button
          type={recipe?.is_active ? "danger" : "primary"}
          className={`${
            recipe?.is_active ? "bg-red-500" : "bg-green-500"
          } text-white`}
          icon={<i className="ri-delete-bin-6-line"></i>}
          size="small"
          onClick={() => {
            setRecipeId(recipe?._id);
            setIsDelete(true);
          }}
        >
          {recipe?.is_active ? "Block" : "Unblock"}
        </Button>
      </div>

      <Card>
        <div className="px-4">
          {recipe && (
            <>
              <div>
                <div className="mt-4 rounded-sm width-70">
                  <Row gutter={[24]}>
                    <Col lg={16}>
                      <div className="w-full h-1/2">
                        <Carousel autoplay>
                          {recipe?.images.map((image, index) => (
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
                      </div>
                    </Col>
                    <Col lg={8}>
                      <div className=" flex justify-between">
                        <div>
                          <p className="text-sm tracking-wider text-[#98989A]">
                            Recipe ID
                          </p>
                          <h2 className="block text-xl">{recipe?._id}</h2>
                        </div>
                        <div>
                          <p className="text-sm tracking-wider text-[#98989A]">
                            Status
                          </p>
                          <Tag color="green" className="block text-xl">
                            {recipe?.is_active ? "Active" : "Blocked"}
                          </Tag>
                        </div>
                      </div>
                      <Divider />
                      <p className="text-sm tracking-wider text-[#98989A]">
                        Created By
                      </p>
                      <Link
                        to={"/dashboard/users/" + recipe?.user?._id}
                        className="block text-xl text-primary"
                      >
                        {recipe?.user?.full_name}
                      </Link>
                      <Divider />
                      <p className="text-sm tracking-wider text-[#98989A]">
                        Created Time/Date
                      </p>
                      <p style={{ textOverflow: "ellipsis" }}>
                        {moment(recipe?.createdAt).format(
                          "DD MMM YYYY, hh:mm A"
                        )}
                      </p>
                      <Divider />
                      <div className="flex items-center mt-5">
                        <UserCircleGear
                          size={32}
                          className="mr-4 text-xl text-primary"
                        />
                        <p className="text-xl text-center text-primary">
                          {recipe?.mades} people made this!
                        </p>
                      </div>{" "}
                      <Divider />
                      <div>
                        <p className="text-sm tracking-wider text-[#98989A]">
                          Servings
                        </p>
                        <h2>{recipe?.servings}</h2>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row className="mt-6">
                <h3>{recipe?.title}</h3>
                <Row className="my-6 w-full">
                  <Col lg={12}>
                    <p className="text-sm tracking-wider text-[#98989A]">
                      Prep Time
                    </p>
                    <Tag>{recipe?.preparation_time}</Tag>
                  </Col>
                  <Col lg={12}>
                    <p className="text-sm tracking-wider text-[#98989A]">
                      Cook Time
                    </p>
                    <Tag>{recipe?.cook_time}</Tag>
                  </Col>
                </Row>

                <Col lg={8}>
                  <p className="text-sm tracking-wider text-[#98989A]">
                    Rating
                  </p>
                  <Tag>
                    <Rate value={recipe?.number_of_rating} />
                  </Tag>
                </Col>
              </Row>
              <Divider />

              <Col lg={8}>
                <p className="text-sm tracking-wider text-[#98989A]">
                  Nutritional Facts
                </p>

                {recipe?.nutrition_facts?.map((fact, index) => (
                  <Tag color="black" key={index}>
                    <span>
                      {fact?.nutrient} : {fact?.cal}
                      {fact?.unit}
                    </span>
                  </Tag>
                ))}
              </Col>

              <Divider />
              <div>
                <p className="text-sm tracking-wider text-[#98989A]">
                  Description
                </p>
                <p style={{ textOverflow: "ellipsis" }}>
                  {recipe?.description}
                </p>
              </div>
              <Divider />
              <div>
                <p className="text-sm tracking-wider text-[#98989A]">
                  Ingredients
                </p>
                <ul className="mt-4 list-inside">
                  {recipe?.ingredients?.map((ingredient, index) => (
                    <li className="text-base font-normal list-disc" key={index}>
                      {ingredient?.ingredient.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />
              <div>
                <p className="text-sm tracking-wider text-[#98989A]">
                  Directions - Steps
                </p>
                <ul className="mt-4 list-inside">
                  {recipe?.directions?.map((direction, index) => (
                    <li className="text-base font-normal list-disc" key={index}>
                      {direction?.content?.trim()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3>Comments</h3>
                <CommentsList comments={recipe?.comments} />
              </div>
            </>
          )}
        </div>
      </Card>

      <DeleteModal
        isOpen={isDelete}
        onToggle={() => setIsDelete(!isDelete)}
        handleSend={handleBlock}
        title={"Are you sure you want to block this recipe(s)?"}
      />
    </>
  );
}
export default RecipeDetails;
