// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyProducts } from "../data/dummyProducts";
import { Product } from "../models/product";
import { ProductCategory } from "models/product_category";
import LoadingSpinner from "components/LoadingSpinner";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  brand: string;
  quantity: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    brand: "",
    quantity: 0,
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // category change states
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [changingCategory, setChangingCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string | null>(null);

  //Fetch product
  useEffect(() => {
    if (!id) {
      setError("No productID provided");
      setLoading(false);
      return;
    }
    const fetchProduct = async () => {
      try {
        console.log(id);
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

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categories/");
        if (!res.ok) throw new Error(`${res.status}:${res.statusText}`);
        const payload = await res.json();
        setCategories(Array.isArray(payload.results) ? payload.results : []);
      } catch (err: any) {
        setCategoryError(err.message || "Unknown error");
      }
    };
    fetchCategories();
  }, []);

  //initialize form Data while entering editing mode
  useEffect(() => {
    if (product && isEditing) {
      setFormData({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        brand: product?.brand || "",
        quantity: product.quantity ?? 0,
      });
    }
  }, [isEditing, product]);

  const handleEditToggle = () => {
    setSaveError(null);
    setIsEditing((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Save failed: ${res.status} ${res.statusText} - ${text}`,
        );
      }

      const updated: Product = await res.json();
      setProduct(updated);
      setIsEditing(false);

      //to get updated product
      // window.location.reload();
    } catch (err: any) {
      setSaveError(err.message || "unknown error");
    } finally {
      setSaving(false);
    }
  };

  const handleCategoryUpdate = async () => {
    if (!newCategory || !id) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api/categories/${newCategory}/add_product/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: id }),
        },
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Add failed: ${res.status} ${res.statusText} - ${text}}`,
        );
      }
      setChangingCategory(false);
      window.location.reload();
    } catch (err: any) {
      setCategoryError(err.message || "Unknown error");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div style={{ color: "Red" }}>Error:{error}</div>;
  }
  if (!product) return <div>Product not found.</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/">← Back to Products</Link>
      {!isEditing ? (
        <>
          <h1>{product?.name}</h1>
          <p>
            <strong>Category: </strong>
            {categories.find((cat) => cat.id == product?.category)?.title}
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
          <button
            onClick={handleEditToggle}
            style={{
              marginTop: "2rem",
              padding: "1rem 2rem",
              cursor: "pointer",
              color: "white",
              background: "red",
              borderRadius: "10px",
            }}
          >
            Edit
          </button>
          {/* Add any additional details as needed */}
          <button
            onClick={() => setChangingCategory(true)}
            style={{
              marginTop: "2rem",
              padding: "1rem 2rem",
              cursor: "pointer",
              color: "white",
              background: "#0066cc",
              borderRadius: "10px",
              marginLeft: "2rem",
            }}
          >
            Change Category
          </button>
          {changingCategory && (
            <div style={{ marginTop: "2rem" }}>
              <label>
                New Category:
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="" disabled>
                    -- select category --
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat?.title}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleCategoryUpdate}
                style={{
                  marginLeft: "1rem",
                  padding: "0.4rem 1rem",
                  background: "green",
                  borderRadius: "8px",
                  color: "white",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setChangingCategory(false)}
                style={{
                  marginLeft: "0.5rem",
                  padding: "0.4rem 1rem",
                  background: "#ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              {categoryError && <p style={{ color: "red" }}>{categoryError}</p>}
            </div>
          )}
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <h2>Edit Product</h2>
          {saveError && <div style={{ color: "red" }}>{saveError}</div>}

          <label>
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </label>

          <label>
            Price
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              required
            />
          </label>

          <label>
            Brand
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </label>

          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={handleEditToggle} disabled={saving}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductDetailPage;
