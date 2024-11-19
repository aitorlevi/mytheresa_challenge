import { useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import useLoading from "../hooks/useLoading";
import { Link } from "react-router-dom";

/**
 * WishlistPage Component
 *
 * @component
 * @description Displays user's saved movies from local storage with clear functionality
 * @returns {JSX.Element} Rendered wishlist page with movies or empty state
 */
const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  /**
   * Retrieves wishlist from local storage on component mount
   *
   * @effect
   * @description Loads saved wishlist items or initializes empty array
   * @dependency [hideLoading, showLoading] - Ensures loading states are managed
   */
  useEffect(() => {
    showLoading();
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    hideLoading();
  }, [hideLoading, showLoading]);

  /**
   * Clears entire wishlist from local storage
   *
   * @method
   * @description Removes all saved movies and updates UI
   */
  const clearWishlist = () => {
    showLoading();
    localStorage.clear();
    setWishlist([]);
    hideLoading();
    showAlert("success", "Wishlist cleared!");
  };

  return (
    <section className="wishlist">
      <div className="title-cta">
        <h2>WISHLIST</h2>
        {wishlist.length > 0 ? (
          <button className="cta" onClick={clearWishlist}>
            CLEAR WISHLIST
          </button>
        ) : null}
      </div>

      {wishlist.length > 0 ? (
        <>
          <div className="container">
            {wishlist.map((movie) => (
              <div key={movie.id} className="movie">
                <Link to={`/details/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h4>{movie.title}</h4>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>There are no items yet!</p>
      )}
    </section>
  );
};

export default WishlistPage;
