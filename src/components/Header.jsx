import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to={`wishlist`}>Wishlist</Link>
      </nav>
      <Link to={`/`}>
        <h1>MYTHERESA CHALLENGE</h1>
      </Link>
    </header>
  );
};

export default Header;
