"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Form, message, Spin, Select } from "antd";
import IngredientTable from "@/components/table/ingredients_table";
import NutritionTable from "@/components/table/nutrition_table";
import PrepTime from "@/components/createRecipe/PrepTime";
import Servings from "@/components/createRecipe/Servings";
import Steps from "@/components/createRecipe/Steps";
import ImageUpload from "@/components/createRecipe/ImageUpload";
import { createRecipe } from "@/services/recipes.services";
import { uploadService } from "@/services/upload.services";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAllCategories } from "@/services/category.services";

const NewRecipePage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [selectedServing, setSelectedServing] = useState("");
  const [images, setImages] = useState([]); // Images
  const [directions, setDirections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nutritionData, setNutritionData] = useState(
    Array.from({ length: 10 }, () => ({
      nutrient: "",
      cal: "",
      unit: "",
    }))
  );

  const [ingredientsData, setIngredientsData] = useState(
    Array.from({ length: 10 }, () => ({
      ingredient: "",
      qty: "",
      unit: "",
    }))
  );
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);

  const handleSelectedServingChange = (serving) => {
    setSelectedServing(serving);
    // Perform any additional logic with the selected serving here
  };

  const handleIngredientsChange = (data) => {
    setIngredientsData(data);
  };

  const handleStepsChange = (steps) => {
    setDirections(steps);
  };

  const handleTitleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleAddImage = () => {
    setImages([...images, ""]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    if (!session) {
      router.push("/?auth=login");
    }
  }, [session]);

  const handleSubmit = async (values) => {
    const { title, description, category } = values;

    try {
      setLoading(true);

      const imagesUrls = await uploadService(images);

      const createdRecipe = await createRecipe(
        {
          title,
          description,
          category,
          preparation_time: prepTime,
          cook_time: cookTime,
          servings: selectedServing,
          ingredients: ingredientsData.filter(
            (ingredient) => ingredient.ingredient !== ""
          ),
          nutrition_facts: nutritionData.filter(
            (nutrient) => nutrient.nutrient !== ""
          ),
          directions: directions.filter((step) => step.content !== ""),
          images: imagesUrls,
        },
        session?.user?.accessToken?.accessToken
      );

      if (createdRecipe.success) {
        message.success("Recipe created successfully!");
        router.push(`/`);
      } else {
        message.error("Failed to create recipe. Please try again.");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-24 sm:p-4">
      <div className="recipe-form w-[700px] lg:w-full">
        <div className="flex mt-[48px] text-center">
          <h2 className="text-8">Create Recipe</h2>
        </div>
        <Form onFinish={handleSubmit}>
          <div className="mt-[23px]">
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please Enter Title!" }]}
            >
              <Input
                placeholder="Title"
                value={title}
                maxLength={40}
                onChange={handleTitleChange}
                className="w-full text-500 text-[#98989a]"
                suffix={`${title.length}/40`}
              />
            </Form.Item>

            <div className="mt-3">
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter a description!",
                  },
                ]}
              >
                <div style={{ position: "relative" }}>
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full h-[200px] text-gray-500 desc-textarea"
                  />
                  <span className="text-500 text-[#98989a] absolute top-[10%] left-[2%]">
                    Description(you may also add affiliate links)
                  </span>
                  <span className="text-500 text-[#98989a] absolute bottom-[10%] right-[2%] italic">
                    {description.length}/300
                  </span>
                </div>
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item
                name="category"
                rules={[{ required: true }]}
                className="my-4"
              >
                <Select
                  className="w-full py-4"
                  size="large"
                  placeholder="Category"
                  options={categories?.map((category) => ({
                    label: category.name,
                    value: category._id,
                  }))}
                />
              </Form.Item>
            </div>

            {/* prep time and cook time */}
            <PrepTime
              prepTime={prepTime}
              cookTime={cookTime}
              setPrepTime={setPrepTime}
              setCookTime={setCookTime}
            />
            {/* Serving dropdown */}
            <Servings
              selectedServing={selectedServing}
              setSelectedServing={setSelectedServing}
              onChange={handleSelectedServingChange}
            />

            <div className="mt-8">
              <h2>Ingredients</h2>
              <IngredientTable
                ingredientsData={ingredientsData}
                onChange={handleIngredientsChange}
              />
            </div>
            <div className="mt-8">
              <h2>
                Nutrition Facts&nbsp;
                <span className="text-base font-normal text-secondarylight">
                  (per serving)
                </span>
              </h2>
              <NutritionTable
                nutritionData={nutritionData}
                setNutritionData={setNutritionData}
              />
            </div>
            {/* steps component */}
            <Steps directions={directions} onChange={handleStepsChange} />
            <div className="mt-8">
              <h2>Upload Images</h2>
            </div>
            <ImageUpload
              images={images}
              setImages={setImages}
              onImageChange={handleImageChange}
              onAddImage={handleAddImage}
              onRemoveImage={handleRemoveImage}
            />
            <div className="mt-8 flex justify-end pb-[121px]">
              {loading ? (
                <Spin size="large" />
              ) : (
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-[130px] h-[52px] bg-primary rounded text-white border-none text-base"
                  disabled={loading}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewRecipePage;
