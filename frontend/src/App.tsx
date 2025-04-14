// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasePage from "./pages/BasePage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

// Dummy components for additional pages
const AboutPage = () => (
  <div>
    <h1>About</h1>
    <p>About us content.</p>
  </div>
);
const ContactPage = () => (
  <div>
    <h1>Contact</h1>
    <p>Contact us content.</p>
  </div>
);
const HelpPage = () => (
  <div>
    <h1>Help</h1>
    <p>Help content.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BasePage>
              <HomePage />
            </BasePage>
          }
        />
        <Route
          path="/product/:id"
          element={
            <BasePage>
              <ProductDetailPage />
            </BasePage>
          }
        />
        <Route
          path="/about"
          element={
            <BasePage>
              <AboutPage />
            </BasePage>
          }
        />
        <Route
          path="/contact"
          element={
            <BasePage>
              <ContactPage />
            </BasePage>
          }
        />
        <Route
          path="/help"
          element={
            <BasePage>
              <HelpPage />
            </BasePage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
