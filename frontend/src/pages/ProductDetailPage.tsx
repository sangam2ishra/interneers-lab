// src/pages/ProductDetailPage.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyProducts } from "../data/dummyProducts";
import { Product } from "../models/product";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Find the product with the matching id
  const product: Product | undefined = dummyProducts.find(
    (prod) => prod.id === id,
  );

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      {product.brand && (
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
      )}
      <p>
        <strong>Quantity:</strong> {product.quantity}
      </p>
      {/* Add any additional details as needed */}
      <Link to="/">← Back to Products</Link>
    </div>
  );
};

export default ProductDetailPage;
