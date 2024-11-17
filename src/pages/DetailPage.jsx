import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const POPULAR = import.meta.env.VITE_CATEGORY_POPULAR;
const TOP_RATED = import.meta.env.VITE_CATEGORY_TOP_RATED;
const UPCOMING = import.meta.env.VITE_CATEGORY_UPCOMING;

const DetailPage = () => {
  const { category, id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();

      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  const switchClassName = () => {
    switch (category) {
      case POPULAR:
        return "popular";
      case TOP_RATED:
        return "top-rated";
      case UPCOMING:
        return "upcoming";
      default:
        break;
    }
  };

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

  const AdditionalInfo = ({ movieDetails }) => {
    return (
      <>
        <p>
          Release date: <ReleaseDate release={movieDetails.release_date} />
        </p>
        <p>
          Genres: <Genres genres={movieDetails.genres} />
        </p>
      </>
    );
  };

  const ReleaseDate = ({ release }) => {
    return new Date(release).toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const Genres = ({ genres }) => {
    return genres.map((genre) => genre.name).join(", ");
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, movie]));
    alert(`${movie.title} added to wishlist!`);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <section className={`detail-page ${switchClassName()}`}>
      <h2>{movie.title}</h2>
      <h4>{movie.tagline}</h4>
      <div className="info">
        <div className="image-vote">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <ShowVotes voteAverage={movie.vote_average} />
        </div>

        <div className="copy-cta">
          <p>{movie.overview}</p>
          <AdditionalInfo movieDetails={movie} />
          <button className="cta" onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
