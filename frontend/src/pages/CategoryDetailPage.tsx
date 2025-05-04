// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect, FormEvent } from "react";
import { useParams, Link, useViewTransitionState } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../data/dummyProducts";
import { Product } from "../models/product";
import { ProductCategory } from "models/product_category";
import LoadingSpinner from "components/LoadingSpinner";
import ProductCard from "components/ProductCard";

interface CategoryFormData {
  title: string;
  description: string;
}

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    title: "",
    description: "",
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // category change states
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [changingCategory, setChangingCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // products in the current category
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  //Fetch category
  useEffect(() => {
    if (!id) {
      setError("No productID provided");
      setLoading(false);
      return;
    }
    const fetchCategory = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/categories/${id}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}: ${res.statusText}`);
        }
        const data: ProductCategory = await res.json();
        setCategory(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  //   Fetch Products of the current category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/categories/${id}/products`,
        );
        if (!res.ok) throw new Error(`${res.status}:${res.statusText}`);
        const payload = await res.json();
        setProducts(payload);
        setProducts(Array.isArray(payload) ? payload : []);
      } catch (err: any) {
        setCategoryError(err.message || "Unknown error");
      }
    };
    fetchProducts();
  }, []);

  //initialize form Data while entering editing mode
  useEffect(() => {
    if (category && isEditing) {
      setFormData({
        title: category?.title || "",
        description: category?.description || "",
      });
    }
  }, [isEditing, category]);

  const handleEditToggle = () => {
    setSaveError(null);
    setIsEditing((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      const res = await fetch(`http://localhost:8000/api/categories/${id}/`, {
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

      const updated: ProductCategory = await res.json();
      setCategory(updated);
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
  if (!category) return <div>Category not found.</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <Link to="/categories">← Back to Categories</Link>
      {!isEditing ? (
        <>
          <h1>{category?.title}</h1>
          <p>
            <strong>Category: </strong>
            {category.title}
          </p>
          <p>{category?.description}</p>
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
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <h2>Edit Product</h2>
          {saveError && <div style={{ color: "red" }}>{saveError}</div>}

          <label>
            Title
            <input
              name="title"
              value={formData.title}
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
      <div style={{ marginTop: "3rem" }}>
        <h1>Products List for this Category</h1>
      </div>
      {products.map((product: Product) => (
        <div key={product.id} style={{ marginTop: "2rem" }}>
          <ProductCard
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryDetailPage;
