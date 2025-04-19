// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyProducts } from "../data/dummyProducts";
import { Product } from "../models/product";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No productID provided");
      setLoading(false);
      return;
    }
    console.log(id);
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}: ${res.statusText}`);
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading Product...</div>;
  }
  if (error) {
    return <div style={{ color: "Red" }}>Error:{error}</div>;
  }
  return (
    <div>
      <h1>{product?.name}</h1>
      <p>
        <strong>Category:</strong> {product?.category}
      </p>
      <p>{product?.description}</p>
      <p>
        <strong>Price:</strong> Rs. {product?.price.toFixed(2)}
      </p>
      {product?.brand && (
        <p>
          <strong>Brand:</strong> {product?.brand}
        </p>
      )}
      <p>
        <strong>Quantity:</strong> {product?.quantity}
      </p>
      {/* Add any additional details as needed */}
      <Link to="/">← Back to Products</Link>
    </div>
  );
};

export default ProductDetailPage;
