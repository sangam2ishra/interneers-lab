// src/components/CategoryList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { dummyProducts } from "../data/dummyProducts";
import { Product } from "../models/product";
import { ProductCategory } from "models/product_category";
import LoadingSpinner from "./LoadingSpinner";
import CategoryCard from "./CategoryCard";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categories/");
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();

        if (Array.isArray(data.results)) {
          setCategories(data.results);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (id: string) => {
    // Navigate to the category detail page
    navigate(`/categories/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  return (
    <div>
      <h1>Categories</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10rem" }}>
        {categories.map((category: ProductCategory) => (
          <div key={category.id}>
            <CategoryCard category={category} onClick={handleCategoryClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
