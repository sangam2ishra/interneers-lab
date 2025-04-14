// src/pages/BasePage.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface BasePageProps {
  children: React.ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <main style={{ flex: "1", padding: "20px" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default BasePage;
