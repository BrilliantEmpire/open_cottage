import {
  Star,
  DotsThreeVertical,
  NotePencil,
  TrashSimple,
} from "@phosphor-icons/react";
import { Card, Col, Popover, List, message } from "antd";
import Link from "next/link";
import React from "react";
import { removeMyCreatedRecipe } from "@/services/recipes.services";

const EditDeleteActions = ({ onEdit, onDelete }) => (
  <List
    size="small"
    dataSource={[
      { icon: <NotePencil />, text: "Edit", onClick: onEdit },
      {
        icon: <TrashSimple color="#FF0000" />,
        text: "Delete",
        onClick: onDelete,
        textColor: "#FF0000",
      },
    ]}
    renderItem={(item) => (
      <List.Item
        key={item.text}
        onClick={item.onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="mr-2">{item.text}</div>
        <span style={{ color: item.textColor }}>{item.icon}</span>
      </List.Item>
    )}
  />
);

export default function RecipeCard({ recipe, onRecipeDelete, token }) {
  const handleEdit = () => {
    // Handle edit logic here
    console.log("Edit clicked");
  };

  const handleDelete = async () => {
    await removeMyCreatedRecipe(token, recipe?._id);
    onRecipeDelete(recipe?._id);
    message.success("Recipe deleted successfully");
  };

  return (
    <Col key={recipe?.id} xs={24} sm={12} md={6} lg={6}>
      <div>
        <div className="w-full">
          <Card className="h-96 overflow-hidden bg-transparent">
            <div className="relative edit-popup">
              <img
                alt={recipe?.title}
                src={recipe?.images[0]}
                className="w-full h-44"
              />
              <div className="absolute top-[5%] right-[8%]">
                <Popover
                  overlayClassName="edit-popover"
                  style={{ width: "120px" }}
                  placement="bottomRight"
                  content={
                    <EditDeleteActions
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  }
                  trigger="hover"
                >
                  <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
                    <DotsThreeVertical size={28} />
                  </div>
                </Popover>
              </div>
            </div>
            <Link
              href={`/recipes/${recipe?.slug}`}
              className="text-black hover:text-primary"
            >
              <strong className="block mt-4 text-xl tracking-[0.4px]">
                {recipe?.title}
              </strong>
            </Link>
            <p
              className="mt-2 overflow-hidden text-base tracking-wide text-secondary"
              style={{ textOverflow: "ellipsis" }}
            >
              {recipe?.description.length > 97
                ? recipe?.description.substring(0, 97) + "..."
                : recipe?.description}
            </p>
          </Card>
        </div>
      </div>
    </Col>
  );
}
