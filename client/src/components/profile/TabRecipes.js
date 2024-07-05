"use client";
import React, { useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import { MagnifyingGlass } from "@phosphor-icons/react";
import EditRecipeCard from "../recipes/EditRecipeCard";
import { getMyCreatedRecipes } from "@/services/recipes.services";
import SkeletonSearch from "@/components/common/skeletonloading/SkeletonSearch";
import SkeletonCard from "../common/skeletonloading/common skeleton/SkeletonCard";

const { Search } = Input;

const TabRecipes = ({ session }) => {
  const [myCreatedRecipes, setMyCreatedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = session?.user?.accessToken?.accessToken;

  const fetchMyCreatedRecipes = async () => {
    const res = await getMyCreatedRecipes(token);
    setMyCreatedRecipes(res);
  };

  useEffect(() => {
    setLoading(true);
    fetchMyCreatedRecipes().then(() => setLoading(false));
  }, []);

  const onSearch = (value) => {
    if (value === "") {
      setMyCreatedRecipes(myCreatedRecipes);
    } else {
      setMyCreatedRecipes([
        ...myCreatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(value.toLowerCase())
        ),
      ]);
    }
  };

  const handleRecipeDelete = (id) => {
    setMyCreatedRecipes(myCreatedRecipes.filter((recipe) => recipe._id !== id));
  };

  return (
    <div>
      <div className="sm:mx-4">
        {loading ? (
          <SkeletonSearch />
        ) : (
          <Search
            placeholder="Search"
            allowClear
            size="small"
            onChange={(e) => onSearch(e.target.value)}
            prefix={<MagnifyingGlass size={22} color="#828282" />}
          />
        )}
      </div>
      {!loading && myCreatedRecipes.length === 0 && (
        <div className="text-center my-10 w-full">
          <h3>No Created Recipes</h3>
          <p className="text-secondary">Create recipes to view them here</p>
        </div>
      )}
      <div className="mt-4">
        <Row gutter={[16, 16]}>
          {loading ? (
            <div className="flex flex-row flex-wrap gap-2 m-2">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="w-52 flex gap-2">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : (
            myCreatedRecipes.map((recipe) => (
              <EditRecipeCard
                key={recipe._id}
                recipe={recipe}
                onRecipeDelete={handleRecipeDelete}
                token={token}
              />
            ))
          )}
        </Row>
      </div>
    </div>
  );
};

export default TabRecipes;
