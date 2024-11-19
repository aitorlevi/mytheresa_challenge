import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

/**
 * Header component for the application
 *
 * @component
 * @description Renders the top navigation bar with site logo and wishlist link
 * @returns {JSX.Element} Rendered header with navigation elements
 */
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
      <h1>
        <Link to={`/`}>MYTHERESA CHALLENGE</Link>
      </h1>
    </header>
  );
};

export default Header;
