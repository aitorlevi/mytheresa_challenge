import React, { useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import useLoading from "../hooks/useLoading";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    hideLoading();
  }, []);

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
