import React from "react";
import { ProductCategory } from "../models/product_category";

interface ProductCardProps {
  category: ProductCategory;
  onClick?: (id: string) => void;
}

const CategoryCard: React.FC<ProductCardProps> = ({ category, onClick }) => {
  return (
    <div
      style={{ cursor: "pointer" }}
      className="category-card"
      onClick={() => onClick && onClick(category.id as string)}
    >
      <h2>{category?.title}</h2>
      {/* <p>{product.description}</p> */}
      <p>
        <strong>{category?.description}</strong>
      </p>
    </div>
  );
};

export default CategoryCard;
