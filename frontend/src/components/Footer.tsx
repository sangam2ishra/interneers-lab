// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "#333",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} My Product App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
