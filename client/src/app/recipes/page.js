import React from "react";
import { Row, Col, Card } from "antd";
import { products } from "@/data/products";
import Link from "next/link";
const RecipeList = () => {
  return (
    <div className="mt-12 sm:mt-6">
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/recipes/${product.slug}`}>
              <p>{product.name}</p>
              <p>{product.id}</p>
            </Link>
          </li>
        ))}
      </Row>
    </div>
  );
};

export default RecipeList;
