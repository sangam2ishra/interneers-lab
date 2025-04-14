import { Product } from "../models/product.js";

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    description: "A smooth, ergonomic mouse for your computing needs.",
    category: "Electronics",
    price: 29.99,
    brand: "TechBrand",
    quantity: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    description: "High-quality, tactile keyboard perfect for typing and gaming.",
    category: "Accessories",
    price: 79.99,
    brand: "KeyMasters",
    quantity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "HD Monitor",
    description: "A crisp, 24-inch HD monitor to boost your productivity.",
    category: "Electronics",
    price: 199.99,
    brand: "ScreenVision",
    quantity: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
]

