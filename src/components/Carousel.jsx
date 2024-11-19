import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useAlert from "../hooks/useAlert";
import useLoading from "../hooks/useLoading";
import PropTypes from "prop-types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ERROR_MESSAGE = import.meta.env.VITE_ERROR_MESSAGE;

/**
 * Carousel component for displaying movie collections from TMDB
 *
 * @component
 * @description Fetches and renders a responsive carousel of movies based on a specific category
 * @param {Object} props - Component properties
 * @param {string} props.category - Movie category to fetch (e.g., 'popular', 'top_rated')
 * @returns {JSX.Element|null} Rendered carousel or null if no movies
 */
const Carousel = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [mouseState, setMouseState] = useState({ isMoving: false });
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  /**
   * Fetches movies for the specified category from TMDB API
   *
   * @effect
   * @description Retrieves movie data, handles loading and error states
   * @dependency [category] - Refetches movies when category changes
   */
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        showLoading();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`
        );

        // Handle API response errors
        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${
              response.statusText ? response.statusText : ERROR_MESSAGE
            }`
          );
        } else {
          const data = await response.json();
          setMovies(data.results);
        }
      } catch (error) {
        showAlert("error", error.message);
      } finally {
        hideLoading();
      }
    };

    fetchMovies();
  }, [category, hideLoading, showAlert, showLoading]);

  /**
   * Responsive configuration for multi-carousel
   * Defines breakpoints and items to show per device type
   *
   * @type {Object}
   */
  const responsive = {
    desktop: {
      breakpoint: { min: 768, max: 5000 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 600 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 20,
    },
  };

  // Don't render if no movies are available
  if (!movies.length) return null;

  return (
    <section className="carousel">
      <h2>{category.replace("_", " ").toUpperCase()}</h2>
      <MultiCarousel
        beforeChange={() => setMouseState({ isMoving: true })}
        afterChange={() => setMouseState({ isMoving: false })}
        responsive={responsive}
        infinite
        containerClass="carousel-wrapper"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        partialVisible={true}
      >
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <Link
              className="movie-link"
              to={`/details/${movie.id}/${category}`}
              draggable="false"
              onClick={(e) => {
                // Prevent link click during carousel movement
                if (mouseState.isMoving) {
                  e.preventDefault();
                }
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.title}
                draggable="false"
              />
              <h4>{movie.title}</h4>
            </Link>
          </div>
        ))}
      </MultiCarousel>
    </section>
  );
};

Carousel.propTypes = {
  category: PropTypes.string.isRequired,
};
export default Carousel;
