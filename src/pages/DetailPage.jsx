import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      countStars(data.vote_average);

      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  const countStars = (voteAverage) => {
    let numStars = Math.round(voteAverage * 0.5 * 2) / 2;
    // setStars([]);
    for (let i = numStars; i > 0; i--) {
      i >= 1
        ? setStars((prevArr) => [...prevArr, true])
        : setStars((prevArr) => [...prevArr, false]);
    }
  };

  const AddStarIcon = (isFull, index) => {
    return isFull === true ? (
      <Icon key={index} icon="mdi-light:star" width="20%" />
    ) : (
      <Icon key={index} icon="mdi-light:star-half" width="20%" />
    );
  };

  const StarsBack = () => {
    return Array.from({ length: 5 }, () => (
      <Icon icon="mdi-light:star" width="20%" />
    ));
  };

  const releaseDate = (releaseDate) => {
    return new Date(releaseDate).toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, movie]));
    alert(`${movie.title} added to wishlist!`);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <section className="detail-page">
      <h2>{movie.title}</h2>
      <h4>{movie.tagline}</h4>
      <div className="info">
        <div className="image-vote">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <span className="vote-average back">{StarsBack()}</span>
          <span className="vote-average front">
            {stars.map((isFull, index) => AddStarIcon(isFull, index))}
          </span>
        </div>

        <div className="copy-cta">
          <p>{movie.overview}</p>
          <p>Release date: {releaseDate(movie.release_date)}</p>
          <button className="cta" onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
