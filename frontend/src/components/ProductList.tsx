// src/components/ProductList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { dummyProducts } from "../data/dummyProducts";
import { Product } from "../models/product";
import LoadingSpinner from "./LoadingSpinner";

const ProductList: React.FC = () => {
  const [products, setPorducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();

        if (Array.isArray(data.results)) {
          setPorducts(data.results);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleProductClick = (id: string) => {
    // Toggle expansion for the clicked product
    setExpandedProductId((prevId) => (prevId === id ? null : id));
  };

  const handleBuy = (id: string) => {
    // Navigate to the product detail page
    navigate(`/product/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10rem" }}>
        {products.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} onClick={handleProductClick} />
            {expandedProductId === product.id && (
              <div
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  marginTop: "8px",
                  marginLeft: "12px",
                  width: "250px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <p>
                  <strong>Available Quantity: </strong>
                  {product.quantity || 0}
                </p>
                <button
                  style={{
                    background: "green",
                    color: "white",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                    marginTop: "8px",
                    padding: "8px 16px",
                  }}
                  onClick={() => handleBuy(product.id as string)}
                >
                  Buy
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
