import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginRight: "1rem",
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav
      style={{
        background: "#333",
        color: "#fff",
        padding: "1rem",
      }}
    >
      <h1 style={{ display: "inline", marginRight: "2rem" }}>My Product App</h1>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/categories"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
        end
      >
        Categories
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        Contact
      </NavLink>
      <NavLink
        to="/help"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
        }
      >
        Help
      </NavLink>
    </nav>
  );
};

export default Navbar;
