import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to={`wishlist`}>
          <span className="wishlist">
            WISHLIST
            <Icon className="icon" icon="mdi:heart" />
          </span>
        </Link>
      </nav>
      <Link to={`/`}>
        <h1>MYTHERESA CHALLENGE</h1>
      </Link>
    </header>
  );
};

export default Header;
