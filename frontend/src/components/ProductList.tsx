// src/components/ProductList.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { dummyProducts } from "../data/dummyProducts";
import { Product } from "../models/product";

const ProductList: React.FC = () => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    // Toggle expansion for the clicked product
    setExpandedProductId((prevId) => (prevId === id ? null : id));
  };

  const handleBuy = (id: string) => {
    // Navigate to the product detail page
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10rem" }}>
        {dummyProducts.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} onClick={handleProductClick} />
            {expandedProductId === product.id && (
              <div style={{ padding: "8px", marginLeft: "16px" }}>
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
