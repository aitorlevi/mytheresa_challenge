import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAlert from "../hooks/useAlert";
import useLoading from "../hooks/useLoading";
import PropTypes from "prop-types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const POPULAR = import.meta.env.VITE_CATEGORY_POPULAR;
const TOP_RATED = import.meta.env.VITE_CATEGORY_TOP_RATED;
const UPCOMING = import.meta.env.VITE_CATEGORY_UPCOMING;
const ERROR_MESSAGE = import.meta.env.VITE_ERROR_MESSAGE;

/**
 * DetailPage component for displaying comprehensive movie information
 *
 * @component
 * @description Fetches and renders detailed movie information from TMDB API
 * @returns {JSX.Element|null} Detailed movie view or null if data not loaded
 */
const DetailPage = () => {
  const { id, category } = useParams();
  const [movie, setMovie] = useState(null);
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  /**
   * Fetches detailed movie information from TMDB API
   *
   * @effect
   * @description Retrieves movie details, manages loading and error states
   * @dependency [id] - Refetches movie when ID changes
   */
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        showLoading();
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${
              response.statusText ? response.statusText : ERROR_MESSAGE
            }`
          );
        } else {
          const data = await response.json();
          setMovie(data);
        }
      } catch (error) {
        showAlert("error", error.message);
      } finally {
        hideLoading();
      }
    };

    fetchMovie();
  }, [hideLoading, id, showAlert, showLoading]);

  /**
   * Determines CSS class based on movie category
   *
   * @function
   * @description Maps category to specific styling class
   * @returns {string} CSS class name for the current category
   */
  const switchClassName = () => {
    switch (category) {
      case POPULAR:
        return "popular";
      case TOP_RATED:
        return "top-rated";
      case UPCOMING:
        return "upcoming";
    }
  };

  /**
   * Renders star rating based on vote average
   *
   * @component
   * @param {Object} props - Component properties
   * @param {number} props.voteAverage - Average vote score
   * @returns {JSX.Element} Star rating visualization
   */
  const ShowVotes = ({ voteAverage }) => {
    let starsBy5 = Math.round(voteAverage * 0.5 * 2) / 2;
    const isFullStarArr = [];
    for (let i = starsBy5; i > 0; i--) {
      i >= 1 ? isFullStarArr.push(true) : isFullStarArr.push(false);
    }
    return (
      <>
        <div className="vote-average back">
          {Array.from({ length: 5 }, (e, index) => (
            <Icon key={index} icon="mdi:star" width="20%" />
          ))}
        </div>
        <div className="vote-average front">
          {isFullStarArr.map((isFull, index) =>
            isFull ? (
              <Icon key={index} icon="mdi:star" width="20%" />
            ) : (
              <Icon key={index} icon="mdi:star-half" width="20%" />
            )
          )}
        </div>
      </>
    );
  };

  /**
   * Renders additional movie information
   *
   * @component
   * @param {Object} props - Component properties
   * @returns {JSX.Element} Additional movie details
   */
  const AdditionalInfo = ({ genres, releaseDate, productionCompanies }) => {
    return (
      <span>
        <b>Genres:&nbsp;</b> <Genres genres={genres} />
        <br />
        <b>Release date:&nbsp;</b> <ReleaseDate release={releaseDate} />
        <br />
        <b>Production companies:&nbsp;</b>
        <Companies companies={productionCompanies} />
      </span>
    );
  };

  /**
   * Formats release date
   *
   * @function
   * @param {Object} props - Component properties
   * @returns {string} Formatted date string
   */
  const ReleaseDate = ({ release }) => {
    return new Date(release).toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Renders comma-separated genres
   *
   * @function
   * @param {Object} props - Component properties
   * @returns {string} Comma-separated genre names
   */
  const Genres = ({ genres }) => {
    return genres.map((genre) => genre.name).join(", ");
  };

  /**
   * Renders comma-separated production companies
   *
   * @function
   * @param {Object} props - Component properties
   * @returns {string} Comma-separated company names
   */
  const Companies = ({ companies }) => {
    return companies.map((companies) => companies.name).join(", ");
  };

  /**
   * Adds movie to local storage wishlist
   *
   * @function
   * @description Manages wishlist addition with duplicate prevention
   */
  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.some((item) => item.id === movie.id)) {
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, movie]));
      showAlert("success", `${movie.title} added to wishlist!`);
    } else {
      showAlert("warning", `${movie.title} is already added in the wishlist!`);
    }
  };

  ShowVotes.propTypes = {
    voteAverage: PropTypes.number.isRequired,
  };

  AdditionalInfo.propTypes = {
    genres: PropTypes.array.isRequired,
    releaseDate: PropTypes.string.isRequired,
    productionCompanies: PropTypes.array.isRequired,
  };

  // Render nothing if movie data is not loaded
  if (!movie) return null;

  return (
    <section className={`detail-page  ${category && switchClassName()}`}>
      <h2>{movie.title}</h2>
      <h4>{movie.tagline}</h4>
      <div className="info">
        <div className="image-vote">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
          />
          <ShowVotes voteAverage={movie.vote_average} />
        </div>
        <div className="copy-cta">
          <p>{movie.overview}</p>
          <AdditionalInfo
            genres={movie.genres}
            releaseDate={movie.release_date}
            productionCompanies={movie.production_companies}
          />
          <button className="cta" onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
